import AppLayout from '@/layouts/app-layout';
import { index as categoriesIndex } from '@/routes/categories';
import { type BreadcrumbItem } from '@/types';
import { Head, usePage } from '@inertiajs/react';
import { Button } from '@/components/ui/button';
import { DataTable } from '@/components/DataTable';
import {  type Category, getColumns } from './columns';
import { CategoryFormModal } from './CategoryFormModal';
import { useEffect, useState } from 'react';
import { toast } from 'sonner';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Categories',
        href: categoriesIndex().url,
    },
];

interface Props {
    categories: Category[];
}

export default function Index({ categories }: Props) {
    const { props } = usePage();
    const flash = props.flash as any;
    const [modalOpen, setModalOpen] = useState(false);
    const [selectedCategory, setSelectedCategory] = useState<Category | undefined>();

    useEffect(() => {
        if (flash?.success) {
            toast.success(flash.success);
        }
        if (flash?.error) {
            toast.error(flash.error);
        }
    }, [flash]);

    const handleEdit = (category: Category) => {
        setSelectedCategory(category);
        setModalOpen(true);
    };

    const handleCreate = () => {
        setSelectedCategory(undefined);
        setModalOpen(true);
    };

    const columns = getColumns(handleEdit);

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Categories" />

            <div className="p-4">
                <div className="flex justify-between items-center mb-4">
                    <h1 className="text-xl font-bold">Categories</h1>
                    <Button onClick={handleCreate}>+ Add Category</Button>
                </div>

                <DataTable columns={columns} data={categories} />

                <CategoryFormModal
                    open={modalOpen}
                    onOpenChange={setModalOpen}
                    category={selectedCategory}
                />
            </div>
        </AppLayout>
    );
}
