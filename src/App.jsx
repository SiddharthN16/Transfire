import React from 'react';
import { ChakraProvider, theme } from '@chakra-ui/react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Login from './components/auth/Login';
import Signup from './components/auth/Signup';
import Home from './components/Home';
import Test from './components/Test';
import AuthRoute from './components/auth/AuthRoute';
import Files from './components/Files';

import { AuthProvider } from './AuthContext';
function App() {
  return (
    <Router>
      <ChakraProvider theme={theme}>
        <AuthProvider>
          <Header />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/test" element={<Test />} />
            <Route
              path="/myfiles"
              element={
                <AuthRoute>
                  <Files />
                </AuthRoute>
              }
            />
          </Routes>
        </AuthProvider>
      </ChakraProvider>
    </Router>
  );
}

export default App;
