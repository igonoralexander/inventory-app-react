# Inventory Management Application Blueprint

## Overview

This document outlines the design and development plan for a professional business inventory application. The goal is to create a modern, minimal, and premium SaaS dashboard experience for mobile devices, focusing on usability, readability, and fast navigation for shop owners.

---

## Overall Style

*   **Aesthetic:** Modern, minimal, premium SaaS dashboard.
*   **Corners:** Soft rounded corners throughout the interface.
*   **Layout:** Spacious with generous white space.
*   **Spacing:** 8-point spacing system.
*   **Typography:** Clean with a clear visual hierarchy.
*   **Inspiration:** Material Design 3 / Apple Human Interface.
*   **Shadows:** Smooth shadows with subtle elevation.
*   **Responsiveness:** Fully responsive for all mobile devices.

---

## Color Palette

*   **Primary Blue:** `#2563EB`
*   **Success Green:** `#16A34A`
*   **Accent Orange:** `#F97316`
*   **Background:** `#F8F9FB`
*   **Cards:** `White (#FFFFFF)`
*   **Primary Text:** `#111827`
*   **Secondary Text:** `#6B7280`
*   **Border:** `#E5E7EB`

**Usage:** Blue is the dominant brand color. Green is for stock and success indicators. Orange is reserved for highlights, notifications, and call-to-action buttons.

---

## Screen Margins & Layout

*   **Horizontal Padding:** 20px on left and right.
*   **Top Spacing:** 16px after the status bar.
*   **Bottom Safe Area:** 20px.
*   **Alignment:** Consistent alignment across all sections.

---

## Key Components & Screens

### Status Bar & Header

*   **Safe Area:** Respect the device's native safe area for the status bar.
*   **Header Section:** Below the status bar, include:
    *   A full-width rounded search field (56px height, 18px radius) with placeholder: "Search products, invoices, suppliers..."
    *   Notification bell icon.
    *   Filter button.
    *   User avatar.

### Dashboard

*   **Dashboard Summary Card:**
    *   Replace the advertisement banner with a summary card.
    *   **Height:** ~170px.
    *   **Background:** Blue gradient with subtle abstract shapes.
    *   **Content:**
        *   "Good Morning, Phoenix 👋"
        *   "Total Inventory Value"
        *   "₦12,580,000"
        *   Small analytics graph for "This Month Sales" with "+18%" change.
    *   **Actions:** Quick action buttons for "Add Product" and "Record Sale".

*   **Quick Actions:**
    *   A grid of rounded square action cards (18px radius, white background, soft shadow).
    *   **Actions:** 📦 Products, 🛒 Sales, 🚚 Purchases, 👥 Suppliers, 📊 Reports, 📈 Analytics, 💰 Expenses, ⚙ Settings.
    *   Each card includes a colored icon and a small label.

*   **Inventory Section:**
    *   **Title:** "Inventory" with a "See All" link.
    *   **Layout:** Two-column grid of product cards.
    *   **Product Card:**
        *   Product Image.
        *   Product Name, SKU, Quantity, Selling Price.
        *   Stock Status Badge: "In Stock" (Green), "Low Stock" (Orange), "Out of Stock" (Red).
        *   Rounded corners, soft shadows, and balanced spacing.

### Floating Action Button (FAB)

*   **Position:** Bottom right corner.
*   **Style:** Blue circular FAB with a white "+" icon.
*   **Action:** Add new products.

### Bottom Navigation

*   **Height:** 72px.
*   **Style:** White background with rounded top corners (24px).
*   **Icons:** 🏠 Dashboard, 📦 Products, 💳 Sales, 📊 Reports, 👤 Profile.
*   **Active Tab:** Blue icon and label.
*   **Inactive Tabs:** Gray icons.

---

## Design Rules & Principles

*   Use consistent 20px horizontal margins.
*   Use 16–24px vertical spacing between sections.
*   Use rounded corners (16–24px) for all cards and buttons.
*   Use subtle shadows for depth.
*   Avoid clutter and maintain a clean, professional appearance.
*   Prioritize usability and fast navigation for the target user (shop owners).
*   The final design should feel like a polished mobile business application, combining the visual quality of modern fintech apps with the practicality of inventory management software.
