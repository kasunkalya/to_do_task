<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Task extends Model
{
    use HasFactory;

    // Define the table name if it's different from the default 'tasks'
    protected $table = 'tasks';

    // Allow mass assignment for title and description
    protected $fillable = ['title', 'description', 'status'];

    // Define default values (optional)
    protected $attributes = [
        'status' => 'pending', // Default status
    ];
}
