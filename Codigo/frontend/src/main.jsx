import React from 'react'
import ReactDOM from 'react-dom/client'
import { Route, Routes, BrowserRouter } from "react-router-dom";
import AuthMiddleware from './components/AuthMiddleware';

// page imports
import AdminLogin from './pages/AdminLogin'
import Dashboard from './pages/Dashboard'
import News from './pages/News'
import Services from './pages/Services'
import About from './pages/About'
import Feedbacks from './pages/Feedbacks';
import LandingPage from './pages/LandingPage';
import Proejcts from './pages/Projects';
import Avaliacao from './pages/Avaliacao.jsx';
import Usuarios from './pages/Usuarios.jsx';
import DashboardProjects from './pages/DashboardProjects.jsx';
import GLandingPage from './pages/GLandingPage.jsx';
import Solicitacao from './pages/Solicitacao';

// assets imports
import '../src/assets/fonts.css'
import '../src/assets/main.css'



document.title = "Concreta";

ReactDOM.createRoot(document.getElementById('root')).render(
  
  <BrowserRouter>
      <Routes>
        <Route element={<LandingPage />}  path="/" exact />
        <Route element={<About />}  path="/quem-somos" exact />
        <Route element={<Feedbacks />}  path="/feedbacks-clientes" exact />
        <Route element={<Proejcts />}  path="/projetos" exact />
        
        <Route element={<AuthMiddleware guest={true}> <AdminLogin /> </AuthMiddleware>}  path="/dashboard/login" exact />
        <Route element={<AuthMiddleware> <Dashboard /> </AuthMiddleware>}  path="/dashboard" exact />
        <Route element={<AuthMiddleware> <News /> </AuthMiddleware>}  path="/dashboard/noticias" exact />
        <Route element={<AuthMiddleware> <Services /> </AuthMiddleware>}  path="/dashboard/servicos" exact />
        <Route element={<AuthMiddleware> <Avaliacao /> </AuthMiddleware>} path="/dashboard/avaliacao" exact />
        <Route element={<AuthMiddleware> <Usuarios /> </AuthMiddleware>} path="/dashboard/usuarios" exact />
        <Route element={<AuthMiddleware> <DashboardProjects /> </AuthMiddleware>} path="/dashboard/projetos" exact />
        <Route element={<AuthMiddleware> <GLandingPage /> </AuthMiddleware>} path="/dashboard/landingpage" excat />
      </Routes>
  </BrowserRouter>,
)
