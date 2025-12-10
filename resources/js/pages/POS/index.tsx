import AppLayout from '@/layouts/app-layout';
import { useState } from 'react';
import { usePage } from '@inertiajs/react';
import { useCart } from '@/hooks/useCart';
import { ProductGrid } from '@/components/POS/ProductGrid';
import { ProductQuickView } from '@/components/POS/ProductQuickView';
import { CartSidebar } from '@/components/POS/CartSidebar';
import { MobileCartDrawer } from '@/components/POS/MobileCartDrawer';
import { CheckoutModal, CheckoutData } from '@/components/POS/CheckoutModal';
import { ReceiptPreview } from '@/components/POS/ReceiptPreview';
import { toast } from 'sonner';

interface Product {
  id: number;
  name: string;
  price: number;
  stock: number;
  image?: string;
  description?: string;
  category?: string;
  sku?: string;
}

interface PageProps {
  products: Product[];
}

export default function POSIndex() {
  const { props } = usePage();
  const products = (props as any).products as Product[];
  const csrfToken = (props as any).csrf_token || '';

  const { items, addToCart, removeItem, updateQuantity, getSubtotal, clearCart } = useCart();

  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [quickViewOpen, setQuickViewOpen] = useState(false);
  const [checkoutOpen, setCheckoutOpen] = useState(false);
  const [receiptOpen, setReceiptOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [transactionData, setTransactionData] = useState<any>(null);

  // Calculations
  const subtotal = getSubtotal();
  const tax = subtotal * 0.12; // 12% tax
  const discount = 0; // Can be dynamic
  const total = subtotal + tax - discount;

  // Handle product quick view
  const handleQuickView = (product: Product) => {
    setSelectedProduct(product);
    setQuickViewOpen(true);
  };

  // Handle add to cart
  const handleAddToCart = (product: Product, quantity: number) => {
    addToCart(product, quantity);
    toast.success(`${product.name} added to cart!`);
  };

  // Handle checkout
  const handleCheckout = () => {
    if (items.length === 0) {
      toast.error('Cart is empty');
      return;
    }
    setCheckoutOpen(true);
  };

  // Handle payment confirmation
  const handleConfirmPayment = async (data: CheckoutData) => {
    setIsLoading(true);

    try {
      const payloadData = {
        items: items.map((item) => ({
          id: item.id,
          quantity: item.quantity,
          price: item.price,
        })),
        subtotal,
        tax,
        discount,
        total,
        payment_method: data.paymentMethod,
        ...(data.paymentMethod === 'cash' && {
          amount_received: data.amountReceived,
        }),
        ...(data.paymentMethod === 'gcash' && {
          gcash_reference: data.gcashReference,
        }),
      };

      const response = await fetch('/pos/checkout', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'X-CSRF-Token': csrfToken,
        },
        body: JSON.stringify(payloadData),
      });

      // Check if response is JSON
      const contentType = response.headers.get('content-type');
      if (!contentType || !contentType.includes('application/json')) {
        const text = await response.text();
        console.error('Server returned non-JSON response:', text.substring(0, 500));
        toast.error('Server error: Invalid response format. Check browser console for details.');
        setIsLoading(false);
        return;
      }

      const result = await response.json();

      if (!response.ok) {
        toast.error(result.message || 'Checkout failed');
        setIsLoading(false);
        return;
      }

      if (!result.success) {
        toast.error(result.message || 'Transaction failed');
        setIsLoading(false);
        return;
      }

      // Set receipt data
      setTransactionData({
        reference_number: result.transaction.reference_number,
        items,
        subtotal,
        tax,
        discount,
        total,
        paymentMethod: data.paymentMethod,
        amountReceived: data.amountReceived,
        change: data.paymentMethod === 'cash' 
          ? data.amountReceived! - total 
          : undefined,
        gcashReference: data.gcashReference,
        timestamp: new Date().toLocaleString(),
      });

      // Clear cart and show receipt
      clearCart();
      setCheckoutOpen(false);
      setReceiptOpen(true);
      toast.success('Payment successful!');
    } catch (error) {
      console.error('Checkout error:', error);
      toast.error('An error occurred during checkout');
    } finally {
      setIsLoading(false);
    }
  };

  // Close receipt and reset data
  const handleCloseReceipt = () => {
    setReceiptOpen(false);
    setTransactionData(null);
  };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Products" />

            <div className="p-4">
                <h1 className="text-xl font-bold mb-4">Products CRUD</h1>

                {/* CREATE */}
                <form onSubmit={submit} className="mb-4">
                    <input
                        type="text"
                        placeholder="Product name"
                        className="border p-2 mr-2"
                        onChange={(e) => setData('name', e.target.value)}
                    />

                    <input
                        type="number"
                        placeholder="Price"
                        className="border p-2 mr-2"
                        onChange={(e) => setData('price', e.target.value)}
                    />

                    <button className="bg-blue-500 text-white px-4 py-2 rounded">
                        Add
                    </button>
                </form>

                {/* LIST */}
                <table className="w-full border">
                    <thead>
                        <tr className="bg-gray-100">
                            <th className="border p-2">ID</th>
                            <th className="border p-2">Name</th>
                            <th className="border p-2">Price</th>
                            <th className="border p-2">Actions</th>
                        </tr>
                    </thead>

                    <tbody>
                        {products.map((p) => (
                            <tr key={p.id}>
                                <td className="border p-2">{p.id}</td>
                                <td className="border p-2">{p.name}</td>
                                <td className="border p-2">{p.price}</td>
                                <td className="border p-2">

                                    <button
                                        onClick={() => update(p)}
                                        className="bg-yellow-500 text-white px-3 py-1 rounded mr-2"
                                    >
                                        Edit
                                    </button>

                                    <button
                                        onClick={() => remove(p.id)}
                                        className="bg-red-500 text-white px-3 py-1 rounded"
                                    >
                                        Delete
                                    </button>

                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {/* Products Grid */}
            {products.length > 0 ? (
              <ProductGrid products={products} onQuickView={handleQuickView} />
            ) : (
              <div className="text-center py-12">
                <p className="text-gray-500 text-lg">No products available</p>
              </div>
            )}
          </div>
        </div>

        {/* Desktop Cart Sidebar */}
        <div className="hidden lg:block">
          <CartSidebar
            items={items}
            subtotal={subtotal}
            tax={tax}
            total={total}
            onUpdateQuantity={updateQuantity}
            onRemoveItem={removeItem}
            onCheckout={handleCheckout}
            isLoading={isLoading}
          />
        </div>
      </div>

      {/* Quick View Dialog */}
      <ProductQuickView
        product={selectedProduct}
        open={quickViewOpen}
        onOpenChange={setQuickViewOpen}
        onAddToCart={handleAddToCart}
      />

      {/* Checkout Modal */}
      <CheckoutModal
        open={checkoutOpen}
        subtotal={subtotal}
        tax={tax}
        discount={discount}
        total={total}
        onClose={() => !isLoading && setCheckoutOpen(false)}
        onConfirm={handleConfirmPayment}
        isLoading={isLoading}
      />

      {/* Receipt Preview */}
      <ReceiptPreview
        open={receiptOpen}
        onClose={handleCloseReceipt}
        transactionData={transactionData}
      />
    </AppLayout>
  );
}
