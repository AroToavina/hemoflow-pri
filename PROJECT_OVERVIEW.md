# HemoFlow - Gestion de Don de Sang

HemoFlow est une application moderne conçue pour la gestion centralisée des dons de sang. Elle permet aux centres de collecte de suivre les donneurs, d'enregistrer les dons et de surveiller l'état des stocks en temps réel.

## Dashboard "Blood-Bright"

Le tableau de bord est le centre névralgique de l'application. Il offre une vision claire et analytique de l'activité.

### Composants Principaux
- **Statistiques Clés :** Vue d'ensemble sur le nombre de donneurs actifs, les dons réalisés sur la semaine et les centres opérationnels.
- **Indicateurs de Performance (Trends) :** 
  - *Dons par semaine* : Visualisation du flux de dons sur les 8 dernières semaines.
  - *Stock Cumulé* : Suivi de l'évolution du volume de sang en stock.
  - *Disponibilité par Centre* : Analyse du taux de remplissage pour chaque centre.
- **Alertes Stock :** Tableau en temps réel affichant le niveau d'alerte par groupe sanguin.
- **Activités Récentes :** Flux des dernières opérations effectuées sur la plateforme.

## Architecture Technique

### Backend (Node.js & MySQL)
- **API REST :** Express.js expose les données via des endpoints sécurisés.
- **Authentification :** Système basé sur JWT (JSON Web Tokens) pour sécuriser l'accès aux données.
- **Base de Données :** MySQL gère la persistance des données (utilisateurs, donneurs, centres, dons).

### Frontend (React & TypeScript)
- **Framework :** React 19 avec Vite.
- **Design System :** Utilisation de `oklch` pour des couleurs vibrantes et une maintenance aisée.
- **Data Fetching :** React Query (`@tanstack/react-query`) assure la gestion du cache et la synchronisation des données.
- **UI :** Composants modulaires utilisant `Lucide-React` pour les icônes et `Recharts` pour la visualisation de données.

## Fonctionnalités Disponibles
1. **Authentification Hybride :** Page unique combinant connexion et inscription.
2. **Gestion des Donneurs :** Inscription et suivi des donneurs avec leurs profils sanguins.
3. **Centres de Collecte :** Gestion et déploiement de nouveaux centres.
4. **Enregistrement des Dons :** Suivi complet du cycle de vie du don (stock, utilisation, rejet).

---
*Développé pour une gestion clinique efficace et une expérience utilisateur intuitive.*
