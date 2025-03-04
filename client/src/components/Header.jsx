import React, { useState } from 'react'
import { Link, useNavigate } from "react-router-dom";
import { MdOutlineMenu } from "react-icons/md";
import { MdClose } from "react-icons/md";
import { MdOutlineShoppingCart } from "react-icons/md";
import { useSelector, useDispatch } from 'react-redux';
import { logout } from "../store/authSlice"


const Header = () => {
  const [open,setOpen] = useState(false);
  const token = useSelector((state)=>state.auth.token);
  const user = useSelector((state)=>state.auth.user);
  const dispatch = useDispatch();
  const navigate = useNavigate(); // For redirection
  // console.log(token)
  // Logout function
  const handleLogout = () => {
    dispatch(logout());
    navigate("/login"); // Redirect to login page
  };

  return (
    <header className='h-16 w-full bg-black flex items-center justify-between relative'>
      {/* nav-menu */}
        <div className='w-1/3'>
        
          <div className={`${open?"absolute top-0 left-0 w-[50%] sm:w-1/5 min-h-screen bg-black/70":""}`}>

            {/* Open/Close Icon */}
            <button
              className={`text-amber-400 p-4 transition-all duration-500 linear ${open ? "" : "hover:bg-white/20"}`}
              onClick={() => setOpen((prev) => !prev)}
            >
              {open ? <MdClose size={36} /> : <MdOutlineMenu size={36} />}
            </button>
            {/* Navigation Links */}
            {open && (
              <ul className="text-amber-400 p-4 list-none">
                <li><Link to="/">Home</Link></li>
                <li><Link to="/about">About</Link></li>
                <li><Link to="/contact">Contact</Link></li>

                {token ? 
                  (
                    <>
                      <li><Link to="/cart">Cart</Link></li>
                      <li><Link to="/products">Products</Link></li>
                      <li><button onClick={handleLogout}>Logout</button></li>
                    </>   
                  ) : (
                    <li><Link to="/login">Login or Register</Link></li>
                  )
                }
              </ul>
              )}
          </div>
        </div>

      {/* logo */}
      <div className='w-1/3 flex items-center justify-center'>
        <Link 
          className='sm:text-3xl p-4 text-2xl font-bold text-amber-400
           transition-all duration-500 linear 
           hover:bg-white/20' 
          to="/"
          >
          Shopistyle
        </Link>
      </div>


      {/* cart icon */}
      <div className='w-1/3 flex items-center justify-end'>
      <span className='bg-red-500 text-amber-400 font-bold rounded-full text-sm px-1.5 absolute top-2 right-3'>0</span>
        <Link 
          to="/"
          className='p-4 text-amber-400 rounded 
           transition-all duration-500 linear 
           hover:bg-white/20'>
          <MdOutlineShoppingCart size={36}/>
        </Link>
      </div>
    </header>
  )
}

export default Header