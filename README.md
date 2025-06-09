# Test tremplin Majordhom Léo Puéchal demande de stage.

Application web pour l'agence immobilière Majordhom permettant aux clients de contacter l'agence et de prendre des rendez-vous réalisée dans le cadre d'une recherche de stage de deuxième année.

## Technologies Utilisées

- Frontend: React, TypeScript, Material-UI
- Backend: Node.js, Express, TypeScript
- Base de données: PostgreSQL avec Prisma
- Sécurité: reCAPTCHA, validation des données avec Zod

## Prérequis

- Node.js (v16 ou supérieur)
- Docker et Docker Compose
- npm ou yarn

## Installation

1. Cloner le projet :
```bash
git clone <votre-repo>
cd Majordhom
```

2. Installer les dépendances :
```bash
npm run install:all
```

3. Créer les fichiers d'environnement :

`.env` dans le dossier api :
```env
DATABASE_URL="postgresql://root:verysecurepassword@localhost:5432/majordhom?schema=public"
PORT=3001
NODE_ENV=development
HCAPTCHA_SECRET=votre_clé_secrète
```

`.env` dans le dossier www :
```env
VITE_RECAPTCHA_SITE_KEY=votre_clé_publique
```

## Démarrage

1. Lancer la base de données :
```bash
docker compose up -d
```

2. Initialiser la base de données :
```bash
npm run setup:db
```

3. Démarrer l'application :
```bash
npm run dev
```

L'application sera accessible sur :
- Frontend : http://localhost:5173
- API : http://localhost:3001

## Fonctionnalités

- Page d'accueil avec présentation de l'agence
- Formulaire de contact avec :
  - Coordonnées du client
  - Sélection de disponibilités pour les visites
  - Types de demandes (visite, rappel, photos)
  - Protection contre le spam via reCAPTCHA
  - Validation des données côté client et serveur

## Administration Base de Données

### Voir les contacts

```bash
docker exec -it test_tremplin_db psql -U root -d majordhom
```

## Structure du Projet

```
test-tremplin/
├── api/                # Backend Express
│   ├── src/           # Code source
│   └── prisma/        # Schéma base de données
├── www/               # Frontend React
│   ├── src/          
│   │   ├── components/
│   │   ├── pages/
│   │   └── styles/
│   └── public/       
└── docker-compose.yml # Configuration Docker
```
