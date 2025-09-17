"use client";

import {
    Sidebar,
    SidebarContent,
    SidebarHeader,
    useSidebar,
} from "@/components/ui/sidebar";
import { NavigationMenu, NavigationProvider } from "@/components/navigation";
import { NavigationItem } from "@/constants/navigation";
import { motion } from "motion/react";
import Image from "next/image";

function SidebarHeaderContent() {
    const { state } = useSidebar();

    return (
        <SidebarHeader className="h-16 border-b flex items-center justify-center">
            <div className="flex items-center gap-3 h-full">
                <Image
                    src={"/app/logo.png"}
                    alt="logo"
                    width={32}
                    height={32}
                />
                <motion.h1
                    className="font-bold text-xl whitespace-nowrap"
                    animate={{
                        opacity: state === "collapsed" ? 0 : 1,
                        width: state === "collapsed" ? 0 : "auto",
                    }}
                    transition={{ duration: 0.2 }}
                    style={{ overflow: "hidden" }}
                >
                    LSS-INFORMATIKA
                </motion.h1>
            </div>
        </SidebarHeader>
    );
}

export default function AppSidebar() {
    return (
        <NavigationProvider>
            <Sidebar variant="sidebar" collapsible="icon">
                <SidebarHeaderContent />
                <SidebarContent>
                    <NavigationMenu items={NavigationItem} />
                </SidebarContent>
            </Sidebar>
        </NavigationProvider>
    );
}
