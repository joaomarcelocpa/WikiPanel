import { useState } from 'react';
import Navbar from './components/Navbar';
import Header from './components/Header';
import DuvidasGerais from './components/DuvidasGerais';
import Blacklist from './components/Blacklist';
import Campanhas from './components/Campanhas';
import Relatorios from './components/Relatorios';
import FAQ from './components/FAQ';
import Contatos from './components/Contatos';

function App() {
    const [darkMode, setDarkMode] = useState(false);
    const [activeTab, setActiveTab] = useState('duvidas');

    const userName = "João Marcelo";

    const renderContent = () => {
        switch(activeTab) {
            case 'duvidas':
                return <DuvidasGerais darkMode={darkMode} />;
            case 'blacklist':
                return <Blacklist darkMode={darkMode} />;
            case 'campanhas':
                return <Campanhas darkMode={darkMode} />;
            case 'relatorios':
                return <Relatorios darkMode={darkMode} />;
            case 'faq':
                return <FAQ darkMode={darkMode} />;
            case 'contatos':
                return <Contatos darkMode={darkMode} />;
            default:
                return <DuvidasGerais darkMode={darkMode} />;
        }
    };

    return (
        <div className={`min-h-screen transition-colors duration-300 ${
            darkMode ? 'bg-[#0f0f0f]' : 'bg-gray-50'
        }`}>
            <Navbar
                darkMode={darkMode}
                setDarkMode={setDarkMode}
                activeTab={activeTab}
                setActiveTab={setActiveTab}
                userName={userName}
            />

            <main className="max-w-[1400px] mx-auto px-8 py-12">
                <Header userName={userName} darkMode={darkMode} />
                {renderContent()}
            </main>
        </div>
    );
}

export default App;