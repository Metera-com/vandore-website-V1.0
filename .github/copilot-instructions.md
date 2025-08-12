# Rofaria Real Estate Template - AI Coding Instructions

## Project Overview
This is a premium HTML template for real estate websites called "Rofaria" (version 1.0.3). It's a static website template with multiple pages, custom styling, and interactive JavaScript components.

## Architecture & Structure

### Core Pages
- `index.html` - Homepage with hero section, property listings, and features
- `properties.html` - Property grid/list view
- `property_details.html` - Individual property detail pages
- `about.html`, `team.html` - Company information pages
- `blog.html`, `single_blog.html` - Blog functionality
- `contact.html`, `service.html`, `faq.html`, `price_plan.html` - Additional pages
- `404.html` - Custom error page

### Asset Organization
- `css/style.css` - Main stylesheet (3875+ lines) with comprehensive table of contents
- `css/vendor/` - Third-party CSS (Bootstrap, FontAwesome, Swiper, custom fonts)
- `js/` - Custom JavaScript modules split by functionality
- `image/` - All images including logos (`logo.png`, `logo-footer.png`)
- `font/` - Custom fonts (Open Sans, Plus Jakarta Sans, RTM Icons, FontAwesome)
- `php/form_process.php` - Server-side form handling

## Design System & Conventions

### CSS Custom Properties (from `:root`)
```css
--primary: #F9F9F9;
--black-1: #000000;
--black: #2E2E2E;
--yellow: #E8B725;
--green-accent: #707733;
--blue: #1976E0;
--brown: #8D5533;
```

### Class Naming Patterns
- **Color classes**: `accent-primary`, `bg-accent-primary`, `bg-black-1`
- **Custom icons**: `rtmicon rtmicon-arrow-left`, `rtmicon rtmicon-arrow-up-right`
- **Layout**: Heavy use of Bootstrap flexbox (`d-flex flex-column gap-5`)
- **Animations**: `scrollanimation animated zoomIn` for scroll-triggered effects

### JavaScript Architecture
- **Modular approach**: Separate files for specific functionality
  - `script.js` - Core interactions (nav toggle, scroll effects, tabs)
  - `submit-form.js` - Form validation and AJAX submission
  - `swiper-script.js` - Carousel/slider functionality
  - `masonry.js` - Grid layout management
  - `share.js` - Social sharing features
- **jQuery-based**: All JavaScript uses jQuery syntax
- **Bootstrap integration**: Extensive use of Bootstrap components and utilities

## Key Development Patterns

### Form Handling
- Forms use `needs-validation` class for Bootstrap validation
- AJAX submission via `submit-form.js` with action-based routing
- PHP backend expects `action` parameter (`subscribe`, `appointment`, or default contact)
- Success/error feedback via Bootstrap toasts

### Animation System
- CSS keyframes for custom animations (`@keyframes load`, `background_animation`, `ripple`)
- Scroll-triggered animations using external library
- Glass effect on header scroll (`glass-effect` class)

### Component Patterns
- **Tabs**: Custom tab system with `.tab` and `.tab-content` structure
- **Marquee**: Auto-cloning content for infinite scroll effect
- **Icon boxes**: Clickable activation system with `.active` state
- **Offcanvas navigation**: Bootstrap offcanvas for mobile menu

## Development Workflow

### File Editing Guidelines
- **CSS changes**: Edit `css/style.css` - well-organized with table of contents
- **New pages**: Follow existing HTML structure with consistent header/footer
- **JavaScript**: Add new functionality to appropriate modular file or create new module
- **Images**: Place in `image/` directory, update references in HTML/CSS
- **Forms**: Modify `php/form_process.php` for new form types

### Asset Management
- **Fonts**: Custom fonts loaded via CSS imports from `css/vendor/`
- **Icons**: Mix of FontAwesome (`fa-solid fa-bars`) and custom RTM icons (`rtmicon`)
- **Vendor libraries**: Keep in `vendor/` subdirectories, import via CSS/JS

### Testing & Validation
- Test form submissions with PHP server
- Verify responsive design across breakpoints
- Check animation performance and scroll effects
- Validate Bootstrap component functionality

## Brand Integration Notes
- Logo files: `logo.png` (header), `logo-footer.png` (footer)
- Color scheme follows real estate industry standards (earth tones, professional blues)
- Typography: Open Sans for body text, Plus Jakarta Sans for headings
- Custom RTM icon font provides consistent iconography throughout
