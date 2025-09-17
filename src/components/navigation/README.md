# Navigation Components

This directory contains the navigation components for the application sidebar with Framer Motion animations.

## Components

### NavigationItem

The main component for rendering individual navigation items with support for:

-   Simple links
-   Headers with sub-items
-   Separators
-   Collapsible submenus
-   Active state management
-   Tooltips for collapsed sidebar
-   Smooth animations

### NavigationMenu

Container component that renders a list of navigation items with staggered animations.

### NavigationProvider

Context provider for managing active navigation state across the application.

## Features

-   **Framer Motion Animations**: Smooth entrance, hover, and transition animations
-   **Responsive Design**: Adapts to sidebar collapsed/expanded states
-   **Active State Management**: Tracks and highlights the current active page
-   **Icon Support**: Uses Iconify for consistent icon rendering
-   **Accessibility**: Proper ARIA labels and keyboard navigation
-   **Type Safety**: Full TypeScript support with proper interfaces

## Usage

```tsx
import { NavigationMenu, NavigationProvider } from "@/components/navigation";
import { NavigationItem } from "@/constants/navigation";

function AppSidebar() {
    return (
        <NavigationProvider>
            <Sidebar>
                <SidebarContent>
                    <NavigationMenu items={NavigationItem} />
                </SidebarContent>
            </Sidebar>
        </NavigationProvider>
    );
}
```

## Animation Details

-   **Entrance**: Items slide in from the left with staggered timing
-   **Hover**: Icons scale and rotate slightly on hover
-   **Submenu**: Smooth height transitions with opacity changes
-   **Collapse**: Items adapt to sidebar state with proper hiding/showing
