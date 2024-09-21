import axios from 'axios'
import  { useEffect, useRef } from 'react'
import { useDispatch } from 'react-redux'
import {  useLocation, useNavigate } from 'react-router-dom'
import { logout, setOnlineUser, setSocketConnection, setUser }from '../../features/chat/chatSlice'
import Sidebar from './Sidebar'
import io from 'socket.io-client'

const Home = () => {
  // const user = useSelector(state => state.chat)
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const location = useLocation()
  const basePath = useRef("");

  // console.log('user',user)
  useEffect(()=>{
    const fetchUserDetails = async()=>{
      try {
          const URL = `${import.meta.env.VITE_APP_BACKEND_URL}/api/user/user-details`
          // console.log(URL)
          const response = await axios({
            url : URL,
            withCredentials : true
          })
          // console.log("response,   hhfkjdfh",response)
          dispatch(setUser(response.data.data))

          if(response.data.data.logout){
              dispatch(logout())
              navigate("/signin")
          }
          // console.log("current user Details",response)
      } catch (error) {
          console.log("error",error)
      }
    }

    fetchUserDetails()
  },[dispatch, navigate])

  /***socket connection */
  useEffect(()=>{
    const socketConnection = io(import.meta.env.VITE_APP_BACKEND_URL,{
      auth : {
        token : localStorage.getItem('token')
      },
    })

    socketConnection.on('onlineUser',(data)=>{
      // console.log(data)
      dispatch(setOnlineUser(data))
    })

    dispatch(setSocketConnection(socketConnection))

    return ()=>{
      socketConnection.disconnect()
    }
  },[dispatch])



  // console.log(user)
  // /dashboard?tab=chat
  
  useEffect(() => {
    if (location.pathname === '/dashboard' && location.search === '?tab=chat') {
      // Perform actions when the location is /dashboard?tab=chat

      basePath.current = "/";
    } else {
      basePath.current = "";
    }
  }, [location]);

  
  return (
    <div >
      <div className='grid lg:grid-cols-[300px,1fr] h-screen max-h-screen '>
          <section className={`bg-white ${!basePath.current && "hidden"} lg:block`}>
             <Sidebar/>
          </section>
          <div className={`flex  justify-center items-end flex-col gap-10 ${!basePath.current ? "hidden" : "lg:flex" }`}>
              <div className=''>
                <img
                  src="https://www.salesmate.io/blog/wp-content/uploads/2021/11/20-Best-Live-Chat-Software-Services-to-Use-in-2021.jpg"
                  className="rounded-full w-32 h-32 object-cover"
                  alt='logo'
                />
              </div>
              <p className='text-lg mt-2 text-slate-500'>Select user to send message</p>
          </div>
      </div>
    </div>
  )
}

export default Home
