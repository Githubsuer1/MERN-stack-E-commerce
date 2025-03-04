import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import Home from './components/Home.jsx'
import Contact from './components/Contact.jsx'
import About from './components/About.jsx'
import Products from './components/Products.jsx'
import Cart from './components/Cart.jsx';
import Login from './components/Login.jsx';
import Register from './components/Register.jsx';
import Store from './store/store.js'
import { Provider } from "react-redux";
import ProtectedRoute from './components/Protected.jsx'
// to use react-router-dom
import {createBrowserRouter,RouterProvider} from 'react-router-dom';




// creating routes
// const router = createBrowserRouter([
//   {
//     path: '/',
//     element: <App />,
//     children:[
//       {
//         path: '/',
//         element: <Home />,
//       },
//       {
//         path: '/contact',
//         element: <Contact />,
//       },
//       {
//         path:'/about',
//         element: <About />,
//       },
//       {
//         path:'/products',
//         element:<Products />
//       },
//       {
//         path:'/cart',
//         element:<Cart />
//       },
//       {
//         path:'/login',
//         element:<Login />
//       },
//       {
//         path:'/register',
//         element:<Register />
//       },
//     ]
//   }

// ]);

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      { path: "/contact", element: <Contact /> },
      { path: "/about", element: <About /> },
      { path: "/login", element: <Login /> },
      { path: "/register", element: <Register /> },

      // PROTECTED ROUTES
      {
        element: <ProtectedRoute />, 
        children: [
          { path: "/", element: <Home /> },
          { path: "/cart", element: <Cart /> },
          { path: "/products", element: <Products /> },
        ],
      },
    ],
  },
]);


createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Provider store={Store}>
      <RouterProvider router={router}>
        <App />
      </RouterProvider>
    </Provider>
  </StrictMode>,
)
