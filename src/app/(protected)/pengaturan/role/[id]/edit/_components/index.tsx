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
import { useParams, useRouter } from "next/navigation";
import { schema, TAclRequest } from "@/services/pengguna/role/type";
import { useQueryBuilder } from "@/hooks/use-query-builder";
import { formatEnumToTitleCase } from "@/utils/string.utils";
import { toast } from "sonner";

export default function Container() {
    const { id }: { id: string } = useParams();

    const { params } = useQueryBuilder();

    const router = useRouter();

    const updateFn = useMutation(service.roles.update());

    // Fetch all features
    const { data, isLoading } = useQuery(service.roles.getAllFeatures(params));

    const { data: assignedAcess, isLoading: isLoadingAssignedAcess } = useQuery(
        service.roles.getAccessByUserLevelId(id)
    );
    const { data: roleData, isLoading: isLoadingRole } = useQuery(
        service.roles.getOneRole(id)
    );

    const permissions = Array.from(
        new Map(
            (assignedAcess?.content ?? []).map((item) => [
                item.featureName,
                {
                    subject: item.featureName,
                    action: item.actions,
                },
            ])
        ).values()
    );

    const form = useForm<TAclRequest>({
        resolver: zodResolver(schema),
        defaultValues: {
            roleName: roleData?.content?.name ?? "",
            permissions: permissions,
        },
        values: {
            roleName: roleData?.content?.name ?? "",
            permissions: permissions,
        },
        resetOptions: {
            keepDirty: true,
        },
    });

    const onSubmit = form.handleSubmit((data: TAclRequest) => {
        updateFn.mutate(data, {
            onSuccess: (res) => {
                toast.success(res.message);
                router.back();
            },
            onError: (error) => {
                toast.error(error.message);
            },
        });
    });

    // Helper function to check if an action is selected for a feature
    const isActionSelected = (
        featureName: string,
        actionName: string
    ): boolean => {
        const currentPermissions = form.getValues("permissions") || [];
        const feature = currentPermissions.find(
            (p) => p.subject === featureName
        );
        return feature ? feature.action.includes(actionName) : false;
    };

    // Helper function to handle checkbox changes
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

        form.setValue("permissions", currentPermissions, {
            shouldDirty: true,
            shouldValidate: true,
        });
    };

    const onBack = () => router.back();

    const isLoadingTable = isLoading || isLoadingAssignedAcess || isLoadingRole;

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
                                                                                            key={`${feature.name}-${action.name}`}
                                                                                            className="flex items-center gap-2 flex-wrap"
                                                                                        >
                                                                                            <FormField
                                                                                                control={
                                                                                                    form.control
                                                                                                }
                                                                                                name="permissions"
                                                                                                render={({
                                                                                                    field,
                                                                                                }) => (
                                                                                                    <FormItem className="flex items-center gap-2">
                                                                                                        <FormControl>
                                                                                                            <Checkbox
                                                                                                                checked={isActionSelected(
                                                                                                                    feature.name,
                                                                                                                    action.name
                                                                                                                )}
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
                                                                                                        </FormControl>
                                                                                                        <FormLabel
                                                                                                            htmlFor={`${feature.name}-${action.name}`}
                                                                                                            className="text-sm font-normal cursor-pointer"
                                                                                                        >
                                                                                                            {formatEnumToTitleCase(
                                                                                                                action.name
                                                                                                            )}
                                                                                                        </FormLabel>
                                                                                                    </FormItem>
                                                                                                )}
                                                                                            />
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
