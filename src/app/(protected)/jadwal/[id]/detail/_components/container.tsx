"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { service } from "@/services";
import { Icon } from "@iconify/react/dist/iconify.js";
import { useQuery } from "@tanstack/react-query";
import { DateTime } from "luxon";
import { useParams, useRouter } from "next/navigation";
import TableListMahasiswa from "./table";
import { useEffect } from "react";

export default function Container() {
    const router = useRouter();

    const { id }: { id: string } = useParams();

    const { data, isLoading, refetch } = useQuery({
        ...service.jadwal.getOne(id),
        enabled: !!id,
        refetchOnWindowFocus: true,
    });

    const onBack = () => router.back();

    useEffect(() => {
        if (id) {
            refetch();
        }
    }, [id]);

    return (
        <div className="space-y-4">
            <div className="flex items-center gap-4">
                <Button variant="ghost" size="icon" onClick={onBack}>
                    <Icon icon="mdi:arrow-left" className="h-4 w-4" />
                </Button>
                <h1 className="text-2xl font-semibold">Detail Jadwal</h1>
            </div>

            <Card>
                <CardContent className="space-y-4">
                    <div className="space-y-2">
                        {data?.content?.overrideData &&
                            data?.content?.overrideData.length > 0 && (
                                <div className="p-2 bg-destructive/20 rounded-md">
                                    <ul className="list-disc list-inside">
                                        {data?.content?.overrideData.map(
                                            (item) => (
                                                <li
                                                    key={item.id}
                                                    className="font-normal text-destructive text-sm"
                                                >
                                                    {item.message}
                                                </li>
                                            )
                                        )}
                                    </ul>
                                </div>
                            )}

                        <div className="p-2 bg-gray-200 rounded-md">
                            <h1 className="text-lg font-semibold">
                                Data Jadwal
                            </h1>
                        </div>

                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                            <div className="p-2 border-b border-gray-400 grid grid-cols-3 gap-2">
                                <div>
                                    <h1 className="text-sm font-semibold">
                                        Nama Matakuliah
                                    </h1>
                                </div>
                                <div className="col-span-2">
                                    {isLoading ? (
                                        <Skeleton className="h-4 w-full" />
                                    ) : (
                                        <p className="text-sm">
                                            :{" "}
                                            {data?.content?.matakuliah.nama ??
                                                "-"}
                                        </p>
                                    )}
                                </div>
                            </div>

                            <div className="p-2 border-b border-gray-400 grid grid-cols-3 gap-2">
                                <div>
                                    <h1 className="text-sm font-semibold">
                                        Waktu Praktikum
                                    </h1>
                                </div>
                                <div className="col-span-2">
                                    {isLoading ? (
                                        <Skeleton className="h-4 w-full" />
                                    ) : (
                                        <p className="text-sm">
                                            :{" "}
                                            {data?.content?.shift.startTime ??
                                                "-"}{" "}
                                            -{" "}
                                            {data?.content?.shift.endTime ??
                                                "-"}
                                        </p>
                                    )}
                                </div>
                            </div>

                            <div className="p-2 border-b border-gray-400 grid grid-cols-3 gap-2">
                                <div>
                                    <h1 className="text-sm font-semibold">
                                        Ruangan Praktikum
                                    </h1>
                                </div>
                                <div className="col-span-2">
                                    {isLoading ? (
                                        <Skeleton className="h-4 w-full" />
                                    ) : (
                                        <p className="text-sm">
                                            :{" "}
                                            {data?.content?.ruangan.nama ?? "-"}
                                        </p>
                                    )}
                                </div>
                            </div>

                            <div className="p-2 border-b border-gray-400 grid grid-cols-3 gap-2">
                                <div>
                                    <h1 className="text-sm font-semibold">
                                        Dosen Pengampu Matakuliah
                                    </h1>
                                </div>
                                <div className="col-span-2">
                                    {isLoading ? (
                                        <Skeleton className="h-4 w-full" />
                                    ) : (
                                        data?.content?.jadwalDosen.map(
                                            (jadwalDosen) => (
                                                <p className="text-sm">
                                                    :{" "}
                                                    {jadwalDosen.dosen.nama ??
                                                        "-"}
                                                </p>
                                            )
                                        )
                                    )}
                                </div>
                            </div>

                            <div className="p-2 border-b border-gray-400 grid grid-cols-3 gap-2">
                                <div>
                                    <h1 className="text-sm font-semibold">
                                        Asisten Lab
                                    </h1>
                                </div>
                                <div className="col-span-2">
                                    {isLoading ? (
                                        <Skeleton className="h-4 w-full" />
                                    ) : data?.content?.jadwalAsistenLab
                                          .length &&
                                      data?.content?.jadwalAsistenLab.length >
                                          0 ? (
                                        data?.content?.jadwalAsistenLab.map(
                                            (jadwalAsistenLab) => (
                                                <p className="text-sm">
                                                    :{" "}
                                                    {jadwalAsistenLab.asistenLab
                                                        .mahasiswa.nama ?? "-"}
                                                </p>
                                            )
                                        )
                                    ) : (
                                        <p className="text-sm">: -</p>
                                    )}
                                </div>
                            </div>
                        </div>

                        <div className="space-y-2">
                            <div className="p-2 bg-gray-200 rounded-md">
                                <h1 className="text-lg font-semibold">
                                    Data Pertemuan
                                </h1>
                            </div>

                            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                                {data?.content?.meetings.map((meeting) => (
                                    <div
                                        key={meeting.id}
                                        className="p-2 border-b border-gray-400 grid grid-cols-3 gap-2"
                                    >
                                        <div>
                                            <h1 className="text-sm font-semibold">
                                                Pertemuan {meeting.pertemuan}
                                            </h1>
                                        </div>
                                        <div className="col-span-2">
                                            {isLoading ? (
                                                <Skeleton className="h-4 w-full" />
                                            ) : (
                                                <p className="text-sm">
                                                    :{" "}
                                                    {DateTime.fromFormat(
                                                        meeting.tanggal,
                                                        "yyyy-MM-dd"
                                                    ).toFormat(
                                                        "cccc, dd MMMM yyyy",
                                                        { locale: "id" }
                                                    )}
                                                </p>
                                            )}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        <div className="space-y-2">
                            <div className="p-2 bg-gray-200 rounded-md">
                                <h1 className="text-lg font-semibold">
                                    Daftar Mahasiswa
                                </h1>
                            </div>

                            <TableListMahasiswa
                                mahasiswa={data?.content?.jadwalMahasiswa ?? []}
                            />
                        </div>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}
