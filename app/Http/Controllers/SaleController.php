<?php

namespace App\Http\Controllers;

use App\Models\Sale;
use App\Models\Product;
use Illuminate\Http\Request;
use Inertia\Inertia;

class SaleController extends Controller
{
    /**
     * Display a listing of sales.
     */
    public function index()
    {
        $sales = Sale::all(); // Or ->with('product') if you have a relation
        $products = Product::all();

        return Inertia::render('Sales/Index', [
            'sales' => $sales,
            'products' => $products,
            'flash' => session()->all(), // pass flash messages for toast
        ]);
    }

    /**
     * Store a new sale.
     */
    public function store(Request $request)
    {
        $request->validate([
            'product_name' => 'required|string|max:255',
            'quantity' => 'required|integer|min:1',
            'price' => 'required|numeric|min:0',
            'sale_date' => 'required|date',
        ]);

        $total = $request->quantity * $request->price;

        $sale = Sale::create([
            'product_name' => $request->product_name,
            'quantity' => $request->quantity,
            'price' => $request->price,
            'total' => $total,
            'customer_name' => $request->customer_name,
            'sale_date' => $request->sale_date,
        ]);

        // For Inertia, redirect back with a flash message
        return redirect()->back()->with('success', 'Sale recorded successfully');
    }

    /**
     * Show a specific sale (optional for API).
     */
    public function show($id)
    {
        $sale = Sale::findOrFail($id);
        return Inertia::render('Sales/Show', [
            'sale' => $sale
        ]);
    }

    /**
     * Update an existing sale.
     */
    public function update(Request $request, $id)
    {
        $sale = Sale::findOrFail($id);

        $request->validate([
            'product_name' => 'required|string|max:255',
            'quantity' => 'required|integer|min:1',
            'price' => 'required|numeric|min:0',
            'sale_date' => 'required|date',
        ]);

        $sale->update([
            'product_name' => $request->product_name,
            'quantity' => $request->quantity,
            'price' => $request->price,
            'total' => $request->quantity * $request->price,
            'customer_name' => $request->customer_name,
            'sale_date' => $request->sale_date,
        ]);

        return redirect()->back()->with('success', 'Sale updated successfully');
    }

    /**
     * Delete a sale.
     */
    public function destroy($id)
    {
        $sale = Sale::findOrFail($id);
        $sale->delete();

        return redirect()->back()->with('success', 'Sale deleted successfully');
    }
}
