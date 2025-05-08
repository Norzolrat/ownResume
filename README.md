# ownResume - Éditeur de CV interactif

Une application web complète permettant de créer, personnaliser et exporter des CV professionnels.

## Fonctionnalités principales

- Gestion de multiples CV avec contenu personnalisable
- Création et personnalisation de templates
- Édition des sections standard et création de sections personnalisées
- Prévisualisation en temps réel des modifications
- Export au format PDF
- Import/export de données au format JSON

## Technologies utilisées

- **Next.js** pour le framework (frontend + backend)
- **React** pour l'interface utilisateur
- **TailwindCSS** pour les styles
- **CodeMirror** pour l'éditeur de code HTML/CSS des templates
- **Handlebars** pour le rendu des templates
- **html-to-image** et **jsPDF** pour la génération de PDF
- **Fichiers JSON** pour le stockage des données

## Installation

```bash
# Cloner le dépôt
git clone https://github.com/votre-username/own-resume.git
cd own-resume

# Installer les dépendances
npm install
```

## Démarrage

```bash
# Lancer le serveur de développement
npm run dev
```

L'application sera accessible à l'adresse [http://localhost:3000](http://localhost:3000).

## Structure du projet

```
own-resume/
├── app/                  # Pages de l'application (Next.js App Router)
│   ├── cvs/              # Pages de gestion des CV
│   ├── templates/        # Pages de gestion des templates
│   ├── resume/           # Pages d'affichage et export des CV
│   └── api/              # API routes pour la gestion des données
├── components/           # Composants React réutilisables
│   ├── cv/               # Composants pour l'édition des CV
│   ├── resume/           # Composants pour l'affichage des CV
│   ├── template/         # Composants pour l'édition des templates
│   └── ui/               # Composants UI génériques
├── lib/                  # Bibliothèques et utilitaires
│   ├── data/             # Stockage des données JSON
│   └── utils/            # Fonctions utilitaires
└── public/               # Fichiers statiques
```

## Fonctionnement

### Gestion des CV

1. Créez un nouveau CV en fournissant les informations de base
2. Ajoutez des sections standards (expériences, formation, compétences)
3. Créez des sections personnalisées selon vos besoins
4. Prévisualisez et exportez votre CV en PDF

### Gestion des Templates

1. Utilisez les templates par défaut ou créez les vôtres
2. Personnalisez les couleurs, polices et espacements
3. Modifiez le code HTML avec la syntaxe Handlebars
4. Testez vos templates avec le CV d'exemple

### Format des données

Les CV et templates sont stockés au format JSON, ce qui permet:
- Import/export facile des données
- Partage de CV entre utilisateurs
- Sauvegarde et restauration simples

## Licence

MIT