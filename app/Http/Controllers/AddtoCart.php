<?php

namespace App\Http\Controllers;
use Illuminate\Http\Request;
use App\Models\Product;

class AddtoCart extends Controller
{
    public function addToCart(Request $request)
    {
        $product = Product::findOrFail($request->id);

        if ($product->stock < $request->quantity) {
            return response()->json([
                'success' => false,
                'message' => 'Insufficient stock'
            ], 400);
        }

        // Subtract stock immediately
        $product->stock -= $request->quantity;
        $product->save();

        return response()->json([
            'success' => true,
            'message' => 'Item added & stock updated'
        ]);
    }
}
