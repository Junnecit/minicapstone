<?php
// filepath: app/Models/Product.php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Product extends Model
{
    protected $fillable = [
        'name',
        'category_id',
        'SKU',
        'price',
        'cost',
        'stock_quantity',
        'image', // ✅ Add this
    ];

    public function category()
    {
        return $this->belongsTo(Category::class);
    }
}