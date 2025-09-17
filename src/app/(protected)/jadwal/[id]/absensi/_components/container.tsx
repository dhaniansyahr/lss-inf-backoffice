"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Icon } from "@iconify/react/dist/iconify.js";
import TableAbsensi from "./table";

export default function Container() {
    return (
        <div className="space-y-4">
            <div className="flex items-center gap-4">
                <Button variant="ghost" size="icon">
                    <Icon icon="mdi:arrow-left" className="h-4 w-4" />
                </Button>
                <h1 className="text-2xl font-semibold">Absensi</h1>
            </div>

            <Card>
                <CardContent className="space-y-4">
                    <TableAbsensi />
                </CardContent>
            </Card>
        </div>
    );
}
