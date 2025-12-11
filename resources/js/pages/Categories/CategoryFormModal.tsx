import { useState } from 'react';
import { useForm } from '@inertiajs/react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogFooter,
} from '@/components/ui/dialog';
import { toast } from 'sonner';

interface Category {
    id: number;
    category_name: string;
}

interface CategoryFormModalProps {
    open: boolean;
    onOpenChange: (open: boolean) => void;
    category?: Category;
}

export function CategoryFormModal({ open, onOpenChange, category }: CategoryFormModalProps) {
    const { data, setData, post, put, processing, errors, reset } = useForm({
        category_name: category?.category_name || '',
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        
        const onSuccess = () => {
            toast.success(
                category
                    ? 'Category updated successfully!'
                    : 'Category created successfully!'
            );
            reset();
            onOpenChange(false);
        };

        const onError = () => {
            toast.error('Something went wrong');
        };

        if (category) {
            put(`/categories/${category.id}`, {
                onSuccess,
                onError,
            });
        } else {
            post('/categories', {
                onSuccess,
                onError,
            });
        }
    };

    const handleOpenChange = (newOpen: boolean) => {
        if (!newOpen) {
            reset();
        }
        onOpenChange(newOpen);
    };

    return (
        <Dialog open={open} onOpenChange={handleOpenChange}>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle>
                        {category ? 'Edit Category' : 'Create New Category'}
                    </DialogTitle>
                    <DialogDescription>
                        {category
                            ? 'Update the category name below.'
                            : 'Add a new category to your list.'}
                    </DialogDescription>
                </DialogHeader>

                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <Label htmlFor="category_name">Category Name *</Label>
                        <Input
                            id="category_name"
                            value={data.category_name}
                            onChange={(e) => setData('category_name', e.target.value)}
                            placeholder="Enter category name"
                            className={errors.category_name ? 'border-red-500' : ''}
                            autoFocus
                        />
                        {errors.category_name && (
                            <p className="text-red-500 text-sm mt-1">{errors.category_name}</p>
                        )}
                    </div>

                    <DialogFooter>
                        <Button
                            type="button"
                            variant="outline"
                            onClick={() => handleOpenChange(false)}
                            disabled={processing}
                        >
                            Cancel
                        </Button>
                        <Button type="submit" disabled={processing}>
                            {processing ? 'Saving...' : 'Save'}
                        </Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    );
}
