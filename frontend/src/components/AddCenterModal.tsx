import React, { useState } from 'react';
import api from '../services/api';

interface AddCenterModalProps {
    isOpen: boolean;
    onClose: () => void;
    onSuccess: () => void;
}

const AddCenterModal: React.FC<AddCenterModalProps> = ({ isOpen, onClose, onSuccess }) => {
    const [formData, setFormData] = useState({
        nom: '',
        adresse: '',
        telephone: ''
    });

    if (!isOpen) return null;

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            await api.post('/centers', formData);
            onSuccess();
            onClose();
            setFormData({ nom: '', adresse: '', telephone: '' });
        } catch (err: any) {
            console.error("Erreur lors de l'ajout du centre:", err);
            const errorMsg = err.response?.data?.msg || err.response?.data || "Erreur lors de l'enregistrement du centre";
            alert(errorMsg);
        }
    };

    return (
        <div className="modal-overlay">
            <div className="modal-content">
                <div className="modal-header">
                    <h3>Ajouter un Nouveau Centre</h3>
                    <button onClick={onClose} className="close-btn">&times;</button>
                </div>
                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label>Nom du Centre</label>
                        <input 
                            type="text" 
                            value={formData.nom} 
                            onChange={e => setFormData({...formData, nom: e.target.value})} 
                            required 
                        />
                    </div>
                    <div className="form-group">
                        <label>Adresse</label>
                        <input 
                            type="text" 
                            value={formData.adresse} 
                            onChange={e => setFormData({...formData, adresse: e.target.value})} 
                            required 
                        />
                    </div>
                    <div className="form-group">
                        <label>Téléphone</label>
                        <input 
                            type="text" 
                            value={formData.telephone} 
                            onChange={e => setFormData({...formData, telephone: e.target.value})} 
                        />
                    </div>
                    <div className="modal-footer">
                        <button type="button" onClick={onClose} className="btn-secondary">Annuler</button>
                        <button type="submit" className="btn-primary">Enregistrer le Centre</button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default AddCenterModal;
