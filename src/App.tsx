import { useState } from 'react';
import Navbar from './components/Navbar';
import Header from './components/Header';
import Footer from './components/Footer';
import GeneralQuestions from './components/GeneralQuestions';
import InfoPage from './components/InfoPage';

function App() {
    const [darkMode, setDarkMode] = useState(false);
    const [activeTab, setActiveTab] = useState('duvidas');

    const userName = "João Marcelo";

    const renderContent = () => {
        switch(activeTab) {
            case 'duvidas':
                return <GeneralQuestions darkMode={darkMode} />;
            case 'blacklist':
                return <InfoPage darkMode={darkMode} type="blacklist" />;
            case 'campanhas':
                return <InfoPage darkMode={darkMode} type="campanhas" />;
            case 'empresas':
                return <InfoPage darkMode={darkMode} type="empresas" />;
            case 'api':
                return <InfoPage darkMode={darkMode} type="api" />;
            case 'financeiro':
                return <InfoPage darkMode={darkMode} type="financeiro" />;
            case 'faq':
                return <InfoPage darkMode={darkMode} type="faq" />;
            default:
                return <GeneralQuestions darkMode={darkMode} />;
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

            <Footer darkMode={darkMode} />
        </div>
    );
}

export default App;