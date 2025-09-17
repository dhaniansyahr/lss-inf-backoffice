import { ReactNode } from "react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Input } from "../ui/input";
import { Icon } from "@iconify/react/dist/iconify.js";

interface TableLayoutProps {
    search: {
        onSearch: (v: string) => void;
        placeholder: string;
    };
    children?: ReactNode;
    actions?: {
        right?: ReactNode;
        left?: ReactNode;
    };
    dataTable: ReactNode;
    tab?: ReactNode;
}

export function TableLayout({
    search,
    children,
    actions,
    dataTable,
    tab,
}: TableLayoutProps) {
    return (
        <div className="w-full overflow-x-auto">
            <Card className="w-full">
                <CardHeader>
                    <div className="space-y-4">
                        {tab}
                        <div className="flex items-center justify-between w-full gap-4">
                            {actions?.left && (
                                <div className="flex items-center gap-2">
                                    {actions?.left}
                                </div>
                            )}
                            <Input
                                startIcon={<Icon icon="mdi:search" />}
                                type="text"
                                name="search"
                                placeholder={search.placeholder}
                                onChange={(e) =>
                                    search.onSearch(e.target.value)
                                }
                                baseClassName="w-full"
                                className="h-12 w-full"
                            />
                            {actions?.right && (
                                <div className="flex items-center gap-2">
                                    {actions?.right}
                                </div>
                            )}
                        </div>
                    </div>
                </CardHeader>
                <CardContent>{dataTable}</CardContent>
            </Card>
            {children}
        </div>
    );
}
