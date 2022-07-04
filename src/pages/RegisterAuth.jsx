import { getAuth } from 'firebase/auth';
import React from 'react'
import { useState } from 'react';
import { useNavigate } from 'react-router-dom'
import { UserAuth } from '../context/AuthContext'
import { REDIRECT_PATH, REDIRECT_TO_URL } from '../utils/routes';

const RegisterAuth = () => {
    const navigate = useNavigate();
    const {createUser, updateUser} = UserAuth();
    const [registerValues, setRegisterValues] = useState({
        email: "",
        password: "",
        username: "",
    });

    const register = async() => {
        try {
            let createdUser = await createUser(registerValues.email, registerValues.password);
            navigate(REDIRECT_PATH.HOME);
            updateUser({
                displayName: registerValues.username,
            })
        } catch(e) {
            console.error(e);
        }
    }

    return (
        <div className='h-screen'>
                <div className='w-full h-full flex flex-col items-center justify-center'>

                    <div className='my-4'>
                        <h1 className='font-bold text-5xl text-center text-white'>Kayıt Ol</h1>
                        <p className='text-white/50 text-2xl'>Mercury Orion Roleplay</p>
                    </div>

                    <div className='w-1/4'>
                        <div className='my-3'>
                            <p className='text-white/70 text-2xl my-1'>Mail Adresi</p>
                            <input value={registerValues.email} onChange={(e) => setRegisterValues({...registerValues, email: e.target.value})} className='w-full text-white px-2 bg-white/5 p-[0.5rem 1rem] min-h-[42px] border border-white/30 rounded-lg my-1 outline-none focus:ring-2 ring-blue-500'/>
                        </div>

                        <div className='my-3'>
                            <p className='text-white/70 text-2xl my-1'>Kullancı Adı</p>
                            <input value={registerValues.username} onChange={(e) => setRegisterValues({...registerValues, username: e.target.value})} className='w-full text-white px-2 bg-white/5 p-[0.5rem 1rem] min-h-[42px] border border-white/30 rounded-lg my-1 outline-none focus:ring-2 ring-blue-500'/>
                        </div>

                        <div className='my-3'>
                            <div className='flex items-center justify-between'>
                                <p className='text-white/70 text-2xl my-1'>Şifre</p>
                                <p className='text-white/70 text-xl my-1 hover:underline cursor-pointer'>Şifremi unuttum?</p>
                            </div>
                            <input type="password" value={registerValues.password} onChange={(e) => setRegisterValues({...registerValues, password: e.target.value})}  className='w-full text-white px-2 bg-white/5 p-[0.5rem 1rem] min-h-[42px] border border-white/30 rounded-lg my-1 outline-none ring-blue-500 focus:ring-2'/>
                        </div>

                        <button  
                            className='text-white text-center border-2 border-blue-500 w-full h-[42px] p-[0.5rem 1rem] rounded-lg my-3 hover:bg-blue-500 transition-all font-semibold hover:text-black'
                            onClick={register}
                            >
                            Kayıt Ol
                        </button>

                        <p className='text-white/70 text-center font-semibold'>Zaten bir hesabın var mı? <span onClick={() => navigate(REDIRECT_PATH.AUTH)} className='underline text-blue-500 cursor-pointer'>Giriş Yap</span>.</p>

                        <hr className='my-3  border-white/30'/>

                        <div className='grid grid-cols-3 gap-2'>
                            <div onClick={() => REDIRECT_TO_URL("https://discord.gg/morp")} className='text-white hover:text-black font-semibold border-2 border-blue-500 flex items-center justify-center py-2 px-3 rounded-lg cursor-pointer transition-all hover:bg-blue-500'>
                                Discord
                            </div>         
                            <div onClick={() => REDIRECT_TO_URL("https://www.instagram.com/mercuryorionrp/")} className='text-white hover:text-black font-semibold border-2 border-blue-500 flex items-center justify-center py-2 px-3 rounded-lg cursor-pointer transition-all hover:bg-blue-500'>
                                Instagram
                            </div>    
                            <div onClick={() => REDIRECT_TO_URL("https://www.youtube.com/channel/UCxxGaF3Wub5Cv9tqOclpn5A")} className='text-white hover:text-black font-semibold border-2 border-blue-500 flex items-center justify-center py-2 px-3 rounded-lg cursor-pointer transition-all hover:bg-blue-500'>
                                Youtube
                            </div>    
                        </div>

                    </div>
                </div>
        </div>
    )
}

export default RegisterAuth
