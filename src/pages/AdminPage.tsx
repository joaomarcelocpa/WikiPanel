import { useState, useEffect } from 'react';
import {
    FolderPlus, Layers, FileText, CheckCircle, XCircle,
    ChevronRight, Sparkles, Users, UserPlus, Pencil, Trash2,
    X, Check, AlertTriangle,
} from 'lucide-react';
import { getAllCategories, createCategory } from '../shared/services/category.service';
import { getSubCategoriesByCategory, createSubCategory } from '../shared/services/subcategory.service';
import { createInformation } from '../shared/services/information.service';
import { getAllUsers, createUser, updateUser, deleteUser } from '../shared/services/user.service';
import type { CategoryResponse } from '../shared/interfaces/category.interface';
import type { SubCategoryResponse } from '../shared/interfaces/subcategory.interface';
import type { UserResponse } from '../shared/interfaces/user.interface';

type Tab = 'category' | 'subcategory' | 'information' | 'user';

const USER_TYPES = [
    { value: 'MASTER', label: 'Master', color: 'bg-purple-500/20 text-purple-400 border-purple-500/30' },
    { value: 'ADMIN', label: 'Admin', color: 'bg-red-500/20 text-red-400 border-red-500/30' },
    { value: 'SUPER', label: 'Super', color: 'bg-orange-500/20 text-orange-400 border-orange-500/30' },
    { value: 'DEVELOPER', label: 'Developer', color: 'bg-blue-500/20 text-blue-400 border-blue-500/30' },
    { value: 'FINANCE', label: 'Finance', color: 'bg-green-500/20 text-green-400 border-green-500/30' },
    { value: 'SUPPORT_MANAGER', label: 'Support Manager', color: 'bg-yellow-500/20 text-yellow-500 border-yellow-500/30' },
    { value: 'SUPPORT', label: 'Support', color: 'bg-gray-500/20 text-gray-400 border-gray-500/30' },
];

const typeBadge = (type: string) =>
    USER_TYPES.find(t => t.value === type) ?? { label: type, color: 'bg-gray-500/20 text-gray-400 border-gray-500/30' };

interface Toast { type: 'success' | 'error'; message: string; }
interface AdminPageProps { darkMode: boolean; }

const tabs: { id: Tab; label: string; icon: typeof FolderPlus; description: string }[] = [
    { id: 'category', label: 'Categoria', icon: FolderPlus, description: 'Organize o conteúdo em grandes temas' },
    { id: 'subcategory', label: 'Subcategoria', icon: Layers, description: 'Subdivida categorias em tópicos' },
    { id: 'information', label: 'Informação', icon: FileText, description: 'Adicione perguntas e respostas' },
    { id: 'user', label: 'Usuários', icon: Users, description: 'Gerencie os usuários do sistema' },
];

export default function AdminPage({ darkMode }: AdminPageProps) {
    const [activeTab, setActiveTab] = useState<Tab>('category');
    const [categories, setCategories] = useState<CategoryResponse[]>([]);
    const [subCategories, setSubCategories] = useState<SubCategoryResponse[]>([]);
    const [toast, setToast] = useState<Toast | null>(null);
    const [loading, setLoading] = useState(false);

    // Category form
    const [catName, setCatName] = useState('');

    // Subcategory form
    const [subName, setSubName] = useState('');
    const [subCatId, setSubCatId] = useState('');

    // Information form
    const [infoQuestion, setInfoQuestion] = useState('');
    const [infoContent, setInfoContent] = useState('');
    const [infoCatId, setInfoCatId] = useState('');
    const [infoSubCatId, setInfoSubCatId] = useState('');
    const [infoFile, setInfoFile] = useState<File | null>(null);

    // User management
    const [users, setUsers] = useState<UserResponse[]>([]);
    const [usersLoading, setUsersLoading] = useState(false);
    const [showCreateUser, setShowCreateUser] = useState(false);
    const [editingId, setEditingId] = useState<string | null>(null);
    const [confirmDeleteId, setConfirmDeleteId] = useState<string | null>(null);
    const [newUser, setNewUser] = useState({ name: '', email: '', password: '', type: '' });
    const [editForm, setEditForm] = useState({ name: '', email: '', type: '', password: '' });

    const showToast = (type: 'success' | 'error', message: string) => {
        setToast({ type, message });
        setTimeout(() => setToast(null), 3500);
    };

    const reloadAfterSuccess = (message: string) => {
        showToast('success', message);
        setTimeout(() => window.location.reload(), 1200);
    };

    const loadCategories = async () => {
        try { setCategories(await getAllCategories()); } catch { /* silent */ }
    };

    const loadSubCategories = async (id: string) => {
        try { setSubCategories(await getSubCategoriesByCategory(id)); }
        catch { setSubCategories([]); }
    };

    const loadUsers = async () => {
        setUsersLoading(true);
        try { setUsers(await getAllUsers()); }
        catch { showToast('error', 'Erro ao carregar usuários'); }
        finally { setUsersLoading(false); }
    };

    useEffect(() => { loadCategories(); }, []);
    useEffect(() => {
        if (infoCatId) loadSubCategories(infoCatId);
        else setSubCategories([]);
        setInfoSubCatId('');
    }, [infoCatId]);
    useEffect(() => { if (activeTab === 'user') loadUsers(); }, [activeTab]);

    // Handlers — category / subcategory / information
    const handleCreateCategory = async (e: React.FormEvent) => {
        e.preventDefault(); setLoading(true);
        try { await createCategory({ name: catName }); reloadAfterSuccess(`Categoria "${catName}" criada!`); }
        catch (err) { showToast('error', err instanceof Error ? err.message : 'Erro'); setLoading(false); }
    };

    const handleCreateSubCategory = async (e: React.FormEvent) => {
        e.preventDefault(); setLoading(true);
        try { await createSubCategory({ name: subName, category_identifier: subCatId }); reloadAfterSuccess(`Subcategoria "${subName}" criada!`); }
        catch (err) { showToast('error', err instanceof Error ? err.message : 'Erro'); setLoading(false); }
    };

    const handleCreateInformation = async (e: React.FormEvent) => {
        e.preventDefault(); setLoading(true);
        try {
            await createInformation(
                { question: infoQuestion, content: infoContent, category_identifier: infoCatId, sub_category_identifier: infoSubCatId },
                infoFile ?? undefined,
            );
            reloadAfterSuccess('Informação criada!');
        } catch (err) { showToast('error', err instanceof Error ? err.message : 'Erro'); setLoading(false); }
    };

    // User handlers
    const handleCreateUser = async (e: React.FormEvent) => {
        e.preventDefault(); setLoading(true);
        try {
            await createUser(newUser);
            showToast('success', `Usuário "${newUser.name}" criado!`);
            setNewUser({ name: '', email: '', password: '', type: '' });
            setShowCreateUser(false);
            await loadUsers();
        } catch (err) { showToast('error', err instanceof Error ? err.message : 'Erro ao criar usuário'); }
        finally { setLoading(false); }
    };

    const startEdit = (u: UserResponse) => {
        setEditingId(u.id);
        setEditForm({ name: u.name, email: u.email, type: u.type, password: '' });
        setConfirmDeleteId(null);
    };

    const handleUpdateUser = async (id: string) => {
        setLoading(true);
        try {
            const payload: Record<string, string> = { name: editForm.name, email: editForm.email, type: editForm.type };
            if (editForm.password) payload.password = editForm.password;
            await updateUser(id, payload);
            showToast('success', 'Usuário atualizado!');
            setEditingId(null);
            await loadUsers();
        } catch (err) { showToast('error', err instanceof Error ? err.message : 'Erro ao atualizar'); }
        finally { setLoading(false); }
    };

    const handleDeleteUser = async (id: string) => {
        setLoading(true);
        try {
            await deleteUser(id);
            showToast('success', 'Usuário removido!');
            setConfirmDeleteId(null);
            await loadUsers();
        } catch (err) { showToast('error', err instanceof Error ? err.message : 'Erro ao deletar'); }
        finally { setLoading(false); }
    };

    const inputClass = `w-full px-4 py-2.5 rounded-lg border text-sm outline-none transition-all focus:ring-2 focus:ring-[#3fbec5] focus:border-transparent ${
        darkMode ? 'bg-[#0f0f0f] border-gray-700 text-white placeholder-gray-600' : 'bg-white border-gray-200 text-gray-900 placeholder-gray-400'
    }`;
    const labelClass = `block text-xs font-semibold uppercase tracking-wider mb-1.5 ${darkMode ? 'text-gray-400' : 'text-gray-500'}`;
    const cardClass = `rounded-2xl border p-6 ${darkMode ? 'bg-[#1a1a1a] border-gray-800' : 'bg-white border-gray-200'}`;

    return (
        <div className="relative">
            {/* Toast */}
            {toast && (
                <div className={`fixed top-6 right-6 z-50 flex items-center gap-3 px-4 py-3 rounded-xl shadow-2xl text-sm font-medium ${
                    toast.type === 'success' ? 'bg-emerald-500 text-white' : 'bg-red-500 text-white'
                }`}>
                    {toast.type === 'success' ? <CheckCircle className="w-4 h-4 shrink-0" /> : <XCircle className="w-4 h-4 shrink-0" />}
                    {toast.message}
                </div>
            )}

            {/* Header */}
            <div className="mb-8">
                <div className="flex items-center gap-2 mb-1">
                    <Sparkles className="w-5 h-5 text-[#3fbec5]" />
                    <span className="text-xs font-bold uppercase tracking-widest text-[#3fbec5]">Painel Master</span>
                </div>
                <h1 className={`text-3xl font-bold ${darkMode ? 'text-white' : 'text-[#155457]'}`}>Gerenciamento de Conteúdo</h1>
                <p className={`text-sm mt-1 ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>Crie e organize categorias, subcategorias, informações e usuários.</p>
            </div>

            {/* Tabs */}
            <div className="grid grid-cols-4 gap-3 mb-8">
                {tabs.map((tab) => {
                    const Icon = tab.icon;
                    const isActive = activeTab === tab.id;
                    return (
                        <button key={tab.id} onClick={() => setActiveTab(tab.id)}
                            className={`relative flex flex-col items-start gap-2 p-4 rounded-xl border-2 text-left transition-all duration-200 group ${
                                isActive ? 'border-[#3fbec5] bg-[#3fbec5]/10'
                                : darkMode ? 'border-gray-800 bg-[#1a1a1a] hover:border-gray-600' : 'border-gray-200 bg-white hover:border-gray-300'
                            }`}>
                            <div className={`w-9 h-9 rounded-lg flex items-center justify-center transition-colors ${
                                isActive ? 'bg-[#3fbec5] text-white'
                                : darkMode ? 'bg-gray-800 text-gray-400 group-hover:bg-gray-700' : 'bg-gray-100 text-gray-500 group-hover:bg-gray-200'
                            }`}>
                                <Icon className="w-4 h-4" />
                            </div>
                            <div>
                                <p className={`text-sm font-bold ${isActive ? 'text-[#3fbec5]' : darkMode ? 'text-white' : 'text-gray-800'}`}>{tab.label}</p>
                                <p className={`text-xs mt-0.5 leading-tight ${darkMode ? 'text-gray-500' : 'text-gray-400'}`}>{tab.description}</p>
                            </div>
                            {isActive && <ChevronRight className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#3fbec5]" />}
                        </button>
                    );
                })}
            </div>

            {/* Content */}
            <div className={cardClass}>

                {/* Category */}
                {activeTab === 'category' && (
                    <form onSubmit={handleCreateCategory} className="space-y-5">
                        <div className="flex items-center gap-2 mb-6">
                            <div className="w-8 h-8 rounded-lg bg-[#155457] flex items-center justify-center"><FolderPlus className="w-4 h-4 text-white" /></div>
                            <h2 className={`font-bold text-lg ${darkMode ? 'text-white' : 'text-gray-900'}`}>Nova Categoria</h2>
                        </div>
                        <div>
                            <label className={labelClass}>Nome *</label>
                            <input type="text" value={catName} onChange={e => setCatName(e.target.value)} required placeholder="Ex: Envio de SMS" className={inputClass} />
                        </div>
                        <button type="submit" disabled={loading || !catName.trim()} className="w-full py-3 rounded-xl bg-[#155457] hover:bg-[#268c90] text-white text-sm font-bold tracking-wide transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2">
                            <FolderPlus className="w-4 h-4" />{loading ? 'Criando...' : 'Criar Categoria'}
                        </button>
                    </form>
                )}

                {/* Subcategory */}
                {activeTab === 'subcategory' && (
                    <form onSubmit={handleCreateSubCategory} className="space-y-5">
                        <div className="flex items-center gap-2 mb-6">
                            <div className="w-8 h-8 rounded-lg bg-[#155457] flex items-center justify-center"><Layers className="w-4 h-4 text-white" /></div>
                            <h2 className={`font-bold text-lg ${darkMode ? 'text-white' : 'text-gray-900'}`}>Nova Subcategoria</h2>
                        </div>
                        <div>
                            <label className={labelClass}>Categoria pai *</label>
                            <select value={subCatId} onChange={e => setSubCatId(e.target.value)} required className={inputClass}>
                                <option value="">Selecione uma categoria...</option>
                                {categories.map(c => <option key={c.identifier} value={c.identifier}>{c.name}</option>)}
                            </select>
                        </div>
                        <div>
                            <label className={labelClass}>Nome *</label>
                            <input type="text" value={subName} onChange={e => setSubName(e.target.value)} required placeholder="Ex: Configurações de API" className={inputClass} />
                        </div>
                        <button type="submit" disabled={loading || !subName.trim() || !subCatId} className="w-full py-3 rounded-xl bg-[#155457] hover:bg-[#268c90] text-white text-sm font-bold tracking-wide transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2">
                            <Layers className="w-4 h-4" />{loading ? 'Criando...' : 'Criar Subcategoria'}
                        </button>
                    </form>
                )}

                {/* Information */}
                {activeTab === 'information' && (
                    <form onSubmit={handleCreateInformation} className="space-y-5">
                        <div className="flex items-center gap-2 mb-6">
                            <div className="w-8 h-8 rounded-lg bg-[#155457] flex items-center justify-center"><FileText className="w-4 h-4 text-white" /></div>
                            <h2 className={`font-bold text-lg ${darkMode ? 'text-white' : 'text-gray-900'}`}>Nova Informação</h2>
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <label className={labelClass}>Categoria *</label>
                                <select value={infoCatId} onChange={e => setInfoCatId(e.target.value)} required className={inputClass}>
                                    <option value="">Selecione...</option>
                                    {categories.map(c => <option key={c.identifier} value={c.identifier}>{c.name}</option>)}
                                </select>
                            </div>
                            <div>
                                <label className={labelClass}>Subcategoria *</label>
                                <select value={infoSubCatId} onChange={e => setInfoSubCatId(e.target.value)} required disabled={!infoCatId} className={`${inputClass} disabled:opacity-50`}>
                                    <option value="">Selecione...</option>
                                    {subCategories.map(s => <option key={s.identifier} value={s.identifier}>{s.name}</option>)}
                                </select>
                            </div>
                        </div>
                        <div>
                            <label className={labelClass}>Pergunta *</label>
                            <input type="text" value={infoQuestion} onChange={e => setInfoQuestion(e.target.value)} required placeholder="Ex: Como configurar o webhook de retorno?" className={inputClass} />
                        </div>
                        <div>
                            <label className={labelClass}>Conteúdo / Resposta *</label>
                            <textarea value={infoContent} onChange={e => setInfoContent(e.target.value)} required placeholder="Escreva a resposta completa aqui. Suporta HTML." rows={8} className={`${inputClass} resize-none font-mono text-xs`} />
                            <p className={`text-xs mt-1 ${darkMode ? 'text-gray-600' : 'text-gray-400'}`}>Suporta HTML para formatação avançada.</p>
                        </div>
                        <div>
                            <label className={labelClass}>Imagem <span className={`normal-case font-normal ${darkMode ? 'text-gray-600' : 'text-gray-400'}`}>(opcional)</span></label>
                            <label className={`flex items-center gap-3 px-4 py-3 rounded-lg border cursor-pointer transition-all ${
                                infoFile
                                    ? darkMode ? 'border-[#3fbec5] bg-[#3fbec5]/10' : 'border-[#3fbec5] bg-[#3fbec5]/5'
                                    : darkMode ? 'border-gray-700 hover:border-gray-600 bg-[#0f0f0f]' : 'border-gray-200 hover:border-gray-300 bg-white'
                            }`}>
                                <input
                                    type="file"
                                    accept="image/jpeg,image/png,image/webp,image/gif"
                                    className="hidden"
                                    onChange={e => setInfoFile(e.target.files?.[0] ?? null)}
                                />
                                <svg className={`w-5 h-5 shrink-0 ${infoFile ? 'text-[#3fbec5]' : darkMode ? 'text-gray-500' : 'text-gray-400'}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                </svg>
                                <span className={`text-sm truncate ${infoFile ? 'text-[#3fbec5] font-medium' : darkMode ? 'text-gray-500' : 'text-gray-400'}`}>
                                    {infoFile ? infoFile.name : 'Clique para selecionar uma imagem...'}
                                </span>
                                {infoFile && (
                                    <button type="button" onClick={e => { e.preventDefault(); setInfoFile(null); }}
                                        className={`ml-auto shrink-0 text-xs px-2 py-0.5 rounded ${darkMode ? 'text-gray-400 hover:text-red-400' : 'text-gray-400 hover:text-red-500'}`}>
                                        remover
                                    </button>
                                )}
                            </label>
                            <p className={`text-xs mt-1 ${darkMode ? 'text-gray-600' : 'text-gray-400'}`}>JPG, PNG, WEBP ou GIF · máx. 10MB</p>
                        </div>
                        <button type="submit" disabled={loading || !infoQuestion.trim() || !infoContent.trim() || !infoCatId || !infoSubCatId} className="w-full py-3 rounded-xl bg-[#155457] hover:bg-[#268c90] text-white text-sm font-bold tracking-wide transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2">
                            <FileText className="w-4 h-4" />{loading ? 'Criando...' : 'Criar Informação'}
                        </button>
                    </form>
                )}

                {/* Users */}
                {activeTab === 'user' && (
                    <div>
                        {/* Header row */}
                        <div className="flex items-center justify-between mb-6">
                            <div className="flex items-center gap-2">
                                <div className="w-8 h-8 rounded-lg bg-[#155457] flex items-center justify-center"><Users className="w-4 h-4 text-white" /></div>
                                <h2 className={`font-bold text-lg ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                                    Usuários <span className={`text-sm font-normal ml-1 ${darkMode ? 'text-gray-500' : 'text-gray-400'}`}>({users.filter(u => !u.deleted).length} ativos)</span>
                                </h2>
                            </div>
                            <button onClick={() => { setShowCreateUser(v => !v); setEditingId(null); setConfirmDeleteId(null); }}
                                className="flex items-center gap-2 px-4 py-2 rounded-lg bg-[#155457] hover:bg-[#268c90] text-white text-sm font-semibold transition-colors">
                                {showCreateUser ? <X className="w-4 h-4" /> : <UserPlus className="w-4 h-4" />}
                                {showCreateUser ? 'Cancelar' : 'Novo Usuário'}
                            </button>
                        </div>

                        {/* Create form */}
                        {showCreateUser && (
                            <form onSubmit={handleCreateUser} className={`mb-6 p-4 rounded-xl border-2 border-dashed border-[#3fbec5]/40 space-y-4 ${darkMode ? 'bg-[#0f0f0f]' : 'bg-gray-50'}`}>
                                <p className="text-xs font-bold uppercase tracking-wider text-[#3fbec5]">Novo usuário</p>
                                <div className="grid grid-cols-2 gap-3">
                                    <div>
                                        <label className={labelClass}>Nome *</label>
                                        <input type="text" value={newUser.name} onChange={e => setNewUser(p => ({ ...p, name: e.target.value }))} required placeholder="João Silva" className={inputClass} />
                                    </div>
                                    <div>
                                        <label className={labelClass}>Tipo *</label>
                                        <select value={newUser.type} onChange={e => setNewUser(p => ({ ...p, type: e.target.value }))} required className={inputClass}>
                                            <option value="">Selecione...</option>
                                            {USER_TYPES.map(t => <option key={t.value} value={t.value}>{t.label}</option>)}
                                        </select>
                                    </div>
                                    <div>
                                        <label className={labelClass}>Email *</label>
                                        <input type="email" value={newUser.email} onChange={e => setNewUser(p => ({ ...p, email: e.target.value }))} required placeholder="joao@empresa.com" className={inputClass} />
                                    </div>
                                    <div>
                                        <label className={labelClass}>Senha *</label>
                                        <input type="password" value={newUser.password} onChange={e => setNewUser(p => ({ ...p, password: e.target.value }))} required placeholder="••••••••" className={inputClass} />
                                    </div>
                                </div>
                                <button type="submit" disabled={loading || !newUser.name || !newUser.email || !newUser.password || !newUser.type}
                                    className="w-full py-2.5 rounded-lg bg-[#3fbec5] hover:bg-[#2fa8af] text-white text-sm font-bold transition-colors disabled:opacity-50 flex items-center justify-center gap-2">
                                    <UserPlus className="w-4 h-4" />{loading ? 'Criando...' : 'Criar Usuário'}
                                </button>
                            </form>
                        )}

                        {/* Table */}
                        {usersLoading ? (
                            <div className="space-y-3">
                                {[1,2,3].map(i => <div key={i} className={`h-14 rounded-lg animate-pulse ${darkMode ? 'bg-gray-800' : 'bg-gray-100'}`} />)}
                            </div>
                        ) : users.length === 0 ? (
                            <p className={`text-center py-12 text-sm ${darkMode ? 'text-gray-500' : 'text-gray-400'}`}>Nenhum usuário encontrado.</p>
                        ) : (
                            <div className="space-y-2">
                                {users.map(u => {
                                    const badge = typeBadge(u.type);
                                    const isEditing = editingId === u.id;
                                    const isConfirmDelete = confirmDeleteId === u.id;

                                    return (
                                        <div key={u.id} className={`rounded-xl border transition-all ${
                                            u.deleted ? 'opacity-50' : ''
                                        } ${darkMode ? 'border-gray-800 bg-[#111]' : 'border-gray-100 bg-gray-50'}`}>

                                            {/* Normal row */}
                                            {!isEditing && !isConfirmDelete && (
                                                <div className="flex items-center gap-3 px-4 py-3">
                                                    <div className="w-9 h-9 rounded-full bg-[#155457] flex items-center justify-center text-white text-sm font-bold shrink-0">
                                                        {u.name.charAt(0).toUpperCase()}
                                                    </div>
                                                    <div className="flex-1 min-w-0">
                                                        <p className={`text-sm font-semibold truncate ${darkMode ? 'text-white' : 'text-gray-900'}`}>{u.name}</p>
                                                        <p className={`text-xs truncate ${darkMode ? 'text-gray-500' : 'text-gray-400'}`}>{u.email}</p>
                                                    </div>
                                                    <span className={`text-xs font-semibold px-2.5 py-1 rounded-full border ${badge.color}`}>{badge.label}</span>
                                                    {u.deleted
                                                        ? <span className="text-xs px-2.5 py-1 rounded-full bg-red-500/10 text-red-400 border border-red-500/20">Inativo</span>
                                                        : <span className="text-xs px-2.5 py-1 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">Ativo</span>
                                                    }
                                                    {!u.deleted && (
                                                        <div className="flex items-center gap-1 ml-1">
                                                            <button onClick={() => startEdit(u)} title="Editar"
                                                                className={`p-1.5 rounded-lg transition-colors ${darkMode ? 'text-gray-400 hover:text-white hover:bg-gray-800' : 'text-gray-400 hover:text-gray-700 hover:bg-gray-200'}`}>
                                                                <Pencil className="w-3.5 h-3.5" />
                                                            </button>
                                                            <button onClick={() => { setConfirmDeleteId(u.id); setEditingId(null); }} title="Remover"
                                                                className="p-1.5 rounded-lg text-gray-400 hover:text-red-500 hover:bg-red-500/10 transition-colors">
                                                                <Trash2 className="w-3.5 h-3.5" />
                                                            </button>
                                                        </div>
                                                    )}
                                                </div>
                                            )}

                                            {/* Edit row */}
                                            {isEditing && (
                                                <div className="p-4 space-y-3">
                                                    <p className="text-xs font-bold uppercase tracking-wider text-[#3fbec5]">Editando: {u.name}</p>
                                                    <div className="grid grid-cols-2 gap-3">
                                                        <div>
                                                            <label className={labelClass}>Nome</label>
                                                            <input type="text" value={editForm.name} onChange={e => setEditForm(p => ({ ...p, name: e.target.value }))} className={inputClass} />
                                                        </div>
                                                        <div>
                                                            <label className={labelClass}>Tipo</label>
                                                            <select value={editForm.type} onChange={e => setEditForm(p => ({ ...p, type: e.target.value }))} className={inputClass}>
                                                                {USER_TYPES.map(t => <option key={t.value} value={t.value}>{t.label}</option>)}
                                                            </select>
                                                        </div>
                                                        <div>
                                                            <label className={labelClass}>Email</label>
                                                            <input type="email" value={editForm.email} onChange={e => setEditForm(p => ({ ...p, email: e.target.value }))} className={inputClass} />
                                                        </div>
                                                        <div>
                                                            <label className={labelClass}>Nova senha <span className="normal-case font-normal">(opcional)</span></label>
                                                            <input type="password" value={editForm.password} onChange={e => setEditForm(p => ({ ...p, password: e.target.value }))} placeholder="Deixe vazio para manter" className={inputClass} />
                                                        </div>
                                                    </div>
                                                    <div className="flex gap-2 pt-1">
                                                        <button onClick={() => handleUpdateUser(u.id)} disabled={loading}
                                                            className="flex items-center gap-1.5 px-4 py-2 rounded-lg bg-[#155457] hover:bg-[#268c90] text-white text-sm font-semibold transition-colors disabled:opacity-50">
                                                            <Check className="w-3.5 h-3.5" />Salvar
                                                        </button>
                                                        <button onClick={() => setEditingId(null)}
                                                            className={`flex items-center gap-1.5 px-4 py-2 rounded-lg text-sm font-semibold transition-colors ${darkMode ? 'bg-gray-800 text-gray-300 hover:bg-gray-700' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'}`}>
                                                            <X className="w-3.5 h-3.5" />Cancelar
                                                        </button>
                                                    </div>
                                                </div>
                                            )}

                                            {/* Delete confirm row */}
                                            {isConfirmDelete && (
                                                <div className="flex items-center gap-3 px-4 py-3">
                                                    <AlertTriangle className="w-4 h-4 text-red-400 shrink-0" />
                                                    <p className={`text-sm flex-1 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                                                        Remover <span className="font-bold">{u.name}</span>?
                                                    </p>
                                                    <button onClick={() => handleDeleteUser(u.id)} disabled={loading}
                                                        className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-red-500 hover:bg-red-600 text-white text-sm font-semibold transition-colors disabled:opacity-50">
                                                        <Trash2 className="w-3.5 h-3.5" />Confirmar
                                                    </button>
                                                    <button onClick={() => setConfirmDeleteId(null)}
                                                        className={`px-3 py-1.5 rounded-lg text-sm font-semibold transition-colors ${darkMode ? 'bg-gray-800 text-gray-300 hover:bg-gray-700' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'}`}>
                                                        Cancelar
                                                    </button>
                                                </div>
                                            )}
                                        </div>
                                    );
                                })}
                            </div>
                        )}
                    </div>
                )}
            </div>
        </div>
    );
}
