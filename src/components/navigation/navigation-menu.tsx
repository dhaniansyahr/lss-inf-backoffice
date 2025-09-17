"use client";

import { motion } from "motion/react";
import { NavigationItem } from "./navigation-item";
import { SidebarGroup, SidebarGroupContent } from "@/components/ui/sidebar";
import { IMenuItem } from "@/types/common";

interface NavigationMenuProps {
    items: IMenuItem[];
}

export function NavigationMenu({ items }: NavigationMenuProps) {
    return (
        <SidebarGroup>
            <SidebarGroupContent>
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, staggerChildren: 0.1 }}
                    className="space-y-1"
                >
                    {items.map((item, index) => (
                        <motion.div
                            key={`${item.label}-${index}`}
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.3, delay: index * 0.1 }}
                        >
                            <NavigationItem item={item} />
                        </motion.div>
                    ))}
                </motion.div>
            </SidebarGroupContent>
        </SidebarGroup>
    );
}
