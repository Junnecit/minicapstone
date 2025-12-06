import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head, usePage } from '@inertiajs/react';
import { Button } from '@/components/ui/button';
import { DataTable } from '@/components/DataTable';
import { ProductFormModal, type Product, type Category } from './ProductFormModal';
import { getColumns } from './columns';
import { useState, useEffect } from 'react';
import { toast } from 'sonner';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Products',
        href: '/products',
    },
];

interface Props {
    products: Product[];
    categories: Category[];
}

export default function Index({ products: initialProducts, categories }: Props) {
    const { props } = usePage();
    const flash = props.flash as any;
    const [modalOpen, setModalOpen] = useState(false);
    const [selectedProduct, setSelectedProduct] = useState<Product | undefined>();
    const [products, setProducts] = useState(initialProducts);

    useEffect(() => {
        if (flash?.success) {
            toast.success(flash.success);
            // Refresh products list after a short delay
            setTimeout(() => {
                window.location.reload();
            }, 1000);
        }
        if (flash?.error) {
            toast.error(flash.error);
        }
    }, [flash]);

    const handleEdit = (product: Product) => {
        console.log('Editing product:', product); // Debug log
        setSelectedProduct(product);
        setModalOpen(true);
    };

    const handleCreate = () => {
        console.log('Creating new product'); // Debug log
        setSelectedProduct(undefined);
        setModalOpen(true);
    };

    const handleModalClose = (open: boolean) => {
        setModalOpen(open);
        if (!open) {
            setSelectedProduct(undefined);
        }
    };

    const columns = getColumns(handleEdit);

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Products" />

            <div className="p-4">
                <div className="flex justify-between items-center mb-4">
                    <h1 className="text-xl font-bold">Products</h1>
                    <Button onClick={handleCreate}>+ Add Product</Button>
                </div>

                <DataTable columns={columns} data={products} />

                <ProductFormModal
                    open={modalOpen}
                    onOpenChange={handleModalClose}
                    product={selectedProduct}
                    categories={categories}
                />
            </div>
        </AppLayout>
    );
}