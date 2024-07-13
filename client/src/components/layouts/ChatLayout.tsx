import Sidebar from '@/components/chats/Sidebar';
import { Outlet } from 'react-router-dom';

interface IProps {}

export default function ChatLayout({}: IProps) {
  return (
    <div className='flex h-screen'>
      <Sidebar />
      <Outlet />
    </div>
  );
}
