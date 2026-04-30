import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Pencil, Trash2, Check, X, AlertTriangle } from 'lucide-react';
import type { InformationViewResponse } from '../shared/interfaces/information.interface';
import { getInformationBySlug, updateInformation, deleteInformation } from '../shared/services/information.service';
import { useAuth } from '../shared/contexts/AuthContext';

interface TopicContentProps {
    darkMode: boolean;
    slug?: string;
}

const TopicContent = ({ darkMode, slug: slugProp }: TopicContentProps) => {
    const params = useParams();
    const slugFromUrl = params['*'];
    const slug = slugProp || slugFromUrl;
    const navigate = useNavigate();
    const { user } = useAuth();
    const isMaster = user?.type === 'MASTER';

    const [information, setInformation] = useState<InformationViewResponse | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    // Edit state
    const [isEditing, setIsEditing] = useState(false);
    const [editQuestion, setEditQuestion] = useState('');
    const [editContent, setEditContent] = useState('');
    const [editFile, setEditFile] = useState<File | null>(null);
    const [saving, setSaving] = useState(false);
    const [saveError, setSaveError] = useState<string | null>(null);

    // Delete state
    const [confirmDelete, setConfirmDelete] = useState(false);
    const [deleting, setDeleting] = useState(false);

    useEffect(() => {
        const fetchInformation = async () => {
            if (!slug) { setInformation(null); setLoading(false); return; }
            try {
                setLoading(true);
                setError(null);
                const data = await getInformationBySlug(slug);
                setInformation(data);
            } catch (err) {
                setError(err instanceof Error ? err.message : 'Erro ao carregar informação');
                setInformation(null);
            } finally {
                setLoading(false);
            }
        };
        fetchInformation();
    }, [slug]);

    const handleStartEdit = () => {
        if (!information) return;
        setEditQuestion(information.question);
        setEditContent(information.content);
        setEditFile(null);
        setSaveError(null);
        setIsEditing(true);
    };

    const handleSave = async () => {
        if (!information || !editQuestion.trim() || !editContent.trim()) return;
        setSaving(true);
        setSaveError(null);
        try {
            const updated = await updateInformation(
                information.identifier,
                { question: editQuestion.trim(), content: editContent.trim() },
                editFile ?? undefined,
            );
            setInformation(updated);
            setEditFile(null);
            setIsEditing(false);
        } catch (err) {
            setSaveError(err instanceof Error ? err.message : 'Erro ao salvar');
        } finally {
            setSaving(false);
        }
    };

    const handleDelete = async () => {
        if (!information) return;
        setDeleting(true);
        try {
            await deleteInformation(information.identifier);
            navigate('/general-questions');
        } catch (err) {
            console.error(err);
            setDeleting(false);
            setConfirmDelete(false);
        }
    };

    if (loading) {
        return (
            <div className="flex items-center justify-center py-20">
                <div className={`text-lg ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>Carregando informação...</div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="flex items-center justify-center py-20">
                <div className="text-red-500 text-lg">{error}</div>
            </div>
        );
    }

    if (!slug) {
        return (
            <div className={`text-center py-20 ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                <h2 className={`text-2xl font-bold mb-4 ${darkMode ? 'text-white' : 'text-[#155457]'}`}>
                    Bem-vindo à Central de Ajuda
                </h2>
                <p>Selecione um tópico no menu lateral para visualizar o conteúdo.</p>
            </div>
        );
    }

    if (!information) {
        return (
            <div className={`text-center py-12 ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                <p>Informação não encontrada.</p>
            </div>
        );
    }

    const inputClass = `w-full px-4 py-2.5 rounded-lg border text-sm outline-none transition-all focus:ring-2 focus:ring-[#3fbec5] focus:border-transparent ${
        darkMode ? 'bg-[#0f0f0f] border-gray-700 text-white placeholder-gray-600' : 'bg-white border-gray-300 text-gray-900'
    }`;

    return (
        <div style={{ fontFamily: 'Inter, system-ui, sans-serif' }}>
            {/* Breadcrumb */}
            <div className={`mb-4 flex items-center gap-2 text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                <span>{information.category.name}</span>
                <span>›</span>
                <span>{information.subCategory.name}</span>
            </div>

            {/* Page Title + Master Actions */}
            <div className={`mb-8 pb-4 border-b flex items-start justify-between gap-4 ${darkMode ? 'border-gray-800' : 'border-gray-200'}`}>
                <h1
                    className={`text-4xl font-bold ${darkMode ? 'text-white' : 'text-[#155457]'}`}
                    style={{ fontFamily: 'Poppins, sans-serif' }}
                >
                    {information.question}
                </h1>

                {isMaster && !isEditing && (
                    <div className="flex items-center gap-2 shrink-0 mt-1">
                        <button
                            onClick={handleStartEdit}
                            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-sm font-medium transition-colors ${
                                darkMode
                                    ? 'bg-gray-800 text-gray-300 hover:bg-gray-700 hover:text-white'
                                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200 hover:text-gray-900'
                            }`}
                        >
                            <Pencil className="w-3.5 h-3.5" />
                            Editar
                        </button>
                        <button
                            onClick={() => setConfirmDelete(true)}
                            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-sm font-medium bg-red-50 text-red-500 hover:bg-red-100 transition-colors"
                        >
                            <Trash2 className="w-3.5 h-3.5" />
                            Apagar
                        </button>
                    </div>
                )}
            </div>

            {/* Delete confirmation modal */}
            {confirmDelete && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
                    <div className={`rounded-2xl shadow-2xl p-6 max-w-sm w-full mx-4 ${darkMode ? 'bg-[#1a1a1a] border border-gray-800' : 'bg-white border border-gray-200'}`}>
                        <div className="flex items-center gap-3 mb-4">
                            <div className="w-10 h-10 rounded-full bg-red-100 flex items-center justify-center">
                                <AlertTriangle className="w-5 h-5 text-red-500" />
                            </div>
                            <div>
                                <h3 className={`font-bold ${darkMode ? 'text-white' : 'text-gray-900'}`}>Apagar informação</h3>
                                <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>Essa ação não pode ser desfeita.</p>
                            </div>
                        </div>
                        <p className={`text-sm mb-6 ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                            Tem certeza que deseja apagar <strong>"{information.question}"</strong>?
                        </p>
                        <div className="flex gap-3">
                            <button
                                onClick={() => setConfirmDelete(false)}
                                disabled={deleting}
                                className={`flex-1 py-2 rounded-lg text-sm font-medium transition-colors ${darkMode ? 'bg-gray-800 text-gray-300 hover:bg-gray-700' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'}`}
                            >
                                Cancelar
                            </button>
                            <button
                                onClick={handleDelete}
                                disabled={deleting}
                                className="flex-1 py-2 rounded-lg text-sm font-medium bg-red-500 text-white hover:bg-red-600 transition-colors disabled:opacity-60"
                            >
                                {deleting ? 'Apagando...' : 'Sim, apagar'}
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {/* Edit Form */}
            {isEditing ? (
                <div className={`rounded-2xl border-2 p-6 ${darkMode ? 'bg-[#1f1f1f] border-gray-800' : 'bg-white border-gray-100'}`}>
                    <div className="space-y-4">
                        <div>
                            <label className={`block text-xs font-semibold uppercase tracking-wider mb-1.5 ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                                Pergunta
                            </label>
                            <input
                                type="text"
                                value={editQuestion}
                                onChange={e => setEditQuestion(e.target.value)}
                                className={inputClass}
                            />
                        </div>
                        <div>
                            <label className={`block text-xs font-semibold uppercase tracking-wider mb-1.5 ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                                Conteúdo
                            </label>
                            <textarea
                                value={editContent}
                                onChange={e => setEditContent(e.target.value)}
                                rows={12}
                                className={`${inputClass} resize-none font-mono text-xs`}
                            />
                            <p className={`text-xs mt-1 ${darkMode ? 'text-gray-600' : 'text-gray-400'}`}>Suporta HTML.</p>
                        </div>
                        <div>
                            <label className={`block text-xs font-semibold uppercase tracking-wider mb-1.5 ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                                Imagem <span className={`normal-case font-normal ${darkMode ? 'text-gray-600' : 'text-gray-400'}`}>
                                    {information.file ? '— substituir imagem atual (opcional)' : '— adicionar imagem (opcional)'}
                                </span>
                            </label>
                            {information.file?.mimetype.startsWith('image/') && !editFile && (
                                <div className={`flex items-center gap-3 px-3 py-2 mb-2 rounded-lg text-xs ${darkMode ? 'bg-gray-800 text-gray-400' : 'bg-gray-50 text-gray-500'}`}>
                                    <img src={information.file.path} alt="" className="w-10 h-10 object-cover rounded" />
                                    <span className="truncate">Atual: {information.file.originalName}</span>
                                </div>
                            )}
                            <label className={`flex items-center gap-3 px-4 py-3 rounded-lg border cursor-pointer transition-all ${
                                editFile
                                    ? darkMode ? 'border-[#3fbec5] bg-[#3fbec5]/10' : 'border-[#3fbec5] bg-[#3fbec5]/5'
                                    : darkMode ? 'border-gray-700 hover:border-gray-600 bg-[#0f0f0f]' : 'border-gray-200 hover:border-gray-300 bg-white'
                            }`}>
                                <input
                                    type="file"
                                    accept="image/jpeg,image/png,image/webp,image/gif"
                                    className="hidden"
                                    onChange={e => setEditFile(e.target.files?.[0] ?? null)}
                                />
                                <svg className={`w-4 h-4 shrink-0 ${editFile ? 'text-[#3fbec5]' : darkMode ? 'text-gray-500' : 'text-gray-400'}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                </svg>
                                <span className={`text-sm truncate ${editFile ? 'text-[#3fbec5] font-medium' : darkMode ? 'text-gray-500' : 'text-gray-400'}`}>
                                    {editFile ? editFile.name : 'Clique para selecionar...'}
                                </span>
                                {editFile && (
                                    <button type="button" onClick={e => { e.preventDefault(); setEditFile(null); }}
                                        className={`ml-auto text-xs ${darkMode ? 'text-gray-400 hover:text-red-400' : 'text-gray-400 hover:text-red-500'}`}>
                                        remover
                                    </button>
                                )}
                            </label>
                        </div>
                        {saveError && (
                            <p className="text-sm text-red-500 bg-red-50 border border-red-200 rounded-lg px-3 py-2">{saveError}</p>
                        )}
                        <div className="flex gap-3 pt-2">
                            <button
                                onClick={() => setIsEditing(false)}
                                disabled={saving}
                                className={`flex items-center gap-1.5 px-4 py-2 rounded-lg text-sm font-medium transition-colors ${darkMode ? 'bg-gray-800 text-gray-300 hover:bg-gray-700' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'}`}
                            >
                                <X className="w-4 h-4" />
                                Cancelar
                            </button>
                            <button
                                onClick={handleSave}
                                disabled={saving || !editQuestion.trim() || !editContent.trim()}
                                className="flex items-center gap-1.5 px-4 py-2 rounded-lg text-sm font-medium bg-[#155457] hover:bg-[#268c90] text-white transition-colors disabled:opacity-50"
                            >
                                <Check className="w-4 h-4" />
                                {saving ? 'Salvando...' : 'Salvar alterações'}
                            </button>
                        </div>
                    </div>
                </div>
            ) : (
                /* Content Card */
                <div className={`rounded-2xl border-2 p-8 ${darkMode ? 'bg-[#1f1f1f] border-gray-800' : 'bg-white border-gray-100'}`}>
                    <div
                        className={`content-display text-lg leading-relaxed ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}
                        dangerouslySetInnerHTML={{ __html: information.content }}
                    />

                    {information.file && (
                        <div className={`mt-6 pt-6 border-t ${darkMode ? 'border-gray-700' : 'border-gray-200'}`}>
                            {information.file.mimetype.startsWith('image/') ? (
                                <div>
                                    <h3 className={`text-sm font-semibold mb-3 ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>Imagem</h3>
                                    <img
                                        src={information.file.path}
                                        alt={information.file.originalName}
                                        loading="lazy"
                                        className={`max-w-full rounded-xl border ${darkMode ? 'border-gray-700' : 'border-gray-200'}`}
                                    />
                                    <a
                                        href={information.file.path}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className={`inline-flex items-center gap-1 mt-2 text-xs transition-colors ${darkMode ? 'text-gray-500 hover:text-[#6ed3d8]' : 'text-gray-400 hover:text-[#155457]'}`}
                                    >
                                        Ver em tamanho original ↗
                                    </a>
                                </div>
                            ) : (
                                <>
                                    <h3 className={`text-sm font-semibold mb-3 ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>Arquivo Anexo</h3>
                                    <a
                                        href={information.file.path}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className={`inline-flex items-center gap-2 px-4 py-2 rounded-lg transition-colors ${darkMode ? 'bg-gray-800 hover:bg-gray-700 text-[#6ed3d8]' : 'bg-gray-50 hover:bg-gray-100 text-[#155457]'}`}
                                    >
                                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                                        </svg>
                                        <span className="font-medium">{information.file.originalName}</span>
                                        <span className={`text-xs ${darkMode ? 'text-gray-500' : 'text-gray-400'}`}>
                                            ({(information.file.size / 1024).toFixed(2)} KB)
                                        </span>
                                    </a>
                                </>
                            )}
                        </div>
                    )}
                </div>
            )}
        </div>
    );
};

export default TopicContent;
