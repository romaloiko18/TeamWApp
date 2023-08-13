import React, { useEffect } from 'react';
import { Route, Routes } from 'react-router-dom';
import Main from './pages/main';
import SignIn from './pages/signin';
import Signup from './pages/signup';
import { useAuth } from './hooks/useAuth';
import Layout from './components/Layout';
import Projects from './pages/projects';
import Project from './pages/project';
import Ticket from './pages/ticket';
import { authService } from './services/auth';
import { ToastContainer, Zoom } from 'react-toastify';
import { socketService } from './services/socketService';
import AdminPage from './pages/admin';

function App() {
  const isAuth = authService.getToken();

  useEffect(() => {
    socketService.connect();
  }, []);

  useAuth();

  return (
    <>
      {isAuth ? (
        <Layout>
          <Routes>
            <Route path="/" element={<Main />} />

            <Route path="/admin" element={<AdminPage />} />

            <Route path="/admin/create-pokemon" element={<AdminPage />} />

            <Route path="/projects" element={<Projects />} />

            <Route path="/projects/:projectId" element={<Project />} />

            <Route path="/projects/:projectId/:ticketId" element={<Ticket />} />

            <Route path="*" element={<div> Not found </div>} />
          </Routes>
        </Layout>
      ) : (
        <Routes>
          <Route path="/signin" element={<SignIn />} />

          <Route path="/signup" element={<Signup />} />

          <Route path="*" element={<div> Not found </div>} />
        </Routes>
      )}

      <ToastContainer position="bottom-center" limit={1} autoClose={3000} theme="dark" transition={Zoom} draggable />
    </>
  );
}

export default App;
