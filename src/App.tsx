import { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route, useParams, useNavigate, Navigate } from 'react-router-dom';
import Sidebar from './components/Sidebar';
import Header from './components/Header';
import Footer from './components/Footer';
import GeneralQuestions from './components/GeneralQuestions';
import TopicContent from './components/TopicContent';
import LoginPage from './pages/LoginPage';
import AdminPage from './pages/AdminPage';
import { AuthProvider, useAuth } from './shared/contexts/AuthContext';
import { getAllCategories, getCategoryByIdentifier } from './shared/services/category.service';

function TopicPage({ darkMode }: { darkMode: boolean }) {
    const params = useParams();
    const slug = params['*'];
    return <TopicContent darkMode={darkMode} slug={slug || ''} />;
}

function HomePage() {
    const navigate = useNavigate();
    useEffect(() => { navigate('/general-questions'); }, [navigate]);
    return null;
}

function ProtectedRoute({ children }: { children: React.ReactNode }) {
    const { isAuthenticated } = useAuth();
    if (!isAuthenticated) return <Navigate to="/login" replace />;
    return <>{children}</>;
}

function MasterRoute({ children }: { children: React.ReactNode }) {
    const { isAuthenticated, user } = useAuth();
    if (!isAuthenticated) return <Navigate to="/login" replace />;
    if (user?.type !== 'MASTER') return <Navigate to="/" replace />;
    return <>{children}</>;
}

function AppContent() {
    const [darkMode, setDarkMode] = useState(false);
    const [activeCategory, setActiveCategory] = useState('');
    const [activeSubCategory, setActiveSubCategory] = useState('');
    const [activeInformation, setActiveInformation] = useState('');
    const [, setCategoryName] = useState('');
    const navigate = useNavigate();
    const { user, logout, isAuthenticated } = useAuth();

    useEffect(() => {
        if (!isAuthenticated) return;

        const loadDefaultCategory = async () => {
            try {
                const categories = await getAllCategories();
                const generalCategory = categories.find(cat => {
                    const normalized = cat.name
                        .toLowerCase()
                        .normalize('NFD')
                        .replace(/[̀-ͯ]/g, '')
                        .trim();
                    return normalized === 'duvidas gerais' || cat.name.toLowerCase().trim() === 'dúvidas gerais';
                });

                const targetCategory = generalCategory || categories[0];
                if (targetCategory && !activeCategory) {
                    setActiveCategory(targetCategory.identifier);
                    setCategoryName(targetCategory.name);
                }
            } catch (error) {
                console.error('Erro ao carregar categoria padrão:', error);
            }
        };

        loadDefaultCategory();
    }, [isAuthenticated]);

    useEffect(() => {
        if (!isAuthenticated || !activeCategory) return;

        const fetchCategoryName = async () => {
            try {
                const category = await getCategoryByIdentifier(activeCategory);
                setCategoryName(category.name);
            } catch {
                setCategoryName('');
            }
        };

        fetchCategoryName();
    }, [activeCategory, isAuthenticated]);

    const userName = user?.name ?? '';

    return (
        <div className={`flex flex-col min-h-screen transition-colors duration-300 ${
            darkMode ? 'bg-[#0f0f0f]' : 'bg-gray-50'
        }`}>
            <Routes>
                <Route path="/login" element={<LoginPage darkMode={darkMode} />} />

                <Route path="*" element={
                    <ProtectedRoute>
                        <>
                            <Sidebar
                                darkMode={darkMode}
                                setDarkMode={setDarkMode}
                                activeCategory={activeCategory}
                                setActiveCategory={setActiveCategory}
                                activeSubCategory={activeSubCategory}
                                setActiveSubCategory={setActiveSubCategory}
                                activeInformation={activeInformation}
                                setActiveInformation={setActiveInformation}
                                userName={userName}
                                navigate={navigate}
                                onLogout={logout}
                            />

                            <main className="flex-1 ml-64 px-8 py-12">
                                <div className="max-w-[1200px] mx-auto">
                                    <Header userName={userName} darkMode={darkMode} />

                                    <Routes>
                                        <Route path="/" element={<HomePage />} />
                                        <Route
                                            path="/admin"
                                            element={
                                                <MasterRoute>
                                                    <AdminPage darkMode={darkMode} />
                                                </MasterRoute>
                                            }
                                        />
                                        <Route
                                            path="/general-questions"
                                            element={<GeneralQuestions darkMode={darkMode} />}
                                        />
                                        <Route path="*" element={<TopicPage darkMode={darkMode} />} />
                                    </Routes>
                                </div>
                            </main>

                            <Footer darkMode={darkMode} />
                        </>
                    </ProtectedRoute>
                } />
            </Routes>
        </div>
    );
}

function App() {
    return (
        <BrowserRouter>
            <AuthProvider>
                <AppContent />
            </AuthProvider>
        </BrowserRouter>
    );
}

export default App;
