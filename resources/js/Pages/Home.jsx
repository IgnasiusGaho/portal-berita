import DaftarBerita from '@/Components/Home/DaftarBerita';
import PindahHalaman from '@/Components/Home/PindahHalaman';
import Navbar from '@/Components/Navbar';
import { Head, Link } from '@inertiajs/react';
import React from 'react';

export default function Home(props){
    console.log ('Props :',props)
    return (
        <div className='bg-slate-50 min-h-screen' >
            <Head title={props.title}/>
            <Navbar user={props.auth.user}/>
            <div className='flex justify-center flex-col lg:flex-row lg:flex-wrap lg:items-stretch items-center gap-4 p-4'>
                <DaftarBerita berita={props.berita.data}/>
            </div>
            <div className='flex justify-center items-center'>
                <PindahHalaman meta={props.berita.meta}/>
            </div>
        </div>
    )
}