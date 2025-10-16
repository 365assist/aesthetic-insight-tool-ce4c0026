# Shopify Store Styling Guide
## Matching Aesthetic ProTools Website Design

This guide will help you apply the same luxury aesthetic from your website to your Shopify store.

---

## 🎨 Color Palette

### Primary Colors
Apply these in **Shopify Admin → Online Store → Customize → Theme Settings → Colors**

- **Primary Brand Color**: `#5e1830` (Deep Burgundy)
  - Use for: Headers, primary buttons, links
  - HSL: `hsl(330, 60%, 25%)`

- **Accent Color**: `#b31d4f` (Bright Burgundy)  
  - Use for: Call-to-action buttons, highlights, hover states
  - HSL: `hsl(330, 80%, 35%)`

- **Background**: `#ffffff` (White)
- **Text**: `#341520` (Dark Brown-Burgundy)
  - HSL: `hsl(330, 15%, 15%)`

### Secondary Colors
- **Muted Background**: `#f5f0f2` (Light Rose)
  - HSL: `hsl(330, 10%, 95%)`
- **Secondary Text**: `#816878` (Muted Burgundy)
  - HSL: `hsl(330, 15%, 45%)`

### Dark Mode (Optional)
- **Dark Background**: `#1f1f1f`
- **Dark Primary**: `#4a2430`
- **Dark Card**: `#292929`

---

## 📝 Typography

### Fonts to Use
In **Shopify Admin → Online Store → Customize → Theme Settings → Typography**:

1. **Headings**: 
   - Font: **Playfair Display** (Serif)
   - Available in Google Fonts
   - Elegant, classic, luxury feel

2. **Body Text**:
   - Font: **Inter** (Sans-serif)
   - Available in Google Fonts
   - Clean, professional, readable

### Font Sizes (Recommended)
- Hero Headline: 48-64px
- Section Headings: 32-40px
- Product Titles: 24-28px
- Body Text: 16px
- Small Text: 14px

---

## 🎭 Custom CSS

Add this to **Shopify Admin → Online Store → Customize → Theme Settings → Custom CSS**:

```css
/* ===== Aesthetic ProTools Custom Styling ===== */

/* Import Fonts */
@import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;600;700&family=Inter:wght@300;400;500;600&display=swap');

/* Root Variables */
:root {
  --apt-primary: #5e1830;
  --apt-accent: #b31d4f;
  --apt-text: #341520;
  --apt-muted: #816878;
  --apt-bg: #ffffff;
  --apt-bg-muted: #f5f0f2;
  
  /* Luxury Gradients */
  --apt-gradient-primary: linear-gradient(135deg, #5e1830, #6b2d8f);
  --apt-gradient-hero: linear-gradient(135deg, #6b2451 0%, #5e1b40 50%, #6b2d8f 100%);
  
  /* Shadows */
  --apt-shadow-luxury: 0 25px 50px -12px rgba(94, 24, 48, 0.4);
  --apt-shadow-elegant: 0 10px 30px -10px rgba(94, 24, 48, 0.3);
  --apt-shadow-subtle: 0 4px 20px -4px rgba(94, 24, 48, 0.2);
  
  /* Typography */
  --font-heading: 'Playfair Display', serif;
  --font-body: 'Inter', sans-serif;
}

/* Apply Fonts */
h1, h2, h3, h4, h5, h6,
.h1, .h2, .h3, .h4, .h5, .h6 {
  font-family: var(--font-heading) !important;
  font-weight: 600;
}

body, p, span, a, button, input, select, textarea {
  font-family: var(--font-body) !important;
}

/* Primary Buttons */
.btn--primary,
.button--primary,
.shopify-payment-button__button--unbranded {
  background: var(--apt-gradient-primary) !important;
  color: white !important;
  border: none !important;
  box-shadow: var(--apt-shadow-elegant);
  transition: all 0.3s ease;
}

.btn--primary:hover,
.button--primary:hover {
  box-shadow: var(--apt-shadow-luxury);
  transform: translateY(-2px);
}

/* Product Cards */
.product-card,
.card {
  border-radius: 8px;
  box-shadow: var(--apt-shadow-subtle);
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
}

.product-card:hover,
.card:hover {
  box-shadow: var(--apt-shadow-elegant);
  transform: translateY(-4px);
}

/* Hero Section */
.hero,
.slideshow,
[class*="banner"] {
  background: var(--apt-gradient-hero);
}

/* Links */
a {
  color: var(--apt-primary);
  transition: color 0.3s ease;
}

a:hover {
  color: var(--apt-accent);
}

/* Headers */
.site-header {
  border-bottom: 1px solid rgba(94, 24, 48, 0.1);
}

/* Product Price */
.price {
  color: var(--apt-primary);
  font-weight: 600;
}

.price--on-sale {
  color: var(--apt-accent);
}

/* Footer */
.site-footer {
  background: var(--apt-bg-muted);
  border-top: 1px solid rgba(94, 24, 48, 0.1);
}

/* Badges */
.badge,
.product-badge {
  background: var(--apt-accent);
  color: white;
  border-radius: 4px;
  padding: 4px 8px;
}

/* Forms */
input[type="text"],
input[type="email"],
input[type="tel"],
textarea,
select {
  border: 1px solid rgba(94, 24, 48, 0.2);
  border-radius: 4px;
  transition: border-color 0.3s ease;
}

input:focus,
textarea:focus,
select:focus {
  border-color: var(--apt-primary);
  outline: none;
  box-shadow: 0 0 0 3px rgba(94, 24, 48, 0.1);
}

/* Add to Cart Button */
.product-form__submit {
  background: var(--apt-gradient-primary) !important;
  color: white !important;
  font-weight: 600;
  padding: 14px 32px;
  border-radius: 6px;
  box-shadow: var(--apt-shadow-elegant);
  transition: all 0.3s ease;
}

.product-form__submit:hover {
  box-shadow: var(--apt-shadow-luxury);
  transform: translateY(-2px);
}
```

---

## 🖼️ Logo & Branding

1. **Upload Logo**:
   - Go to **Shopify Admin → Online Store → Themes → Customize**
   - Click on **Header** section
   - Upload your logo (use the apt-logo.png from your website)

2. **Favicon**:
   - Settings → Files → Upload favicon
   - Use 512x512px version of your logo

---

## 🛍️ Product Page Setup

### Product Images
- Use high-quality images (minimum 2000px width)
- White or light grey background
- Multiple angles for each product
- Lifestyle shots showing equipment in use

### Product Descriptions
Match the format from your website:
```
**Key Benefits:**
• Professional-grade precision
• FDA-cleared technology
• Minimal downtime
• Versatile treatment options

**Specifications:**
• Treatment areas: Face, body, hands
• Session duration: 15-30 minutes
• Results: Visible after 1-2 sessions
• Maintenance: Annual service included
```

---

## 📱 Theme Recommendations

Best Shopify themes that support this aesthetic:
1. **Dawn** (Free) - Clean, customizable
2. **Prestige** (Paid) - Luxury-focused
3. **Impact** (Free) - Modern, bold
4. **Testament** (Paid) - Professional

---

## ✨ Additional Customizations

### Checkout Page
- Go to **Settings → Checkout**
- Customize colors to match brand
- Add logo
- Customize email templates with brand colors

### Navigation Menu
Create similar structure to website:
- Home
- Products / Shop
- About
- Training & Support
- Contact

### Homepage Sections
Replicate website structure:
1. Hero banner with gradient
2. Featured products
3. About section
4. Testimonials
5. Contact CTA

---

## 🔧 Implementation Checklist

- [ ] Apply color palette in theme settings
- [ ] Set typography (Playfair Display + Inter)
- [ ] Add custom CSS
- [ ] Upload logo and favicon
- [ ] Configure navigation menu
- [ ] Set up homepage sections
- [ ] Customize product pages
- [ ] Update checkout branding
- [ ] Test on mobile devices
- [ ] Review all pages for consistency

---

## 📞 Need Help?

If you need assistance implementing these changes:
1. Use the Developer Tools on the website for CSS testing
2. Reference the website's live styling as you build
3. Test changes in Shopify's theme preview before publishing

**Brand Colors Quick Reference:**
- Primary: `#5e1830`
- Accent: `#b31d4f`
- Text: `#341520`
