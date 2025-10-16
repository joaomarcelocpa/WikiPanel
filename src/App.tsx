import { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route, useParams, useNavigate, useLocation } from 'react-router-dom';
import Sidebar from './components/Sidebar';
import Header from './components/Header';
import Footer from './components/Footer';
import GeneralQuestions from './components/GeneralQuestions';
import TopicContent from './components/TopicContent';
import { getCategoryByIdentifier } from './shared/services/information.service';

// Componente para rota com slug
function TopicPage({ darkMode }: { darkMode: boolean }) {
    const params = useParams();
    const slug = params['*']; // Captura tudo da URL

    return <TopicContent darkMode={darkMode} slug={slug || ''} />;
}

// Componente Home
function HomePage({
                      darkMode,
                      activeCategory,
                      categoryName
                  }: {
    darkMode: boolean;
    activeCategory: string;
    categoryName: string;
}) {
    if (!activeCategory) {
        return (
            <div className={`text-center py-20 ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                <h2 className={`text-2xl font-bold mb-4 ${darkMode ? 'text-white' : 'text-[#155457]'}`}>
                    Bem-vindo à Central de Ajuda
                </h2>
                <p>Selecione uma categoria no menu lateral para começar.</p>
            </div>
        );
    }

    const normalizedName = categoryName
        .toLowerCase()
        .normalize('NFD')
        .replace(/[\u0300-\u036f]/g, '')
        .trim();
    const isGeneralCategory = normalizedName === 'duvidas gerais' ||
        categoryName.toLowerCase().trim() === 'dúvidas gerais';

    if (isGeneralCategory) {
        return <GeneralQuestions darkMode={darkMode} categoryIdentifier={activeCategory} />;
    }

    return (
        <div className={`text-center py-20 ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
            <h2 className={`text-2xl font-bold mb-4 ${darkMode ? 'text-white' : 'text-[#155457]'}`}>
                {categoryName}
            </h2>
            <p>Selecione um tópico no menu lateral para visualizar o conteúdo.</p>
        </div>
    );
}

// Componente principal
function AppContent() {
    const [darkMode, setDarkMode] = useState(false);
    const [activeCategory, setActiveCategory] = useState('');
    const [activeSubCategory, setActiveSubCategory] = useState('');
    const [activeInformation, setActiveInformation] = useState('');
    const [categoryName, setCategoryName] = useState('');
    const navigate = useNavigate();
    const location = useLocation();

    const userName = "João Marcelo";

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
            } else {
                setCategoryName('');
            }
        };

        fetchCategoryName();
    }, [activeCategory]);

    // Verifica se está na home
    const isHome = location.pathname === '/';

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
                        <Route
                            path="/"
                            element={
                                <HomePage
                                    darkMode={darkMode}
                                    activeCategory={activeCategory}
                                    categoryName={categoryName}
                                />
                            }
                        />
                        {/* Rota catch-all para slugs */}
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