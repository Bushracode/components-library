# Components Library

A reusable UI components library built with HTML5 and CSS3. This collection contains well-documented, production-ready components for rapid web development.

## Overview

The Components Library is a curated collection of commonly used UI components with modern styling and responsive design. Perfect for quick prototyping and consistent design across projects.

## Tech Stack

| Category | Technology |
|----------|-----------|
| **Markup** | HTML5 |
| **Styling** | CSS3 |
| **Animation** | CSS Transitions & Animations |
| **Deployment** | Vercel |
| **Documentation** | Interactive Demo |

## Features

- 🎨 Pre-built, reusable components
- 📱 Fully responsive design
- ⚡ Lightweight and performant
- 🎯 Copy-paste ready code
- 📚 Interactive component showcase
- 🌈 Modern color schemes
- ♿ Semantic HTML for accessibility

## Components Included

### Basic Elements
- Buttons (variants: primary, secondary, danger, success)
- Input Fields (text, email, password, textarea)
- Labels & Form Groups
- Cards & Containers
- Typography Elements

### Complex Components
- Navigation Bar
- Hero Section
- Feature Grid
- Testimonials
- Footer
- Modal/Dialog
- Tabs
- Accordion
- Alerts & Notifications

## Getting Started

### Installation

```bash
git clone https://github.com/Bushracode/components-library.git
cd components-library
```

### Using Components

1. Copy the desired component's HTML and CSS
2. Paste into your project
3. Customize colors and spacing as needed
4. Add interactivity with JavaScript if required

### Example Usage

```html
<!-- Button Component -->
<button class="btn btn-primary">Click Me</button>

<!-- Card Component -->
<div class="card">
  <h3>Card Title</h3>
  <p>Card content goes here</p>
</div>
```

## Customization

### Colors

Components use CSS variables for easy theming:

```css
:root {
  --primary-color: #2D4F3E;
  --secondary-color: #DEDBD2;
  --text-color: #1A1A1A;
  --border-color: #E0E0E0;
}
```

### Sizing

All components are responsive and use relative units (rem, %, em) for flexible scaling.

## Live Demo

View all components: [Components Library Demo](https://components-library-hazel.vercel.app)

## Project Structure

```
components-library/
├── index.html          # Demo/showcase page
├── styles/
│   ├── main.css        # Global styles
│   ├── components.css  # Component styles
│   └── variables.css   # CSS variables
├── assets/             # Images and icons
└── README.md
```

## Browser Support

- Chrome 90+
- Firefox 88+
- Safari 14+
- Edge 90+

## Accessibility

All components are built with accessibility in mind:
- Proper semantic HTML
- ARIA labels where needed
- Keyboard navigation support
- Color contrast compliance
- Screen reader friendly

## Performance

- Minimal CSS (only what's needed)
- No external dependencies
- Optimized animations (using transform & opacity)
- Fast load times

## Contributing

Feel free to extend this library with new components! Follow these guidelines:
1. Use the existing naming conventions
2. Ensure responsive design
3. Include CSS variables for theming
4. Test across browsers

## Future Enhancements

- [ ] Dark mode variants
- [ ] Animation library integration
- [ ] Icon set
- [ ] Form validation components
- [ ] Data table component
- [ ] Chart components

## License

MIT License - Feel free to use in your projects

---

**Built with ❤️ by Bushracode | Modern Web Components Made Simple**
