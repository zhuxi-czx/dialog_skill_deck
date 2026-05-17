#!/usr/bin/env bun
// Composite SVG text layer onto a background PNG produced by image-gen.
// Usage: bun run compose-text.ts <slide-deck-dir> [slide-number]
//
// Inputs per slide:
//   - <dir>/NN-slide-{slug}-bg.png        (image-gen output, no text)
//   - <dir>/prompts/NN-slide-{slug}.md    (prompt file with text_layer YAML frontmatter)
//   - <dir>/outline.md                    (deck metadata: style preset)
//   - <baseDir>/references/styles/<preset>.md  (Deck Signature YAML block)
//
// Output:
//   - <dir>/NN-slide-{slug}.png           (background + composited text overlay)

import { readdirSync, readFileSync, writeFileSync, existsSync, renameSync, copyFileSync } from "node:fs";
import { join, basename, resolve, dirname } from "node:path";
import { fileURLToPath } from "node:url";
import sharp from "sharp";
import { parse as parseYaml } from "yaml";

const SKILL_BASE = resolve(dirname(fileURLToPath(import.meta.url)), "..");

const arg = process.argv[2];
const onlySlide = process.argv[3];
if (!arg) {
  console.error("Usage: bun run compose-text.ts <slide-deck-dir> [slide-number]");
  process.exit(1);
}

const dir = resolve(arg);
if (!existsSync(dir)) {
  console.error(`Directory not found: ${dir}`);
  process.exit(1);
}

const outlinePath = join(dir, "outline.md");
if (!existsSync(outlinePath)) {
  console.error(`outline.md not found in ${dir}`);
  process.exit(1);
}

const meta = parseOutlineMeta(readFileSync(outlinePath, "utf8"));
const presetPath = join(SKILL_BASE, "references", "styles", `${meta.style}.md`);
if (!existsSync(presetPath)) {
  console.error(`Preset not found: ${presetPath}`);
  process.exit(1);
}
const sig = parseDeckSignature(readFileSync(presetPath, "utf8"));
const lang = meta.language || "en";

const promptsDir = join(dir, "prompts");
if (!existsSync(promptsDir)) {
  console.error(`No prompts/ directory in ${dir}`);
  process.exit(1);
}

const onlyPrefix = onlySlide ? onlySlide.padStart(2, "0") + "-" : null;
const promptFiles = readdirSync(promptsDir)
  .filter((f) => /^\d{2}-slide-.+\.md$/.test(f))
  .filter((f) => !onlyPrefix || f.startsWith(onlyPrefix))
  .sort();

if (promptFiles.length === 0) {
  console.error("No matching prompt files");
  process.exit(1);
}

let composed = 0;
for (const promptFile of promptFiles) {
  const slug = promptFile.replace(/\.md$/, ""); // "03-slide-membrane"
  const bgPath = join(dir, `${slug}-bg.png`);
  const outPath = join(dir, `${slug}.png`);

  if (!existsSync(bgPath)) {
    console.warn(`Skip ${slug}: missing background ${basename(bgPath)}`);
    continue;
  }

  const promptText = readFileSync(join(promptsDir, promptFile), "utf8");
  const fm = parseFrontmatter(promptText);
  const textLayer = fm?.slide_data?.text_layer || fm?.text_layer || null;

  if (existsSync(outPath)) backupFile(outPath);

  if (!textLayer || Object.keys(textLayer).length === 0) {
    copyFileSync(bgPath, outPath);
    console.log(`Copy (no text_layer): ${slug}`);
    composed++;
    continue;
  }

  const m = await sharp(bgPath).metadata();
  const W = m.width || 1920;
  const H = m.height || 1080;
  const svg = buildSvg(textLayer, sig, W, H, lang);

  await sharp(bgPath)
    .composite([{ input: Buffer.from(svg), top: 0, left: 0 }])
    .png()
    .toFile(outPath);

  console.log(`Composed: ${slug}`);
  composed++;
}

console.log(`\nDone. ${composed}/${promptFiles.length} slides composited.`);

// ============================================================
// Parsing helpers
// ============================================================

function parseOutlineMeta(md: string): { style: string; language: string } {
  // Try YAML frontmatter first
  const fm = md.match(/^---\n([\s\S]*?)\n---/);
  if (fm) {
    try {
      const data = parseYaml(fm[1]);
      if (data?.style) return { style: data.style, language: data.language || "en" };
    } catch {}
  }
  // Fallback: look in "## Metadata" YAML block
  const meta = md.match(/##\s+Metadata[\s\S]*?```yaml\n([\s\S]*?)\n```/);
  if (meta) {
    try {
      const data = parseYaml(meta[1]);
      if (data?.style) return { style: data.style, language: data.language || "en" };
    } catch {}
  }
  // Last resort: scan for `style: X` line
  const style = md.match(/^style:\s*(\S+)/m)?.[1] || "bio-3d";
  const language = md.match(/^language:\s*(\S+)/m)?.[1] || "en";
  return { style, language };
}

function parseDeckSignature(md: string): any {
  const m = md.match(/##\s+Deck Signature[\s\S]*?```yaml\n([\s\S]*?)\n```/);
  if (!m) return {};
  try {
    return parseYaml(m[1]) || {};
  } catch (e) {
    console.warn(`Failed to parse Deck Signature: ${e}`);
    return {};
  }
}

function parseFrontmatter(md: string): any {
  const m = md.match(/^---\n([\s\S]*?)\n---/);
  if (!m) {
    // Also try ```yaml slide_data ... ``` block (per outline-template format)
    const sd = md.match(/```yaml\s+slide_data\n([\s\S]*?)\n```/);
    if (sd) {
      try { return { slide_data: parseYaml(sd[1]) }; } catch { return null; }
    }
    return null;
  }
  try {
    return parseYaml(m[1]);
  } catch {
    return null;
  }
}

function backupFile(path: string): void {
  const ts = new Date()
    .toISOString()
    .replace(/[-:]/g, "")
    .replace(/\.\d+Z$/, "")
    .replace("T", "-");
  const ext = path.match(/\.[^.]+$/)?.[0] || "";
  const base = path.slice(0, path.length - ext.length);
  renameSync(path, `${base}-backup-${ts}${ext}`);
}

// ============================================================
// SVG rendering
// ============================================================

const FONT_STACKS: Record<string, string> = {
  cjk: "'PingFang SC', 'Source Han Sans SC', 'Noto Sans CJK SC', 'Microsoft YaHei', sans-serif",
  latin: "'Inter', 'Source Sans Pro', 'Helvetica Neue', system-ui, sans-serif",
  mono: "'JetBrains Mono', 'IBM Plex Mono', 'SF Mono', Consolas, monospace",
};

function fontFamily(name?: string): string {
  return FONT_STACKS[name || "cjk"] || FONT_STACKS.cjk;
}

function buildSvg(layer: any, sig: any, W: number, H: number, _lang: string): string {
  const parts: string[] = [];
  parts.push(`<svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${H}" viewBox="0 0 ${W} ${H}">`);

  // Defs for gradient borders (insight card)
  if (sig.insight_card?.gradient_border) {
    const g = sig.insight_card.gradient_border;
    parts.push(
      `<defs><linearGradient id="ic-grad" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stop-color="${g.from}"/><stop offset="100%" stop-color="${g.to}"/></linearGradient></defs>`
    );
  }

  // Frame border (bio-3d optional)
  if (sig.frame?.enabled) {
    const f = sig.frame;
    parts.push(
      `<rect x="${f.width / 2}" y="${f.width / 2}" width="${W - f.width}" height="${H - f.width}" rx="${f.radius || 0}" fill="none" stroke="${f.color}" stroke-width="${f.width}"/>`
    );
  }

  // Credentials banner / top-right badge / section header — all are pill bearers
  if (layer.credentials?.content && sig.credentials_banner?.enabled !== false) {
    parts.push(renderPill(layer.credentials.content, sig.credentials_banner, W, H));
  }
  if (layer.top_badge?.content && sig.top_right_badge?.enabled !== false) {
    parts.push(renderPill(layer.top_badge.content, sig.top_right_badge, W, H));
  }
  if (layer.section_header?.content && sig.section_header) {
    parts.push(renderPill(layer.section_header.content, sig.section_header, W, H));
  }

  // Title
  if (layer.title?.content && sig.title && !sig.title.alias_of) {
    parts.push(renderText(layer.title.content, sig.title, W, H));
  } else if (layer.title?.content && sig.title?.alias_of) {
    parts.push(renderPill(layer.title.content, sig[sig.title.alias_of], W, H));
  }

  // Subtitle
  if (layer.subtitle?.content && sig.subtitle) {
    parts.push(renderText(layer.subtitle.content, sig.subtitle, W, H));
  }

  // Labels with leader lines
  for (const lbl of layer.labels || []) {
    parts.push(renderLabel(lbl, sig, W, H));
  }

  // Text panel (engineering-blueprint left/right column)
  if (layer.text_panel?.items?.length && sig.text_panel?.enabled !== false) {
    parts.push(renderTextPanel(layer.text_panel, sig.text_panel, W, H));
  }

  // Annotation boxes (engineer-notebook)
  for (const box of layer.annotation_boxes || []) {
    parts.push(renderAnnotationBox(box, sig.annotation_box, W, H));
  }

  // Step badges (engineer-notebook)
  for (const badge of layer.step_badges || []) {
    parts.push(renderStepBadge(badge, sig.step_badge, W, H));
  }

  // Legend
  if (layer.legend?.enabled && sig.legend?.enabled !== false) {
    parts.push(renderLegend(layer.legend, sig.legend, W, H));
  }

  // Scale annotation
  if (layer.scale_annotation?.content) {
    parts.push(renderScale(layer.scale_annotation, sig.scale_annotation, W, H));
  }

  // Insight card (cinematic-3d)
  if (layer.insight_card?.enabled && layer.insight_card?.content && sig.insight_card) {
    parts.push(renderInsightCard(layer.insight_card, sig.insight_card, W, H));
  }

  // Bottom insight italic (sepia-whitepaper)
  if (layer.bottom_insight?.content && sig.bottom_insight?.enabled !== false) {
    parts.push(renderBottomInsight(layer.bottom_insight, sig.bottom_insight, W, H));
  }

  // Spatial context labels (bio-3d)
  for (const ctx of layer.spatial_context_labels || []) {
    parts.push(renderSpatialContext(ctx, sig.spatial_context_label, W, H));
  }

  parts.push("</svg>");
  return parts.join("\n");
}

function renderText(content: string, style: any, W: number, H: number): string {
  const [fx, fy] = style.position || [0.5, 0.5];
  const x = fx * W;
  const y = fy * H;
  const anchor = style.align === "left" ? "start" : style.align === "right" ? "end" : "middle";
  const lines = wrapText(content, style.max_lines || 1, style.max_chars_per_line || 40);
  return lines
    .map(
      (ln, i) =>
        `<text x="${x}" y="${y + i * (style.font_size * 1.2)}" text-anchor="${anchor}" font-family="${fontFamily(style.font_family)}" font-size="${style.font_size}" font-weight="${style.font_weight || 400}" fill="${style.color || "#000"}"${style.style === "italic" ? ' font-style="italic"' : ""}>${esc(ln)}</text>`
    )
    .join("\n");
}

function renderPill(content: string, style: any, W: number, H: number): string {
  if (!style) return "";
  const [fx, fy] = style.position || [0.05, 0.06];
  const px = fx * W;
  const py = fy * H;
  const padX = (style.pill?.padding?.[1] ?? 14);
  const padY = (style.pill?.padding?.[0] ?? 8);
  // estimate text width: char count * font_size * 0.6 (CJK heavier, but fine for v0.2.0)
  const fs = style.font_size || 14;
  const charW = fs * 0.65;
  const w = content.length * charW + padX * 2;
  const h = fs + padY * 2;
  const radius = style.pill?.border_radius ?? 6;
  const fill = style.pill?.fill || "rgba(0,0,0,0.5)";
  const border = style.pill?.border || "none";
  const borderW = style.pill?.border_width || 0;
  // Position: align right means px is the right edge; else left edge
  const anchorRight = style.align === "right";
  const rectX = anchorRight ? px - w : px;
  const textX = anchorRight ? px - padX : px + padX;
  const textY = py + padY + fs * 0.85;
  const fillAttr = fill === "transparent" ? 'fill="none"' : `fill="${fill}"`;
  const strokeAttrs = borderW > 0 ? ` stroke="${border}" stroke-width="${borderW}"` : "";
  const textAnchor = anchorRight ? "end" : "start";
  return `<rect x="${rectX}" y="${py}" width="${w}" height="${h}" rx="${radius}" ${fillAttr}${strokeAttrs}/>
<text x="${textX}" y="${textY}" text-anchor="${textAnchor}" font-family="${fontFamily(style.font_family)}" font-size="${fs}" font-weight="${style.font_weight || 400}" fill="${style.color || "#FFFFFF"}">${esc(content)}</text>`;
}

function renderLabel(lbl: any, sig: any, W: number, H: number): string {
  // pick leader style — for sepia-whitepaper, lbl.subject_kind = "organic" | "technical"
  let leader = sig.label_leader;
  if (lbl.subject_kind === "organic" && sig.label_leader_organic) leader = sig.label_leader_organic;
  if (lbl.subject_kind === "technical" && sig.label_leader_technical) leader = sig.label_leader_technical;
  leader = leader || { color: "#000", width: 1 };

  const text = sig.label_text || { font_size: 16, color: "#000", font_family: "cjk" };
  const [ax, ay] = lbl.anchor || [0.5, 0.5];
  const [lx, ly] = lbl.leader_to || [ax, ay];
  const x1 = ax * W;
  const y1 = ay * H;
  const x2 = lx * W;
  const y2 = ly * H;
  const side = lbl.side || "left";

  const parts: string[] = [];
  // Leader line
  parts.push(`<line x1="${x1}" y1="${y1}" x2="${x2}" y2="${y2}" stroke="${leader.color}" stroke-width="${leader.width || 1}"/>`);
  // End shape at leader_to
  if (leader.end_shape === "arrowhead") {
    const ah = arrowhead(x1, y1, x2, y2, 8, leader.color);
    parts.push(ah);
  } else if (leader.end_shape === "filled_circle") {
    parts.push(`<circle cx="${x2}" cy="${y2}" r="3" fill="${leader.color}"/>`);
  } else if (leader.end_shape === "open_circle") {
    parts.push(`<circle cx="${x2}" cy="${y2}" r="3" fill="none" stroke="${leader.color}" stroke-width="${leader.width || 1}"/>`);
  }

  // Text positioning relative to anchor; engineering-blueprint wraps text in a box
  const fs = text.font_size || 16;
  if (text.box) {
    // boxed label (engineering-blueprint)
    const padX = text.box.padding?.[1] ?? 10;
    const padY = text.box.padding?.[0] ?? 6;
    const charW = fs * 0.65;
    const w = lbl.content.length * charW + padX * 2;
    const h = fs + padY * 2;
    const rectX = side === "right" ? x1 : x1 - w;
    const rectY = y1 - h / 2;
    const textX = side === "right" ? x1 + padX : x1 - padX;
    const textY = rectY + padY + fs * 0.85;
    const anchorAttr = side === "right" ? "start" : "end";
    parts.push(
      `<rect x="${rectX}" y="${rectY}" width="${w}" height="${h}" rx="${text.box.border_radius || 4}" fill="${text.box.fill}" stroke="${text.box.border}" stroke-width="${text.box.border_width || 1}"/>`
    );
    parts.push(
      `<text x="${textX}" y="${textY}" text-anchor="${anchorAttr}" font-family="${fontFamily(text.font_family)}" font-size="${fs}" font-weight="${text.font_weight || 400}" fill="${text.color}">${esc(lbl.content)}</text>`
    );
  } else {
    // floating label
    const anchorAttr = side === "right" ? "start" : side === "center" ? "middle" : "end";
    const tx = side === "right" ? x1 + 6 : side === "center" ? x1 : x1 - 6;
    const ty = side === "top" ? y1 - 6 : side === "bottom" ? y1 + fs + 4 : y1 + fs * 0.35;
    parts.push(
      `<text x="${tx}" y="${ty}" text-anchor="${anchorAttr}" font-family="${fontFamily(text.font_family)}" font-size="${fs}" font-weight="${text.font_weight || 400}" fill="${text.color}">${esc(lbl.content)}</text>`
    );
  }
  return parts.join("\n");
}

function renderLegend(layer: any, sig: any, W: number, H: number): string {
  const items = layer.items || [];
  if (items.length === 0) return "";
  const pos = layer.position || sig.default_position || "bottom-right";
  const padding = sig.padding || 16;
  const itemHeight = sig.item_height || 28;
  const iconRadius = sig.item_icon_radius || 6;
  const itemFontSize = sig.item_text_font_size || 14;
  // Estimate width from longest text
  const maxLen = Math.max(...items.map((i: any) => i.text.length));
  const boxWidth = Math.min(W * 0.4, Math.max(180, maxLen * itemFontSize * 0.65 + iconRadius * 4 + padding * 2 + 8));
  const boxHeight = items.length * itemHeight + padding * 2;
  const { x: bx, y: by } = anchorBox(pos, W, H, boxWidth, boxHeight, padding);
  const parts: string[] = [];
  parts.push(
    `<rect x="${bx}" y="${by}" width="${boxWidth}" height="${boxHeight}" rx="${sig.border_radius || 8}" fill="${sig.fill}" stroke="${sig.border}" stroke-width="${sig.border_width || 1}"/>`
  );
  items.forEach((item: any, i: number) => {
    const cy = by + padding + i * itemHeight + itemHeight / 2;
    const cx = bx + padding + iconRadius;
    if ((item.shape || "circle") === "circle") {
      parts.push(`<circle cx="${cx}" cy="${cy}" r="${iconRadius}" fill="${item.color}"/>`);
    } else {
      parts.push(`<rect x="${cx - iconRadius}" y="${cy - iconRadius}" width="${iconRadius * 2}" height="${iconRadius * 2}" fill="${item.color}"/>`);
    }
    parts.push(
      `<text x="${cx + iconRadius + 10}" y="${cy + itemFontSize * 0.35}" font-family="${fontFamily("cjk")}" font-size="${itemFontSize}" fill="#1A1A1A">${esc(item.text)}</text>`
    );
  });
  return parts.join("\n");
}

function renderScale(layer: any, sig: any, W: number, H: number): string {
  if (!sig) return "";
  const pos = sig.default_position || "bottom-left";
  const fs = sig.font_size || 13;
  const padding = 24;
  const lineLen = 80;
  let x: number, y: number;
  if (pos === "bottom-left") { x = padding; y = H - padding; }
  else if (pos === "bottom-right") { x = W - padding - lineLen; y = H - padding; }
  else { x = padding; y = H - padding; }
  const parts: string[] = [];
  // double-headed line above text
  parts.push(`<line x1="${x}" y1="${y - fs - 4}" x2="${x + lineLen}" y2="${y - fs - 4}" stroke="${sig.color}" stroke-width="1"/>`);
  parts.push(`<line x1="${x}" y1="${y - fs - 8}" x2="${x}" y2="${y - fs}" stroke="${sig.color}" stroke-width="1"/>`);
  parts.push(`<line x1="${x + lineLen}" y1="${y - fs - 8}" x2="${x + lineLen}" y2="${y - fs}" stroke="${sig.color}" stroke-width="1"/>`);
  parts.push(`<text x="${x + lineLen / 2}" y="${y}" text-anchor="middle" font-family="${fontFamily(sig.font_family)}" font-size="${fs}" fill="${sig.color}">${esc(layer.content)}</text>`);
  return parts.join("\n");
}

function renderInsightCard(layer: any, sig: any, W: number, H: number): string {
  const [fx, fy] = layer.position || sig.default_position || [0.5, 0.78];
  const cx = fx * W;
  const cy = fy * H;
  const w = (sig.width_fraction || 0.6) * W;
  const body = sig.body || { font_size: 22, color: "#FFFFFF" };
  const padding = sig.padding || 24;
  // estimate text height: wrap to 40 chars / line, line-height 1.4
  const charsPerLine = 30;
  const lines = wrapText(layer.content, 5, charsPerLine);
  const h = lines.length * body.font_size * 1.4 + padding * 2;
  const x = cx - w / 2;
  const y = cy - h / 2;
  const r = sig.border_radius || 12;
  const gradStroke = sig.gradient_border ? `url(#ic-grad)` : (sig.border || "#FFF");
  const sw = sig.gradient_border?.width || 2;
  const parts: string[] = [];
  // Fill (semi-transparent)
  const opacity = sig.fill_opacity ?? 1;
  parts.push(`<rect x="${x}" y="${y}" width="${w}" height="${h}" rx="${r}" fill="${sig.fill}" fill-opacity="${opacity}" stroke="${gradStroke}" stroke-width="${sw}"/>`);
  // Text
  lines.forEach((ln, i) => {
    const ty = y + padding + (i + 1) * body.font_size * 1.4 - body.font_size * 0.3;
    parts.push(
      `<text x="${cx}" y="${ty}" text-anchor="middle" font-family="${fontFamily(body.font_family)}" font-size="${body.font_size}" font-weight="${body.font_weight || 500}" fill="${body.color}"${body.style === "italic" ? ' font-style="italic"' : ""}>${esc(ln)}</text>`
    );
  });
  return parts.join("\n");
}

function renderBottomInsight(layer: any, sig: any, W: number, H: number): string {
  const [fx, fy] = sig.position || [0.05, 0.92];
  const x = fx * W;
  const y = fy * H;
  const prefix = sig.prefix || "";
  const fs = sig.font_size || 16;
  return `<text x="${x}" y="${y}" font-family="${fontFamily(sig.font_family)}" font-size="${fs}" font-weight="${sig.font_weight || 400}" fill="${sig.color}"${sig.style === "italic" ? ' font-style="italic"' : ""}>${esc(prefix + layer.content)}</text>`;
}

function renderAnnotationBox(box: any, sig: any, W: number, H: number): string {
  if (!sig) return "";
  const role = box.role || "explanation";
  const roleSig = sig.roles?.[role] || sig.roles?.explanation || {};
  const body = sig.body || { font_size: 14, color: "#1A1A1A" };
  const padding = sig.padding || 12;
  const [fx, fy] = box.position || [0.5, 0.5];
  const w = (box.width_fraction || 0.25) * W;
  const charsPerLine = Math.floor(w / (body.font_size * 0.65)) - 2;
  const lines = wrapText(box.content, box.max_lines || 4, charsPerLine);
  const h = lines.length * body.font_size * 1.4 + padding * 2;
  const x = fx * W - w / 2;
  const y = fy * H - h / 2;
  const parts: string[] = [];
  parts.push(`<rect x="${x}" y="${y}" width="${w}" height="${h}" rx="${sig.border_radius || 4}" fill="${sig.fill}" stroke="${roleSig.border || "#000"}" stroke-width="${sig.border_width || 1.5}"/>`);
  lines.forEach((ln, i) => {
    const ty = y + padding + (i + 1) * body.font_size * 1.4 - body.font_size * 0.3;
    parts.push(`<text x="${x + padding}" y="${ty}" font-family="${fontFamily(body.font_family)}" font-size="${body.font_size}" fill="${body.color}">${esc(ln)}</text>`);
  });
  return parts.join("\n");
}

function renderStepBadge(badge: any, sig: any, W: number, H: number): string {
  if (!sig) return "";
  const [fx, fy] = badge.position || [0.5, 0.5];
  const cx = fx * W;
  const cy = fy * H;
  const r = sig.radius || 14;
  const fill = badge.color || sig.fill;
  return `<circle cx="${cx}" cy="${cy}" r="${r}" fill="${fill}"/>
<text x="${cx}" y="${cy + sig.font_size * 0.35}" text-anchor="middle" font-family="${fontFamily(sig.font_family)}" font-size="${sig.font_size}" font-weight="${sig.font_weight || 700}" fill="${sig.text_color}">${esc(String(badge.number))}</text>`;
}

function renderTextPanel(layer: any, sig: any, W: number, H: number): string {
  const side = layer.side || sig.default_side || "left";
  const [fx, fy] = side === "right" ? sig.position_right : sig.position_left;
  const x = fx * W;
  const y = fy * H;
  const body = sig.body || { font_size: 14, color: "#FFF" };
  const fs = body.font_size;
  const lineH = fs * 1.6;
  const parts: string[] = [];
  layer.items.forEach((item: string, i: number) => {
    const ly = y + i * lineH;
    parts.push(`<circle cx="${x + 6}" cy="${ly + fs * 0.35}" r="3" fill="${sig.bullet?.color || "#FFF"}"/>`);
    parts.push(`<text x="${x + 18}" y="${ly + fs * 0.85}" font-family="${fontFamily(body.font_family)}" font-size="${fs}" fill="${body.color}">${esc(item)}</text>`);
  });
  return parts.join("\n");
}

function renderSpatialContext(ctx: any, sig: any, W: number, H: number): string {
  if (!sig) return "";
  const positions = sig.positions || [[0.05, 0.10]];
  const idx = Math.min(ctx.index || 0, positions.length - 1);
  const [fx, fy] = positions[idx];
  const x = fx * W;
  const y = fy * H;
  return `<text x="${x}" y="${y}" font-family="${fontFamily(sig.font_family)}" font-size="${sig.font_size}" fill="${sig.color}">${esc(ctx.content)}</text>`;
}

// ============================================================
// Geometry & utility
// ============================================================

function anchorBox(pos: string, W: number, H: number, w: number, h: number, pad: number): { x: number; y: number } {
  switch (pos) {
    case "top-left": return { x: pad, y: pad };
    case "top-right": return { x: W - w - pad, y: pad };
    case "bottom-left": return { x: pad, y: H - h - pad };
    case "bottom-right":
    default: return { x: W - w - pad, y: H - h - pad };
  }
}

function arrowhead(x1: number, y1: number, x2: number, y2: number, size: number, color: string): string {
  const dx = x2 - x1;
  const dy = y2 - y1;
  const len = Math.hypot(dx, dy) || 1;
  const ux = dx / len;
  const uy = dy / len;
  const bx = x2 - ux * size;
  const by = y2 - uy * size;
  const wx = -uy * size * 0.5;
  const wy = ux * size * 0.5;
  const p1x = bx + wx;
  const p1y = by + wy;
  const p2x = bx - wx;
  const p2y = by - wy;
  return `<polygon points="${x2},${y2} ${p1x},${p1y} ${p2x},${p2y}" fill="${color}"/>`;
}

function wrapText(text: string, maxLines: number, maxChars: number): string[] {
  if (!text) return [];
  if (text.length <= maxChars) return [text];
  const lines: string[] = [];
  // Simple greedy wrap by character count (CJK doesn't have spaces; for Latin we'd ideally wrap on spaces)
  const hasSpaces = /\s/.test(text);
  if (hasSpaces) {
    const words = text.split(/\s+/);
    let line = "";
    for (const w of words) {
      if ((line + " " + w).trim().length > maxChars) {
        if (line) lines.push(line);
        line = w;
        if (lines.length >= maxLines - 1) break;
      } else {
        line = line ? line + " " + w : w;
      }
    }
    if (line) lines.push(line);
  } else {
    // CJK: break by char count
    for (let i = 0; i < text.length; i += maxChars) {
      lines.push(text.slice(i, i + maxChars));
      if (lines.length >= maxLines) break;
    }
  }
  return lines.slice(0, maxLines);
}

function esc(s: string): string {
  if (s == null) return "";
  return String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");
}
