import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import DashSidebar from '../components/dashboard/DashSidebar';
import DashProfile from '../components/dashboard/DashProfile';
import DashPosts from '../components/dashboard/DashPosts';
import DashUsers from '../components/dashboard/DashUsers';
import DashComments from '../components/dashboard/DashComments';
import DashboardComp from '../components/dashboard/DashboardComp';
import CreateListing from './CreateListing';
import DashboardChat from '../components/dashboard/DashboardChat';
import MessagePage from '../components/chat/MessagePage';

export default function Dashboard() {
  const location = useLocation();
  const [tab, setTab] = useState('dash');
  const [id, setId] = useState("");
  useEffect(() => {
    const urlParams = new URLSearchParams(location.search);
    // console.log(urlParams.get(tab))
    const tabFromUrl = urlParams.get('tab');
    const id = urlParams.get('id');
    setId(id);
    // console.log(id);
    if (tabFromUrl) {
      setTab(tabFromUrl);
    }
  }, [location.search]);
  return (
    <div className='min-h-screen flex flex-col md:flex-row'>
      <div className='md:w-56'>
        {/* Sidebar */}
        <DashSidebar />
      </div>
      {/* profile... */}
      {tab === 'profile' && <DashProfile />}
      {/* create post */}
      {tab === 'post' && <CreateListing />}
      {/* posts... */}
      {tab === 'posts' && <DashPosts />}
      {/* users */}
      {tab === 'users' && <DashUsers />}
      {/* comments  */}
      {tab === 'comments' && <DashComments />}
      {/* dashboard comp */}
      {tab === 'dash' && <DashboardComp />}
      {/* dashboard chat */}
      {tab === 'chat' && <DashboardChat />}
      {/* individual message */}
      {(tab === 'chat' &&  id ) && <MessagePage params={{userId:id}} />}
    </div>
  );
}
