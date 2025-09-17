"use client";

import { motion } from "motion/react";
import { Settings, User, LogOut } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { useAuth } from "@/stores/auth";
import { service } from "@/services";
import { NavigationItem } from "@/constants/navigation";
import { usePathname } from "next/navigation";

const getTitle = (pathname: string) => {
    for (const section of NavigationItem) {
        if (section.items) {
            const findTitle = section.items.find(
                (item) => item.url === pathname
            );

            if (findTitle) {
                return `${section.label} / ${findTitle.label}`;
            }
        }
    }

    const findTitleWithoutSection = NavigationItem.flatMap(
        (section) => section.items || []
    ).find((item) => item.url === pathname);

    if (findTitleWithoutSection) {
        return findTitleWithoutSection.label;
    }

    return "Dashboard";
};

export default function AppHeader() {
    const pathname = usePathname();

    const { user } = useAuth();

    const getUserInitials = (email: string) => {
        return email
            .split("@")[0]
            .split(".")
            .map((part) => part.charAt(0).toUpperCase())
            .join("")
            .slice(0, 2);
    };

    const onLogout = () => {
        service.auth.logout();
    };

    return (
        <motion.header
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className="sticky top-0 z-50 w-full border-b bg-white backdrop-blur supports-[backdrop-filter]:bg-white"
        >
            <div className="flex h-16 items-center justify-between px-4">
                <div className="flex items-center gap-4">
                    <SidebarTrigger />
                    <div className="hidden md:flex items-center gap-2">
                        <h1 className="text-lg font-semibold">
                            {getTitle(pathname)}
                        </h1>
                    </div>
                </div>

                {/* Right Section */}
                <div className="flex items-center gap-2">
                    {/* Notifications */}
                    {/* <motion.div
                        initial={{ scale: 0.95, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        transition={{ duration: 0.3, delay: 0.2 }}
                    >
                        <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                                <Button
                                    variant="ghost"
                                    size="icon"
                                    className="relative h-9 w-9"
                                >
                                    <Bell className="h-4 w-4" />
                                    <Badge
                                        variant="destructive"
                                        className="absolute -top-1 -right-1 h-5 w-5 rounded-full p-0 text-xs flex items-center justify-center"
                                    >
                                        3
                                    </Badge>
                                </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end" className="w-80">
                                <DropdownMenuLabel>
                                    Notifications
                                </DropdownMenuLabel>
                                <DropdownMenuSeparator />
                                <DropdownMenuItem className="flex flex-col items-start gap-1 p-3">
                                    <div className="flex items-center gap-2 w-full">
                                        <div className="h-2 w-2 bg-blue-500 rounded-full" />
                                        <span className="text-sm font-medium">
                                            New message
                                        </span>
                                        <span className="text-xs text-muted-foreground ml-auto">
                                            2m ago
                                        </span>
                                    </div>
                                    <p className="text-xs text-muted-foreground">
                                        You have a new message from John Doe
                                    </p>
                                </DropdownMenuItem>
                                <DropdownMenuItem className="flex flex-col items-start gap-1 p-3">
                                    <div className="flex items-center gap-2 w-full">
                                        <div className="h-2 w-2 bg-green-500 rounded-full" />
                                        <span className="text-sm font-medium">
                                            System update
                                        </span>
                                        <span className="text-xs text-muted-foreground ml-auto">
                                            1h ago
                                        </span>
                                    </div>
                                    <p className="text-xs text-muted-foreground">
                                        System has been updated successfully
                                    </p>
                                </DropdownMenuItem>
                                <DropdownMenuSeparator />
                                <DropdownMenuItem className="text-center">
                                    View all notifications
                                </DropdownMenuItem>
                            </DropdownMenuContent>
                        </DropdownMenu>
                    </motion.div> */}

                    {/* Settings */}
                    {/* <motion.div
                        initial={{ scale: 0.95, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        transition={{ duration: 0.3, delay: 0.3 }}
                    >
                        <Button variant="ghost" size="icon" className="h-9 w-9">
                            <Settings className="h-4 w-4" />
                        </Button>
                    </motion.div> */}

                    <div className="flex items-center gap-2">
                        <motion.div
                            initial={{ scale: 0.95, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            transition={{ duration: 0.3, delay: 0.4 }}
                        >
                            <DropdownMenu>
                                <DropdownMenuTrigger
                                    asChild
                                    className="border border-primary"
                                >
                                    <Button
                                        variant="ghost"
                                        className="relative h-9 w-9 rounded-full hover:bg-transparent"
                                    >
                                        <Avatar className="h-8 w-8">
                                            <AvatarImage
                                                src=""
                                                alt={user?.email || "User"}
                                            />
                                            <AvatarFallback className="text-xs">
                                                {user?.email
                                                    ? getUserInitials(
                                                          user.email
                                                      )
                                                    : "U"}
                                            </AvatarFallback>
                                        </Avatar>
                                    </Button>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent
                                    align="end"
                                    className="w-56"
                                >
                                    <DropdownMenuLabel className="font-normal">
                                        <div className="flex flex-col space-y-1">
                                            <p className="text-sm font-medium leading-none">
                                                {user?.fullName || "User"}
                                            </p>
                                            <p className="text-xs leading-none text-muted-foreground">
                                                {user?.email}
                                            </p>
                                        </div>
                                    </DropdownMenuLabel>
                                    <DropdownMenuSeparator />
                                    <DropdownMenuItem>
                                        <User className="mr-2 h-4 w-4" />
                                        <span>Profile</span>
                                    </DropdownMenuItem>
                                    <DropdownMenuItem>
                                        <Settings className="mr-2 h-4 w-4" />
                                        <span>Settings</span>
                                    </DropdownMenuItem>
                                    <DropdownMenuSeparator />
                                    <DropdownMenuItem
                                        onClick={onLogout}
                                        className="text-red-600 focus:text-red-600"
                                    >
                                        <LogOut className="mr-2 h-4 w-4" />
                                        <span>Log out</span>
                                    </DropdownMenuItem>
                                </DropdownMenuContent>
                            </DropdownMenu>
                        </motion.div>

                        <div className="hidden md:flex flex-col">
                            <h1 className="font-bold text-sm">
                                {user?.fullName ?? "Super Admin"}
                            </h1>
                            <h1 className="font-normal text-xs">
                                {user?.email ?? "superadmin@example.com"}
                            </h1>
                        </div>
                    </div>
                </div>
            </div>
        </motion.header>
    );
}
