import { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route, useParams, useNavigate } from 'react-router-dom';
import Sidebar from './components/Sidebar';
import Header from './components/Header';
import Footer from './components/Footer';
import GeneralQuestions from './components/GeneralQuestions';
import TopicContent from './components/TopicContent';
import { getCategoryByIdentifier, getAllCategories } from './shared/services/information.service';

function TopicPage({ darkMode }: { darkMode: boolean }) {
    const params = useParams();
    const slug = params['*'];

    return <TopicContent darkMode={darkMode} slug={slug || ''} />;
}

function HomePage() {
    const navigate = useNavigate();

    useEffect(() => {
        navigate('/general-questions');
    }, [navigate]);

    return null;
}

function AppContent() {
    const [darkMode, setDarkMode] = useState(false);
    const [activeCategory, setActiveCategory] = useState('');
    const [activeSubCategory, setActiveSubCategory] = useState('');
    const [activeInformation, setActiveInformation] = useState('');
    const [, setCategoryName] = useState('');
    const navigate = useNavigate();

    const userName = "João Marcelo";

    useEffect(() => {
        const loadDefaultCategory = async () => {
            try {
                const categories = await getAllCategories();
                const generalCategory = categories.find(cat => {
                    const normalized = cat.name
                        .toLowerCase()
                        .normalize('NFD')
                        .replace(/[\u0300-\u036f]/g, '')
                        .trim();
                    return normalized === 'duvidas gerais' || cat.name.toLowerCase().trim() === 'dúvidas gerais';
                });

                if (generalCategory && !activeCategory) {
                    setActiveCategory(generalCategory.identifier);
                    setCategoryName(generalCategory.name);
                }
            } catch (error) {
                console.error('Erro ao carregar categoria padrão:', error);
            }
        };

        loadDefaultCategory();
    }, []);

    useEffect(() => {
        const fetchCategoryName = async () => {
            if (activeCategory) {
                try {
                    const category = await getCategoryByIdentifier(activeCategory);
                    setCategoryName(category.name);
                } catch (error) {
                    console.error('Erro ao buscar categoria:', error);
                    setCategoryName('');
                }
            }
        };

        fetchCategoryName();
    }, [activeCategory]);

    return (
        <div className={`flex flex-col min-h-screen transition-colors duration-300 ${
            darkMode ? 'bg-[#0f0f0f]' : 'bg-gray-50'
        }`}>
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
            />

            <main className="flex-1 ml-64 px-8 py-12">
                <div className="max-w-[1200px] mx-auto">
                    <Header userName={userName} darkMode={darkMode} />

                    <Routes>
                        {/* Rota principal - Redireciona para General Questions */}
                        <Route
                            path="/"
                            element={<HomePage />}
                        />

                        {/* Rota específica para Dúvidas Gerais */}
                        <Route
                            path="/general-questions"
                            element={
                                activeCategory ? (
                                    <GeneralQuestions
                                        darkMode={darkMode}
                                        categoryIdentifier={activeCategory}
                                    />
                                ) : (
                                    <div className={`text-center py-20 ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                                        <div className="animate-pulse">
                                            <div className={`h-8 w-64 mx-auto mb-4 rounded ${darkMode ? 'bg-gray-800' : 'bg-gray-200'}`}></div>
                                            <div className={`h-4 w-48 mx-auto rounded ${darkMode ? 'bg-gray-800' : 'bg-gray-200'}`}></div>
                                        </div>
                                    </div>
                                )
                            }
                        />

                        <Route
                            path="*"
                            element={<TopicPage darkMode={darkMode} />}
                        />
                    </Routes>
                </div>
            </main>

            <Footer darkMode={darkMode} />
        </div>
    );
}

function App() {
    return (
        <BrowserRouter>
            <AppContent />
        </BrowserRouter>
    );
}

export default App;