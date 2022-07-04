import React from 'react'
import Navbar from './Navbar'
import Sidebar from './Sidebar'

function PageContent({children}) {
  return (
    <div className='text-white h-full'>
        <Navbar/>
        <div className='w-full flex'>
            <Sidebar/>
            <div className='flex-1 w-full h-full px-2 py-1'>
                {children}
            </div>
        </div>
    </div>
  )
}

export default PageContent