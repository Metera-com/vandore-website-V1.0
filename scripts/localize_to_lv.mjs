import fs from 'fs';
import path from 'path';
import * as cheerio from 'cheerio';
import translate from 'google-translate-api-x';

const excludeDirs = new Set(['.git', '.vscode', '.history', '.lh', 'node_modules', 'vendor', 'font', 'image', 'css', 'js', 'php']);

function normKey(text) {
  const trimmed = text.trim().toLowerCase();
  const noPunct = trimmed.normalize('NFKC').replace(/[^\w\s]/g, '');
  const single = noPunct.replace(/\s+/g, ' ').trim();
  const key = single.replace(/\s/g, '_');
  return key || `k_${Math.abs(hashCode(text))}`;
}

function hashCode(str) {
  let h = 0;
  for (let i = 0; i < str.length; i++) {
    h = ((h << 5) - h) + str.charCodeAt(i);
    h |= 0;
  }
  return h;
}

function isLeaf($, el) {
  const tag = el.tagName?.toLowerCase?.();
  if (!tag) return false;
  if (tag === 'script' || tag === 'style' || tag === 'noscript' || tag === 'template') return false;
  const children = el.children || [];
  const hasElementChild = children.some(ch => ch && ch.type === 'tag');
  return !hasElementChild;
}

function getHtmlFiles(root) {
  const out = [];
  function walk(dir) {
    const entries = fs.readdirSync(dir, { withFileTypes: true });
    for (const e of entries) {
      if (e.isDirectory()) {
        if (excludeDirs.has(e.name) || e.name.startsWith('.')) continue;
        walk(path.join(dir, e.name));
      } else if (e.isFile() && e.name.toLowerCase().endsWith('.html')) {
        out.push(path.join(dir, e.name));
      }
    }
  }
  walk(root);
  return out;
}

async function translateBatch(texts) {
  const results = [];
  for (const t of texts) {
    if (t.trim() === 'Menu') { results.push(t); continue; }
    try {
      const res = await translate(t, { from: 'en', to: 'lv' });
      results.push(res.text);
    } catch (e) {
      results.push(t);
    }
  }
  return results;
}

async function processFile(file) {
  const html = fs.readFileSync(file, 'utf8');
  const $ = cheerio.load(html, { decodeEntities: false });

  let total = 0;
  let translated = 0;
  const skipSelectors = [];
  const candidates = [];

  $('*').each((_, el) => {
    if (!isLeaf($, el)) return;
    const txt = $(el).text();
    if (!txt || txt.trim().length === 0) return;
    if (/^[\s\W]*$/.test(txt)) return;
    total++;
    if (txt.trim() === 'Menu') {
      if (skipSelectors.length < 3) {
        let sel = el.tagName.toLowerCase();
        if (el.attribs && el.attribs.id) sel += '#' + el.attribs.id;
        else if (el.attribs && el.attribs.class) sel += '.' + el.attribs.class.split(/\s+/).slice(0,2).join('.');
        skipSelectors.push(sel);
      }
      return;
    }
    if (el.attribs && el.attribs['data-i18n']) {
      translated++;
      return;
    }
    candidates.push(el);
  });

  const texts = candidates.map(el => $(el).text());
  const lvs = await translateBatch(texts);
  candidates.forEach((el, i) => {
    const original = $(el).text();
    const key = normKey(original);
    // Preserve leading/trailing whitespace
    const m1 = original.match(/^\s*/); const lead = m1 ? m1[0] : '';
    const m2 = original.match(/\s*$/); const trail = m2 ? m2[0] : '';
    $(el).text(lead + lvs[i] + trail);
    $(el).attr('data-i18n', key);
    translated++;
  });

  fs.writeFileSync(file, $.html(), 'utf8');
  return { total, translated, skips: skipSelectors };
}

async function main() {
  const files = getHtmlFiles('.');
  let gTot = 0, gTr = 0; const gSkips = [];
  for (const f of files) {
    const { total, translated, skips } = await processFile(f);
    gTot += total; gTr += translated; gSkips.push(...skips);
    console.log(`[LV] ${f}: translated ${translated}/${total}; skipped ${skips.length}`);
  }
  console.log('[LV] Summary:');
  console.log(`[LV] Total translated: ${gTr}/${gTot}`);
  if (gSkips.length) console.log(`[LV] Skipped examples: ${gSkips.slice(0,5).join(', ')}`);
}

main().catch(err => { console.error(err); process.exit(1); });
