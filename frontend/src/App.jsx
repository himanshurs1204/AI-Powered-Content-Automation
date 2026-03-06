// src/App.jsx
// Main App component with routing
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './hooks/useAuth.jsx';
import { Navbar, ProtectedRoute } from './components';
import {
    Login,
    Register,
    Dashboard,
    GenerateTitles,
    GenerateScript,
    GenerateThumbnail,
    ContentCalendar,
    SavedContent,
} from './pages';

function App() {
    return (
        <Router>
            <AuthProvider>
                <Navbar />
                <Routes>
                    {/* Public Routes */}
                    <Route path="/login" element={<Login />} />
                    <Route path="/register" element={<Register />} />

                    {/* Protected Routes */}
                    <Route
                        path="/dashboard"
                        element={
                            <ProtectedRoute>
                                <Dashboard />
                            </ProtectedRoute>
                        }
                    />
                    <Route
                        path="/generate-titles"
                        element={
                            <ProtectedRoute>
                                <GenerateTitles />
                            </ProtectedRoute>
                        }
                    />
                    <Route
                        path="/generate-script"
                        element={
                            <ProtectedRoute>
                                <GenerateScript />
                            </ProtectedRoute>
                        }
                    />
                    <Route
                        path="/generate-thumbnail"
                        element={
                            <ProtectedRoute>
                                <GenerateThumbnail />
                            </ProtectedRoute>
                        }
                    />
                    <Route
                        path="/content-calendar"
                        element={
                            <ProtectedRoute>
                                <ContentCalendar />
                            </ProtectedRoute>
                        }
                    />
                    <Route
                        path="/saved-content"
                        element={
                            <ProtectedRoute>
                                <SavedContent />
                            </ProtectedRoute>
                        }
                    />

                    {/* Catch all */}
                    <Route path="/" element={<Navigate to="/dashboard" replace />} />
                    <Route path="*" element={<Navigate to="/dashboard" replace />} />
                </Routes>
            </AuthProvider>
        </Router>
    );
}

export default App;
