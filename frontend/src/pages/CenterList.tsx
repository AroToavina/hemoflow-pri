import React, { useEffect, useState } from 'react';
import api from '../services/api';
import AddCenterModal from '../components/AddCenterModal';
import { Building2, Plus, MapPin, Phone } from 'lucide-react';

interface Center {
    _id: string;
    nom_centre: string;
    adresse: string;
    telephone: string;
}

const CenterList: React.FC = () => {
    const [centers, setCenters] = useState<Center[]>([]);
    const [isModalOpen, setIsModalOpen] = useState(false);

    const fetchCenters = async () => {
        try {
            const res = await api.get('/centers');
            setCenters(res.data);
        } catch (err) {
            console.error(err);
        }
    };

    useEffect(() => {
        fetchCenters();
    }, []);

    return (
        <>
            <div className="px-6 lg:px-10 pt-10 pb-6 flex flex-wrap items-end justify-between gap-6">
                <div>
                    <p className="text-[11px] font-semibold tracking-[0.22em] uppercase text-blood-600 mb-3">
                        Infrastructure
                    </p>
                    <h1 className="font-display font-extrabold text-4xl lg:text-5xl text-ink leading-[0.95]">
                        Centres
                    </h1>
                </div>
                <div className="flex items-center gap-3">
                    <button 
                        onClick={() => setIsModalOpen(true)}
                        className="flex items-center gap-2 px-4 py-2.5 rounded-lg bg-blood-600 text-white text-sm font-bold shadow-lg shadow-blood-600/20 hover:bg-blood-700 transition-colors"
                    >
                        <Plus className="size-4" /> Nouveau Centre
                    </button>
                </div>
            </div>

            <div className="px-6 lg:px-10 pb-16 flex-1">
                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 animate-fade-in-up">
                    <AddCenterModal 
                        isOpen={isModalOpen} 
                        onClose={() => setIsModalOpen(false)} 
                        onSuccess={fetchCenters} 
                    />

                    {centers.map(center => (
                        <div key={center._id} className="bg-surface rounded-2xl border border-rule p-6 hover:shadow-md transition-shadow">
                            <div className="flex items-start justify-between mb-4">
                                <div className="size-12 rounded-xl bg-blood-50 grid place-items-center">
                                    <Building2 className="size-6 text-blood-600" />
                                </div>
                                <div className="flex gap-2">
                                    <button className="p-2 hover:bg-surface-elevated rounded-lg transition-colors text-ink-muted">✏️</button>
                                    <button className="p-2 hover:bg-blood-50 rounded-lg transition-colors text-ink-muted">🗑️</button>
                                </div>
                            </div>
                            <h3 className="font-display font-bold text-xl mb-4">{center.nom_centre}</h3>
                            <div className="space-y-3">
                                <div className="flex items-center gap-3 text-sm text-ink-muted">
                                    <MapPin className="size-4 shrink-0" />
                                    <span>{center.adresse}</span>
                                </div>
                                <div className="flex items-center gap-3 text-sm text-ink-muted">
                                    <Phone className="size-4 shrink-0" />
                                    <span>{center.telephone || 'N/A'}</span>
                                </div>
                            </div>
                            <div className="mt-6 pt-6 border-t border-rule flex items-center justify-between">
                                <span className="text-[10px] uppercase tracking-widest font-bold text-ink-muted">Capacité: Stable</span>
                                <button className="text-sm font-bold text-blood-600 hover:text-blood-700">Voir détails →</button>
                            </div>
                        </div>
                    ))}

                    {centers.length === 0 && (
                        <div className="col-span-full py-20 text-center bg-surface rounded-2xl border border-dashed border-rule">
                            <p className="text-ink-muted">Aucun centre enregistré pour le moment.</p>
                        </div>
                    )}
                </div>
            </div>
        </>
    );
};

export default CenterList;
