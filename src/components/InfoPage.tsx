import { useState } from 'react';
import { HelpCircle, ChevronDown } from 'lucide-react';
import { mockDuvidas } from '../mocks/mockData';
import type { Duvida } from '../mocks/mockData';

interface InfoPageProps {
    darkMode: boolean;
    type: string;
}

const InfoPage = ({ darkMode, type }: InfoPageProps) => {
    const [expandedIndex, setExpandedIndex] = useState<number | null>(null);

    const duvidas = mockDuvidas.filter((duvida: Duvida) => duvida.type === type);

    if (duvidas.length === 0) {
        return (
            <div className={`text-center py-12 ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                <p>Nenhuma informação disponível para esta seção no momento.</p>
            </div>
        );
    }

    return (
        <div className="space-y-4" style={{ fontFamily: 'Inter, system-ui, sans-serif' }}>
            {duvidas.map((item, index) => (
                <div
                    key={item.id}
                    className={`rounded-2xl border-2 overflow-hidden transition-all ${
                        darkMode ? 'bg-[#1f1f1f] border-gray-800 hover:border-[#3fbec5]' : 'bg-white border-gray-100 hover:border-[#3fbec5]'
                    }`}
                >
                    <button
                        onClick={() => setExpandedIndex(expandedIndex === index ? null : index)}
                        className="w-full p-6 flex items-center justify-between text-left"
                    >
                        <h3
                            className={`text-lg font-bold flex items-center flex-1 ${darkMode ? 'text-white' : 'text-[#155457]'}`}
                            style={{ fontFamily: 'Poppins, sans-serif' }}
                        >
                            <HelpCircle className="w-5 h-5 text-[#3fbec5] mr-3 flex-shrink-0" />
                            {item.pergunta}
                        </h3>
                        <ChevronDown
                            className={`w-5 h-5 text-[#3fbec5] transition-transform flex-shrink-0 ml-4 ${
                                expandedIndex === index ? 'rotate-180' : ''
                            }`}
                        />
                    </button>

                    {expandedIndex === index && (
                        <div className={`px-6 pb-6 ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                            <div className="ml-8 leading-relaxed">
                                {item.resposta}
                            </div>
                        </div>
                    )}
                </div>
            ))}
        </div>
    );
};

export default InfoPage;