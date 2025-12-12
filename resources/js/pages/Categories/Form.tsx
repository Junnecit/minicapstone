import AppLayout from '@/layouts/app-layout';
import { index as categoriesIndex } from '@/routes/categories';
import { type BreadcrumbItem } from '@/types';
import { useForm, Head, Link, usePage } from '@inertiajs/react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useEffect } from 'react';
import { toast } from 'sonner';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Categories',
        href: categoriesIndex().url,
    },
];

interface Props {
    category?: {
        id: number;
        category_name: string;
    };
}

export default function Form({ category }: Props) {
    const { data, setData, post, put, processing, errors } = useForm({
        category_name: category?.category_name || '',
    });
    const { props } = usePage();
    const flash = props.flash as any;

    useEffect(() => {
        if (flash?.success) {
            toast.success(flash.success);
        }
        if (flash?.error) {
            toast.error(flash.error);
        }
    }, [flash]);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (category) {
            put(`/categories/${category.id}`);
        } else {
            post('/categories');
        }
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title={category ? 'Edit Category' : 'Create Category'} />

            <div className="max-w-2xl mx-auto p-6">
                <h1 className="text-2xl font-bold mb-6">
                    {category ? 'Edit' : 'Create'} Category
                </h1>

                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <Label htmlFor="category_name">Category Name *</Label>
                        <Input
                            id="category_name"
                            value={data.category_name}
                            onChange={(e) => setData('category_name', e.target.value)}
                            placeholder="Enter category name"
                            className={errors.category_name ? 'border-red-500' : ''}
                        />
                        {errors.category_name && (
                            <p className="text-red-500 text-sm mt-1">{errors.category_name}</p>
                        )}
                    </div>

                    <div className="flex gap-2 pt-4">
                        <Button type="submit" disabled={processing}>
                            {processing ? 'Saving...' : 'Save'}
                        </Button>
                        <Link href="/categories">
                            <Button type="button" variant="outline">
                                Cancel
                            </Button>
                        </Link>
                    </div>
                </form>
            </div>
        </AppLayout>
    );
}
