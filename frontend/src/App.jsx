import './App.css'

import { Outlet } from 'react-router-dom'
import Navbar from './components/Navbar'

import {ToastContainer} from "react-toastify";
import 'react-toastify/ReactToastify.css';

function App() {

  return (
    <div className='flex justify-center'>
      <div className='max-w-[1920px] w-full flex flex-col justify-center gap-10'>
        <ToastContainer/>
        <Navbar />
        <Outlet />
      </div>
    </div>
  )
}

export default App
