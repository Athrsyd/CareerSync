import { useEffect } from 'react'
import { Routes, Route, useNavigate, useLocation } from 'react-router-dom'
import Auth from '../page/Auth/Auth';
import Pretest from '../page/Pretest/Pretest';
import Dashboard from '../page/Dashboard/Dashboard';
import Portfolio from '../page/Portofolio/Portfolio';
import ManagePortfolio from '../page/ManagePortfolio/ManagePortfolio';
import Analysis from '../page/Analysis/Analysis';
import Project from '../page/Project/Project';
import LandingPage from '../page/LandingPage/LandingPage';
import ProtectedRoute from '../utils/ProtectedRoute';
import Progress from '../page/Progress/Progress';

const Router = () => {
    return (
        <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="/auth" element={<Auth />} />
            <Route path="/pretest" element={<ProtectedRoute><Pretest /></ProtectedRoute>} />
            <Route path="/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
            <Route path="/dashboard/project" element={<ProtectedRoute><Project /></ProtectedRoute>} />
            <Route path="/dashboard/portfolio" element={<ProtectedRoute><ManagePortfolio /></ProtectedRoute>} />
            <Route path="/dashboard/analysis" element={<ProtectedRoute><Analysis /></ProtectedRoute>} />
            <Route path="/dashboard/progress" element={<ProtectedRoute><Progress /></ProtectedRoute>} />
            <Route path='/portfolio/:id' element={<Portfolio />} />
        </Routes>
    )
}

export default Router
