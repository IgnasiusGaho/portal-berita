const TampilBerita=(berita)=>{
    return berita .map ((data, i) => {
        return <div key = {i} className="card bg-base-100 w-96 shadow-xl">
                <figure>
                    <img
                    src="https://img.daisyui.com/images/stock/photo-1606107557195-0e29a4b5b4aa.webp"
                    alt="Shoes" />
                </figure>
                <div className="card-body">
                    <h2 className="card-title">
                    {data.title}
                    <div className="badge badge-secondary">NEW</div>
                    </h2>
                    <p>{data.description}</p>
                    <div className="card-actions justify-end">
                    <div className="badge badge-intline">{data.catagory}</div>
                    <div className="badge badge-outline">{data.penulis}</div>
                    </div>
                </div>
            </div>
    })
}

const Tidakadaberita =() =>{
    return (
        <div>
            Saat ini tidak ada berita tersedia!!!
        </div>
    )
}

const DaftarBerita=({berita})=>{
    // jika berita kosong maka tampil tidak ada berita, kalau ada akan tampil berita
    return !berita ? Tidakadaberita () : TampilBerita(berita)
}


export default DaftarBerita