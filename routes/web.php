<?php

use App\Http\Controllers\BeritaController;
use App\Http\Controllers\ProfileController;
use App\Http\Resources\BeritaKoleksi;
use App\Models\Berita;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

// Route::get('/', function () {
//     return Inertia::render('Welcome', [
//         'canLogin' => Route::has('login'),
//         'canRegister' => Route::has('register'),
//         'laravelVersion' => Application::VERSION,
//         'phpVersion' => PHP_VERSION,
//     ]);
// });

Route::get('/dashboard', function () {
    
    $berita = new BeritaKoleksi(Berita::where('penulis', auth()->user()->name) ->orderByDesc('id')->paginate(8));
    return Inertia::render('Dashboard',[
        'berita' => $berita,
    ]);
})->middleware(['auth', 'verified'])->name('dashboard');

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});


Route::get('/test', function () {
    return response('<h1> Testing Aman </h1>');
});

route::get('/',[BeritaController::class , 'index'])->middleware(['auth', 'verified'])->name('index1');
route::post('/berita',[BeritaController::class , 'store'])->middleware(['auth', 'verified'])->name('beritatambah');
route::get('/berita',[BeritaController::class , 'show'])->middleware(['auth', 'verified'])->name('beritatampil');
route::get('/berita/edit',[BeritaController::class , 'edit'])->middleware(['auth', 'verified'])->name('berita.edit');
route::post('/berita/update',[BeritaController::class , 'update'])->middleware(['auth', 'verified'])->name('berita.update');
route::post('/berita/hapus',[BeritaController::class , 'destroy'])->middleware(['auth', 'verified'])->name('berita.hapus');
Route::post('/berita/hapusbanyak', [BeritaController::class, 'hapusBanyak'])->middleware(['auth', 'verified'])->name('berita.hapusbanyak');




require __DIR__.'/auth.php';
