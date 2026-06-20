# Inventory Management Application Blueprint

## Version 2.0: The Premium Desktop Refinement

This document outlines the design and development plan for a professional business inventory application. The goal is to create a modern, minimal, and premium SaaS dashboard experience that feels like a native application on all devices.

---

## Layout Philosophy: Centered & Focused

The application avoids a traditional, full-width layout. Instead, it is presented as a centered, fixed-width application shell on desktop, creating a focused, elegant, and app-like experience. The browser chrome simply frames the application.

### Page Background

*   **Color:** A subtle, light gray (`#F3F4F6`) provides a neutral backdrop that adds depth and helps the application shell stand out without needing harsh borders.

### Parent Application Container

*   **Layout:** Centered horizontally with `margin: 0 auto`.
*   **Max Width:** `1280px`.
*   **Appearance:**
    *   **Background:** Clean white (`#FFFFFF`) or a very light off-white (`#F8F9FB`) for the content area.
    *   **Border Radius:** `24px`.
    *   **Shadow:** A soft, multi-layered shadow to lift the application off the page.
    *   **Borders:** No visible borders or dark outlines.
*   **Scrolling:** Scrollbars are hidden to maintain a clean, native-app feel.

---

## Navigation Strategy: Mobile First, Desktop Polished

The application utilizes a single, consistent navigation pattern across all devices. The floating bottom navigation is the primary method for moving between the main sections of the app.

### Primary Navigation (Bottom)

*   **Component:** `BottomNavigation`
*   **Visibility:** Persistently visible on both mobile and desktop.
*   **Desktop Appearance:**
    *   **Position:** Floats inside the application shell, fixed to the bottom center.
    *   **Width:** Approximately `700px`.
    *   **Height:** `72px`.
    *   **Styling:** White background, `24px` radius, and a soft shadow.

### Secondary Panel (Left Sidebar)

*   **Purpose:** The sidebar is no longer for primary navigation. It serves as a static panel for branding, user account management, workspace switching, and quick actions/shortcuts.
*   **Width:** `240px`.
*   **Gap:** `32px` spacing between the sidebar and the main content.
*   **Alignment:** All items (logo, user info, logout) are perfectly aligned to a single vertical grid with consistent height (`56px`) and padding for a balanced feel.

---

## Content & Interaction

### Main Content Area

*   **Width:** `~900-960px`.
*   **Layout:** All content sections (Search, Cards, Lists) align to the same left edge and share a consistent width.
*   **Spacing:** Generous whitespace is used to reduce clutter and improve readability.

### Floating Action Button (FAB)

*   **Position:** The `+` button is placed `24px` above the floating bottom navigation and `24px` from the right edge of the main content area, ensuring it never overlaps.

### Spacing System (8-Point Grid)

*   **Container Padding:** `24px`.
*   **Section Gaps:** `24px`.
*   **Card Spacing:** `20px`.
*   **Card Padding:** `16px`.
*   **Border Radius:** `16px-24px` for a soft, modern look.
