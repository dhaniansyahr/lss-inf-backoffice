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
import { usePathname, useRouter } from "next/navigation";
import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";
import { Badge } from "@/components/ui/badge";

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
    const router = useRouter();
    const pathname = usePathname();

    const { user, setIsLogin, setAccessToken } = useAuth();

    const getUserInitials = (email: string) => {
        return email
            .split("@")[0]
            .split(".")
            .map((part) => part.charAt(0).toUpperCase())
            .join("")
            .slice(0, 2);
    };

    const onLogout = useMutation({
        mutationKey: ["authLogout"],
        mutationFn: service.auth.logout,
        onSuccess: () => {
            toast.success("Successfully logged out");
            setIsLogin(false);
            setAccessToken("");

            setTimeout(() => {
                router.push("/login");
            }, 500);
        },
        onError: (error) => {
            console.error("Logout failed:", error);
        },
    });
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
                                                {user?.email ??
                                                    user?.noIdentitas}
                                            </p>
                                            <Badge
                                                variant="secondary"
                                                className="w-fit"
                                            >
                                                {user?.userLevel.name}
                                            </Badge>
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
                                        onClick={() => onLogout.mutate()}
                                        className="text-red-600 focus:text-red-600"
                                    >
                                        <LogOut className="mr-2 h-4 w-4" />
                                        <span>Log out</span>
                                    </DropdownMenuItem>
                                </DropdownMenuContent>
                            </DropdownMenu>
                        </motion.div>
                    </div>
                </div>
            </div>
        </motion.header>
    );
}
