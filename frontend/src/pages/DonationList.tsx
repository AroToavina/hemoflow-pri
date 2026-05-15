import React, { useEffect, useState } from 'react';
import api from '../services/api';
import AddDonationModal from '../components/AddDonationModal';
import { Droplets, Plus, Search, Calendar } from 'lucide-react';

interface Donation {
    _id: string;
    donorId: { nom: string, prenom: string };
    centreId: { nom: string };
    dateDon: string;
    statut: string;
}

const DonationList: React.FC = () => {
    const [donations, setDonations] = useState<Donation[]>([]);
    const [isModalOpen, setIsModalOpen] = useState(false);

    const fetchDonations = async () => {
        try {
            const res = await api.get('/donations');
            setDonations(res.data);
        } catch (err) {
            console.error(err);
        }
    };

    useEffect(() => {
        fetchDonations();
    }, []);

    const getStatusBadge = (statut: string) => {
        switch(statut) {
            case 'EN_STOCK': return <span className="badge badge-normal">EN STOCK</span>;
            case 'UTILISE': return <span className="badge" style={{background: 'var(--color-blood-50)', color: 'var(--color-blood-700)'}}>UTILISÉ</span>;
            case 'REJETE': return <span className="badge badge-urgent">REJETÉ</span>;
            default: return <span className="badge">{statut}</span>;
        }
    };

    return (
        <>
            <div className="px-6 lg:px-10 pt-10 pb-6 flex flex-wrap items-end justify-between gap-6">
                <div>
                    <p className="text-[11px] font-semibold tracking-[0.22em] uppercase text-blood-600 mb-3">
                        Flux de stock
                    </p>
                    <h1 className="font-display font-extrabold text-4xl lg:text-5xl text-ink leading-[0.95]">
                        Dons
                    </h1>
                </div>
                <div className="flex items-center gap-3">
                    <button className="flex items-center gap-2 px-4 py-2.5 rounded-lg border border-rule bg-surface text-sm font-medium hover:bg-surface-elevated transition-colors">
                        <Calendar className="size-4" /> Historique complet
                    </button>
                    <button 
                        onClick={() => setIsModalOpen(true)}
                        className="flex items-center gap-2 px-4 py-2.5 rounded-lg bg-blood-600 text-white text-sm font-bold shadow-lg shadow-blood-600/20 hover:bg-blood-700 transition-colors"
                    >
                        <Plus className="size-4" /> Enregistrer un don
                    </button>
                </div>
            </div>

            <div className="px-6 lg:px-10 pb-16 flex-1">
                <div className="table-container animate-fade-in-up">
                    <div className="flex items-center justify-between mb-6">
                        <h3 className="font-display font-bold text-xl">Historique des Dons</h3>
                        <div className="relative">
                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-ink-muted" />
                            <input 
                                type="text" 
                                placeholder="Rechercher par donneur..." 
                                className="pl-10 pr-4 py-2 rounded-lg border border-rule bg-surface-elevated text-sm w-64 focus:outline-none focus:ring-2 focus:ring-blood-500/20"
                            />
                        </div>
                    </div>

                    <AddDonationModal 
                        isOpen={isModalOpen} 
                        onClose={() => setIsModalOpen(false)} 
                        onSuccess={fetchDonations} 
                    />

                    <table>
                        <thead>
                            <tr>
                                <th>Donneur</th>
                                <th>Centre</th>
                                <th>Date</th>
                                <th>Statut</th>
                                <th style={{ textAlign: 'right' }}>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {donations.map(donation => (
                                <tr key={donation._id}>
                                    <td className="font-medium">
                                        {donation.donorId?.nom} {donation.donorId?.prenom}
                                    </td>
                                    <td>{donation.centreId?.nom}</td>
                                    <td>{new Date(donation.dateDon).toLocaleDateString()}</td>
                                    <td>{getStatusBadge(donation.statut)}</td>
                                    <td style={{ textAlign: 'right' }}>
                                        <button className="p-2 hover:bg-surface-elevated rounded-lg transition-colors text-ink-muted hover:text-ink">👁️ Voir</button>
                                    </td>
                                </tr>
                            ))}
                            {donations.length === 0 && (
                                <tr>
                                    <td colSpan={5} style={{ textAlign: 'center', padding: '40px', color: 'var(--color-ink-muted)' }}>
                                        Aucun don enregistré
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

export default DonationList;
