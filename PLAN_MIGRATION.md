# Plan de Migration - Gestion Don de Sang (Stack MySQL)

Ce document détaille la stratégie pour reconstruire l'application avec React, Node.js et MySQL.

## Architecture Globale

- **Backend** : Node.js avec Express et MySQL (mysql2).
- **Frontend** : React avec TypeScript et Vanilla CSS.
- **Communication** : API REST.
- **Authentification** : JWT (JSON Web Tokens).

## Structure des Dossiers

```text
/ (Racine)
├── backend/            # API Node.js
│   ├── config/         # Configuration DB (MySQL Pool)
│   ├── controllers/    # Logique métier (Requêtes SQL)
│   ├── routes/         # Routes API
│   └── middleware/     # Auth, erreurs
└── frontend/           # Application React
    ├── src/
    │   ├── components/ # Composants UI
    │   ├── pages/      # Pages de l'application
    │   ├── services/   # Appels API (Axios)
    │   └── context/    # Gestion d'état
    └── public/
```

## Base de Données (MySQL)

L'application utilise une base de données MySQL. Le schéma est défini dans `setup_db.sql`.

1.  **utilisateurs** : `id`, `nom`, `email`, `mot_de_passe`, `role`, `id_centre`.
2.  **donneurs** : `id_donneur`, `nom`, `prenom`, `cin`, `groupe_sanguin`, `rhesus`, `adresse`, `telephone`.
3.  **dons** : `id_don`, `id_donneur`, `id_centre`, `date_don`, `statut`.
4.  **centres** : `id_centre`, `nom`, `adresse`, `telephone`.

## État d'Avancement

### Phase 1 : Initialisation
- [x] Structure des dossiers Backend/Frontend.
- [x] Configuration de la connexion MySQL.
- [x] Implémentation de l'authentification JWT.

### Phase 2 : Développement Backend
- [x] CRUD Donneurs.
- [x] CRUD Centres.
- [x] CRUD Dons.
- [x] Gestion des utilisateurs.

### Phase 3 : Développement Frontend
- [x] Mise en place du Router et du Layout.
- [x] Page de Connexion.
- [x] Tableaux de bord et listes (Donneurs, Dons, Centres).
- [ ] Finalisation des formulaires d'ajout (Modals).

### Phase 4 : Finalisation
- [ ] Tests d'intégration.
- [ ] Nettoyage final du code.

