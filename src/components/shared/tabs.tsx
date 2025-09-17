"use client";

import { AnimatePresence, motion } from "motion/react";
import { cn } from "@/lib/utils";

export interface TabItem {
    label: string;
    value: string;
}

interface ITabsProps {
    tabs: TabItem[];
    value: string;
    onChange: (value: string) => void;
    className?: string;
    variant?: "default" | "underline";
}

export default function Tabs({
    tabs,
    value,
    onChange,
    className,
    variant = "default",
}: ITabsProps) {
    if (variant === "underline") {
        return (
            <div className={cn("flex items-center space-x-1", className)}>
                {tabs.map((tab) => {
                    const isActive = value === tab.value;
                    return (
                        <motion.button
                            key={tab.value}
                            className={cn(
                                "relative px-4 py-2 text-sm font-medium transition-colors duration-200",
                                "select-none cursor-pointer",
                                isActive
                                    ? "text-primary"
                                    : "text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-gray-100"
                            )}
                            onClick={() => onChange(tab.value)}
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                        >
                            {tab.label}
                            {isActive && (
                                <motion.div
                                    className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary"
                                    layoutId="activeTab"
                                    initial={false}
                                    transition={{
                                        type: "spring",
                                        stiffness: 300,
                                        damping: 30,
                                    }}
                                />
                            )}
                        </motion.button>
                    );
                })}
            </div>
        );
    }

    return (
        <div className="rounded-full bg-inherit border border-primary p-1 flex items-center gap-1 md:gap-2 w-fit relative">
            {tabs.map((tab, index) => (
                <motion.button
                    key={tab.value}
                    onClick={() => onChange(tab.value)}
                    className={cn(
                        "relative py-2 px-6 rounded-full text-sm font-medium transition-colors duration-300 ease-out z-10",
                        value === tab.value
                            ? "text-white"
                            : "text-primary hover:text-primary/80",
                        className
                    )}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{
                        duration: 0.3,
                        delay: index * 0.1,
                        ease: "easeOut",
                    }}
                    whileHover={{
                        scale: 1.02,
                        transition: { duration: 0.2 },
                    }}
                    whileTap={{
                        scale: 0.98,
                        transition: { duration: 0.1 },
                    }}
                >
                    {/* Animated background for active tab */}
                    <AnimatePresence>
                        {value === tab.value && (
                            <motion.div
                                className="absolute inset-0 bg-primary rounded-full"
                                layoutId="activeTab"
                                initial={{ opacity: 0, scale: 0.8 }}
                                animate={{
                                    opacity: 1,
                                    scale: 1,
                                }}
                                exit={{
                                    opacity: 0,
                                    scale: 0.8,
                                }}
                                transition={{
                                    type: "spring",
                                    stiffness: 500,
                                    damping: 30,
                                    duration: 0.3,
                                }}
                            />
                        )}
                    </AnimatePresence>

                    {/* Tab text with animation */}
                    <motion.span
                        className="relative z-10"
                        animate={{
                            scale: value === tab.value ? 1.05 : 1,
                        }}
                        transition={{
                            type: "spring",
                            stiffness: 400,
                            damping: 25,
                            duration: 0.2,
                        }}
                    >
                        {tab.label}
                    </motion.span>
                </motion.button>
            ))}

            {/* Background glow effect for active tab */}
            <AnimatePresence>
                {value && (
                    <motion.div
                        className="absolute inset-0 rounded-full bg-inherit"
                        initial={{ opacity: 0, scale: 0.5 }}
                        animate={{ opacity: 1, scale: 1.1 }}
                        exit={{ opacity: 0, scale: 0.5 }}
                        transition={{
                            duration: 0.4,
                            ease: "easeOut",
                        }}
                    />
                )}
            </AnimatePresence>
        </div>
    );
}
