import { useSelector } from 'react-redux';
import {
 signOutStart, signOutFailure, signOutSuccess
} from '../redux/user/userSlice';
import { useDispatch } from 'react-redux';


export default function Home() {
  const { currentUser } = useSelector((state) => state.user);
  const dispatch = useDispatch();

  const handleSignOut = async () => {
    try {
      dispatch(signOutStart());
      const res = await fetch('/api/auth/signout');
      const data = await res.json();
      if (data.success === false) {
        dispatch(signOutFailure(data.message));
        return;
      }
      dispatch(signOutSuccess(data));
    } catch (error) {
      dispatch(signOutFailure(error.message));
    }
  }


  return (
    <div className='p-3 max-w-lg mx-auto'>
      <h1 className='text-4xl font-semibold text-center my-7'>Profile</h1>

      <form className='flex flex-col gap-4'>

        <input type='text' defaultValue={currentUser.username} placeholder='username' className='border rounded-lg p-3 ' id='username' />

        <input type='email' defaultValue={currentUser.email} placeholder='email' className='border rounded-lg p-3 ' id='email' />

        <input type='password' placeholder='password' className='border rounded-lg p-3 ' id='password' />

        <button onClick={handleSignOut} className='bg-red-700 text-white rounded-lg p-3 uppercase  cursor-pointer'>Sign Out</button>

      </form>

    </div>
  )
}
