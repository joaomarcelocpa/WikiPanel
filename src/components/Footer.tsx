import { Phone, Mail, MessageSquare, MapPin } from 'lucide-react';

interface FooterProps {
    darkMode: boolean;
}

const Footer = ({ darkMode }: FooterProps) => {
    return (
        <footer className={`border-t mt-20 ${
            darkMode ? 'bg-[#1a1a1a] border-gray-800' : 'bg-white border-gray-100'
        }`} style={{ fontFamily: 'Inter, system-ui, sans-serif' }}>
            <div className="max-w-[1400px] mx-auto px-8 py-12">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                    <div>
                        <h3 className={`text-lg font-bold mb-4 ${darkMode ? 'text-white' : 'text-[#155457]'}`}
                            style={{ fontFamily: 'Poppins, sans-serif' }}>
                            Contato
                        </h3>
                        <div className="space-y-3">
                            <div className="flex items-center">
                                <Phone className="w-4 h-4 text-[#3fbec5] mr-2" />
                                <span className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                                    +55 (11) 3456-7890
                                </span>
                            </div>
                            <div className="flex items-center">
                                <Mail className="w-4 h-4 text-[#3fbec5] mr-2" />
                                <span className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                                    suporte@m2c.com.br
                                </span>
                            </div>
                            <div className="flex items-center">
                                <MessageSquare className="w-4 h-4 text-[#3fbec5] mr-2" />
                                <span className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                                    Chat ao vivo
                                </span>
                            </div>
                        </div>
                    </div>

                    <div>
                        <h3 className={`text-lg font-bold mb-4 ${darkMode ? 'text-white' : 'text-[#155457]'}`}
                            style={{ fontFamily: 'Poppins, sans-serif' }}>
                            Horário de Atendimento
                        </h3>
                        <div className={`space-y-2 text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                            <p>Segunda a Sexta: 8h às 18h</p>
                            <p>Sábados: 9h às 13h</p>
                            <p>Domingos e Feriados: Fechado</p>
                        </div>
                    </div>

                    <div>
                        <h3 className={`text-lg font-bold mb-4 ${darkMode ? 'text-white' : 'text-[#155457]'}`}
                            style={{ fontFamily: 'Poppins, sans-serif' }}>
                            Endereço
                        </h3>
                        <div className="flex items-start">
                            <MapPin className="w-4 h-4 text-[#3fbec5] mr-2 mt-1" />
                            <div className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                                <p>Av. Paulista, 1000</p>
                                <p>São Paulo/SP</p>
                                <p>CEP 01310-100</p>
                            </div>
                        </div>
                    </div>

                    <div>
                        <h3 className={`text-lg font-bold mb-4 ${darkMode ? 'text-white' : 'text-[#155457]'}`}
                            style={{ fontFamily: 'Poppins, sans-serif' }}>
                            Sobre a M2C
                        </h3>
                        <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                            Plataforma líder em envio de SMS em massa com tecnologia de ponta e suporte especializado.
                        </p>
                    </div>
                </div>

                <div className={`mt-8 pt-8 border-t text-center ${
                    darkMode ? 'border-gray-800' : 'border-gray-100'
                }`}>
                    <p className={`text-sm ${darkMode ? 'text-gray-500' : 'text-gray-500'}`}>
                        © 2025 M2C Digital - Todos os direitos reservados.
                    </p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;