import { ColumnDef } from "@tanstack/react-table";
import { Button } from "@/components/ui/button";
import { router } from "@inertiajs/react";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { MoreHorizontal, Trash2, Edit } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

export type Sale = {
    id: number;
    product_name: string;
    quantity: number;
    price: number;
    total: number;
    customer_name?: string;
    sale_date: string;
};

export const getSaleColumns = (onEdit: (sale: Sale) => void): ColumnDef<Sale>[] => [
    {
        accessorKey: "product_name",
        header: "Product",
    },
    {
        accessorKey: "quantity",
        header: "Quantity",
    },
    {
        accessorKey: "price",
        header: "Price",
        cell: ({ row }) => `₱${parseFloat(row.original.price.toString()).toFixed(2)}`,
    },
    {
        accessorKey: "total",
        header: "Total",
        cell: ({ row }) => `₱${parseFloat(row.original.total.toString()).toFixed(2)}`,
    },
    {
        accessorKey: "customer_name",
        header: "Customer",
        cell: ({ row }) => row.original.customer_name || "—",
    },
    {
        accessorKey: "sale_date",
        header: "Date",
        cell: ({ row }) => new Date(row.original.sale_date).toLocaleDateString(),
    },
    {
        id: "actions",
        header: "Actions",
        cell: ({ row }) => {
            const sale = row.original;
            const [alertOpen, setAlertOpen] = useState(false);
            const [isDeleting, setIsDeleting] = useState(false);
            const [dropdownOpen, setDropdownOpen] = useState(false);

            const handleEdit = (e: React.MouseEvent) => {
                e.preventDefault();
                e.stopPropagation();
                setDropdownOpen(false);
                setTimeout(() => onEdit(sale), 100);
            };

            const handleConfirmDelete = () => {
                setIsDeleting(true);
                router.delete(`/sales/${sale.id}`, {
                    onSuccess: () => {
                        toast.success("Sale deleted successfully!");
                        setAlertOpen(false);
                        setIsDeleting(false);
                    },
                    onError: () => {
                        toast.error("Failed to delete sale");
                        setIsDeleting(false);
                    },
                });
            };

            return (
                <AlertDialog open={alertOpen} onOpenChange={setAlertOpen}>
                    <DropdownMenu open={dropdownOpen} onOpenChange={setDropdownOpen}>
                        <DropdownMenuTrigger asChild>
                            <Button variant="ghost" className="h-8 w-8 p-0">
                                <MoreHorizontal className="h-4 w-4" />
                            </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                            <DropdownMenuItem onClick={handleEdit}>
                                <div className="flex items-center text-yellow-500">
                                    <Edit className="mr-2 h-4 w-4" />
                                    Edit
                                </div>
                            </DropdownMenuItem>
                            <DropdownMenuItem
                                onClick={(e) => {
                                    e.preventDefault();
                                    setAlertOpen(true);
                                }}
                            >
                                <div className="flex items-center text-red-500">
                                    <Trash2 className="mr-2 h-4 w-4" />
                                    Delete
                                </div>
                            </DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>

                    <AlertDialogContent>
                        <AlertDialogHeader>
                            <AlertDialogTitle>Delete Sale</AlertDialogTitle>
                            <AlertDialogDescription>
                                Are you sure you want to delete the sale of <strong>{sale.product_name}</strong>? This action cannot be undone.
                            </AlertDialogDescription>
                        </AlertDialogHeader>
                        <div className="flex gap-2 justify-end">
                            <AlertDialogCancel disabled={isDeleting}>
                                Cancel
                            </AlertDialogCancel>
                            <AlertDialogAction
                                onClick={handleConfirmDelete}
                                disabled={isDeleting}
                                className="bg-red-600 hover:bg-red-700"
                            >
                                {isDeleting ? "Deleting..." : "Delete"}
                            </AlertDialogAction>
                        </div>
                    </AlertDialogContent>
                </AlertDialog>
            );
        },
    },
];
