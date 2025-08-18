import os
import sys
import sys
import yaml
import markdown2
from datetime import datetime

# --- CONFIGURATION ---
POSTS_DIR = "_posts"
PROPERTIES_DIR = "_properties"

BLOG_OUTPUT_DIR = "blog"
PROPERTIES_OUTPUT_DIR = "properties"

POST_TEMPLATE_PATH = "blog-post-template.html"
PROPERTY_TEMPLATE_PATH = "property-detail-template.html"

BLOG_LISTING_PAGE = "blog.html"
PROPERTIES_LISTING_PAGE = "properties.html"
HOME_PAGE = "index.html"

BLOG_POSTS_PLACEHOLDER = "<!-- BLOG_POSTS_HERE -->"
PROPERTIES_PLACEHOLDER = "<!-- PROPERTIES_HERE -->"
FEATURED_PROPERTIES_PLACEHOLDER = "<!-- FEATURED_PROPERTIES_HERE -->"


def generate_blog_post_card(post):
    """Generates the HTML for a single blog post card."""
    return f"""
<div class="col-md-6">
    <div class="card d-flex flex-column gap-4">
        <a href="{BLOG_OUTPUT_DIR}/{post['slug']}.html" class="link-dark">
            <img src="{post['image']}" alt="image"
                class="img-fluid w-100 rounded-4" style="aspect-ratio: 5/3; object-fit: cover;">
        </a>
        <div class="d-flex flex-column gap-2">
            <ul class="list-inline-dot sm-text">
                <li class="list-inline-item">
                    <a href="#" class="link-dark">Resource</a>
                </li>
                <li class="list-inline-item">{post['date'].strftime('%B %d, %Y')}</li>
            </ul>
            <h5>
                <a href="{BLOG_OUTPUT_DIR}/{post['slug']}.html" class="link-dark">{post['title']}</a>
            </h5>
            <p class="mb-0">{post['summary']}...</p>
        </div>
    </div>
</div>
"""

def build_blog():
    print("Starting blog post generation...")
    if not os.path.exists(BLOG_OUTPUT_DIR):
        os.makedirs(BLOG_OUTPUT_DIR)
    
    try:
        with open(POST_TEMPLATE_PATH, 'r', encoding='utf-8') as f:
            post_template = f.read()
        with open(BLOG_LISTING_PAGE, 'r', encoding='utf-8') as f:
            blog_html_template = f.read()
    except FileNotFoundError as e:
        print(f"Error: Missing template file: {e.filename}")
        print("Blog generation skipped.")
        return

    posts = []
    for filename in os.listdir(POSTS_DIR):
        if filename.endswith(".md"):
            filepath = os.path.join(POSTS_DIR, filename)
            with open(filepath, 'r', encoding='utf-8') as f:
                content = f.read()
                parts = content.split('---')
                if len(parts) >= 3:
                    front_matter = yaml.safe_load(parts[1])
                    md_content = front_matter.pop('body', '')
                    html_content = markdown2.markdown(md_content)
                    summary = ' '.join(md_content.split()[:20])
                    
                    post_data = {
                        'title': front_matter.get('title', 'Untitled'),
                        'date': datetime.strptime(front_matter.get('date'), '%Y-%m-%d'),
                        'author': front_matter.get('author', 'Anonymous'),
                        'image': front_matter.get('image', ''),
                        'slug': front_matter.get('slug', os.path.splitext(filename)[0]),
                        'content': html_content,
                        'summary': summary
                    }
                    posts.append(post_data)

                    post_html = post_template.replace("{{POST_TITLE}}", post_data['title'])
                    post_html = post_html.replace("{{POST_AUTHOR}}", post_data['author'])
                    post_html = post_html.replace("{{POST_DATE}}", post_data['date'].strftime('%B %d, %Y'))
                    post_html = post_html.replace("{{POST_IMAGE}}", f"../{post_data['image']}")
                    post_html = post_html.replace("{{POST_CONTENT}}", post_data['content'])
                    
                    output_path = os.path.join(BLOG_OUTPUT_DIR, f"{post_data['slug']}.html")
                    with open(output_path, 'w', encoding='utf-8') as out_f:
                        out_f.write(post_html)

    posts.sort(key=lambda p: p['date'], reverse=True)
    all_posts_html = "\n".join([generate_blog_post_card(p) for p in posts])
    final_blog_html = blog_html_template.replace(BLOG_POSTS_PLACEHOLDER, all_posts_html)
    with open(BLOG_LISTING_PAGE, 'w', encoding='utf-8') as f:
        f.write(final_blog_html)
    print(f"-> Built {len(posts)} blog posts and updated {BLOG_LISTING_PAGE}")


def generate_property_card(prop):
    """Generates the HTML for a single property card for the listing page."""
    # This structure is based on your js/custom.js and index.html
    card_html = f"""
<div class="col mb-4" data-price="{prop.get('price', '0').replace(',', '')}" data-location="{prop.get('location', '').lower()}" data-bedrooms="{prop.get('bedrooms', 0)}">
    <div class="d-flex flex-column h-100 position-relative">
        <img src="{prop['main_image']}" class="img-fluid h-100" style="aspect-ratio: 3/2;" alt="{prop['title']}">
        <a href="{PROPERTIES_OUTPUT_DIR}/{prop['slug']}.html">
            <div class="d-flex flex-column gap-5 rounded-2 p-4 bg-gray-hover mx-4 black-1" style="margin-top: -105px;">
                <div class="d-flex flex-row justify-content-between">
                    <div class="d-flex flex-column gap-2">
                        <div class="d-flex flex-row gap-2 align-items-center">
                            <i class="rtmicon rtmicon-location fw-bold"></i>
                            <span>{prop['location']}</span>
                        </div>
                        <h4>{prop['title']}</h4>
                    </div>
                    <h4>€{prop['price']}</h4>
                </div>
                <div class="d-flex flex-row gap-3">
                    <div class="d-flex flex-row gap-2 link">
                        <i class="rtmicon rtmicon-bed"></i>
                        <span>{prop['bedrooms']} Beds</span>
                    </div>
                    <div class="d-flex flex-row gap-2 link">
                        <i class="rtmicon rtmicon-bath"></i>
                        <span>{prop['bathrooms']} Bath</span>
                    </div>
                    <div class="d-flex flex-row gap-2 link">
                        <i class="rtmicon rtmicon-area"></i>
                        <span>{prop['area']} sq.ft</span>
                    </div>
                </div>
            </div>
        </a>
    </div>
</div>
"""
    return card_html

def generate_featured_property_html(properties):
    """Generates the HTML for the featured properties tabs on the homepage."""
    if not properties:
        return ""

    tab_content_html = ""
    tabs_html = ""

    # Limit to 4 featured properties to match the original design
    for i, prop in enumerate(properties[:4]):
        active_class = "active" if i == 0 else ""
        tab_id = f"feature-{i + 1}"

        # Generate the main content card (using a slightly different structure from the main listing)
        tab_content_html += f"""
        <div class="content {active_class}" id="{tab_id}">
            <div class="d-flex flex-column h-100 position-relative">
                <img src="{prop['main_image']}" class="img-fluid h-100" style="aspect-ratio: 3/2;" alt="{prop['title']}">
                <a href="{PROPERTIES_OUTPUT_DIR}/{prop['slug']}.html">
                    <div class="d-flex flex-column gap-5 rounded-2 p-4 bg-gray-hover mx-4 black-1" style="margin-top: -105px;">
                        <div class="d-flex flex-row justify-content-between">
                            <div class="d-flex flex-column gap-2">
                                <div class="d-flex flex-row gap-2 align-items-center">
                                    <i class="rtmicon rtmicon-location fw-bold"></i>
                                    <span>{prop['location']}</span>
                                </div>
                                <h4>{prop['title']}</h4>
                            </div>
                            <h4>€{prop['price']}</h4>
                        </div>
                    </div>
                </a>
            </div>
        </div>
        """

        # Generate the small tab button
        tabs_html += f"""
        <div class="tab {active_class}" data-tab="{tab_id}">
            <div class="position-relative overflow-hidden">
                <img src="{prop['main_image']}" class="img-fluid w-100 h-100" style="aspect-ratio: 3/2;" alt="{prop['title']}">
            </div>
        </div>
        """

    return f"""
    <div class="tab-content">
        {tab_content_html}
    </div>
    <div class="tabs">
        {tabs_html}
    </div>
    """

def build_properties():
    print("\nStarting property generation...")
    if not os.path.exists(PROPERTIES_OUTPUT_DIR):
        os.makedirs(PROPERTIES_OUTPUT_DIR)
    
    try:
        with open(PROPERTY_TEMPLATE_PATH, 'r', encoding='utf-8') as f:
            prop_template = f.read()
        with open(PROPERTIES_LISTING_PAGE, 'r', encoding='utf-8') as f:
            prop_listing_template = f.read()
        with open(HOME_PAGE, 'r', encoding='utf-8') as f:
            home_template = f.read()
    except FileNotFoundError as e:
        print(f"Error: Missing template file: {e.filename}")
        print("Property generation skipped.")
        return

    properties = []
    # Check if PROPERTIES_DIR exists
    if not os.path.isdir(PROPERTIES_DIR):
        print(f"Warning: Directory '{PROPERTIES_DIR}' not found. No properties will be generated.")
    else:
        for filename in os.listdir(PROPERTIES_DIR):
            if filename.endswith(".md"):
                filepath = os.path.join(PROPERTIES_DIR, filename)
                with open(filepath, 'r', encoding='utf-8') as f:
                    content = f.read()
                    parts = content.split('---')
                    if len(parts) >= 3:
                        front_matter = yaml.safe_load(parts[1])
                        md_content = "---".join(parts[2:])
                        html_description = markdown2.markdown(md_content)

                        prop_data = front_matter
                        prop_data['description'] = html_description
                        prop_data['slug'] = front_matter.get('slug', os.path.splitext(filename)[0])
                        properties.append(prop_data)

                        # Generate individual property page
                        page_html = prop_template.replace("{{PROPERTY_TITLE}}", str(prop_data.get('title', '')))
                        page_html = page_html.replace("{{PROPERTY_LOCATION}}", str(prop_data.get('location', '')))
                        page_html = page_html.replace("{{BANNER_IMAGE}}", str(prop_data.get('banner_image', '')))
                        page_html = page_html.replace("{{MAIN_IMAGE}}", str(prop_data.get('main_image', '')))
                        page_html = page_html.replace("{{DESCRIPTION}}", prop_data['description'])
                        page_html = page_html.replace("{{BEDROOMS}}", str(prop_data.get('bedrooms', '')))
                        page_html = page_html.replace("{{BATHROOMS}}", str(prop_data.get('bathrooms', '')))
                        page_html = page_html.replace("{{AREA}}", str(prop_data.get('area', '')))
                        page_html = page_html.replace("{{FLOORS}}", str(prop_data.get('floors', '')))

                        # Generate gallery
                        gallery_html = '<div class="d-flex flex-column gap-4">' + ''.join([f'<img src="../{img}" class="img-fluid rounded-2 h-100" alt="{prop_data.get("title", "")}">' for img in prop_data.get("gallery", [])]) + '</div>'
                        page_html = page_html.replace("<!-- GALLERY_IMAGES_HERE -->", gallery_html)

                        # Generate features
                        features_html = ''.join([f'<div class="d-flex flex-row align-items-center font-2 gap-3"><i class="rtmicon rtmicon-arrow-up-right fs-5"></i><span class="text-color-2">{feat}</span></div>' for feat in prop_data.get("features", [])])
                        page_html = page_html.replace("<!-- ADDITIONAL_FEATURES_HERE -->", features_html)

                        output_path = os.path.join(PROPERTIES_OUTPUT_DIR, f"{prop_data['slug']}.html")
                        with open(output_path, 'w', encoding='utf-8') as out_f:
                            out_f.write(page_html)

    # Update properties.html with all properties
    all_properties_html = "\n".join([generate_property_card(p) for p in properties])
    final_listing_html = prop_listing_template.replace(PROPERTIES_PLACEHOLDER, all_properties_html)
    with open(PROPERTIES_LISTING_PAGE, 'w', encoding='utf-8') as f:
        f.write(final_listing_html)
    print(f"-> Built {len(properties)} property pages and updated {PROPERTIES_LISTING_PAGE}")

    # Update index.html with featured properties
    featured_properties = [p for p in properties if p.get('featured')]
    if featured_properties:
        # This is a simplified implementation for the homepage tab system.
        # It will only show the first featured property.
        # A full implementation would require JS changes.
        featured_html = generate_featured_property_tabs(featured_properties)
        final_home_html = home_template.replace(FEATURED_PROPERTIES_PLACEHOLDER, featured_html)
        with open(HOME_PAGE, 'w', encoding='utf-8') as f:
            f.write(final_home_html)
        print(f"-> Updated {HOME_PAGE} with {len(featured_properties)} featured properties.")

def main():
    """Main function to run all build steps."""
    # Check if content directories exist
    if not os.path.isdir(POSTS_DIR):
        print(f"Warning: Directory '{POSTS_DIR}' not found. Blog generation will be skipped.")
    else:
        build_blog()

    build_blog()
    build_properties()
    print("\nSite build complete!")

if __name__ == "__main__":
    main()