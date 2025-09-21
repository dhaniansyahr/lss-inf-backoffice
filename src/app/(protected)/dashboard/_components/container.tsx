"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { service } from "@/services";
import { TMeeting } from "@/types/data";
import { Icon } from "@iconify/react/dist/iconify.js";
import { useQuery } from "@tanstack/react-query";

const ListJadwal = ({ data }: { data: TMeeting }) => {
    return (
        <Card>
            <CardHeader>
                <div className="flex items-center justify-between">
                    <CardTitle>
                        {data.jadwal.matakuliah.kode} -{" "}
                        {data.jadwal.matakuliah.nama}
                    </CardTitle>
                    <Button>
                        <Icon icon="mdi:file-document-outline" />
                        Absen
                    </Button>
                </div>
            </CardHeader>

            <CardContent>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                    <div className="p-2 border-b border-gray-400 grid grid-cols-3 gap-2">
                        <div>
                            <h1 className="text-sm font-semibold">Waktu</h1>
                        </div>
                        <div className="col-span-2">
                            <p className="text-sm">
                                : {data?.jadwal.shift.startTime ?? "-"} -{" "}
                                {data?.jadwal.shift.endTime ?? "-"}
                            </p>
                        </div>
                    </div>
                    <div className="p-2 border-b border-gray-400 grid grid-cols-3 gap-2">
                        <div>
                            <h1 className="text-sm font-semibold">Ruangan</h1>
                        </div>
                        <div className="col-span-2">
                            <p className="text-sm">
                                : {data?.jadwal.ruangan.nama ?? "-"}
                            </p>
                        </div>
                    </div>
                </div>
            </CardContent>
        </Card>
    );
};

export default function Container() {
    const { data, isLoading } = useQuery(service.jadwal.today());

    return (
        <div className="space-y-4">
            {isLoading ? (
                <Card>
                    <CardHeader>
                        <Skeleton className="h-4 w-full" />
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <Skeleton className="h-4 w-full" />
                        <Skeleton className="h-4 w-full" />
                    </CardContent>
                </Card>
            ) : data?.content && data?.content.length > 0 ? (
                data?.content.map((item) => (
                    <ListJadwal data={item} key={item.id} />
                ))
            ) : (
                <Card>
                    <CardHeader>
                        <CardTitle>Jadwal Hari Ini</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <p className="text-sm">Tidak ada jadwal hari ini</p>
                    </CardContent>
                </Card>
            )}
        </div>
    );
}
