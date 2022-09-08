import React from 'react';
import { ChakraProvider, theme } from '@chakra-ui/react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Login from './components/auth/Login';
import Signup from './components/auth/Signup';
import Home from './components/Home';
import AuthRoute from './components/auth/AuthRoute';
import Files from './components/Files';
import Groups from './components/Groups';
import GroupFiles from './components/GroupFiles';

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
            <Route
              path="/myfiles"
              element={
                <AuthRoute>
                  <Files />
                </AuthRoute>
              }
            />
            <Route
              path="/groups"
              element={
                <AuthRoute>
                  <Groups />
                </AuthRoute>
              }
            />
            <Route
              path="/groups/:groupId"
              element={
                <AuthRoute>
                  <GroupFiles />
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
