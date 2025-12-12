import { CartItem } from '@/hooks/useCart';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { Trash2, Minus, Plus } from 'lucide-react';

interface CartSidebarProps {
  items: CartItem[];
  subtotal: number;
  tax: number;
  total: number;
  onUpdateQuantity: (id: number, quantity: number) => void;
  onRemoveItem: (id: number) => void;
  onCheckout: () => void;
  isLoading?: boolean;
}

export function CartSidebar({
  items,
  subtotal,
  tax,
  total,
  onUpdateQuantity,
  onRemoveItem,
  onCheckout,
  isLoading = false,
}: CartSidebarProps) {
  return (
    <div className="w-96 bg-white border-l border-gray-200 flex flex-col h-screen shadow-lg">
      {/* Header */}
      <div className="p-6 border-b bg-gray-50">
        <h2 className="text-xl font-bold text-gray-900">Shopping Cart</h2>
        <p className="text-sm text-gray-500">{items.length} items</p>
      </div>

      {/* Items */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {items.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-full text-gray-400">
            <div className="text-5xl mb-2 animate-bounce">🛒</div>
            <p className="text-lg">Your cart is empty</p>
          </div>
        ) : (
          items.map((item) => (
            <div
              key={item.id}
              className="border rounded-xl p-4 space-y-2 shadow-sm hover:shadow-md transition-shadow duration-200"
            >
              <div className="flex justify-between items-start">
                <div>
                  <h4 className="font-semibold text-sm">{item.name}</h4>
                  <p className="text-xs text-gray-600">
                    ${item.price.toFixed(2)}/unit
                  </p>
                </div>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => onRemoveItem(item.id)}
                  className="text-red-500 hover:text-red-700"
                >
                  <Trash2 className="w-4 h-4" />
                </Button>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center gap-1 bg-gray-100 rounded-lg p-1">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() =>
                      onUpdateQuantity(item.id, item.quantity - 1)
                    }
                    className="h-8 w-8 rounded-full hover:bg-gray-200 transition"
                  >
                    <Minus className="w-3 h-3" />
                  </Button>
                  <span className="w-6 text-center text-sm font-medium">
                    {item.quantity}
                  </span>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() =>
                      onUpdateQuantity(item.id, item.quantity + 1)
                    }
                    className="h-8 w-8 rounded-full hover:bg-gray-200 transition"
                  >
                    <Plus className="w-3 h-3" />
                  </Button>
                </div>
                <span className="font-bold">
                  ${(item.price * item.quantity).toFixed(2)}
                </span>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Footer */}
      {items.length > 0 && (
        <div className="border-t p-6 space-y-4 bg-gray-50">
          <div className="space-y-2 text-sm">
            <div className="flex justify-between">
              <span className="text-gray-600">Subtotal:</span>
              <span className="font-semibold">${subtotal.toFixed(2)}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Tax:</span>
              <span className="font-semibold">${tax.toFixed(2)}</span>
            </div>
          </div>

          <Separator />

          <div className="flex justify-between text-lg font-bold text-gray-900">
            <span>Total:</span>
            <span className="text-green-600">₱{total.toFixed(2)}</span>
          </div>

          <Button
            onClick={onCheckout}
            disabled={items.length === 0 || isLoading}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white h-12 font-semibold rounded-lg transition-all"
          >
            {isLoading ? 'Processing...' : 'Proceed to Checkout'}
          </Button>
        </div>
      )}
    </div>
  );
}
