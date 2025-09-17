"use client";

import React from "react";
import ReactPaginate from "react-paginate";
import type { ColumnDef } from "@tanstack/react-table";
import {
    flexRender,
    getCoreRowModel,
    useReactTable,
} from "@tanstack/react-table";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { IPaginate } from "@/types/common";
import { getPaginationRange } from "@/lib/utils";
import { Icon } from "@iconify/react/dist/iconify.js";

interface DataTableProps<TData, TValue> {
    columns: Array<ColumnDef<TData, TValue> & { isCenter?: boolean }>;
    data: Array<TData>;
    isLoading?: boolean;
    paginate?: IPaginate | null;
    onPaginate?: (page: number) => void;
}

export function DataTable<TData, TValue>({
    columns,
    data,
    isLoading = false,
    paginate,
    onPaginate,
}: DataTableProps<TData, TValue>) {
    const table = useReactTable({
        data,
        columns,
        getCoreRowModel: getCoreRowModel(),
        state: {
            columnPinning: {
                right: ["actions"],
            },
        },
        enablePinning: true,
    });

    // Type for columnDef with isCenter
    type ColumnDefWithIsCenter = ColumnDef<TData, TValue> & {
        isCenter?: boolean;
    };

    return (
        <div className="flex flex-col w-full bg-white">
            <div className="grid grid-cols-1 rounded-xl overflow-hidden border bg-white border-gray-100 w-full">
                <Table className="w-full bg-white dark:bg-neutral-900">
                    <TableHeader className="bg-gray-200">
                        {table.getHeaderGroups().map((headerGroup) => (
                            <TableRow key={headerGroup.id}>
                                {headerGroup.headers.map((header) => {
                                    const columnDef = header.column
                                        .columnDef as ColumnDefWithIsCenter;
                                    return (
                                        <TableHead
                                            key={header.id}
                                            style={{
                                                maxWidth: columnDef.size
                                                    ? `${columnDef.size}px`
                                                    : "auto",
                                                width: columnDef.size
                                                    ? `${columnDef.size}px`
                                                    : "auto",
                                                minWidth: columnDef.size
                                                    ? `${columnDef.size}px`
                                                    : "auto",
                                            }}
                                            className={`py-4 break-words whitespace-normal ${
                                                columnDef.isCenter
                                                    ? "text-center"
                                                    : ""
                                            } border-l border-r border-secondary/0 text-gray-700`}
                                        >
                                            {header.isPlaceholder ? null : (
                                                <span className="inline-flex items-center gap-2">
                                                    {flexRender(
                                                        header.column.columnDef
                                                            .header,
                                                        header.getContext()
                                                    )}
                                                </span>
                                            )}
                                        </TableHead>
                                    );
                                })}
                            </TableRow>
                        ))}
                    </TableHeader>
                    <TableBody>
                        {isLoading ? (
                            Array.from({ length: 5 }).map((_, index) => (
                                <TableRow
                                    key={`skeleton-${index}`}
                                    className=""
                                >
                                    {columns.map((_, cellIndex) => (
                                        <TableCell
                                            key={`skeleton-cell-${cellIndex}`}
                                        >
                                            <Skeleton className="h-6 w-full bg-gray-200" />
                                        </TableCell>
                                    ))}
                                </TableRow>
                            ))
                        ) : table.getRowModel().rows.length ? (
                            table.getRowModel().rows.map((row) => (
                                <TableRow
                                    key={row.id}
                                    data-state={
                                        row.getIsSelected() && "selected"
                                    }
                                    className={` ${
                                        row.index % 2 !== 0
                                            ? "bg-secondary/5"
                                            : ""
                                    }`}
                                >
                                    {row.getVisibleCells().map((cell) => {
                                        const columnDef = cell.column
                                            .columnDef as ColumnDefWithIsCenter;

                                        return (
                                            <TableCell
                                                key={cell.id}
                                                style={{
                                                    maxWidth: cell.column
                                                        .columnDef.size
                                                        ? `${cell.column.columnDef.size}px`
                                                        : "auto",
                                                    width: cell.column.columnDef
                                                        .size
                                                        ? `${cell.column.columnDef.size}px`
                                                        : "auto",
                                                    minWidth: cell.column
                                                        .columnDef.size
                                                        ? `${cell.column.columnDef.size}px`
                                                        : "auto",
                                                    wordWrap: "break-word",
                                                    whiteSpace: "normal",
                                                }}
                                                className={`text-gray-900 ${
                                                    columnDef.isCenter
                                                        ? "text-center"
                                                        : ""
                                                }`}
                                            >
                                                {flexRender(
                                                    cell.column.columnDef.cell,
                                                    cell.getContext()
                                                )}
                                            </TableCell>
                                        );
                                    })}
                                </TableRow>
                            ))
                        ) : (
                            <TableRow>
                                <TableCell
                                    colSpan={columns.length}
                                    className="h-24 text-center text-gray-500"
                                >
                                    No results.
                                </TableCell>
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
            </div>

            {paginate && (
                <div className="flex w-full items-center gap-4 p-4 justify-center">
                    <div className="flex items-center gap-2">
                        <p className="text-sm text-gray-500">Result Page:</p>
                        <p className="text-sm text-gray-500 bg-gray-200 rounded-full px-4 py-2">
                            {String(getPaginationRange(paginate || undefined))}
                        </p>
                    </div>
                    <ReactPaginate
                        breakLabel="..."
                        nextLabel={
                            <Button
                                size={"sm"}
                                className="px-4 py-2 rounded-full"
                                type="button"
                                variant={"ghost"}
                                disabled={isLoading}
                            >
                                <Icon icon="mdi:chevron-right" />
                            </Button>
                        }
                        onPageChange={(page) => {
                            onPaginate && onPaginate(page.selected + 1);
                        }}
                        disabledClassName="opacity-50"
                        initialPage={(paginate?.page || 1) - 1}
                        activeClassName="bg-primary text-white rounded-full px-4 py-2"
                        pageRangeDisplayed={1}
                        pageCount={paginate?.totalPage ?? 0}
                        containerClassName="flex flex-row justify-end items-center gap-2"
                        previousLabel={
                            <Button
                                variant={"ghost"}
                                size={"sm"}
                                className="px-4 py-2 rounded-full"
                                type="button"
                                disabled={isLoading}
                            >
                                <Icon icon="mdi:chevron-left" />
                            </Button>
                        }
                        pageClassName="paginator-page hover:bg-secondary/40 rounded-full px-4 py-2"
                        renderOnZeroPageCount={null}
                    />
                </div>
            )}
        </div>
    );
}
