import { Box } from '@chakra-ui/react'
import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import ChatBox from '../components/miscellenous/ChatBox'
import MyChat from '../components/miscellenous/MyChat'
import SideDrawer from '../components/miscellenous/SideDrawer'




const ChatPage = () => {

const {user}=useSelector(state=>state.user)
  
  return (
    <div  style={{ width: "100%" }}> 
          {user && <SideDrawer />}
      <Box display="flex" justifyContent="space-between" w="100%" h="91.5vh" p="10px">
    {user && <MyChat  />}
    {user && (
      <ChatBox />
    )}
  </Box>
  </div>
  )
}

export default ChatPage