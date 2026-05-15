# HemoFlow - Système de Gestion de Don de Sang

HemoFlow est une application web moderne et intuitive conçue pour centraliser et optimiser la gestion des dons de sang. Elle permet aux centres de collecte de suivre efficacement les donneurs, d'enregistrer les dons et de surveiller l'état des stocks en temps réel.

## 🚀 Fonctionnalités Clés

- **Tableau de Bord Analytique :** Visualisation des tendances de dons, du stock cumulé et de la disponibilité par centre.
- **Gestion des Donneurs :** Suivi complet des profils (groupe sanguin, antécédents, coordonnées).
- **Gestion des Centres :** Administration des différents points de collecte.
- **Suivi des Dons :** Enregistrement et traçabilité du cycle de vie de chaque don.
- **Alertes de Stock :** Notifications visuelles sur les niveaux critiques par groupe sanguin.
- **Sécurité :** Authentification robuste basée sur JWT avec gestion des rôles (Admin, Secrétaire).

## 🛠️ Stack Technique

### Backend
- **Framework :** Node.js & Express.js
- **Base de données :** MariaDB / MySQL
- **Authentification :** JSON Web Token (JWT) & Bcrypt.js

### Frontend
- **Framework :** React 19 & Vite
- **Langage :** TypeScript
- **Styling :** Tailwind CSS 4 & OKLCH
- **Gestion d'état & Cache :** TanStack Query (React Query)
- **Visualisation :** Recharts & Lucide React

## 📁 Structure du Projet

```text
.
├── backend/            # API REST (Node.js/Express)
│   ├── config/         # Configuration DB
│   ├── controllers/    # Logique métier
│   ├── middleware/     # Auth & Permissions
│   └── routes/         # Points d'entrée API
├── frontend/           # Interface Utilisateur (React/TypeScript)
│   ├── src/
│   │   ├── components/ # Composants UI réutilisables
│   │   ├── hooks/      # Hooks personnalisés (Data fetching)
│   │   ├── pages/      # Vues principales
│   │   └── services/   # Client API (Axios)
└── docker-compose.yml  # Orchestration des containers
```

## ⚙️ Installation et Lancement

### Prérequis
- [Docker](https://www.docker.com/) et Docker Compose (recommandé)
- OU [Node.js](https://nodejs.org/) (v25+) et [MariaDB](https://mariadb.org/) installés localement.

### Méthode 1 : Docker (Rapide)

1.  Clonez le dépôt.
2.  Créez un fichier `.env` à la racine en vous basant sur `.env.example`.
3.  Lancez l'application :
    ```bash
    docker-compose up --build
    ```
4.  L'application sera accessible sur `http://localhost`.

### Méthode 2 : Installation Manuelle

#### Backend
1.  Allez dans le dossier `backend/`.
2.  Installez les dépendances : `npm install`.
3.  Configurez vos variables d'environnement dans un fichier `.env`.
4.  Lancez le serveur : `npm start`.

#### Frontend
1.  Allez dans le dossier `frontend/`.
2.  Installez les dépendances : `npm install`.
3.  Lancez le serveur de développement : `npm run dev`.
4.  Accédez à `http://localhost:5173`.

## 🔒 Configuration (Environnement)

Le projet utilise les variables suivantes dans le fichier `.env` :

| Variable | Description |
| :--- | :--- |
| `DB_HOST` | Hôte de la base de données |
| `DB_USER` | Utilisateur MySQL/MariaDB |
| `DB_PASS` | Mot de passe de la base de données |
| `DB_NAME` | Nom de la base de données |
| `JWT_SECRET` | Clé secrète pour le hachage des tokens |
| `VITE_API_URL` | URL de l'API backend pour le frontend |

## 📝 Licence

Ce projet est sous licence MIT.

---
*Développé pour une gestion clinique efficace et une expérience utilisateur moderne.*
