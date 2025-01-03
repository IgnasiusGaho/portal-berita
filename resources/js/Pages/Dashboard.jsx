import PindahHalaman from '@/Components/Home/PindahHalaman';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Inertia } from '@inertiajs/inertia';
import { Link, Head } from '@inertiajs/react';
import { useEffect, useState } from 'react';

export default function Dashboard(props) {


    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [catagory, setCatagory] = useState('');
    const [pesan, setPesan] = useState(false);
    const [selectedBerita, setSelectedBerita] = useState([]);

    // Perbarui state `pesan` setiap kali props.flash.message berubah
    useEffect(() => {
        if (props.flash?.message) {
            setPesan(props.flash.message);
            // Menghapus pesan setelah 5 detik
            const timer = setTimeout(() => {
                setPesan('');
            }, 5000);
            return () => clearTimeout(timer); // Membersihkan timer saat komponen di-unmount
        }
    }, [props.flash]);

    useEffect(() => {
        if (!props.beritasaya) {
            Inertia.get('/berita')
        }
        return;

    }, [])

    const handleSubmit = () => {
        const data = { title, description, catagory };

        // Gunakan onSuccess untuk menangani flash message
        Inertia.post('/berita', data, {
            onSuccess: () => {
                setTitle('');
                setDescription('');
                setCatagory('');
            },
        });

    };


    const handleCheckboxChange = (id) => {
        setSelectedBerita(prevSelected => {
            if (prevSelected.includes(id)) {
                return prevSelected.filter(item => item !== id);
            } else {
                return [...prevSelected, id];
            }
        });
    };

    const handleDeleteSelected = () => {
        console.log('ID yang akan dikirim:', selectedBerita);
        console.log('Tipe data selectedBerita:', typeof selectedBerita);
        console.log('Apakah selectedBerita adalah array?', Array.isArray(selectedBerita));
        if (selectedBerita.length > 0) {
            Inertia.post('/berita/hapusbanyak', { ids: selectedBerita }, {
                onSuccess: () => {
                    setSelectedBerita([]); // Reset selected items after deletion
                },
            });
        } else {
            alert('Pilih berita yang ingin dihapus!');
        }
    };
    

    return (
        <AuthenticatedLayout
            header={
                <h2 className="text-xl font-semibold leading-tight text-gray-800 dark:text-gray-200">
                    Berita Saya
                </h2>
            }
        >
            <Head title="Dashboard" />

            <div className="py-12">
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                    <div className="overflow-hidden bg-white shadow-sm sm:rounded-lg dark:bg-gray-800">
                        <div>{pesan && <div role="alert" className="alert alert-success mb-4">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="h-6 w-6 shrink-0 stroke-current"
                                fill="none"
                                viewBox="0 0 24 24">
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="2"
                                    d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                            <span>{pesan}</span>
                        </div>}
                        </div>
                        <input
                            type="text"
                            placeholder="Judul"
                            className="input input-bordered w-full mb-2"
                            onChange={(title) => setTitle(title.target.value)}
                            value={title}
                        />
                        <input
                            type="text"
                            placeholder="Deskripsi"
                            className="input input-bordered min-w-full mb-2"
                            onChange={(description) => setDescription(description.target.value)}
                            value={description}
                        />
                        <input
                            type="text"
                            placeholder="Katagori"
                            className="input input-bordered w-full m-b2"
                            onChange={(catagory) => setCatagory(catagory.target.value)}
                            value={catagory}
                        />
                        <button className='btn btn-primary m-2' onClick={() => handleSubmit()}>SUBMIT</button>
                        {selectedBerita.length > 0 && (
                            <button className='btn btn-warning m-2' onClick={handleDeleteSelected}>Hapus Data yang Dipilih</button>
                        )}
                    </div>
                <div className='p-4 m-4 min-h-screen'>
                    {Array.isArray(props.berita.data) && props.berita.data.length > 0 ? (
                        props.berita.data.map((berita) => {
                            return (
                                <div key={berita.id} className="card bg-base-100 w-full  shadow-xl mb-2">
                                    <div className="card-body">
                                    <input
                                            type="checkbox"
                                            checked={selectedBerita.includes(berita.id)}
                                            onChange={() => handleCheckboxChange(berita.id)}
                                        />
                                        <h2 className="card-title">
                                            {berita.title}
                                            <div className="badge badge-secondary">NEW</div>
                                        </h2>
                                        <p>{berita.description}</p>
                                        <div className="card-actions justify-end">
                                            <div className="badge badge-intline">{berita.catagory}</div>
                                            <div className="badge badge-outline">
                                                <Link href={route('berita.edit')} method="get" data={{ id: berita.id }} as="button">
                                                    Edit
                                                </Link>
                                            </div>
                                            <div className="badge badge-outline">
                                                <Link href={route('berita.hapus')} method="post" data={{ id: berita.id }} as="button">
                                                    Delete
                                                </Link>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            );
                        })
                    ) : (
                        <p>Anda Belum memiliki Berita</p>
                    )}
                </div>
                <div className='flex justify-center items-center'>
                <PindahHalaman meta={props.berita.meta}/>
                </div>
                    </div>
            </div>
        </AuthenticatedLayout>
    );
}
