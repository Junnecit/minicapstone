import { useState, useEffect, useMemo } from 'react';
import { Head, usePage } from '@inertiajs/react';
import { toast } from 'sonner';
import { DataTable } from '@/components/DataTable';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { ChevronLeft, ChevronRight, Search, X } from 'lucide-react';
import { SaleFormModal, type Sale } from './SaleFormModal';
import { getSaleColumns } from './columns';

const breadcrumbs: BreadcrumbItem[] = [
    { title: 'Sales', href: '/sales' },
];

interface Product {
    id: number;
    name: string;
    SKU: string;
    price: number;
    stock_quantity: number;
}

interface Props {
    sales: Sale[];
    products: Product[];
}

const ITEMS_PER_PAGE = 10;

export default function Index({ sales: initialSales, products }: Props) {
    const { props } = usePage();
    const flash = props.flash as any;

    const [sales, setSales] = useState(initialSales);
    const [modalOpen, setModalOpen] = useState(false);
    const [selectedSale, setSelectedSale] = useState<Sale | undefined>();
    const [searchQuery, setSearchQuery] = useState('');
    const [currentPage, setCurrentPage] = useState(1);

    // Flash messages
    useEffect(() => {
        if (flash?.success) {
            toast.success(flash.success);
            setTimeout(() => window.location.reload(), 1000);
        }
        if (flash?.error) toast.error(flash.error);
    }, [flash]);

    // Filter sales by search
    const filteredSales = useMemo(() => {
        return sales.filter(
            (sale) =>
                sale.product_name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
                sale.customer_name?.toLowerCase().includes(searchQuery.toLowerCase())
        );
    }, [sales, searchQuery]);

    // Pagination logic
    const totalPages = Math.ceil(filteredSales.length / ITEMS_PER_PAGE);
    const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
    const endIndex = startIndex + ITEMS_PER_PAGE;
    const paginatedSales = filteredSales.slice(startIndex, endIndex);

    // Handlers
    const handleEdit = (sale: Sale) => {
        setSelectedSale(sale);
        setModalOpen(true);
    };

    const handleCreate = () => {
        setSelectedSale(undefined);
        setModalOpen(true);
    };

    const handleModalClose = (open: boolean) => {
        setModalOpen(open);
        if (!open) setSelectedSale(undefined);
    };

    const handleClearFilters = () => {
        setSearchQuery('');
        setCurrentPage(1);
    };

    const handleNextPage = () => {
        if (currentPage < totalPages) setCurrentPage(currentPage + 1);
    };

    const handlePrevPage = () => {
        if (currentPage > 1) setCurrentPage(currentPage - 1);
    };

    useEffect(() => setCurrentPage(1), [searchQuery]);

    const columns = getSaleColumns(handleEdit);

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Sales" />
            <div className="space-y-4 p-4">
                {/* Header */}
                <div className="flex items-center justify-between">
                    <h1 className="text-2xl font-bold">Sales</h1>
                    <Button onClick={handleCreate}>+ Add Sale</Button>
                </div>

                {/* Search */}
                <div className="relative w-96">
                    <Search className="absolute top-3 left-3 h-5 w-5 text-gray-400" />
                    <Input
                        type="text"
                        placeholder="Search by product or customer..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="w-full pl-10"
                    />
                    {searchQuery && (
                        <button
                            onClick={() => setSearchQuery('')}
                            className="absolute top-3 right-3 text-gray-400 hover:text-gray-600"
                        >
                            <X className="h-5 w-5" />
                        </button>
                    )}
                </div>

                {/* Active Filters */}
                {searchQuery && (
                    <div className="flex items-center justify-between rounded-lg border border-blue-200 bg-blue-50 p-3">
                        <div className="text-sm text-blue-800">
                            Showing <span className="font-semibold">{filteredSales.length}</span> of <span className="font-semibold">{sales.length}</span> sales matching "{searchQuery}"
                        </div>
                        <Button variant="ghost" size="sm" onClick={handleClearFilters} className="text-blue-600 hover:text-blue-800">
                            Clear Filters
                        </Button>
                    </div>
                )}

                {/* Sales Table */}
                {paginatedSales.length > 0 ? (
                    <>
                        <DataTable columns={columns} data={paginatedSales} />

                        {/* Pagination */}
                        <div className="mt-6 flex items-center justify-between rounded-lg border bg-gray-50 p-4">
                            <div className="text-sm text-gray-600">
                                Page <span className="font-semibold">{currentPage}</span> of <span className="font-semibold">{totalPages}</span> | Showing <span className="font-semibold">{startIndex + 1}</span> to <span className="font-semibold">{Math.min(endIndex, filteredSales.length)}</span> of <span className="font-semibold">{filteredSales.length}</span> sales
                            </div>
                            <div className="flex gap-2">
                                <Button variant="outline" size="sm" onClick={handlePrevPage} disabled={currentPage === 1} className="gap-2">
                                    <ChevronLeft className="h-4 w-4" /> Previous
                                </Button>
                                <div className="flex gap-1">
                                    {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                                        <Button
                                            key={page}
                                            variant={currentPage === page ? 'default' : 'outline'}
                                            size="sm"
                                            onClick={() => setCurrentPage(page)}
                                            className="h-10 w-10 p-0"
                                        >
                                            {page}
                                        </Button>
                                    ))}
                                </div>
                                <Button variant="outline" size="sm" onClick={handleNextPage} disabled={currentPage === totalPages} className="gap-2">
                                    Next <ChevronRight className="h-4 w-4" />
                                </Button>
                            </div>
                        </div>
                    </>
                ) : (
                    <div className="py-12 text-center">
                        <p className="text-lg text-gray-500">No sales found matching your criteria.</p>
                        <Button variant="ghost" onClick={handleClearFilters} className="mt-4 text-blue-600">
                            Clear Filters and Try Again
                        </Button>
                    </div>
                )}

                {/* Sale Modal */}
                <SaleFormModal
                    open={modalOpen}
                    onOpenChange={handleModalClose}
                    sale={selectedSale}
                    products={products} // <-- products passed correctly
                />
            </div>
        </AppLayout>
    );
}
