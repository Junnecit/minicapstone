<?php

use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use Laravel\Fortify\Features;
use App\Http\Controllers\ProductController;
use App\Http\Controllers\CategoryController;
use App\Http\Controllers\POSController;
use App\Http\Controllers\TransactionController;
<<<<<<< HEAD
use App\Http\Controllers\SaleController;
=======
use App\Http\Controllers\CustomerController;
use App\Http\Controllers\RepairPartsCategoryController;
use App\Http\Controllers\RepairPartsController;
use App\Http\Controllers\ServiceController;
use App\Http\Controllers\RefundController;
>>>>>>> ef61c757304cd0afdcb793d3fe97f77260fa4fea

Route::get('/', function () {
    if (auth()->check()) {
        return redirect()->route('dashboard');
    }
    return redirect()->route('login');
})->name('home');

Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('dashboard', function () {
        return Inertia::render('dashboard');
    })->name('dashboard');
    Route::resource('products', ProductController::class);
    Route::resource('categories', CategoryController::class);
    
    // POS Routes
    Route::get('pos', [POSController::class, 'index'])->name('pos.index');
    Route::post('pos/checkout', [POSController::class, 'checkout'])->name('pos.checkout');

    // Transaction Routes
    Route::get('transactions', [TransactionController::class, 'index'])->name('transactions.index');
    Route::get('transactions/{transaction}', [TransactionController::class, 'show'])->name('transactions.show');

<<<<<<< HEAD
    //Sales Routes
    Route::resource('sales', SaleController::class);
=======
    // Repair System Routes
    Route::resource('customers', CustomerController::class);
    Route::resource('repair-parts-categories', RepairPartsCategoryController::class);
    Route::resource('repair-parts', RepairPartsController::class);
    Route::resource('services', ServiceController::class);
    Route::resource('transactions-repair', TransactionController::class);
    Route::resource('refunds', RefundController::class);
>>>>>>> ef61c757304cd0afdcb793d3fe97f77260fa4fea

});

require __DIR__ . '/settings.php';
