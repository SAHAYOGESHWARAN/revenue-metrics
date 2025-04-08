import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { BrowserRouter } from 'react-router-dom';
import './styles/App.css';
import * as serviceWorkerRegistration from './serviceWorkerRegistration';
import { ErrorBoundary } from './components/ErrorBoundary'; // Importing ErrorBoundary

// Main rendering function
const renderApp = () => {
    ReactDOM.render(
        <BrowserRouter>
            <ErrorBoundary>
                <App />
            </ErrorBoundary>
        </BrowserRouter>,
        document.getElementById('root')
    );
};

// Initial render
renderApp();

// Register the service worker for offline capabilities
serviceWorkerRegistration.register();