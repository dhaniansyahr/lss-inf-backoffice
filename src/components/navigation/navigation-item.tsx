"use client";

import { motion, AnimatePresence } from "motion/react";
import { useState } from "react";
import Link from "next/link";
import { ChevronRightIcon } from "lucide-react";
import { Icon } from "@iconify/react";
import { IMenuItem } from "@/types/common";
import {
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuSub,
    SidebarGroupLabel,
    useSidebar,
} from "@/components/ui/sidebar";
import { useNavigation } from "./navigation-provider";

interface NavigationItemProps {
    item: IMenuItem;
    isActive?: boolean;
    level?: number;
}

export function NavigationItem({
    item,
    isActive = false,
    level = 0,
}: NavigationItemProps) {
    const [isOpen, setIsOpen] = useState(false);
    const { state } = useSidebar();
    const { activePath, setActivePath } = useNavigation();

    const isItemActive = item.url ? activePath === item.url : isActive;

    const handleToggle = () => {
        if (item.items && item.items.length > 0) {
            setIsOpen(!isOpen);
        }
    };

    // Render header
    if (item.type === "HEADER") {
        return (
            <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: level * 0.1 }}
            >
                <SidebarGroupLabel className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                    {item.label}
                </SidebarGroupLabel>
            </motion.div>
        );
    }

    // Render link with submenu
    if (item.items && item.items.length > 0) {
        return (
            <SidebarMenu>
                <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.3, delay: level * 0.1 }}
                >
                    <SidebarMenuButton
                        onClick={handleToggle}
                        className="w-full justify-between"
                        isActive={isItemActive}
                        tooltip={state === "collapsed" ? item.label : undefined}
                    >
                        <div className="flex items-center gap-2">
                            {item.icon && (
                                <motion.div
                                    whileHover={{ scale: 1.1 }}
                                    transition={{ duration: 0.2 }}
                                >
                                    <Icon
                                        icon={item.icon}
                                        className="h-4 w-4"
                                    />
                                </motion.div>
                            )}
                            <span className="group-data-[collapsible=icon]:hidden">
                                {item.label}
                            </span>
                        </div>
                        <motion.div
                            animate={{ rotate: isOpen ? 90 : 0 }}
                            transition={{ duration: 0.2 }}
                            className="group-data-[collapsible=icon]:hidden"
                        >
                            <ChevronRightIcon className="h-4 w-4" />
                        </motion.div>
                    </SidebarMenuButton>
                </motion.div>

                <AnimatePresence>
                    {isOpen && state === "expanded" && (
                        <motion.div
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: "auto" }}
                            exit={{ opacity: 0, height: 0 }}
                            transition={{ duration: 0.3, ease: "easeInOut" }}
                        >
                            <SidebarMenuSub>
                                {item.items.map((subItem, index) => (
                                    <NavigationItem
                                        key={`${subItem.label}-${index}`}
                                        item={subItem}
                                        level={level + 1}
                                    />
                                ))}
                            </SidebarMenuSub>
                        </motion.div>
                    )}
                </AnimatePresence>
            </SidebarMenu>
        );
    }

    // Render simple link
    return (
        <SidebarMenu>
            <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.3, delay: level * 0.1 }}
                whileHover={{ x: 4 }}
            >
                <SidebarMenuButton
                    asChild
                    isActive={isItemActive}
                    tooltip={state === "collapsed" ? item.label : undefined}
                >
                    <Link
                        href={item.url || "#"}
                        className="flex items-center gap-2"
                        onClick={() => item.url && setActivePath(item.url)}
                    >
                        {item.icon && (
                            <motion.div
                                whileHover={{ scale: 1.1, rotate: 5 }}
                                transition={{ duration: 0.2 }}
                            >
                                <Icon icon={item.icon} className="h-4 w-4" />
                            </motion.div>
                        )}
                        <span className="group-data-[collapsible=icon]:hidden">
                            {item.label}
                        </span>
                    </Link>
                </SidebarMenuButton>
            </motion.div>
        </SidebarMenu>
    );
}
