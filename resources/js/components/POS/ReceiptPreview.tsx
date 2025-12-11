import { Button } from '@/components/ui/button';
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
} from '@/components/ui/dialog';
import { CartItem } from '@/hooks/useCart';
import html2canvas from 'html2canvas';
import { Download, Printer } from 'lucide-react';
import { useRef } from 'react';
import { useReactToPrint } from 'react-to-print';


interface ReceiptPreviewProps {
    open: boolean;
    onClose: () => void;
    transactionData: {
        reference_number: string;
        items: CartItem[];
        subtotal: number;
        tax: number;
        discount: number;
        total: number;
        paymentMethod: 'cash' | 'gcash';
        amountReceived?: number;
        change?: number;
        gcashReference?: string;
        timestamp: string;
    } | null;
}

export function ReceiptPreview({
    open,
    onClose,
    transactionData,
}: ReceiptPreviewProps) {
    const printRef = useRef<HTMLDivElement>(null);

    const handlePrint = useReactToPrint({
        contentRef: printRef,
        pageStyle: `
      @page {
        size: a4;
        margin: 10mm;
      }
      @media print {
        body {
          margin: 0;
          padding: 0;
        }
      }
    `,
    });

    if (!transactionData) return null;

    return (
        <Dialog open={open} onOpenChange={onClose}>
            <DialogContent className="max-h-screen max-w-2xl overflow-y-auto">
                <DialogHeader>
                    <DialogTitle>Receipt Preview</DialogTitle>
                </DialogHeader>

<<<<<<< HEAD
                {/* Printable Receipt */}
                <div
                    ref={printRef}
                    className="space-y-4 bg-white p-8 text-sm print:space-y-2 print:p-0"
                >
                    {/* Header */}
                    <div className="space-y-2 border-b-2 border-gray-800 pb-4 text-center">
                        <h2 className="text-2xl font-bold">MY STORE</h2>
                        <p className="text-xs text-gray-600">
                            Professional Point of Sale
                        </p>
                        <p className="text-xs text-gray-600">
                            Receipt #{transactionData.reference_number}
                        </p>
                        <p className="text-xs text-gray-600">
                            {transactionData.timestamp}
                        </p>
                    </div>
=======
        {/* Printable Receipt */}
        <div
          ref={printRef}
          className="bg-white p-8 space-y-4 print:p-0 print:space-y-2 text-sm"
        >
          {/* Header */}
          <div className="text-center space-y-2 pb-4 border-b-2 border-gray-800">
            <h2 className="text-2xl font-bold">CELLUB</h2>
            <p className="text-xs text-gray-600">Professional Point of Sale</p>
            <p className="text-xs text-gray-600">Receipt #{transactionData.reference_number}</p>
            <p className="text-xs text-gray-600">{transactionData.timestamp}</p>
          </div>
>>>>>>> 2ed229e62c0db40a52a7d1b338716046be45d1fa

                    {/* Items Table */}
                    <div className="space-y-2">
                        <table className="w-full text-left text-xs">
                            <thead className="border-b border-gray-400">
                                <tr>
                                    <th className="pb-1">Item</th>
                                    <th className="pb-1 text-right">Qty</th>
                                    <th className="pb-1 text-right">Price</th>
                                    <th className="pb-1 text-right">Total</th>
                                </tr>
                            </thead>
                            <tbody className="space-y-1">
                                {transactionData.items.map((item) => (
                                    <tr
                                        key={item.id}
                                        className="border-b border-gray-200"
                                    >
                                        <td className="py-1">{item.name}</td>
                                        <td className="py-1 text-right">
                                            {item.quantity}
                                        </td>
                                        <td className="py-1 text-right">
                                            ₱{item.price.toFixed(2)}
                                        </td>
                                        <td className="py-1 text-right">
                                            ₱
                                            {(
                                                item.price * item.quantity
                                            ).toFixed(2)}
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>

                    {/* Summary */}
                    <div className="space-y-1 border-t-2 border-gray-800 pt-2">
                        <div className="flex justify-between">
                            <span>Subtotal:</span>
                            <span>₱{transactionData.subtotal.toFixed(2)}</span>
                        </div>
                        {transactionData.tax > 0 && (
                            <div className="flex justify-between">
                                <span>Tax (12%):</span>
                                <span>₱{transactionData.tax.toFixed(2)}</span>
                            </div>
                        )}
                        {transactionData.discount > 0 && (
                            <div className="flex justify-between text-green-600">
                                <span>Discount:</span>
                                <span>
                                    -₱{transactionData.discount.toFixed(2)}
                                </span>
                            </div>
                        )}
                        <div className="flex justify-between border-t-2 border-gray-800 pt-1 text-base font-bold">
                            <span>TOTAL:</span>
                            <span>₱{transactionData.total.toFixed(2)}</span>
                        </div>
                    </div>

                    {/* Payment Info */}
                    <div className="space-y-1 border-t-2 border-gray-800 pt-2">
                        {transactionData.paymentMethod === 'cash' ? (
                            <>
                                <div className="flex justify-between">
                                    <span>Payment Method:</span>
                                    <span className="font-semibold">CASH</span>
                                </div>
                                <div className="flex justify-between">
                                    <span>Amount Received:</span>
                                    <span>
                                        ₱
                                        {transactionData.amountReceived?.toFixed(
                                            2,
                                        )}
                                    </span>
                                </div>
                                <div className="flex justify-between text-base font-bold">
                                    <span>Change:</span>
                                    <span>
                                        ₱{transactionData.change?.toFixed(2)}
                                    </span>
                                </div>
                            </>
                        ) : (
                            <>
                                <div className="flex justify-between">
                                    <span>Payment Method:</span>
                                    <span className="font-semibold">GCASH</span>
                                </div>
                                <div className="flex justify-between">
                                    <span>Reference:</span>
                                    <span className="font-mono">
                                        {transactionData.gcashReference}
                                    </span>
                                </div>
                            </>
                        )}
                    </div>

                    {/* Footer */}
                    <div className="space-y-1 border-t-2 border-gray-800 pt-4 text-center">
                        <p className="text-sm font-bold">Thank You!</p>
                    </div>
                </div>

                {/* Actions */}
                <div className="flex justify-end gap-2 pt-4 print:hidden">
                    <Button variant="outline" onClick={onClose}>
                        Close
                    </Button>
                    <Button
                        onClick={handlePrint}
                        className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700"
                    >
                        <Printer className="h-4 w-4" />
                        Print Receipt
                    </Button>
                    <Button
                        onClick={async () => {
                            if (!printRef.current) return;

                            try {
                                // Render the element as canvas
                                const canvas = await html2canvas(
                                    printRef.current,
                                    { scale: 2 },
                                );

                                // Convert canvas to image
                                const dataURL = canvas.toDataURL('PDF/png');

                                // Create a download link
                                const link = document.createElement('a');
                                link.href = dataURL;
                                link.download = `receipt-${transactionData.reference_number}.png`;
                                link.click();
                            } catch (error) {
                                console.error('Failed to save receipt:', error);
                            }
                        }}
                        className="flex items-center gap-2 bg-green-600 hover:bg-green-700"
                    >
                        <Download className="h-4 w-4" />
                        Save
                    </Button>
                </div>
            </DialogContent>
        </Dialog>
    );
}
