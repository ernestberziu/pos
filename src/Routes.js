import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import { LoginContainer, MainContainer, NewOrder, Products, Settings } from './pages'


export const Router = () =>
    <BrowserRouter>
        <Routes>
            <Route path='/' element={<MainContainer />} >
                <Route index element={<Navigate to='/newOrder' />} />
                <Route path='newOrder' element={<NewOrder />} />
                <Route path='products' element={<Products />} />
                <Route path='orders' element={null} />
                <Route path='users' element={null}>
                    <Route path='add' element={null} />
                    <Route path='edit/:id' element={null} />
                </Route>
                <Route path='profile' element={null} />
                <Route path='logout' element={null} />
            </Route>
            <Route path='/settings' element={<Settings />} />
            <Route path='/login' element={<LoginContainer />} />
            <Route path='*' element={<Navigate to='/' />} />
        </Routes>
    </BrowserRouter>
