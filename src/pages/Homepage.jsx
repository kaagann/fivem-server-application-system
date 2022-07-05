import React, {useEffect, useState} from 'react'
import { useNavigate } from 'react-router-dom';
import {UserAuth} from '../context/AuthContext'
import { collection, getDocs, onSnapshot, query } from "firebase/firestore"; 
import { database } from '../utils/firebase';

import {IoIosPlay} from "react-icons/io"
import {FaUser} from "react-icons/fa"
import Navbar from '../compoments/Navbar';
import Sidebar from '../compoments/Sidebar';

const Homepage = () => {
    const {user, logout} = UserAuth();
    const navigate = useNavigate();


    return (
        // <div className='flex items-center justify-center'>
        //     <h1 className='text-2xl'>Bakımda!</h1>
        // </div>
        <HomeContent/>
    )
}


const HomeContent = () => {

    const [newsFire, setNews] = useState([]);


    useEffect(() => {
        const questionRef = collection(database, "news")
        const q = query(questionRef);
        let x = []
        onSnapshot(q, (snapshot) => {
            snapshot.forEach((doc) => {
                x.push({
                    id: doc.id,
                    ...doc.data()
                })
            })
            setNews(x);
        })
    }, [])

    const Announcment = () => {
        return (
            <div className=' bg-gray-500/20 p-4 rounded-md'>    
                <div className='flex items-center gap-2 text-5xl text-white'>
                    <IoIosPlay className='text-white hidden md:block'/>
                    <h1 className='font-semibold'>Rol Ekibi Başvuruları Açıldı</h1>
                </div>

                <span className='font-semibold my-2'>Başvurmak için aşağıdaki butona basın!</span>
                <hr className='border-gray-600 my-2'/>
                <div className='flex justify-end gap-2'>
                    <button className='btn w-1/2 md:w-1/4 mt-2 !border-orange-600 hover:bg-orange-600'>Bilgi Al!</button>
                    <button className='btn w-1/2 md:w-1/4 mt-2'>Başvuru Yap!</button>
                </div>
            </div>
        )
    }

    const Card = () => (
        <div className='px-2 py-4 rounded bg-gray-500/10'>
            <h1 className='font-bold text-md mb-1 opacity-80'>Şehir Ekonomisi</h1>
            <h2 className='text-2xl font-bold font-fena'>$19.071.382,38</h2>
            
            <div className='mt-2'>
                <p className='text-sm opacity-50 flex items-center gap-2'><FaUser/> 28.3% geçen haftaya oranla artış</p>
                <p className='text-sm opacity-50 flex items-center gap-2'><FaUser/> 28.3% geçen haftaya oranla artış</p>
                <p className='text-sm opacity-50 flex items-center gap-2'><FaUser/> 28.3% geçen haftaya oranla artış</p>
            </div>

        </div>
    )

    const News = ({data}) => {
        return (
            <div className='bg-gray-500/10 p-2 rounded-md'>
                <div className='flex items-center justify-between my-1'>
                    <h1 className='text-md'>{data.header}.</h1>
                    <p className='lowercase text-sm opacity-70 hidden md:block'>Birkaç dakika önce</p>
                </div>
                <img  src='https://media.discordapp.net/attachments/957578454021324810/980510507272405082/unknown.png'/>
                <span className='text-base opacity-80 line-clamp mt-2'>{data.desc}</span>
            </div>
        )
    }

    return (
        <div className='w-full h-full overflow-y-auto px-5'>
            <div className='grid grid-cols-1 md:grid-cols-2 gap-2 mx-4 my-1'>
                <Announcment/>
                <Announcment/>
            </div>

            <div className='grid grid-cols-1 sm:grid-cols-1 md:grid-cols-4 mx-4 my-4 gap-2'>
                <Card/>
                <Card/>
                <Card/>
                <Card/>
            </div>

            <p className='opacity-50 first-letter:uppercase my-2 font-bold mx-4 text-2xl border-b-2 w-fit'>Haberler</p>

            <div className='grid grid-cols-1 md:grid-cols-3 mx-4 gap-2'>
                {newsFire.map((haber) => <News data={haber}/>)}
            </div>
.
            <div className='w-full relative grid grid-cols-1 md:grid-cols-2 gap-2'>
                <div>
                    <p 
                        className='opacity-50 first-letter:uppercase my-2 font-bold mx-4 text-2xl border-b-2 w-fit'
                    >
                        Aktif Oyuncular
                    </p>
                    <AktifOyuncular/>
                </div>


                <div>
                    <p 
                        className='opacity-50 first-letter:uppercase my-2 font-bold mx-4 text-2xl border-b-2 w-fit'
                    >
                        Aktif Birlikler
                    </p>
                    <AktifBirimler/>
                </div>
            </div>


        </div>
    )
}



const AktifOyuncular = () => {
    return (
        <table className='w-full border rounded mx-4'>
            <thead className='w-full p-2'>
                <tr className='border-b-2 m-2'>
                    <th>#</th>
                    <th>Ad</th>
                    <th>Soyad</th>
                    <th>Oynama Saati</th>
                </tr>
            </thead>


            <tbody>
                <tr className='border-b'>
                    <th>1</th>
                    <th>Kagan</th>
                    <th>Cengiz</th>
                    <th>15000 saat</th>
                </tr>

                <tr className='border-b'>
                    <th>1</th>
                    <th>Kagan</th>
                    <th>Cengiz</th>
                    <th>15000 saat</th>
                </tr>

                <tr className='border-b'>
                    <th>1</th>
                    <th>Kagan</th>
                    <th>Cengiz</th>
                    <th>15000 saat</th>
                </tr>

                

            </tbody>

        </table>
    )
}


const AktifBirimler = () => {
    // Birlik	Tür	DoC	Los Santos
    return (
        <table className='w-full border rounded mx-4 text-center'>
            <thead className='w-full p-2'>
                <tr className='border-b-2 m-2'>
                    <th>#</th>
                    <th>Birlik</th>
                    <th>Tür</th>
                    <th>DoC</th>
                    <th>Los Santos</th>
                </tr>
            </thead>

            {/* Los Santos Police Department	Devlet	%100	%95 */}
            <tbody>
                <tr className='border-b'>
                    <th>1</th>
                    <th>Los Santos Police Department</th>
                    <th>Devlet</th>
                    <th>%100</th>
                    <th>%95</th>
                </tr>

                <tr className='border-b'>
                    <th>1</th>
                    <th>Los Santos Police Department</th>
                    <th>Devlet</th>
                    <th>%100</th>
                    <th>%95</th>
                </tr>
                

            </tbody>

        </table>
    )
}


export default Homepage