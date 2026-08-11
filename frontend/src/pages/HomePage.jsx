import React from 'react'
import Sidebar from '../components/SideBar'
import NoChatSelected from '../components/NoChatSelected'
import ChatContainer from '../components/ChatContainer'
import { useChatStore } from '../store/useChatStore'

const HomePage = () => {
  const { selectedUser } = useChatStore()

  return (
    <div className="h-screen bg-base-200 flex flex-col">
      <div className="flex flex-1 overflow-hidden pt-16 lg:pt-0 lg:items-center lg:justify-center lg:pt-20 lg:px-4 lg:pb-4">
        <div className="bg-base-100 lg:rounded-lg shadow-cl w-full max-w-6xl h-full lg:h-[calc(100vh-8rem)] flex overflow-hidden">

          {/* SIDEBAR — full width on mobile (when no user), fixed width on desktop */}
          <div className={`
            ${selectedUser ? 'hidden lg:flex' : 'flex'}
            w-full lg:w-auto flex-shrink-0
          `}>
            <Sidebar />
          </div>

          {/* CHAT AREA — full width on mobile (when user selected), flex-1 on desktop */}
          <div className={`
            ${selectedUser ? 'flex' : 'hidden lg:flex'}
            flex-1 flex-col min-w-0
          `}>
            {selectedUser ? <ChatContainer /> : <NoChatSelected />}
          </div>

        </div>
      </div>
    </div>
  )
}

export default HomePage