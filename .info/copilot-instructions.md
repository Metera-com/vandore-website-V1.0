# Rofaria Real Estate Template – AI Coding Agent Instructions

## Project Overview
This is a static HTML/CSS/JS template for real estate websites (version 1.0.3). It features multiple pages, modular JavaScript, custom styling, and PHP-based form handling. The codebase is optimized for rapid static site deployment and customization.

## Architecture & Structure
- **Pages**: Each `.html` file is a standalone page (e.g., `index.html`, `properties.html`, `property_details.html`, `about.html`, `blog.html`, `contact.html`, `404.html`). All share a consistent header/footer and layout conventions.
- **CSS**: Main styles in `css/style.css` (21 organized sections with table of contents). Third-party/vendor CSS in `css/vendor/` (Bootstrap, FontAwesome, Swiper, custom fonts).
- **JavaScript**: Modular, jQuery-based scripts in `js/`:
  - `script.js`: Core UI (nav, scroll, tabs, filtering)
  - `submit-form.js`: Form validation & AJAX
  - `swiper-script.js`: Carousel/slider with responsive breakpoints
  - `masonry.js`: Grid layout using Isotope
  - `share.js`: Social sharing
  - `video_embedded.js`: Video handling
- **Images**: All in `image/` (logos: `logo.png`, `logo-footer.png`).
- **Fonts**: In `font/` and loaded via CSS imports.
- **Forms**: All forms post to `php/form_process.php` (expects `action` param for routing: `subscribe`, `appointment`, or default contact).

## Key Conventions & Patterns
- **CSS Custom Properties**: Global variables in `:root`:
```css
:root {
  --primary: #FFFFFF;
  --accent-color: #04383F;
  --font-1: "Plus Jakarta Sans", sans-serif;
  --font-2: "Open Sans", sans-serif;
}
```
- **Class Naming**: Utility classes for:
  - Color: `accent-primary`, `bg-accent-primary`, `black-1`
  - Layout: Bootstrap grid/flex (`row-cols-xl-2`, `d-flex`)
  - Icons: `rtmicon`, `fa-solid`
  - Animations: `scrollanimation animated fadeIn adr-7`
- **Component Patterns**:
  - Cards: `card d-flex flex-column gap-4`
  - Sections: `section bg-attach-cover`
  - Forms: `needs-validation` with Bootstrap validation
- **Responsive Design**: Uses Bootstrap breakpoints with custom modifiers (`-xl-`, `-md-`)
- **Custom Animations**: 
  - Scroll effects: `scrollanimation` with delay classes
  - Header glass effect: `glass-effect` class on scroll
  - Custom keyframes for background and ripple effects

## Developer Workflow
- **Edit CSS**: Use `css/style.css` for custom styles. Never modify vendor CSS.
- **Add Pages**: Copy existing `.html`, update content, maintain consistent header/footer.
- **Add JS**: Place in `js/`, follow jQuery patterns, preserve module structure.
- **New Components**: Follow existing patterns:
```html
<div class="card d-flex flex-column gap-4">
  <img src="image/property.jpg" class="img-fluid" style="aspect-ratio: 5/3">
  <div class="d-flex flex-column gap-2">
    <!-- Component content -->
  </div>
</div>
```
- **Forms**: Use Bootstrap validation, update form processor for new types:
```html
<form class="needs-validation" novalidate action="php/form_process.php">
  <input type="hidden" name="action" value="contact">
  <!-- Form fields -->
</form>
```

## Integration & External Dependencies
- **Bootstrap v5**: Core layout system and components
- **jQuery**: Required for all interactive features
- **Swiper**: Responsive carousels with configurable breakpoints
- **Isotope**: Masonry grid and filtering
- **FontAwesome & RTM Icons**: Comprehensive icon system
- **Custom Fonts**: Plus Jakarta Sans (headings), Open Sans (body)

## Performance Considerations
- No build step or bundling - all assets served statically
- Use appropriate image aspect ratios (defined inline)
- Follow lazy loading patterns where implemented
- Minimize custom event listeners in JS
- Leverage browser caching through proper asset organization

## Brand & Design Guidelines
- Typography: Open Sans for body text, Plus Jakarta Sans for headings
- Colors: Define new colors in `:root` CSS variables
- Logos: `logo.png` (header), `logo-footer.png` (footer)
- Components maintain consistent padding/spacing using Bootstrap utilities

---
**For AI agents:**
- Always use existing patterns - check similar components in codebase
- Never modify vendor files - extend with custom CSS/JS
- Use relative paths from HTML files for assets
- Follow established naming conventions for new features
- Preserve responsive design patterns across breakpoints
- Maintain jQuery-based interaction patterns
- Use appropriate image sizes and aspect ratios
