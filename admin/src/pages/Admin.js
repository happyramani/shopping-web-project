import React from 'react'
import SlideBar from '../components/SlideBar'
import { Route, Routes } from 'react-router-dom'
import AddProduct from '../components/AddProduct'
import ListProduct from '../components/ListProduct'

function Admin() {
  return (
    <div className='lg:flex'>
      <SlideBar/>
      <Routes>
        <Route path="/addproduct" element={<AddProduct/>}/>
        <Route path="/listproduct" element={<ListProduct/>}/>
      </Routes>
    </div>
  )
}

export default Admin