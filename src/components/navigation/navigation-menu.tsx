"use client";

import { motion } from "motion/react";
import { NavigationItem } from "./navigation-item";
import { SidebarGroup, SidebarGroupContent } from "@/components/ui/sidebar";
import { IMenuItem } from "@/types/common";

import { Skeleton } from "../ui/skeleton";
import { useHomeRoute } from "@/hooks/use-home-route";

interface NavigationMenuProps {
    items: IMenuItem[];
}

export function NavigationMenu({ items }: NavigationMenuProps) {
    const { getAvailableMenuItems, isLoading } = useHomeRoute();

    const availableItems = getAvailableMenuItems(items);

    return (
        <SidebarGroup>
            <SidebarGroupContent>
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, staggerChildren: 0.1 }}
                    className="space-y-1"
                >
                    {isLoading
                        ? items?.map((item) => (
                              <Skeleton
                                  key={item.label}
                                  className="w-full h-5"
                              />
                          ))
                        : availableItems.map((item, index) => (
                              <motion.div
                                  key={`${item.label}-${index}`}
                                  initial={{ opacity: 0, x: -20 }}
                                  animate={{ opacity: 1, x: 0 }}
                                  transition={{
                                      duration: 0.3,
                                      delay: index * 0.1,
                                  }}
                              >
                                  <NavigationItem item={item} />
                              </motion.div>
                          ))}
                </motion.div>
            </SidebarGroupContent>
        </SidebarGroup>
    );
}
