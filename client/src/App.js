import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { Toaster } from 'react-hot-toast';
import HomePage from './pages/HomePage';

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
            <Route path="/home" element={<HomePage />}></Route>
        </Routes>
    </BrowserRouter>
    </div>
  );
}

export default App;
