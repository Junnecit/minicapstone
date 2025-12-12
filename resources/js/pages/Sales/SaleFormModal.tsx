import { useState, useEffect } from 'react';
import { router } from '@inertiajs/react';
import { toast } from 'sonner';
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select';

export interface Sale {
    id?: number;
    product_id: number;
    product_name: string;
    customer_name: string;
    quantity: number;
    price: number;
    total: number;
    sale_date: string;
}

export interface Product {
    id: number;
    name: string;
    price: number;
    stock_quantity: number;
}

interface SaleFormModalProps {
    open: boolean;
    onOpenChange: (open: boolean) => void;
    sale?: Sale;
    products: Product[];
}

export function SaleFormModal({ open, onOpenChange, sale, products }: SaleFormModalProps) {
    const [isProcessing, setIsProcessing] = useState(false);
    const [formData, setFormData] = useState({
        product_id: '',
        customer_name: '',
        quantity: '',
        price: '',
        total: '',
        sale_date: '',
    });
    const [errors, setErrors] = useState<Record<string, string>>({});

    // Initialize form when sale changes or modal opens
    useEffect(() => {
        if (open && sale) {
            setFormData({
                product_id: sale.product_id.toString(),
                customer_name: sale.customer_name || '',
                quantity: sale.quantity.toString(),
                price: sale.price.toString(),
                total: sale.total.toString(),
                sale_date: sale.sale_date || '',
            });
        } else if (open && !sale) {
            setFormData({
                product_id: '',
                customer_name: '',
                quantity: '',
                price: '',
                total: '',
                sale_date: '',
            });
        }
        setErrors({});
    }, [open, sale]);

    const handleInputChange = (field: string, value: string) => {
        setFormData(prev => {
            const updated = { ...prev, [field]: value };

            // Auto-calculate total if quantity or price changes
            if (field === 'quantity' || field === 'price') {
                const quantity = parseFloat(updated.quantity) || 0;
                const price = parseFloat(updated.price) || 0;
                updated.total = (quantity * price).toFixed(2);
            }

            // Auto-fill price if product changes
            if (field === 'product_id') {
                const product = products.find(p => p.id.toString() === value);
                if (product) updated.price = product.price.toString();
                const quantity = parseFloat(updated.quantity) || 0;
                updated.total = (quantity * (product?.price || 0)).toFixed(2);
            }

            return updated;
        });

        if (errors[field]) {
            setErrors(prev => {
                const newErrors = { ...prev };
                delete newErrors[field];
                return newErrors;
            });
        }
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setIsProcessing(true);
        setErrors({});

        const data = new FormData();
        data.append('product_id', formData.product_id);
        data.append('customer_name', formData.customer_name);
        data.append('quantity', formData.quantity);
        data.append('price', formData.price);
        data.append('total', formData.total);
        data.append('sale_date', formData.sale_date);

        if (sale?.id) {
            data.append('_method', 'PUT');
            router.post(`/sales/${sale.id}`, data, {
                onSuccess: () => {
                    toast.success('Sale updated successfully!');
                    setIsProcessing(false);
                    onOpenChange(false);
                },
                onError: (errors: any) => {
                    setErrors(errors);
                    toast.error('Failed to update sale');
                    setIsProcessing(false);
                },
            });
        } else {
            router.post('/sales', data, {
                onSuccess: () => {
                    toast.success('Sale created successfully!');
                    setIsProcessing(false);
                    onOpenChange(false);
                },
                onError: (errors: any) => {
                    setErrors(errors);
                    toast.error('Failed to create sale');
                    setIsProcessing(false);
                },
            });
        }
    };

    const handleDialogClose = (open: boolean) => {
        if (!open) {
            setFormData({
                product_id: '',
                customer_name: '',
                quantity: '',
                price: '',
                total: '',
                sale_date: '',
            });
            setErrors({});
        }
        onOpenChange(open);
    };

    return (
        <Dialog open={open} onOpenChange={handleDialogClose}>
            <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
                <DialogHeader>
                    <DialogTitle>{sale ? 'Edit Sale' : 'Add New Sale'}</DialogTitle>
                    <DialogDescription>
                        {sale ? 'Update the sale details below.' : 'Fill in the form to create a new sale.'}
                    </DialogDescription>
                </DialogHeader>

                <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <Label htmlFor="product">Product *</Label>
                            <Select
                                value={formData.product_id}
                                onValueChange={(value) => handleInputChange('product_id', value)}
                            >
                                <SelectTrigger>
                                    <SelectValue placeholder="Select product" />
                                </SelectTrigger>
                                <SelectContent>
                                    {products.map(p => (
                                        <SelectItem key={p.id} value={p.id.toString()}>
                                            {p.name}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                            {errors.product_id && (
                                <p className="text-red-500 text-sm mt-1">{errors.product_id}</p>
                            )}
                        </div>

                        <div>
                            <Label htmlFor="customer_name">Customer Name *</Label>
                            <Input
                                id="customer_name"
                                value={formData.customer_name}
                                onChange={(e) => handleInputChange('customer_name', e.target.value)}
                                placeholder="Enter customer name"
                                className={errors.customer_name ? 'border-red-500' : ''}
                            />
                            {errors.customer_name && (
                                <p className="text-red-500 text-sm mt-1">{errors.customer_name}</p>
                            )}
                        </div>

                        <div>
                            <Label htmlFor="quantity">Quantity *</Label>
                            <Input
                                id="quantity"
                                type="number"
                                value={formData.quantity}
                                onChange={(e) => handleInputChange('quantity', e.target.value)}
                                placeholder="0"
                                className={errors.quantity ? 'border-red-500' : ''}
                            />
                            {errors.quantity && (
                                <p className="text-red-500 text-sm mt-1">{errors.quantity}</p>
                            )}
                        </div>

                        <div>
                            <Label htmlFor="price">Price (₱) *</Label>
                            <Input
                                id="price"
                                type="number"
                                step="0.01"
                                value={formData.price}
                                onChange={(e) => handleInputChange('price', e.target.value)}
                                placeholder="0.00"
                                className={errors.price ? 'border-red-500' : ''}
                            />
                            {errors.price && (
                                <p className="text-red-500 text-sm mt-1">{errors.price}</p>
                            )}
                        </div>

                        <div>
                            <Label htmlFor="total">Total (₱)</Label>
                            <Input
                                id="total"
                                value={formData.total}
                                readOnly
                            />
                        </div>

                        <div>
                            <Label htmlFor="sale_date">Sale Date *</Label>
                            <Input
                                id="sale_date"
                                type="date"
                                value={formData.sale_date}
                                onChange={(e) => handleInputChange('sale_date', e.target.value)}
                                className={errors.sale_date ? 'border-red-500' : ''}
                            />
                            {errors.sale_date && (
                                <p className="text-red-500 text-sm mt-1">{errors.sale_date}</p>
                            )}
                        </div>
                    </div>

                    <div className="flex gap-2 pt-4 justify-end">
                        <Button
                            type="button"
                            variant="outline"
                            onClick={() => handleDialogClose(false)}
                            disabled={isProcessing}
                        >
                            Cancel
                        </Button>
                        <Button type="submit" disabled={isProcessing}>
                            {isProcessing ? 'Saving...' : 'Save'}
                        </Button>
                    </div>
                </form>
            </DialogContent>
        </Dialog>
    );
}
