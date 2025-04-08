import React, { Suspense, lazy } from 'react';
import { Route, Routes } from 'react-router-dom';
import Header from './components/Header';
import { RevenueProvider } from './context/RevenueContext';
import './styles/App.css'; 

// Lazy load the Home component
const Home = lazy(() => import('./pages/Home'));

// Fallback component for loading state
const Loading = () => <div className="loading">Loading...</div>;

const App = () => {
    return (
        <RevenueProvider>
            <div className="app-container">
                <Header />
                <Suspense fallback={<Loading />}>
                    <Routes>
                        <Route path="/" element={<Home />} />
                        {/* Add more routes here as needed */}
                        <Route path="*" element={<div>404 Not Found</div>} />
                    </Routes>
                </Suspense>
            </div>
        </RevenueProvider>
    );
};

export default App;