import React from 'react'
import { useSelector,useDispatch } from 'react-redux';
import { fetchUser } from '../store/authSlice';

const Home = () => {
  const dispatch = useDispatch();
  const token = useSelector((state) => state.auth.token);
  const user = useSelector((state) => state.auth.user)

  React.useEffect(() => {
    if (token) {
        dispatch(fetchUser());
    }
}, [token, dispatch]);


  // console.log(user.name)
  // find products here
  return (
    <div className='w-full h-full min-h-screen bg-amber-200'>
      <h1 className="text-2xl font-bold">Welcome to Shopistyle,Your E-commerce Store</h1>
      {user ? (
        <p className="text-lg text-black/80">Hi {user.name}, you are logged in!</p>
      ) : (
        <p className="text-lg text-red-500">Log in to explore...</p>
      )}
    </div>
  )
}

export default Home