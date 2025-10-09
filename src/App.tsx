import { useState } from 'react';
import Navbar from './components/Navbar';
import Header from './components/Header';
import Footer from './components/Footer';
import GeneralQuestions from './components/GeneralQuestions';
import InfoTabs from './components/InfoTabs.tsx';

function App() {
    const [darkMode, setDarkMode] = useState(false);
    const [activeTab, setActiveTab] = useState('duvidas');

    const userName = "João Marcelo";

    const renderContent = () => {
        switch(activeTab) {
            case 'duvidas':
                return <GeneralQuestions darkMode={darkMode} />;
            case 'blacklist':
                return <InfoTabs darkMode={darkMode} type="blacklist" />;
            case 'campaigns':
                return <InfoTabs darkMode={darkMode} type="campaigns" />;
            case 'companies':
                return <InfoTabs darkMode={darkMode} type="companies" />;
            case 'api':
                return <InfoTabs darkMode={darkMode} type="api" />;
            case 'financial':
                return <InfoTabs darkMode={darkMode} type="financial" />;
            case 'faq':
                return <InfoTabs darkMode={darkMode} type="faq" />;
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