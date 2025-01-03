<?php

namespace App\Http\Controllers;

use App\Http\Resources\BeritaKoleksi;
use App\Models\berita;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Support\Facades\Log;

use function Pest\Laravel\delete;

class BeritaController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $berita = new BeritaKoleksi(Berita::orderbydesc('id')->paginate(8));
        return Inertia::render('Home', [
            'title' => 'Berita Save',
            'description' => 'Berita Save adalah sebuah website yang menyajikan informasi terbaru dan terupdate',
            'berita' => $berita,
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $berita = new berita();
        // title dari data base berita sumbernya dari title yang ada di frontend
        $berita->title = $request->title;
        $berita->description = $request->description;
        $berita->catagory = $request->catagory;
        $berita->penulis = auth()->user()->name;
        $berita->save();
        return redirect()->back()->with('message', 'Bertita berhasil ditambahkan');
    }

    /**
     * Display the specified resource.
     */
    public function show(berita $berita)
    {
        // Filter data berdasarkan penulis sebelum membuat BeritaKoleksi
        $beritasaya = Berita::where('penulis', auth()->user()->name)->get();
        // Filter meta berdasarkan penulis
        $berita = new BeritaKoleksi(Berita::where('penulis', auth()->user()->name) ->orderByDesc('id')->paginate(8));

        return Inertia::render('Dashboard', [
            'beritasaya' => $beritasaya,
            'berita' => $berita,
        ]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(berita $berita, Request $request)
    {
        // memanggil halaman edit berita berdasarkan id yang di kirim dari halaman depan
        return Inertia::render('EditBerita', [
            'beritasaya' => $berita->find($request->id)
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, berita $berita)
    {
        Berita::where('id', $request->id)->update([
            'title' => $request->title,
            'description' => $request->description,
            'catagory' => $request->catagory,
        ]);
        return to_route('dashboard')->with('massage', 'Update Berita Berhasil');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Request $request)
    {
        $hapusberita = Berita::find($request->id);
        $hapusberita->delete();
        return redirect()->back()->with('message', 'Bertita berhasil dihapus');
    }
    
    public function hapusBanyak(Request $request)
    {
        Log::info('ID yang akan dihapus: ' . json_encode($request->ids));

        $request->validate([
            'ids' => 'required|array', // Pastikan ids adalah array
            'ids.*' => 'exists:beritas,id', // Pastikan setiap id ada di tabel beritas
        ]);

        // Hapus data yang dipilih
        Berita::whereIn('id', $request->ids)->delete();
  

        return redirect()->route('dashboard')->with('flash', 'Berita yang dipilih berhasil dihapus!');
    }

}
