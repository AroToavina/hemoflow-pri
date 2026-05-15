import React, { useState, useEffect } from 'react';
import api from '../services/api';

interface AddDonationModalProps {
    isOpen: boolean;
    onClose: () => void;
    onSuccess: () => void;
}

const AddDonationModal: React.FC<AddDonationModalProps> = ({ isOpen, onClose, onSuccess }) => {
    const [donors, setDonors] = useState<any[]>([]);
    const [centers, setCenters] = useState<any[]>([]);
    const [formData, setFormData] = useState({
        donorId: '',
        centreId: '',
        dateDon: new Date().toISOString().split('T')[0],
        statut: 'EN_STOCK'
    });

    useEffect(() => {
        if (isOpen) {
            const fetchData = async () => {
                try {
                    const [donorsRes, centersRes] = await Promise.all([
                        api.get('/donors'),
                        api.get('/centers')
                    ]);
                    setDonors(donorsRes.data);
                    setCenters(centersRes.data);
                } catch (err) {
                    console.error("Erreur chargement données:", err);
                }
            };
            fetchData();
        }
    }, [isOpen]);

    if (!isOpen) return null;

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            await api.post('/donations', formData);
            onSuccess();
            onClose();
            setFormData({ ...formData, donorId: '', centreId: '' });
        } catch (err) {
            console.error("Erreur lors de l'ajout du don:", err);
            alert("Erreur lors de l'enregistrement du don");
        }
    };

    return (
        <div className="modal-overlay">
            <div className="modal-content">
                <div className="modal-header">
                    <h3>Enregistrer un Nouveau Don</h3>
                    <button onClick={onClose} className="close-btn">&times;</button>
                </div>
                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label>Sélectionner le Donneur</label>
                        <select 
                            value={formData.donorId} 
                            onChange={e => setFormData({...formData, donorId: e.target.value})}
                            required
                        >
                            <option value="">-- Choisir un donneur --</option>
                            {donors.map(d => (
                                <option key={d._id} value={d._id}>
                                    {d.nom} {d.prenom} ({d.groupeSanguin}{d.rhesus})
                                </option>
                            ))}
                        </select>
                    </div>
                    <div className="form-group">
                        <label>Centre de Collecte</label>
                        <select 
                            value={formData.centreId} 
                            onChange={e => setFormData({...formData, centreId: e.target.value})}
                            required
                        >
                            <option value="">-- Choisir un centre --</option>
                            {centers.map(c => (
                                <option key={c._id} value={c._id}>{c.nom}</option>
                            ))}
                        </select>
                    </div>
                    <div className="form-group">
                        <label>Date du Don</label>
                        <input 
                            type="date" 
                            value={formData.dateDon} 
                            onChange={e => setFormData({...formData, dateDon: e.target.value})} 
                            required 
                        />
                    </div>
                    <div className="form-group">
                        <label>Statut Initial</label>
                        <select value={formData.statut} onChange={e => setFormData({...formData, statut: e.target.value})}>
                            <option value="EN_STOCK">EN_STOCK</option>
                            <option value="UTILISE">UTILISE</option>
                            <option value="REJETE">REJETE</option>
                        </select>
                    </div>
                    <div className="modal-footer">
                        <button type="button" onClick={onClose} className="btn-secondary">Annuler</button>
                        <button type="submit" className="btn-primary">Enregistrer le Don</button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default AddDonationModal;
