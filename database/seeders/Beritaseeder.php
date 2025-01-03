<?php

namespace Database\Seeders;

use App\Models\Berita;
use Database\Factories\beritafactoryFactory;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class Beritaseeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run()
    {
        
        Berita::factory()->count(100)->create();
    }
}
