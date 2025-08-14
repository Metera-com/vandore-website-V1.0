import os
import re
import shutil
from pathlib import Path
from urllib.parse import urlparse
from bs4 import BeautifulSoup

ROOT = Path(__file__).parent
DIST = ROOT / 'dist'

# regular expressions for css url and import statements
URL_RE = re.compile(r"url\(['\"]?(.*?)['\"]?\)")
IMPORT_RE = re.compile(r"@import\s+(?:url\()?['\"]?(.*?)['\"]?\)?")


def is_external(url: str) -> bool:
    return bool(urlparse(url).scheme) or url.startswith('//')


def normalize(path: str) -> str:
    """Strip query and fragment."""
    parsed = urlparse(path)
    return parsed.path


def extract_from_html(html_path: Path) -> set[str]:
    assets: set[str] = set()
    soup = BeautifulSoup(html_path.read_text(encoding='utf-8'), 'html.parser')
    # elements with href
    for tag in soup.find_all('link', href=True):
        href = tag['href']
        if not is_external(href):
            assets.add(normalize(href))
    # script src
    for tag in soup.find_all('script', src=True):
        src = tag['src']
        if not is_external(src):
            assets.add(normalize(src))
    # img/source/video audio elements with src
    for tag in soup.find_all(src=True):
        src = tag['src']
        if not is_external(src):
            assets.add(normalize(src))
    # srcset attributes
    for tag in soup.find_all(srcset=True):
        srcset = tag['srcset']
        for item in srcset.split(','):
            url = item.strip().split()[0]
            if not is_external(url):
                assets.add(normalize(url))
    # style attributes with url()
    for tag in soup.find_all(style=True):
        for url in URL_RE.findall(tag['style']):
            if not is_external(url):
                assets.add(normalize(url))
    return assets


def extract_from_css(css_path: Path, processed: set[Path], assets: set[str]):
    if css_path in processed or not css_path.exists() or css_path.is_dir():
        return
    processed.add(css_path)
    text = css_path.read_text(encoding='utf-8', errors='ignore')
    for url in URL_RE.findall(text):
        if not is_external(url):
            p = normalize(url)
            if (ROOT / p).is_file():
                assets.add(p)
    for url in IMPORT_RE.findall(text):
        if not is_external(url):
            p = normalize(url)
            css_file = ROOT / p
            if css_file.is_file():
                assets.add(p)
                extract_from_css(css_file, processed, assets)


def rewrite_link(value: str, html_dest: Path) -> str:
    parsed = urlparse(value)
    if is_external(value) or parsed.scheme == 'data':
        return value
    base = parsed.path
    if not base:
        return value
    rel = os.path.relpath(base, html_dest.parent)
    new = rel
    if parsed.query:
        new += '?' + parsed.query
    if parsed.fragment:
        new += '#' + parsed.fragment
    return new


def process_html(html_path: Path):
    dest_html = DIST / html_path.name
    soup = BeautifulSoup(html_path.read_text(encoding='utf-8'), 'html.parser')
    # update link href/src attributes
    for tag in soup.find_all(href=True):
        href = tag['href']
        if not is_external(href):
            tag['href'] = rewrite_link(href, dest_html)
    for tag in soup.find_all(src=True):
        src = tag['src']
        if not is_external(src):
            tag['src'] = rewrite_link(src, dest_html)
    for tag in soup.find_all(style=True):
        style = tag['style']
        def repl(match):
            url = match.group(1)
            if is_external(url):
                return match.group(0)
            new_url = rewrite_link(url, dest_html)
            return f"url('{new_url}')"
        tag['style'] = URL_RE.sub(repl, style)
    dest_html.parent.mkdir(parents=True, exist_ok=True)
    dest_html.write_text(str(soup), encoding='utf-8')


def main():
    if DIST.exists():
        shutil.rmtree(DIST)
    DIST.mkdir()

    html_files = list(ROOT.glob('*.html'))
    assets: set[str] = set()
    for html in html_files:
        assets.update(extract_from_html(html))

    # process CSS dependencies
    processed_css: set[Path] = set()
    for asset in list(assets):
        if asset.endswith('.css'):
            extract_from_css(ROOT / asset, processed_css, assets)

    # copy assets
    for asset in assets:
        src = ROOT / asset
        if src.is_file():
            dest = DIST / asset
            dest.parent.mkdir(parents=True, exist_ok=True)
            shutil.copy2(src, dest)

    # copy and rewrite HTML
    for html in html_files:
        process_html(html)

    print(f'Copied {len(html_files)} HTML files and {len(assets)} assets to {DIST}')


if __name__ == '__main__':
    main()
