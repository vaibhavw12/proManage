import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { Toaster } from 'react-hot-toast';
import HomePage from './pages/HomePage';
import RegisterPage from './pages/RegisterPage';
import LoginPage from './pages/LoginPage';
import PublicToDo from './pages/PublicToDo';

function App() {
  return (
    <div>
      <Toaster
            position="top-center"
            reverseOrder={true}
            
            toastOptions={{
                success: {
                    theme: {
                        primary: '#4aed88',
                    },
                },
            }}
        ></Toaster>
        <BrowserRouter>
        <Routes>
            <Route path="/" element={<HomePage />}></Route>
            <Route path="/register" element={<RegisterPage />}></Route>
            <Route path="/login" element={<LoginPage />}></Route>
            <Route path="/shared-todo/:id" element={<PublicToDo />}></Route>
        </Routes>
    </BrowserRouter>
    </div>
  );
}

export default App;
