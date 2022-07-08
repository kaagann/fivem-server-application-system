import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { UserAuth } from '../context/AuthContext'
import { REDIRECT_PATH, REDIRECT_TO_URL } from '../utils/routes'

function AuthPage() {
    const [loginValues, setLogin] = useState({email: "", password: ""})
    const {signIn} = UserAuth()
    const navigate = useNavigate()

    const login = async() => {
        try {
            await signIn(loginValues.email, loginValues.password)
            navigate(REDIRECT_PATH.HOME)
        } catch(e) {
            console.error(e)
        }
    }

    return (
        <div className='h-screen'>
            <div className='w-full h-full flex flex-col items-center justify-center'>

                <div className='my-4'>
                    <h1 className='font-bold text-5xl text-center text-white'>Giriş Yap</h1>
                    <p className='text-white/50 text-2xl'>Mercury Orion Roleplay</p>
                </div>

                <div className='w-2/4 md:w-1/4'>
                    <div className='my-3'>
                        <p className='text-white/70 text-xl md:text-2xl my-1'>Mail Adresi</p>
                        <input value={loginValues.email} onChange={(e) => setLogin({...loginValues, email: e.target.value})} className='w-full text-white px-2 bg-white/5 p-[0.5rem 1rem] min-h-[42px] border border-white/30 rounded-lg my-1 outline-none focus:ring-2 ring-blue-500'/>
                    </div>

                    <div className='my-3'>
                        <div className='flex items-center justify-between'>
                            <p className='text-white/70 text-2xl my-1'>Şifre</p>
                            <p className='text-white/70 hidden md:block text-xl my-1 hover:underline cursor-pointer'>Şifremi unuttum?</p>
                        </div>
                        <input type="password" value={loginValues.password} onChange={(e) => setLogin({...loginValues, password: e.target.value})}  className='w-full text-white px-2 bg-white/5 p-[0.5rem 1rem] min-h-[42px] border border-white/30 rounded-lg my-1 outline-none ring-blue-500 focus:ring-2'/>
                        <p className='text-white/70 block md:hidden text-sm  my-1 hover:underline cursor-pointer'>Şifremi unuttum?</p>
                    </div>

                    <button  
                        className='text-white text-center border-2 border-blue-500 w-full h-[42px] p-[0.5rem 1rem] rounded-lg my-3 hover:bg-blue-500 transition-all font-semibold hover:text-black'
                        onClick={login}
                        >
                        Giriş Yap
                    </button>

                    <p className='text-white/70 text-center font-semibold'>Henüz bir hesabın yok mu? <span onClick={() => navigate(REDIRECT_PATH.REGISTER)} className='underline text-blue-500 cursor-pointer'>Kayıt Ol</span>.</p>

                    <hr className='my-3  border-white/30'/>

                    <div className='grid  grid-cols-1 md:grid-cols-3 gap-2'>
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

export default AuthPage