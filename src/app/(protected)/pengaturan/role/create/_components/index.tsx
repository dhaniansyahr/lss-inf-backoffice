"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
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
import { zodResolver } from "@hookform/resolvers/zod";
import React from "react";
import { Checkbox } from "@/components/ui/checkbox";
import { useRouter } from "next/navigation";
import { schema, TAclRequest } from "@/services/pengguna/role/type";
import { useQueryBuilder } from "@/hooks/use-query-builder";
import { formatEnumToTitleCase } from "@/utils/string.utils";
import { toast } from "sonner";

export default function Container() {
    const { params } = useQueryBuilder();

    const router = useRouter();

    const form = useForm<TAclRequest>({
        resolver: zodResolver(schema),
        defaultValues: {
            roleName: "",
            permissions: [],
        },
    });

    const createFn = useMutation(service.roles.create());

    // Fetch all features
    const { data, isLoading } = useQuery(service.roles.getAllFeatures(params));

    const onSubmit = form.handleSubmit((data: TAclRequest) => {
        createFn.mutate(data, {
            onSuccess: (res) => {
                toast.success(res.message);
                router.back();
            },
            onError: (error) => {
                toast.error(error.message);
            },
        });
    });

    const handleCheckboxChange = (
        featureName: string,
        actionName: string,
        checked: boolean
    ) => {
        const currentPermissions = form.getValues("permissions") || [];
        const featureIndex = currentPermissions.findIndex(
            (p) => p.subject === featureName
        );

        if (checked) {
            if (featureIndex === -1) {
                // Add new feature with this action
                currentPermissions.push({
                    subject: featureName,
                    action: [actionName],
                });
            } else {
                // Add action to existing feature if not already present
                const feature = currentPermissions[featureIndex];
                if (!feature.action.includes(actionName)) {
                    feature.action.push(actionName);
                }
            }
        } else {
            if (featureIndex !== -1) {
                const feature = currentPermissions[featureIndex];
                feature.action = feature.action.filter(
                    (action) => action !== actionName
                );

                // Remove feature if no actions left
                if (feature.action.length === 0) {
                    currentPermissions.splice(featureIndex, 1);
                }
            }
        }

        form.setValue("permissions", currentPermissions);
    };

    const onBack = () => router.back();

    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="flex items-center gap-4">
                <Button variant="ghost" size="icon" onClick={onBack}>
                    <Icon icon="mdi:arrow-left" className="h-4 w-4" />
                </Button>
                <h1 className="text-2xl font-semibold">Tambah Role Akses</h1>
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
                                    name="roleName"
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
                                            {isLoading ? (
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
                                                                                        action,
                                                                                        actionIdx
                                                                                    ) => (
                                                                                        <div
                                                                                            key={
                                                                                                actionIdx
                                                                                            }
                                                                                            className="flex items-center gap-2 flex-wrap"
                                                                                        >
                                                                                            <Checkbox
                                                                                                id={`${feature.name}-${action.name}`}
                                                                                                onCheckedChange={(
                                                                                                    checked
                                                                                                ) =>
                                                                                                    handleCheckboxChange(
                                                                                                        feature.name,
                                                                                                        action.name,
                                                                                                        checked as boolean
                                                                                                    )
                                                                                                }
                                                                                            />
                                                                                            <Label
                                                                                                htmlFor={`${feature.name}-${action.name}`}
                                                                                                className="text-sm font-normal cursor-pointer"
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
                                    disabled={createFn.isPending}
                                >
                                    Batal
                                </Button>
                                <Button
                                    type="submit"
                                    disabled={createFn.isPending}
                                    loading={createFn.isPending}
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
