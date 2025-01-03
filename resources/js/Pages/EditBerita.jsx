import { Inertia } from '@inertiajs/inertia';
import { Head } from '@inertiajs/react';
import { useState } from 'react';
import Navbar from '@/Components/Navbar';

export default function EditBerita(props) {
    console.log('Props :', props)
   
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [catagory, setCatagory] = useState('');
    

    const handleSubmit = () => {
        // kalau title/des/cat kosong, maka data yang di kirim adalah data default
        const data = { 
            id: props.beritasaya.id,
            title: title || props.beritasaya.title,
            description: description ||props.beritasaya.description,
            catagory: catagory|| props.beritasaya.catagory
        };

        // Gunakan onSuccess untuk menangani flash message
        Inertia.post('/berita/update', data)
            };

    return (
        <div className="py-12">
            <Head title={props.title} />
            <Navbar user={props.auth.user} />
            <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                <div className='p-4 text-2xl'>EDIT BERITA</div>
                <div className="overflow-hidden bg-white shadow-sm sm:rounded-lg dark:bg-gray-800">
                    <input
                        type="text"
                        placeholder="Judul"
                        className="input input-bordered w-full mb-2"
                        onChange={(title) => setTitle(title.target.value)}
                        defaultValue={props.beritasaya.title}
                    />
                    <input
                        type="text"
                        placeholder="Deskripsi"
                        className="input input-bordered min-w-full mb-2"
                        onChange={(description) => setDescription(description.target.value)}
                        defaultValue={props.beritasaya.description}
                    />
                    <input
                        type="text"
                        placeholder="Katagori"
                        className="input input-bordered w-full m-b2"
                        onChange={(catagory) => setCatagory(catagory.target.value)}
                        defaultValue={props.beritasaya.catagory}
                    />
                    <button className='btn btn-primary m-2' onClick={() => handleSubmit()}>UPDATE</button>

                </div>
            </div>

        </div>
    );
}