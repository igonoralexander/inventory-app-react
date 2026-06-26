# AI Development Blueprint: Inventory Management System

This document outlines the design principles and development guidelines for the AI agent to follow while working on the Inventory Management System application. The goal is to evolve the existing application into a premium, modern SaaS ERP experience, envisioning a 2026 release.

---

## Core Directive

We are editing an existing Inventory Management System.

- Do **NOT** redesign the application or change its functionality.
- Do **NOT** change the page content, labels, business logic, or workflow unless explicitly instructed.
- Your task is **only** to improve the visual design, user experience, layout, responsiveness, spacing, hierarchy, accessibility, and interactions using modern 2026 UI/UX principles.
- Apply the following improvements consistently across every screen.

---

## VISUAL DESIGN

- **Appearance**: Maintain a clean, premium business appearance.
- **Whitespace**: Use generous whitespace.
- **Hierarchy**: Improve alignment and visual hierarchy.
- **Consistency**: Increase consistency between all components.
- **Spacing**: Use an 8-point spacing system.
- **Layout**: Keep content centered within a maximum content width on desktop instead of stretching edge-to-edge.
- **Responsiveness**: Use responsive layouts for desktop, tablet, and mobile.

## CARDS

Improve every card by using:

- **Corners**: Rounded corners (16–20px).
- **Shadows**: Soft shadows.
- **Borders**: Thin subtle borders.
- **Padding**: Comfortable internal padding.
- **Spacing**: Equal spacing between cards.
- **Interactivity**: Hover effects on desktop.
- **Animation**: Smooth elevation animations.

## BUTTONS

Modernize all buttons.

- **Appearance**: Rounded corners, better spacing, consistent heights.
- **Features**: Icon support, loading states, disabled states.
- **Interactivity**: Hover animations, ripple effect.
- **Emphasis**: Primary buttons should stand out without becoming visually heavy.

## TEXT FIELDS

Improve every input field.

- **Appearance**: Rounded corners, better padding, leading icons where appropriate.
- **UX**: Floating labels, clear validation states (error/success), better focus indicators.

## TYPOGRAPHY

Improve typography hierarchy.

- **Style**: Use consistent font weights.
- **Hierarchy**: Large page titles, readable section titles, comfortable body text.
- **Spacing**: Improve line height and spacing between text blocks.

## COLORS

- **Palette**: Maintain the existing application colors.
- **Usage**: Improve contrast and accessibility. Use color consistently.
  - **Blue**: Primary
  - **Green**: Positive
  - **Orange**: Warning
  - **Red**: Critical
  - **Gray**: Secondary information
- **Simplicity**: Avoid excessive color usage.

## ICONS

- **Style**: Use modern outlined icons.
- **Implementation**: Maintain consistent icon sizes and align icons properly with text.

## TABLES

Modernize all tables.

- **Features**: Sticky headers, rounded containers, column sorting indicators, search, filters, pagination.
- **UX**: Better row spacing, hover highlighting, responsive behaviour.

## SEARCH & FILTERS

- **Search Bars**: Rounded, leading search icon, clear button, placeholder text, sticky position when appropriate.
- **Filters**: Modern filter chips, dropdown filters, active filter indicators, smooth animations.

## LISTS & BADGES

- **Lists**: Improve list items with better spacing, hover states, and swipe gestures on mobile where appropriate.
- **Badges**: Improve status badges with rounded pills, subtle background colors, small icons, and consistent sizing.

## NAVIGATION

- **Desktop**: Balanced, collapsible sidebar with active indicators.
- **Mobile**: Bottom navigation that is always visible.
- **Tablet**: Adaptive navigation.
- **Transitions**: Smooth transitions between pages.

## ANIMATIONS & LOADING

- **Animations**: Use subtle animations only (fade in, slide in, button ripple, card elevation, smooth transitions). Do not overuse.
- **Loading States**: Every data screen should have loading skeletons, an empty state, an error state, and a retry button.

## RESPONSIVENESS

- **Desktop**: Maximum content width, centered layout, consistent margins.
- **Tablet**: Adaptive spacing.
- **Mobile**: Comfortable touch targets, no horizontal scrolling.

## ACCESSIBILITY & MICROINTERACTIONS

- **Accessibility**: Improve with large touch targets, keyboard navigation, screen reader labels, proper contrast, and visible focus states.
- **Microinteractions**: Add subtle feedback (button feedback, card hover, success animations, toast notifications, loading indicators, confirmation dialogs).

---

## Recent Changes

### Header Refresh Button

*   **Refresh Button:**
    *   Added a refresh icon button to the main header.
    *   This provides a way to reload the application, which is essential for environments where a browser refresh is not available (e.g., mobile or desktop apps).
    *   The button is placed before the user avatar and logout button for easy access.

### Products Page Redesign

**Objective:** Redesign the existing Products page to create a clean, modern, premium SaaS interface similar to industry-leading applications like Linear and Stripe. The focus is on improving the visual design and user experience while maintaining all existing functionality.

**Implementation Details:**

*   **Overall Layout:**
    *   Page background set to a light gray (`#F8FAFC`).
    *   Horizontal page padding of `20px`.
    *   Consistent `16px` spacing between major elements.

*   **Header:**
    *   Primary title: "Products".
    *   Subtitle: "Manage and track all your inventory items."
    *   Action items on the right: Search icon, a "Filter" button, and a primary "Add Product" button.

*   **Search & Filtering:**
    *   A prominent search bar with the placeholder "Search by product name, SKU...".
    *   Controls for sorting and toggling between Grid and List views.

*   **Product Cards (Grid View):**
    *   **Responsiveness:** 3 cards per row on desktop, 2 on tablet, and 1 on mobile.
    *   **Styling:** White background, rounded corners (`16px`), and soft shadows for a "lifted" look.
    *   **Content:**
        *   **Avatar:** Circular avatar in the top-left. Displays the product image if available; otherwise, generates an avatar from the product name's initials with a soft pastel background.
        *   **Details:** Product Name, Category, and SKU.
        *   **Actions:** A three-dot overflow menu in the top-right corner for actions like Edit or Delete.
        *   **Stock Status Bar:** A full-width bar at the bottom of the card indicating stock status:
            *   **Labels:** "🟢 In Stock", "🟡 Low Stock", "🔴 Out of Stock".
            *   **Colors:** Subtle green, orange, or red tinted backgrounds.
            *   **Quantity:** Displays the exact quantity (e.g., "Qty: 45").

*   **Pagination:**
    *   A modern pagination control is centered at the bottom of the page to navigate through product lists.

*   **Back Button:**
    *   Added a back button to the `Products` and `ProductList` pages to allow users to navigate back to the previous page.

*   **Bug Fixes:**
    *   Corrected an icon import error in both `Products` and `ProductList` pages.
    *   Corrected an icon import error in the `Login` page.

