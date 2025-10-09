import { Sun, Moon, Search } from 'lucide-react';

interface NavbarProps {
    darkMode: boolean;
    setDarkMode: (value: boolean) => void;
    activeTab: string;
    setActiveTab: (tab: string) => void;
    userName: string;
}

const Navbar = ({ darkMode, setDarkMode, activeTab, setActiveTab, userName }: NavbarProps) => {
    const tabs = [
        { id: 'questions', label: 'Dúvidas Gerais' },
        { id: 'campaigns', label: 'Campanhas' },
        { id: 'blacklist', label: 'Blacklist' },
        { id: 'companies', label: 'Empresas' },
        { id: 'api', label: 'API Externa' },
        { id: 'financial', label: 'Financial' },
        { id: 'faq', label: 'FAQ' }
    ];

    return (
        <nav className={`sticky top-0 z-50 border-b ${
            darkMode ? 'bg-[#1a1a1a] border-gray-800' : 'bg-white border-gray-100'
        }`} style={{ fontFamily: 'Inter, system-ui, sans-serif' }}>
            <div className="max-w-[1400px] mx-auto px-8">
                <div className="flex items-center justify-between h-16">
                    <div className="flex items-center">
                        <div className="flex items-center space-x-3 mr-12">
                            <img
                                src="/wiki-logo.png"
                                alt="WIKI M2C Logo"
                                className="h-8 w-auto"
                            />
                        </div>

                        <div className="hidden lg:flex items-center space-x-1">
                            {tabs.map((tab) => (
                                <button
                                    key={tab.id}
                                    onClick={() => setActiveTab(tab.id)}
                                    className={`px-4 py-2 text-sm font-medium rounded-lg transition-all ${
                                        activeTab === tab.id
                                            ? 'bg-[#3fbec5] text-white'
                                            : darkMode
                                                ? 'text-gray-400 hover:text-white hover:bg-gray-800'
                                                : 'text-gray-600 hover:text-[#155457] hover:bg-gray-50'
                                    }`}
                                >
                                    {tab.label}
                                </button>
                            ))}
                        </div>
                    </div>

                    <div className="flex items-center space-x-4">
                        <div className="hidden md:flex items-center">
                            <div className={`flex items-center px-3 py-2 rounded-lg ${
                                darkMode ? 'bg-gray-800' : 'bg-gray-50'
                            }`}>
                                <Search className="w-4 h-4 text-gray-400 mr-2" />
                                <input
                                    type="text"
                                    placeholder="Buscar..."
                                    className={`bg-transparent border-none outline-none text-sm w-40 ${
                                        darkMode ? 'text-white placeholder-gray-500' : 'text-gray-900 placeholder-gray-400'
                                    }`}
                                />
                            </div>
                        </div>

                        <button
                            onClick={() => setDarkMode(!darkMode)}
                            className={`p-2 rounded-lg transition-colors ${
                                darkMode ? 'bg-gray-800 text-white' : 'bg-gray-100 text-gray-600'
                            }`}
                        >
                            {darkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
                        </button>

                        <div className={`hidden md:flex items-center px-3 py-2 rounded-lg ${
                            darkMode ? 'bg-gray-800' : 'bg-gray-50'
                        }`}>
                            <div className="w-8 h-8 rounded-full bg-[#3fbec5] flex items-center justify-center text-white text-sm font-semibold mr-2">
                                {userName.charAt(0)}
                            </div>
                            <span className={`text-sm font-medium ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                                {userName.split(' ')[0]}
                            </span>
                        </div>
                    </div>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;