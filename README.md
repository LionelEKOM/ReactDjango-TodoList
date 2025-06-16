# TodoList Application

Une application moderne de gestion de tâches construite avec React et Django, offrant une expérience utilisateur fluide et intuitive.

![TodoList Preview](preview.png)

## 📋 Table des Matières

- [Fonctionnalités](#-fonctionnalités)
- [Technologies](#️-technologies-utilisées)
- [Prérequis](#-prérequis)
- [Installation](#-installation)
- [Configuration](#-configuration)
- [API Endpoints](#-api-endpoints)
- [Interface Utilisateur](#-interface-utilisateur)
- [Sécurité](#-sécurité)
- [Tests](#-tests)
- [Déploiement](#-déploiement)
- [Contribution](#-contribution)
- [Licence](#-licence)
- [Auteur](#-auteur)
- [Remerciements](#-remerciements)

## 🚀 Fonctionnalités

### Fonctionnalités Principales

- ✨ Interface utilisateur moderne et intuitive
- 📱 Design responsive avec Bootstrap
- ✅ Gestion complète des tâches (CRUD)
- 🎨 Animations fluides et feedback visuel
- 🔄 Synchronisation en temps réel avec le backend
- 🎯 Validation des formulaires
- 💫 Messages flash élégants

### Fonctionnalités Avancées

- 🔍 Recherche et filtrage des tâches
- 📅 Organisation par date de création
- 🏷️ Catégorisation des tâches
- 📊 Statistiques de progression
- 🔔 Notifications en temps réel
- 🌙 Mode sombre/clair

## 🛠️ Technologies Utilisées

### Frontend

- React.js 18+
- Bootstrap 5.3
- Axios pour les requêtes HTTP
- Bootstrap Icons
- React Router pour la navigation
- React Query pour la gestion d'état
- TailwindCSS pour le styling

### Backend

- Django 4.2+
- Django REST Framework
- django-cors-headers
- PostgreSQL (optionnel)
- Redis pour le cache (optionnel)

## 📋 Prérequis

### Système

- Python 3.8+
- Node.js 14+
- npm 7+ ou yarn 1.22+
- Git

### Navigateurs Supportés

- Chrome (dernière version)
- Firefox (dernière version)
- Safari (dernière version)
- Edge (dernière version)

## 🚀 Installation

### Backend (Django)

1. Cloner le repository

```bash
git clone [URL_DU_REPO]
cd ReactDjango/backend
```

2. Créer un environnement virtuel

```bash
# Windows
python -m venv venv
venv\Scripts\activate

# Linux/Mac
python3 -m venv venv
source venv/bin/activate
```

3. Installer les dépendances

```bash
pip install -r requirements.txt
```

4. Configuration de l'environnement

```bash
# Créer un fichier .env
cp .env.example .env
# Éditer le fichier .env avec vos configurations
```

5. Effectuer les migrations

```bash
python manage.py makemigrations
python manage.py migrate
```

6. Créer un superutilisateur (optionnel)

```bash
python manage.py createsuperuser
```

7. Lancer le serveur

```bash
python manage.py runserver
```

### Frontend (React)

1. Naviguer vers le dossier frontend

```bash
cd ../frontend
```

2. Installer les dépendances

```bash
npm install
# ou
yarn install
```

3. Configuration de l'environnement

```bash
# Créer un fichier .env
cp .env.example .env
# Éditer le fichier .env avec vos configurations
```

4. Lancer l'application

```bash
npm run dev
# ou
yarn dev
```

## ⚙️ Configuration

### Variables d'Environnement Backend

```env
DEBUG=True
SECRET_KEY=votre_clé_secrète
ALLOWED_HOSTS=localhost,127.0.0.1
CORS_ALLOWED_ORIGINS=http://localhost:5173
DATABASE_URL=sqlite:///db.sqlite3
```

### Variables d'Environnement Frontend

```env
VITE_API_URL=http://localhost:8000/api
VITE_APP_NAME=TodoList
```

## 📝 API Endpoints

### Tâches

- `GET /api/todos/` - Liste toutes les tâches
- `POST /api/todos/create/` - Crée une nouvelle tâche
- `GET /api/todos/{id}/` - Récupère une tâche spécifique
- `PUT /api/todos/{id}/update/` - Met à jour une tâche
- `DELETE /api/todos/{id}/delete/` - Supprime une tâche

### Authentification (à implémenter)

- `POST /api/auth/login/` - Connexion
- `POST /api/auth/register/` - Inscription
- `POST /api/auth/logout/` - Déconnexion

## 🎨 Interface Utilisateur

### Composants Principaux

- **Header** : Navigation et thème
- **TodoList** : Liste des tâches
- **TodoForm** : Formulaire d'ajout/modification
- **TodoItem** : Affichage d'une tâche
- **FlashMessage** : Notifications

### Fonctionnalités UI

- Messages flash animés pour le feedback
- Validation des formulaires en temps réel
- Design responsive adapté à tous les écrans
- Animations fluides pour une meilleure expérience utilisateur
- Mode sombre/clair
- Interface drag-and-drop

## 🔒 Sécurité

### Mesures Implémentées

- CORS configuré pour la sécurité
- Validation des données côté serveur
- Protection contre les injections SQL (Django ORM)
- Rate limiting sur les API
- Validation des entrées utilisateur

### Bonnes Pratiques

- Utilisation de HTTPS
- Gestion sécurisée des sessions
- Protection CSRF
- Sanitization des données
- Logging des actions sensibles

## 🧪 Tests

### Backend

```bash
# Lancer les tests
python manage.py test

# Couverture de code
coverage run manage.py test
coverage report
```

### Frontend

```bash
# Tests unitaires
npm run test

# Tests e2e
npm run test:e2e
```

## 🚀 Déploiement

### Backend

1. Préparer les fichiers statiques

```bash
python manage.py collectstatic
```

2. Configurer le serveur WSGI
3. Configurer le serveur web (Nginx/Apache)
4. Configurer la base de données
5. Déployer avec Gunicorn

### Frontend

1. Build de l'application

```bash
npm run build
```

2. Déployer les fichiers statiques
3. Configurer le serveur web
4. Configurer le domaine

## 🤝 Contribution

Les contributions sont les bienvenues ! N'hésitez pas à :

1. Fork le projet
2. Créer une branche pour votre fonctionnalité
   ```bash
   git checkout -b feature/ma-fonctionnalite
   ```
3. Commiter vos changements
   ```bash
   git commit -m 'feat: ajout de ma fonctionnalité'
   ```
4. Pousser vers la branche
   ```bash
   git push origin feature/ma-fonctionnalite
   ```
5. Ouvrir une Pull Request

### Standards de Code

- Suivre les conventions PEP 8 pour Python
- Suivre les conventions ESLint pour JavaScript
- Documenter le code
- Écrire des tests unitaires

## 📄 Licence

Ce projet est sous licence MIT. Voir le fichier `LICENSE` pour plus de détails.

## 👥 Auteur

[Votre Nom]

- GitHub: [@votre-username](https://github.com/votre-username)
- LinkedIn: [Votre Profil](https://linkedin.com/in/votre-profil)
- Portfolio: [Votre Site](https://votre-site.com)

## 🙏 Remerciements

- Bootstrap pour l'interface utilisateur
- Django REST Framework pour l'API
- React pour le frontend dynamique
- La communauté open source
- Tous les contributeurs

## 📞 Support

Pour toute question ou problème :

- Ouvrir une issue sur GitHub
- Contacter l'auteur
- Consulter la documentation
