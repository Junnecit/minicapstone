import { Button } from '@/components/ui/button';
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import { useEffect, useState } from 'react';

interface CheckoutModalProps {
    open: boolean;
    subtotal: number;
    tax: number;
    discount: number; // initial discount in currency
    total: number; // subtotal + tax - discount
    onClose: () => void;
    onConfirm: (data: CheckoutData) => void;
    isLoading?: boolean;
}

export interface CheckoutData {
    paymentMethod: 'cash' | 'gcash';
    amountReceived?: number;
    gcashReference?: string;
    discount?: number;
}

export function CheckoutModal({
    open,
    subtotal,
    tax,
    discount,
    total,
    onClose,
    onConfirm,
    isLoading = false,
}: CheckoutModalProps) {
    const [paymentMethod, setPaymentMethod] = useState<'cash' | 'gcash'>(
        'cash',
    );
    const [amountReceived, setAmountReceived] = useState('');
    const [gcashReference, setGcashReference] = useState('');
    const [internalDiscount, setInternalDiscount] = useState<number>(0);
    const [internalTotal, setInternalTotal] = useState(total);
    const [error, setError] = useState('');

    // Reset form when modal closes
    useEffect(() => {
        if (!open) {
            setAmountReceived('');
            setGcashReference('');
            setInternalDiscount(discount || 0);
            setInternalTotal(total);
            setPaymentMethod('cash');
            setError('');
        }
    }, [open, discount, total]);

    // Recalculate total whenever subtotal, tax, or discount changes
    useEffect(() => {
        const calculatedTotal = subtotal + tax - internalDiscount;
        setInternalTotal(parseFloat(calculatedTotal.toFixed(2)));
    }, [subtotal, tax, internalDiscount]);

    const amountNum = parseFloat(amountReceived) || 0;
    const change = Math.max(0, amountNum - internalTotal);
    const isCashValid = amountNum >= internalTotal;
    const isGcashValid = gcashReference.trim().length > 0;

    const handleConfirm = () => {
        setError('');

        if (paymentMethod === 'cash') {
            if (!isCashValid) {
                setError('Insufficient cash amount');
                return;
            }
            onConfirm({
                paymentMethod: 'cash',
                amountReceived: amountNum,
                discount: internalDiscount,
            });
        } else {
            if (!isGcashValid) {
                setError('GCash reference number is required');
                return;
            }
            onConfirm({
                paymentMethod: 'gcash',
                gcashReference: gcashReference.trim(),
                discount: internalDiscount,
            });
        }
    };

    return (
        <Dialog open={open} onOpenChange={onClose}>
            <DialogContent
                className="max-w-md"
                aria-describedby="checkout-description"
            >
                <DialogHeader>
                    <DialogTitle>Checkout</DialogTitle>
                    <div id="checkout-description" className="sr-only">
                        Complete your purchase by selecting a payment method
                    </div>
                </DialogHeader>

                <div className="space-y-4">
                    {/* Payment Method Selector */}
                    <div className="space-y-2">
                        <Label>Payment Method</Label>
                        <div className="flex gap-2">
                            <Button
                                variant={
                                    paymentMethod === 'cash'
                                        ? 'default'
                                        : 'outline'
                                }
                                onClick={() => {
                                    setPaymentMethod('cash');
                                    setError('');
                                }}
                                className="flex-1"
                            >
                                💵 Cash
                            </Button>
                            <Button
                                variant={
                                    paymentMethod === 'gcash'
                                        ? 'default'
                                        : 'outline'
                                }
                                onClick={() => {
                                    setPaymentMethod('gcash');
                                    setError('');
                                }}
                                className="flex-1"
                            >
                                📱 GCash
                            </Button>
                        </div>
                    </div>

          {/* Summary */}
          <div className="space-y-2 bg-gray-50 p-4 rounded-lg text-sm border">
            <div className="flex justify-between">
              <span className="text-gray-600">Subtotal:</span>
              <span>${subtotal.toFixed(2)}</span>
            </div>
            {tax > 0 && (
              <div className="flex justify-between">
                <span className="text-gray-600">Tax:</span>
                <span>${tax.toFixed(2)}</span>
              </div>
            )}
            {discount > 0 && (
              <div className="flex justify-between text-green-600">
                <span>Discount:</span>
                <span>-${discount.toFixed(2)}</span>
              </div>
            )}
            <Separator />
            <div className="flex justify-between font-bold text-lg">
              <span>Total:</span>
              <span className="text-blue-600">${total.toFixed(2)}</span>
            </div>
          </div>

                    {/* Cash Payment */}
                    {paymentMethod === 'cash' && (
                        <div className="space-y-3">
                            {/* Discount Input */}
                            <div className="space-y-2">
                                <Label htmlFor="discount">Discount (₱)</Label>
                                <Input
                                    id="discount"
                                    type="number"
                                    step="0.01"
                                    min="0"
                                    max={subtotal + tax}
                                    placeholder="0.00"
                                    value={internalDiscount}
                                    onChange={(e) => {
                                        const value = parseInt(
                                            e.target.value,
                                            10,
                                        );
                                        setInternalDiscount(
                                            isNaN(value) ? 0 : value,
                                        );
                                    }}
                                    className="text-lg font-semibold"
                                    disabled={isLoading}
                                    autoFocus
                                />
                            </div>

                            {/* Amount Received */}
                            <div className="space-y-2">
                                <Label htmlFor="amount">Amount Received</Label>
                                <Input
                                    id="amount"
                                    type="number"
                                    step="0.01"
                                    min="0"
                                    placeholder="0.00"
                                    value={amountReceived}
                                    onChange={(e) =>
                                        setAmountReceived(e.target.value)
                                    }
                                    className="text-lg font-semibold"
                                    disabled={isLoading}
                                    autoFocus
                                />
                            </div>

              {amountReceived && (
                <div className="bg-blue-50 p-3 rounded border border-blue-200 space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Amount:</span>
                    <span className="font-semibold">${amountNum.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span>Total:</span>
                    <span className="font-semibold">${total.toFixed(2)}</span>
                  </div>
                  <Separator />
                  <div className="flex justify-between font-bold text-green-600">
                    <span>Change:</span>
                    <span className="text-lg">${change.toFixed(2)}</span>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* GCash Payment */}
          {paymentMethod === 'gcash' && (
            <div className="space-y-3">
              <div className="space-y-2">
                <Label htmlFor="gcash-ref">GCash Reference Number</Label>
                <Input
                  id="gcash-ref"
                  type="text"
                  placeholder="e.g., GCX-XXXXX-XXXXX"
                  value={gcashReference}
                  onChange={(e) => {
                    setGcashReference(e.target.value);
                    setError('');
                  }}
                  className="font-semibold"
                  disabled={isLoading}
                  autoFocus
                />
              </div>
              <div className="bg-green-50 p-3 rounded border border-green-200">
                <p className="text-sm text-gray-700">
                  <strong>Total Amount:</strong> ${total.toFixed(2)}
                </p>
                <p className="text-xs text-gray-600 mt-2">
                  Please ensure the reference number matches the GCash receipt.
                </p>
              </div>
            </div>
          )}

                    {/* Error */}
                    {error && (
                        <div className="rounded border border-red-200 bg-red-50 p-3 text-sm text-red-700">
                            {error}
                        </div>
                    )}

                    {/* Actions */}
                    <div className="flex justify-end gap-2 pt-4">
                        <Button
                            variant="outline"
                            onClick={onClose}
                            disabled={isLoading}
                        >
                            Cancel
                        </Button>
                        <Button
                            onClick={handleConfirm}
                            disabled={
                                isLoading ||
                                (paymentMethod === 'cash'
                                    ? !isCashValid
                                    : !isGcashValid)
                            }
                            className="bg-blue-600 hover:bg-blue-700"
                        >
                            {isLoading ? 'Processing...' : 'Complete Payment'}
                        </Button>
                    </div>
                </div>
            </DialogContent>
        </Dialog>
    );
}
