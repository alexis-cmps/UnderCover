# 🕵️ Undercover - Jeu Pass-the-Phone

Application web du jeu de société **Undercover** avec mode **Mr.White**, conçue pour être jouée sur un seul téléphone (pass-the-phone).

## 🎮 Règles du jeu

### Principe
- **Civils** : Reçoivent un mot commun
- **Undercover** : Reçoit un mot proche mais différent
- **Mr.White** : Ne reçoit aucun mot et doit deviner le mot des civils

### Déroulement
1. **Configuration** : Ajoutez 3 joueurs minimum
2. **Révélation** : Chaque joueur découvre son rôle et son mot (pass-the-phone)
3. **Phase d'indices** : Chaque joueur vivant donne un indice en rapport avec son mot
4. **Vote** : Les joueurs votent pour éliminer un suspect
5. **Élimination** : Le joueur avec le plus de votes est éliminé
6. **Cas spécial Mr.White** : S'il est éliminé, il peut tenter de deviner le mot des civils
   - Si correct : Mr.White gagne immédiatement
   - Si faux : la partie continue

### Conditions de victoire
- **Civils** gagnent si tous les Undercover et Mr.White sont éliminés
- **Undercover** gagne si le nombre d'Undercover vivants ≥ nombre de Civils vivants
- **Mr.White** gagne uniquement en devinant correctement le mot des civils lors de son élimination

### Gestion de l'égalité au vote
En cas d'égalité, personne n'est éliminé et une nouvelle phase d'indices commence.

## 🚀 Installation

```bash
# Installation des dépendances
npm install

# Démarrer le serveur de développement
npm run dev

# Build de production
npm run build

# Lancer les tests
npm run test

# Lancer les tests en mode watch
npm run test:ui

# Linter
npm run lint
```

## 📁 Architecture du projet

```
src/
├── components/         # Composants UI réutilisables
│   ├── Button.tsx
│   ├── Card.tsx
│   ├── Input.tsx
│   └── Modal.tsx
│
├── screens/           # Écrans de l'application
│   ├── HomeScreen.tsx
│   ├── PlayersScreen.tsx
│   ├── RevealScreen.tsx
│   ├── CluesScreen.tsx
│   ├── VoteScreen.tsx
│   ├── RevealElimScreen.tsx
│   ├── WhiteGuessScreen.tsx
│   └── EndScreen.tsx
│
├── store/             # State management (Zustand)
│   ├── game.ts
│   └── __tests__/
│
├── lib/               # Utilitaires et logique métier
│   ├── game-logic.ts  # Logique de jeu pure
│   ├── utils.ts       # Utilitaires génériques
│   ├── words.ts       # Liste de mots
│   └── __tests__/
│
├── types/             # Types TypeScript
│   └── index.ts
│
├── App.tsx            # Composant racine
├── main.tsx           # Point d'entrée
└── index.css          # Styles globaux
```

## 🎨 Stack technique

- **React 18** : Framework UI
- **TypeScript** : Typage strict
- **Vite** : Build tool et dev server
- **Tailwind CSS v4** : Styling avec `@tailwindcss/vite`
- **Zustand** : State management
- **Vitest** : Framework de tests
- **@testing-library/react** : Tests de composants

## ✅ Qualité du code

- **TypeScript strict** : Configuration stricte pour la sécurité des types
- **ESLint** : Linting avec règles TypeScript et React
- **Tests unitaires** : Couverture complète de la logique métier
- **Séparation des responsabilités** : UI, logique, et state management séparés
- **Fonctions pures** : Logique métier testable et prévisible

## 📱 Design & UX

### Mobile-first
- Responsive de 360px à desktop
- Zones tactiles ≥ 44px
- Support des safe-areas iOS
- Pas de zoom accidentel sur les inputs

### Accessibilité
- Boutons focusables avec focus visible
- Contraste de couleurs correct (WCAG AA)
- Labels et aria-labels appropriés
- Navigation au clavier

### Anti-spoiler
- Écrans de transition "passe le téléphone"
- Révélation unique du rôle
- CTAs clairs pour masquer les informations sensibles

## 🎲 Ajouter des mots

Pour ajouter de nouvelles paires de mots, éditez le fichier `src/lib/words.ts` :

```typescript
export const WORD_PAIRS: Words[] = [
  // ... mots existants
  { civilian: "Votre mot", undercover: "Mot proche" },
];
```

## 📋 Scripts disponibles

| Commande | Description |
|----------|-------------|
| `npm run dev` | Démarre le serveur de développement |
| `npm run build` | Build de production |
| `npm run preview` | Prévisualise le build de production |
| `npm run test` | Lance les tests en mode watch |
| `npm run test:run` | Lance les tests une fois |
| `npm run test:ui` | Interface graphique pour les tests |
| `npm run lint` | Vérifie le code avec ESLint |

## 🔧 Configuration

### Settings du jeu (MVP)
- **Nombre d'Undercover** : 1 (fixe)
- **Mr.White** : Activé (fixe)

Pour modifier ces paramètres, éditez le store dans `src/store/game.ts` :

```typescript
settings: { 
  undercoverCount: 1, 
  whiteEnabled: true 
}
```

## 🧪 Tests

Les tests couvrent :
- ✅ Logique de victoire (`computeWinners`)
- ✅ Comptage des votes (`tallyVotes`)
- ✅ Mélange de tableau (`shuffle`)
- ✅ Assignation des rôles
- ✅ Flow complet du jeu (store Zustand)

```bash
# Lancer les tests avec couverture
npm run test:run
```

## 🚧 Améliorations futures

- [ ] Configuration personnalisable (nombre d'undercover, Mr.White ON/OFF)
- [ ] Persistance localStorage
- [ ] Mode multi-device (WebRTC ou backend)
- [ ] Historique des parties
- [ ] Import de listes de mots personnalisées
- [ ] Thèmes visuels
- [ ] PWA avec installation offline
- [ ] Timer pour les phases
- [ ] Animations de transition

## 📄 Licence

MIT

---

**Développé avec ❤️ en TypeScript + React + Tailwind CSS**

