import { useState } from 'react';
import Sidebar from './components/Sidebar';
import Header from './components/Header';
import Footer from './components/Footer';
import GeneralQuestions from './components/GeneralQuestions';
import TopicContent from './components/TopicContent';

function App() {
    const [darkMode, setDarkMode] = useState(false);
    const [activeTab, setActiveTab] = useState('duvidas');
    const [activeSubtopic, setActiveSubtopic] = useState<string>('');

    const userName = "João Marcelo";

    const renderContent = () => {
        switch(activeTab) {
            case 'duvidas':
                return <GeneralQuestions darkMode={darkMode} />;

            // SMS Topics
            case 'campaigns':
            case 'blacklist':
            case 'financial':
            case 'companies':
            case 'services':
            case 'reports':
            case 'api':
            case 'faq':

            // fallthrough
            case 'operational':
            case 'backoffice-financial':
            case 'backoffice-companies':
            case 'suppliers':
            case 'messaging':
            case 'monitoring':
            case 'backoffice-users':
            case 'backoffice-faq':
                return <TopicContent darkMode={darkMode} type={activeTab} activeSubtopic={activeSubtopic} />;

            default:
                return <GeneralQuestions darkMode={darkMode} />;
        }
    };

    return (
        <div className={`min-h-screen transition-colors duration-300 ${
            darkMode ? 'bg-[#0f0f0f]' : 'bg-gray-50'
        }`}>
            <Sidebar
                darkMode={darkMode}
                setDarkMode={setDarkMode}
                activeTab={activeTab}
                setActiveTab={setActiveTab}
                activeSubtopic={activeSubtopic}
                setActiveSubtopic={setActiveSubtopic}
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