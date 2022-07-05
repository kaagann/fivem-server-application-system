import React from 'react'
import {IoHome, IoFlagSharp} from 'react-icons/io5'
import {BsFillDiamondFill, BsBookmarkStarFill} from 'react-icons/bs'
import {FaUsers, FaUserSecret, FaBalanceScaleLeft} from 'react-icons/fa'
import {AiFillHeart} from 'react-icons/ai'
import { useNavigate } from 'react-router-dom'
import { REDIRECT_PATH } from '../utils/routes'

const Sidebar = () => {
    const navigate = useNavigate()
    return (
    <div className='h-full w-64 px-2 py-1 hidden md:block static'>
        <SideBarItem name="Genel">
            <Item onClick={() => navigate(REDIRECT_PATH.HOME)}>
                <IoHome/>
                <p>Anasayfa</p>
            </Item>

            <Item>
                <BsFillDiamondFill/>
                <p>Community</p>
            </Item>

            <Item>
                <FaUsers/>
                <p>Ekibimiz</p>
            </Item>

            <Item>
                <BsBookmarkStarFill/>
                <p>Dökümanlar</p>
            </Item>

        </SideBarItem>
        <SideBarItem name="Oyun İçi">
            <Item>
                <FaUsers/>
                <p>Karakterler</p>
            </Item>
            <Item>
                <FaUserSecret/>
                <p>Birlikler</p>
            </Item>
            <Item>
                <IoFlagSharp/>
                <p>LSPD</p>
            </Item>
            <Item>
                <AiFillHeart/>
                <p>LSMD</p>
            </Item>
            <Item>
                <FaBalanceScaleLeft/>
                <p>LSAS</p>
            </Item>
        </SideBarItem>

        <SideBarItem name="Başvuru">
            <Item onClick={() => navigate(REDIRECT_PATH.BASVURU)}>
                <FaUsers/>
                <p>Başvuru</p>
            </Item>
        </SideBarItem>

        <div className='absolute bottom-0 w-64 mb-5'>
            {/* <div className='border border-blue-500 text-center py-3 rounded-md hover:bg-blue-500 hover:text-black transition-all font-semibold scale-95 cursor-pointer'>
                <p>Oyuna Bağlan</p>
            </div> */}
        </div>
    </div>
  )
}

const Item = (props) => (
    <div onClick={props.onClick} className='flex items-center gap-5 my-3 text-2xl opacity-50 px-3 cursor-pointer hover:opacity-100 transition-all'>
        {props.children}
    </div>
)
const SideBarItem =  (props) => {
    // children

    return (
        <div className='px-2'>
            <p className='opacity-50 first-letter:uppercase my-2 font-bold'>{props.name}</p>
            {props.children}
        </div>
    )
}

export default Sidebar