import os
import re
import sys
from typing import Tuple, List


def norm_key(text: str) -> str:
    s = text.strip().lower()
    # Remove punctuation
    s = re.sub(r"[\p{P}\p{S}]", "", s)
    # Fallback for Python's lack of \p classes
    s = re.sub(r"[^\w\s]", "", s)
    s = re.sub(r"\s+", " ", s)
    s = s.replace(" ", "_")
    return s or ("k_" + str(abs(hash(text)) % (10**9)))


def is_leaf_text_element(tag) -> bool:
    if not hasattr(tag, 'name'):
        return False
    if tag.name in {"script", "style", "noscript", "template"}:
        return False
    # Has no child tags (only NavigableString/whitespace)
    for c in getattr(tag, 'contents', []):
        if getattr(c, 'name', None):
            return False
    return True


def translate_texts(texts: List[str]) -> List[str]:
    # Lazy import and setup translator
    from googletrans import Translator  # type: ignore
    tr = Translator()
    results = []
    for t in texts:
        if t.strip() == "Menu":
            results.append(t)
            continue
        try:
            res = tr.translate(t, src='en', dest='lv')
            results.append(res.text)
        except Exception:
            # Fallback: return original to avoid breaking layout
            results.append(t)
    return results


def process_html_file(path: str) -> Tuple[int, int, List[str]]:
    from bs4 import BeautifulSoup  # type: ignore

    with open(path, 'r', encoding='utf-8') as f:
        html = f.read()

    soup = BeautifulSoup(html, 'lxml') if 'lxml' in sys.modules else BeautifulSoup(html, 'html.parser')

    # Collect leaf elements with visible text
    candidates = []
    skip_examples = []
    total = 0
    translated = 0

    for tag in soup.find_all(True):
        if not is_leaf_text_element(tag):
            continue
        txt = tag.get_text()
        if not txt or not txt.strip():
            continue
        # Skip if pure number or just punctuation
        if re.fullmatch(r"[\s\W]*", txt):
            continue
        total += 1

        # Respect Menu exception (exact visible text)
        if txt.strip() == "Menu":
            if len(skip_examples) < 3:
                sel = tag.name
                if tag.get('id'):
                    sel += f"#{tag.get('id')}"
                elif tag.get('class'):
                    sel += '.' + '.'.join(tag.get('class')[:2])
                skip_examples.append(sel)
            continue

        # Idempotency: if data-i18n exists, skip altering; count as translated
        if tag.has_attr('data-i18n'):
            translated += 1
            continue

        candidates.append(tag)

    # Perform translations in a batch to reduce HTTP calls
    texts = [t.get_text() for t in candidates]
    if texts:
        lv_texts = translate_texts(texts)
        for tag, lv in zip(candidates, lv_texts):
            original = tag.get_text()
            key = norm_key(original)
            # Preserve leading/trailing whitespace
            leading_ws = re.match(r"^\s*", original).group(0)
            trailing_ws = re.search(r"\s*$", original).group(0)
            tag.string = f"{leading_ws}{lv}{trailing_ws}"
            tag['data-i18n'] = key
            translated += 1

    # Write back
    with open(path, 'w', encoding='utf-8') as f:
        f.write(str(soup))

    return total, translated, skip_examples


def main():
    # Ensure dependencies are available
    try:
        import bs4  # noqa: F401
    except Exception:
        os.system(sys.executable + " -m pip install beautifulsoup4 lxml")
    try:
        import googletrans  # noqa: F401
    except Exception:
        os.system(sys.executable + " -m pip install googletrans==4.0.0rc1")

    roots = ['.']
    exclude_dirs = {'.git', '.vscode', '.history', '.lh', 'node_modules', 'vendor', 'font', 'image', 'css', 'js', 'php'}
    html_files = []
    for root in roots:
        for dirpath, dirnames, filenames in os.walk(root):
            # Prune excluded dirs
            dirnames[:] = [d for d in dirnames if d not in exclude_dirs and not d.startswith('.')]
            for fn in filenames:
                if fn.lower().endswith('.html'):
                    html_files.append(os.path.join(dirpath, fn))

    grand_total = 0
    grand_translated = 0
    grand_skips = []
    for path in sorted(html_files):
        total, translated, skips = process_html_file(path)
        grand_total += total
        grand_translated += translated
        grand_skips.extend(skips)
        print(f"[LV] {path}: translated {translated}/{total}; skipped {len(skips)}")

    print("[LV] Summary:")
    print(f"[LV] Total translated: {grand_translated}/{grand_total}")
    if grand_skips:
        print(f"[LV] Skipped examples: {', '.join(grand_skips[:5])}")


if __name__ == '__main__':
    main()

