import React from 'react'
import { Container } from '@material-ui/core'
import Navbar from './components/Navbar/Navbar'
import Home from './components/Home/Home'
import Auth from './components/Auth/Auth'

import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom'
import PostDetails from './components/PostDetails/PostDetails'

const App = () => {
    const user = JSON.parse(localStorage.getItem('profile'))

    return (
        <Router>
            <Container maxWidth='xl'>
                <Navbar></Navbar>
                <Routes>
                    <Route path='/' exact element={<Navigate to='posts' />}></Route>
                    <Route path='/posts' exact element={<Home />}></Route>
                    <Route path='/posts/search' exact element={<Home />}></Route>
                    <Route path='/posts/:id' element={<PostDetails />}></Route>
                    <Route path='/auth' exact element={!user ? <Auth /> : <Navigate to='/posts' />}></Route>
                </Routes>
            </Container>
        </Router>
    )
}

export default App
