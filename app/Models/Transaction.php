<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Transaction extends Model
{
    protected $fillable = [
        'reference_number',
        'subtotal',
        'tax',
        'discount',
        'total',
        'payment_method',
        'amount_received',
        'change',
        'gcash_reference',
        'completed_at',
    ];

    protected $casts = [
        'subtotal' => 'decimal:2',
        'tax' => 'decimal:2',
        'discount' => 'decimal:2',
        'total' => 'decimal:2',
        'amount_received' => 'decimal:2',
        'change' => 'decimal:2',
        'completed_at' => 'datetime',
    ];

    public function items(): HasMany
    {
        return $this->hasMany(TransactionItem::class);
    }

    public static function generateReferenceNumber(): string
    {
        return 'TRX-' . date('YmdHis') . '-' . random_int(1000, 9999);
    }
}
