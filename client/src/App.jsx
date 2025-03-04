import { useState } from 'react'
import './App.css'
import "tailwindcss";
import { Outlet } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';



function App() {
  const [count, setCount] = useState(0)

  return (
    <div className='w-[100vw] h-full min-h-screen bg-amber-200'>
      <Header />
      <main>
        <Outlet />
      </main>
      {/* <Footer /> */}
    </div>
  )
}

export default App
