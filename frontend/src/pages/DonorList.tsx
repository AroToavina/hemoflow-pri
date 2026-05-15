import React, { useEffect, useState } from 'react';
import api from '../services/api';
import AddDonorModal from '../components/AddDonorModal';
import { UserPlus, Search, Filter } from 'lucide-react';

interface Donor {
    id_donneur: number;
    nom: string;
    prenom: string;
    cin: string;
    groupe_sanguin: string;
    rhesus: string;
    telephone: string;
}

const DonorList: React.FC = () => {
    const [donors, setDonors] = useState<Donor[]>([]);
    const [isModalOpen, setIsModalOpen] = useState(false);

    const fetchDonors = async () => {
        try {
            const res = await api.get('/donors');
            setDonors(res.data);
        } catch (err) {
            console.error(err);
        }
    };

    useEffect(() => {
        fetchDonors();
    }, []);

    return (
        <>
            <div className="px-6 lg:px-10 pt-10 pb-6 flex flex-wrap items-end justify-between gap-6">
                <div>
                    <p className="text-[11px] font-semibold tracking-[0.22em] uppercase text-blood-600 mb-3">
                        Base de données
                    </p>
                    <h1 className="font-display font-extrabold text-4xl lg:text-5xl text-ink leading-[0.95]">
                        Donneurs
                    </h1>
                </div>
                <div className="flex items-center gap-3">
                    <button className="flex items-center gap-2 px-4 py-2.5 rounded-lg border border-rule bg-surface text-sm font-medium hover:bg-surface-elevated transition-colors">
                        <Filter className="size-4" /> Filtrer
                    </button>
                    <button 
                        onClick={() => setIsModalOpen(true)}
                        className="flex items-center gap-2 px-4 py-2.5 rounded-lg bg-blood-600 text-white text-sm font-bold shadow-lg shadow-blood-600/20 hover:bg-blood-700 transition-colors"
                    >
                        <UserPlus className="size-4" /> Ajouter un donneur
                    </button>
                </div>
            </div>

            <div className="px-6 lg:px-10 pb-16 flex-1">
                <div className="table-container animate-fade-in-up">
                    <div className="flex items-center justify-between mb-6">
                        <h3 className="font-display font-bold text-xl">Liste des Donneurs</h3>
                        <div className="relative">
                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-ink-muted" />
                            <input 
                                type="text" 
                                placeholder="Rechercher un nom, CIN..." 
                                className="pl-10 pr-4 py-2 rounded-lg border border-rule bg-surface-elevated text-sm w-64 focus:outline-none focus:ring-2 focus:ring-blood-500/20"
                            />
                        </div>
                    </div>
                    
                    <AddDonorModal 
                        isOpen={isModalOpen} 
                        onClose={() => setIsModalOpen(false)} 
                        onSuccess={fetchDonors} 
                    />

                    <table>
                        <thead>
                            <tr>
                                <th>Nom & Prénom</th>
                                <th>CIN</th>
                                <th>Groupe</th>
                                <th>Rhésus</th>
                                <th>Téléphone</th>
                                <th style={{ textAlign: 'right' }}>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {donors.map(donor => (
                                <tr key={donor.id_donneur}>
                                    <td className="font-medium">{donor.nom} {donor.prenom}</td>
                                    <td>{donor.cin}</td>
                                    <td>
                                        <span className={`px-2 py-1 rounded bg-surface-elevated font-bold text-blood-700`}>
                                            {donor.groupe_sanguin}
                                        </span>
                                    </td>
                                    <td>{donor.rhesus}</td>
                                    <td>{donor.telephone}</td>
                                    <td style={{ textAlign: 'right' }}>
                                        <button className="p-2 hover:bg-surface-elevated rounded-lg transition-colors text-ink-muted hover:text-ink">✏️</button>
                                        <button className="p-2 hover:bg-blood-50 rounded-lg transition-colors text-ink-muted hover:text-blood-600">🗑️</button>
                                    </td>
                                </tr>
                            ))}
                            {donors.length === 0 && (
                                <tr>
                                    <td colSpan={6} style={{ textAlign: 'center', padding: '40px', color: 'var(--color-ink-muted)' }}>
                                        Aucun donneur trouvé
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </>
    );
};

export default DonorList;
