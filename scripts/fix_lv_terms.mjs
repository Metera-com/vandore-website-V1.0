import fs from 'fs';
import path from 'path';
import * as cheerio from 'cheerio';

const excludeDirs = new Set(['.git', '.vscode', '.history', '.lh', 'node_modules', 'vendor', 'font', 'image', 'css', 'js', 'php']);

function isLeaf(el) {
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

function replaceExact(txt) {
  const t = txt.trim();
  const lead = txt.match(/^\s*/)?.[0] || '';
  const trail = txt.match(/\s*$/)?.[0] || '';
  const lower = t.toLowerCase();
  if (lower === 'ipasibas' || lower === 'ipasumi') {
    return lead + 'Īpašumi' + trail;
  }
  if (lower === 'zinas' || lower === 'jaunumi') {
    return lead + 'Jaunumi' + trail;
  }
  const m = t.match(/^(\d{1,2}\.)\s*(\S.*)$/);
  if (m) {
    const label = m[2].trim().toLowerCase();
    if (label === 'ipasibas' || label === 'ipasumi') {
      return lead + m[1] + ' Īpašumi' + trail;
    }
    if (label === 'zinas' || label === 'jaunumi') {
      return lead + m[1] + ' Jaunumi' + trail;
    }
  }
  return null;
}

function processFile(file) {
  let html = fs.readFileSync(file, 'utf8');
  const $ = cheerio.load(html, { decodeEntities: false });
  let changes = 0;

  // Targeted fixes via data-i18n keys (preserve numeric prefixes)
  const targets = [
    { sel: '[data-i18n="02_properties"]', label: 'Īpašumi' },
    { sel: '[data-i18n="07_news"]', label: 'Jaunumi' },
  ];
  targets.forEach(t => {
    $(t.sel).each((_, el) => {
      const cur = $(el).text();
      const m = cur.match(/^(\s*(\d{1,2})\.\s*)?/);
      const prefix = m && m[0] ? m[0] : '';
      const newText = `${prefix}${t.label}`;
      if (cur !== newText) { $(el).text(newText); changes++; }
    });
  });

  $('*').each((_, el) => {
    if (!isLeaf(el)) return;
    const txt = $(el).text();
    if (!txt || txt.trim().length === 0) return;
    const repl = replaceExact(txt);
    if (repl !== null) {
      $(el).text(repl);
      changes++;
    }
  });

  if (changes > 0) {
    fs.writeFileSync(file, $.html(), 'utf8');
    return changes;
  }

  // Fallback: regex-based safe replacements between tags only
  const before = html;
  // > [num.] Ipasibas/Ipasumi <  -> Īpašumi
  html = html.replace(/>(\s*)(\d{1,2}\.)?(\s*)(Ipasibas|Ipasumi)(\s*)</g, (m, g1, num, g3, _w, g5) => {
    const prefix = num ? `${g1}${num}${g3}` : g1;
    return `>${prefix}Īpašumi${g5}<`;
  });
  // > zinas/jaunumi < -> Jaunumi
  html = html.replace(/>(\s*)(zinas|jaunumi)(\s*)</gi, (m, g1, _w, g3) => `>${g1}Jaunumi${g3}<`);

  if (html !== before) {
    fs.writeFileSync(file, html, 'utf8');
    const count = (before.match(/>(\s*)(\d{1,2}\.)?(\s*)(Ipasibas|Ipasumi)(\s*)</g) || []).length +
                  (before.match(/>(\s*)(zinas|jaunumi)(\s*)</gi) || []).length;
    return count;
  }
  return 0;
}

function main() {
  const files = getHtmlFiles('.');
  let totalChanges = 0;
  for (const f of files) {
    const c = processFile(f);
    if (c > 0) console.log(`[fix-lv] ${f}: ${c} changes`);
    totalChanges += c;
  }
  console.log(`[fix-lv] Total changes: ${totalChanges}`);
}

main();

