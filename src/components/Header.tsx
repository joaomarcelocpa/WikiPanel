interface HeaderProps {
    userName: string;
    darkMode: boolean;
}

const Header = ({ userName, darkMode }: HeaderProps) => {
    return (
        <div className="mb-12" style={{ fontFamily: 'Inter, system-ui, sans-serif' }}>
            <h1 className={`text-5xl font-bold mb-3 ${
                darkMode ? 'text-white' : 'text-[#155457]'
            }`} style={{ fontFamily: 'Poppins, sans-serif' }}>
                Bem-vindo, <span className="text-[#3fbec5]">{userName}</span>
            </h1>
            <p className={`text-lg ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                Sua central de conhecimento sobre o sistema de envio de SMS da M2C
            </p>
        </div>
    );
};

export default Header;