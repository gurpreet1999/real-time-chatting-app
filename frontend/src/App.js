import React from 'react'
import {BrowserRouter as Router,Routes,Route} from "react-router-dom"
import ChatPage from './pages/ChatPage'
import HomePage from './pages/HomePage'

const App = () => {
  return (
  
    <Router>

   
    <div className='app'>

<Routes>
  <Route path='/'   element={<HomePage/>}></Route>
  <Route path='/chat'   element={<ChatPage/>}></Route>



</Routes>



    </div>
    </Router>
  )
}

export default App