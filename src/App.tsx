import { useState, useEffect } from 'react';
import Sidebar from './components/Sidebar';
import Header from './components/Header';
import Footer from './components/Footer';
import GeneralQuestions from './components/GeneralQuestions';
import TopicContent from './components/TopicContent';
import { getCategoryByIdentifier } from './shared/services/information.service';

function App() {
    const [darkMode, setDarkMode] = useState(false);
    const [activeCategory, setActiveCategory] = useState('');
    const [activeSubCategory, setActiveSubCategory] = useState('');
    const [activeInformation, setActiveInformation] = useState('');
    const [categoryName, setCategoryName] = useState('');

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

    const renderContent = () => {
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

        if (activeInformation) {
            return <TopicContent darkMode={darkMode} informationIdentifier={activeInformation} />;
        }

        return (
            <div className={`text-center py-20 ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                <h2 className={`text-2xl font-bold mb-4 ${darkMode ? 'text-white' : 'text-[#155457]'}`}>
                    {categoryName}
                </h2>
                <p>Selecione um tópico no menu lateral para visualizar o conteúdo.</p>
            </div>
        );
    };

    return (
        <div className={`min-h-screen transition-colors duration-300 ${
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
            />

            <main className="ml-64 px-8 py-12">
                <div className="max-w-[1200px] mx-auto">
                    <Header userName={userName} darkMode={darkMode} />
                    {renderContent()}
                </div>
            </main>

            <Footer darkMode={darkMode} />
        </div>
    );
}

export default App;