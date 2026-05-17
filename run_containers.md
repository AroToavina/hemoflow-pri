# Instructions pour lancer les Conteneurs (Docker Hub)

Ce document explique comment démarrer l'application HemoFlow en utilisant les images pré-construites sur Docker Hub.

## 🚀 Déploiement via Docker Hub

Cette méthode est la plus rapide pour déployer l'application sans avoir à compiler le code source localement.

### 1. Préparation
Assurez-vous d'avoir un fichier `.env` à la racine du projet pour configurer vos secrets.
```bash
cp .env.example .env
```
*Note : Éditez le fichier `.env` pour définir vos mots de passe et votre secret JWT.*

### 2. Récupération des images
Récupérez les dernières versions des images depuis Docker Hub :
```bash
docker pull aro2304/hemoflow-backend:latest
docker pull aro2304/hemoflow-frontend:latest
```

### 3. Lancement
Lancez l'application en utilisant le fichier de configuration dédié :
```bash
docker-compose -f docker-compose.hub.yml up -d
```

---

## 🔍 Administration et Maintenance

### Vérifier l'état des services
```bash
docker ps
```

### Consulter les logs
```bash
docker-compose -f docker-compose.hub.yml logs -f
```

### Arrêter l'application
```bash
docker-compose -f docker-compose.hub.yml down
```
*Utilisez `down -v` pour supprimer également les volumes de données de la base.*
