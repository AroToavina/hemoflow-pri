import React, { useState } from 'react';
import api from '../services/api';

interface AddDonorModalProps {
    isOpen: boolean;
    onClose: () => void;
    onSuccess: () => void;
}

const AddDonorModal: React.FC<AddDonorModalProps> = ({ isOpen, onClose, onSuccess }) => {
    const [formData, setFormData] = useState({
        nom: '',
        prenom: '',
        cin: '',
        groupeSanguin: 'A',
        rhesus: '+',
        telephone: '',
        adresse: ''
    });

    if (!isOpen) return null;

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            await api.post('/donors', formData);
            onSuccess();
            onClose();
            setFormData({ nom: '', prenom: '', cin: '', groupeSanguin: 'A', rhesus: '+', telephone: '', adresse: '' });
        } catch (err) {
            console.error("Erreur lors de l'ajout:", err);
            alert("Erreur lors de l'ajout du donneur");
        }
    };

    return (
        <div className="modal-overlay">
            <div className="modal-content">
                <div className="modal-header">
                    <h3>Ajouter un Nouveau Donneur</h3>
                    <button onClick={onClose} className="close-btn">&times;</button>
                </div>
                <form onSubmit={handleSubmit}>
                    <div className="form-row">
                        <div className="form-group">
                            <label>Nom</label>
                            <input type="text" value={formData.nom} onChange={e => setFormData({...formData, nom: e.target.value})} required />
                        </div>
                        <div className="form-group">
                            <label>Prénom</label>
                            <input type="text" value={formData.prenom} onChange={e => setFormData({...formData, prenom: e.target.value})} required />
                        </div>
                    </div>
                    <div className="form-row">
                        <div className="form-group">
                            <label>CIN</label>
                            <input type="text" value={formData.cin} onChange={e => setFormData({...formData, cin: e.target.value})} required />
                        </div>
                        <div className="form-group">
                            <label>Téléphone</label>
                            <input type="text" value={formData.telephone} onChange={e => setFormData({...formData, telephone: e.target.value})} />
                        </div>
                    </div>
                    <div className="form-row">
                        <div className="form-group">
                            <label>Groupe Sanguin</label>
                            <select value={formData.groupeSanguin} onChange={e => setFormData({...formData, groupeSanguin: e.target.value})}>
                                <option value="A">A</option>
                                <option value="B">B</option>
                                <option value="AB">AB</option>
                                <option value="O">O</option>
                            </select>
                        </div>
                        <div className="form-group">
                            <label>Rhésus</label>
                            <select value={formData.rhesus} onChange={e => setFormData({...formData, rhesus: e.target.value})}>
                                <option value="+">+</option>
                                <option value="-">-</option>
                            </select>
                        </div>
                    </div>
                    <div className="form-group">
                        <label>Adresse</label>
                        <textarea value={formData.adresse} onChange={e => setFormData({...formData, adresse: e.target.value})}></textarea>
                    </div>
                    <div className="modal-footer">
                        <button type="button" onClick={onClose} className="btn-secondary">Annuler</button>
                        <button type="submit" className="btn-primary">Enregistrer</button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default AddDonorModal;
