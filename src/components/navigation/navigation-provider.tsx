"use client";

import { createContext, useContext, useState, ReactNode } from "react";
import { usePathname } from "next/navigation";

interface NavigationContextType {
    activePath: string;
    setActivePath: (path: string) => void;
}

const NavigationContext = createContext<NavigationContextType | undefined>(
    undefined
);

export function NavigationProvider({ children }: { children: ReactNode }) {
    const pathname = usePathname();
    const [activePath, setActivePath] = useState(pathname);

    return (
        <NavigationContext.Provider value={{ activePath, setActivePath }}>
            {children}
        </NavigationContext.Provider>
    );
}

export function useNavigation() {
    const context = useContext(NavigationContext);
    if (!context) {
        throw new Error(
            "useNavigation must be used within a NavigationProvider"
        );
    }
    return context;
}
