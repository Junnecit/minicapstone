import AppLayout from '@/layouts/app-layout';
import { index as categoriesIndex } from '@/routes/categories';
import { type BreadcrumbItem } from '@/types';
import { Head } from '@inertiajs/react';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Categories',
        href: categoriesIndex().url,
    },
];

export default function Index() {
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Category" />

            <div className="p-4">
                <h1 className="text-xl font-bold mb-4">Category</h1>
            </div>
        </AppLayout>
    );
}
