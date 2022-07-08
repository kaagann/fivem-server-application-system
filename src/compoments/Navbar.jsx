import React, { useRef, useState, useEffect } from 'react'
import { UserAuth } from '../context/AuthContext'
import Logo from "../resources/Logo.png"
import {IoIosNotificationsOutline, IoMdMail} from 'react-icons/io'
import {AiOutlineMenu} from 'react-icons/ai'
import {IoIosArrowDown} from 'react-icons/io'
import {FaUser, FaCog} from 'react-icons/fa'
import {MdOutlineExitToApp, MdAdminPanelSettings} from 'react-icons/md'
import { useNavigate } from 'react-router-dom'
import { REDIRECT_PATH } from '../utils/routes'

const Navbar = () => {
    const {user, logout, isAdmin} = UserAuth()
    const navigate = useNavigate()

    const handleLogout = async() => {
        try {
            await logout();
            navigate("/")
            console.log("you are logged out")
        } catch (err) {
            console.log(err.message)
        }
    }

    return (
        <div className='w-full flex items-center justify-between bg-[#1c262f]/60 px-4 py-2 fixed'>
            
            <section className='flex items-center gap-5'>
                <AiOutlineMenu className='text-3xl cursor-pointer block md:hidden'/>
                <img className='hidden md:block' src={Logo}/>
            </section>

            <section className='flex-row-reverse items-center gap-5 flex'>
                <div className='flex items-center gap-2'>
                    <div className='w-10 h-10 rounded-full bg-purple-500'></div>
                    <NavItem name={user.displayName}>
                        <Item>
                            <FaUser className='text-blue-500 group-hover:text-white'/>
                            <p>Profil</p>
                        </Item>
                        <Item>
                            <FaCog className='text-blue-500 group-hover:text-white'/>
                            <p>Ayarlar</p>
                        </Item>
                        {isAdmin ?                         
                        <Item onClick={() => navigate(REDIRECT_PATH.ADMIN)}>
                            <MdAdminPanelSettings className='text-blue-500 group-hover:text-white'/>
                            <p>Admin Paneli</p>
                        </Item> : ""}

                        <hr className='opacity-20'/>
                        <Item onClick={handleLogout}>
                            <MdOutlineExitToApp className='text-blue-500 group-hover:text-white'/>
                            <p>Çıkış Yap</p>
                        </Item>

                    </NavItem>
                    {/* <span className='text-lg font-bold first-letter:uppercase'></span> */}
                </div>
                <IoIosNotificationsOutline className='text-3xl cursor-pointer hidden md:block'/>
                <IoMdMail className='text-3xl cursor-pointer hidden md:block'/>
            </section>
            
        </div>
    )
}


const Item = (props) => (
    <div onClick={props.onClick} className='flex items-center gap-2 hover:bg-blue-500 p-2 m-2 rounded group transition-all'>
        {props.children}
    </div>
)

const NavItem = (props) => {
    const [open, setOpen] = useState(false);


    return (
        <div className='cursor-pointer '>
            <a className='flex items-center gap-1 'as onClick={() => setOpen(!open)}>
                {props.name} 
                <IoIosArrowDown/>
            </a>

            {open && <Menu>{props.children}</Menu>}
        </div>
    )
}

const Menu = (props) => {  


    return (
        <div className='absolute bg-black/70 w-64 right-0 mx-2 mt-5 rounded-md z-50'>
            {props.children}
        </div>
    )
}



export default Navbar