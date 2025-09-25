"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import { Icon } from "@iconify/react/dist/iconify.js";
import { useMutation, useQuery } from "@tanstack/react-query";
import { service } from "@/services";
import { useForm } from "react-hook-form";
import React, { useEffect, useState } from "react";
import { Checkbox } from "@/components/ui/checkbox";
import { useParams, useRouter } from "next/navigation";
import { TAclRequest } from "@/services/pengguna/role/type";
import { useQueryBuilder } from "@/hooks/use-query-builder";
import { formatEnumToTitleCase } from "@/utils/string.utils";
import { toast } from "sonner";
import { Label } from "@/components/ui/label";

export default function Container() {
    const { id }: { id: string } = useParams();

    const { params } = useQueryBuilder();

    const router = useRouter();

    const updateFn = useMutation(service.roles.update());

    // Fetch all features
    const { data, isLoading } = useQuery(service.roles.getAllFeatures(params));

    const {
        data: assignedAcess,
        isLoading: isLoadingAssignedAcess,
        refetch,
    } = useQuery(service.roles.getAccessByUserLevelId(id));

    const [enabledFeatures, setEnabledFeatures] = useState<
        Record<string, boolean>
    >({});

    const form = useForm<TAclRequest>({
        defaultValues: {
            name: assignedAcess?.content?.name ?? "",
            enabledFeatures: assignedAcess?.content?.enabledFeatures ?? {},
        },
        values: {
            name: assignedAcess?.content?.name ?? "",
            enabledFeatures: assignedAcess?.content?.enabledFeatures ?? {},
        },
        resetOptions: {
            keepDirty: true,
        },
    });

    const onSubmit = form.handleSubmit(async (values) => {
        const requestBody = {
            name: values.name,
            enabledFeatures: enabledFeatures,
        };

        updateFn.mutate(
            { id, data: requestBody },
            {
                onSuccess: (res) => {
                    toast.success(res.message);

                    setTimeout(() => {
                        router.back();
                    }, 1000);
                },
                onError: (error) => {
                    toast.error(error.message);
                },
            }
        );
    });

    const onChangeCheck = (subFeature: string, action: string) => {
        const key = `${subFeature}.${action}`;

        setEnabledFeatures((prev) => {
            const newFeatures = { ...prev };
            if (newFeatures[key]) {
                newFeatures[key] = false;
            } else {
                newFeatures[key] = true;
            }
            return newFeatures;
        });
    };

    const isChecked = (subFeature: string, action: string) => {
        const key = `${subFeature}.${action}`;
        return enabledFeatures[key] || false;
    };

    useEffect(() => {
        if (assignedAcess?.content) {
            setEnabledFeatures(assignedAcess.content.enabledFeatures);
        }
    }, [assignedAcess?.content]);

    useEffect(() => {
        if (id) {
            refetch();
        }
    }, [id]);

    const onBack = () => router.back();

    const isLoadingTable = isLoading || isLoadingAssignedAcess;

    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="flex items-center gap-4">
                <Button variant="ghost" size="icon" onClick={onBack}>
                    <Icon icon="mdi:arrow-left" className="h-4 w-4" />
                </Button>
                <h1 className="text-2xl font-semibold">Edit Role Akses</h1>
            </div>

            {/* Form */}
            <Card>
                <CardContent className="p-6">
                    <Form {...form}>
                        <form onSubmit={onSubmit} className="space-y-6">
                            {/* Role Name Input */}
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <FormField
                                    control={form.control}
                                    name="name"
                                    render={({
                                        field,
                                        fieldState: { error },
                                    }) => (
                                        <FormItem>
                                            <FormLabel>
                                                Nama Role Akses
                                            </FormLabel>
                                            <FormControl>
                                                <Input
                                                    placeholder="Nama Role Akses"
                                                    {...field}
                                                />
                                            </FormControl>
                                            {error && (
                                                <FormMessage>
                                                    {error.message}
                                                </FormMessage>
                                            )}
                                        </FormItem>
                                    )}
                                />
                            </div>

                            {/* Features Table */}
                            <div className="space-y-4">
                                <h3 className="text-lg font-medium">
                                    List Fitur
                                </h3>
                                <div className="border rounded-lg overflow-hidden">
                                    <Table>
                                        <TableHeader className="bg-muted/50">
                                            <TableRow>
                                                <TableHead className="w-1/2">
                                                    List Fitur
                                                </TableHead>
                                                <TableHead className="w-1/2">
                                                    Akses
                                                </TableHead>
                                            </TableRow>
                                        </TableHeader>
                                        <TableBody>
                                            {isLoadingTable ? (
                                                <TableRow>
                                                    <TableCell
                                                        colSpan={2}
                                                        className="text-center py-8"
                                                    >
                                                        <div className="flex items-center justify-center">
                                                            <Icon
                                                                icon="mdi:loading"
                                                                className="animate-spin h-4 w-4 mr-2"
                                                            />
                                                            Loading...
                                                        </div>
                                                    </TableCell>
                                                </TableRow>
                                            ) : (
                                                <>
                                                    {data?.content &&
                                                        Array.isArray(
                                                            data.content
                                                        ) &&
                                                        data.content.map(
                                                            (feature) => (
                                                                <TableRow
                                                                    key={
                                                                        feature.id
                                                                    }
                                                                >
                                                                    <TableCell>
                                                                        {formatEnumToTitleCase(
                                                                            feature.name
                                                                        )}
                                                                    </TableCell>
                                                                    <TableCell>
                                                                        <div className="grid grid-cols-4 gap-2">
                                                                            {feature
                                                                                .actions
                                                                                .length >
                                                                                0 &&
                                                                                feature.actions.map(
                                                                                    (
                                                                                        action
                                                                                    ) => (
                                                                                        <div
                                                                                            key={
                                                                                                action.name
                                                                                            }
                                                                                            className="flex items-center gap-2 flex-wrap"
                                                                                        >
                                                                                            <Checkbox
                                                                                                id={`${feature.name}-${action.name}`}
                                                                                                onCheckedChange={() =>
                                                                                                    onChangeCheck(
                                                                                                        feature.name,
                                                                                                        action.name
                                                                                                    )
                                                                                                }
                                                                                                checked={isChecked(
                                                                                                    feature.name,
                                                                                                    action.name
                                                                                                )}
                                                                                            />
                                                                                            <Label
                                                                                                htmlFor={`${feature.name}-${action.name}`}
                                                                                                className="text-sm cursor-pointer"
                                                                                            >
                                                                                                {formatEnumToTitleCase(
                                                                                                    action.name
                                                                                                )}
                                                                                            </Label>
                                                                                        </div>
                                                                                    )
                                                                                )}
                                                                        </div>
                                                                    </TableCell>
                                                                </TableRow>
                                                            )
                                                        )}
                                                </>
                                            )}
                                        </TableBody>
                                    </Table>
                                </div>
                            </div>

                            {/* Action Buttons */}
                            <div className="flex justify-end gap-4 pt-6 border-t">
                                <Button
                                    type="button"
                                    variant="outline"
                                    onClick={onBack}
                                    disabled={updateFn.isPending}
                                >
                                    Batal
                                </Button>
                                <Button
                                    type="submit"
                                    disabled={updateFn.isPending}
                                    loading={updateFn.isPending}
                                >
                                    Submit
                                </Button>
                            </div>
                        </form>
                    </Form>
                </CardContent>
            </Card>
        </div>
    );
}
