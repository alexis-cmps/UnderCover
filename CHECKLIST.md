# 🎯 Check-list de test manuel - Undercover

## ✅ Setup initial
- [ ] `npm install` s'exécute sans erreur
- [ ] `npm run dev` démarre le serveur
- [ ] Application accessible sur http://localhost:5173 (ou autre port)

## 🏠 Écran Home
- [ ] Titre et emoji affichés correctement
- [ ] Bouton "Nouvelle partie" est cliquable
- [ ] Transition vers l'écran Players

## 👥 Écran Players
- [ ] Champ de saisie focusable
- [ ] Ajout de joueurs fonctionne (Enter ou bouton)
- [ ] Noms trimés correctement
- [ ] Liste des joueurs s'affiche
- [ ] Bouton de suppression fonctionne
- [ ] Bouton "Démarrer" désactivé si < 3 joueurs
- [ ] Bouton "Démarrer" activé si >= 3 joueurs
- [ ] Message de configuration affiché (1 Undercover + Mr.White)

## 🎭 Écran Reveal (Pass-the-phone)
- [ ] Message "Passez le téléphone à [Nom]"
- [ ] Bouton "Voir mon rôle" fonctionne
- [ ] Rôle et mot (ou message pour White) affichés correctement
- [ ] Impossible de revenir en arrière accidentellement
- [ ] Bouton "J'ai mémorisé" fonctionne
- [ ] Modal de transition s'affiche
- [ ] Passage au joueur suivant
- [ ] Transition vers Clues après le dernier joueur

### Vérification des rôles
- [ ] Au moins 1 Civil reçoit le mot "civilian"
- [ ] 1 Undercover reçoit le mot "undercover" (différent mais proche)
- [ ] 1 Mr.White ne reçoit aucun mot
- [ ] Emojis corrects : 🟢 Civil, 🔴 Undercover, ⚪️ White

## 💡 Écran Clues
- [ ] Liste des joueurs vivants affichée
- [ ] Joueur actuel surligné en bleu
- [ ] Nom du joueur actuel affiché en grand
- [ ] Message d'instruction clair
- [ ] Bouton "Indice donné" fonctionne
- [ ] Passage au joueur suivant
- [ ] Saut des joueurs éliminés
- [ ] Transition vers Vote après le dernier joueur

## 🗳️ Écran Vote
- [ ] Progression affichée (X/Y votes)
- [ ] Nom du votant actuel affiché
- [ ] Liste des cibles (sans le votant lui-même)
- [ ] Sélection d'une cible fonctionne (highlight bleu)
- [ ] Bouton "Confirmer" désactivé si aucune sélection
- [ ] Bouton "Confirmer" activé après sélection
- [ ] Passage au votant suivant
- [ ] Écran de finalisation après tous les votes
- [ ] Bouton "Révéler le résultat" fonctionne

### Cas d'égalité
- [ ] Si égalité : retour à l'écran Clues
- [ ] Personne n'est éliminé
- [ ] Nouveau tour d'indices commence

## ❌ Écran Reveal Élimination
- [ ] Nom du joueur éliminé affiché
- [ ] Rôle du joueur éliminé révélé avec emoji
- [ ] Message "La partie continue"
- [ ] Bouton "Continuer" ramène aux Clues
- [ ] Les joueurs vivants sont corrects

## ⚪️ Écran White Guess (si Mr.White éliminé)
- [ ] Message "Mr.White éliminé" affiché
- [ ] Nom du joueur White affiché
- [ ] Champ de saisie focusable
- [ ] Validation avec Enter ou bouton
- [ ] Bouton désactivé si champ vide

### Test guess correct
- [ ] Saisir le mot exact des civils
- [ ] Vérifier que le jeu passe à l'écran End
- [ ] Message "Mr.White gagne ⚪️"

### Test guess incorrect
- [ ] Saisir un mot incorrect
- [ ] Vérifier la transition (Reveal Elim ou End selon l'état)

## 🏆 Écran End
- [ ] Message de victoire affiché correctement
- [ ] Les deux mots révélés (civilian et undercover)
- [ ] Liste de tous les joueurs avec leurs rôles
- [ ] Emojis corrects pour chaque rôle
- [ ] Joueurs éliminés barrés
- [ ] Bouton "Rejouer" fonctionne
- [ ] Retour à l'écran Home

### Cas de victoire à tester
- [ ] **Civils gagnent** : Tous Undercover et White éliminés
- [ ] **Undercover gagne** : Undercover >= Civils vivants
- [ ] **Mr.White gagne** : Guess correct du mot civil

## 📱 Tests responsive

### Mobile (360px - 430px)
- [ ] Pas de scroll horizontal
- [ ] Tous les boutons cliquables (>= 44px)
- [ ] Textes lisibles
- [ ] Cards et modals bien dimensionnées
- [ ] Inputs focusables sans zoom iOS

### Tablet (768px - 1024px)
- [ ] Layout centré avec max-width
- [ ] Espacement correct
- [ ] Aucun élément tronqué

### Desktop (> 1024px)
- [ ] Application centrée (max-width)
- [ ] Pas de layout cassé
- [ ] Hover states fonctionnels

## ♿ Tests d'accessibilité

### Navigation clavier
- [ ] Tab parcourt tous les éléments interactifs
- [ ] Focus visible sur tous les boutons
- [ ] Enter valide les formulaires
- [ ] Escape ferme les modals (si implémenté)

### Contraste
- [ ] Texte principal : bon contraste (blanc sur fond sombre)
- [ ] Boutons : états hover/active visibles
- [ ] Liens et actions clairement identifiables

### Screen reader (optionnel)
- [ ] Labels sur tous les inputs
- [ ] Aria-labels sur les boutons d'action
- [ ] Structure sémantique HTML

## 🐛 Tests edge cases

### Minimum de joueurs
- [ ] 1 joueur : bouton démarrer désactivé
- [ ] 2 joueurs : bouton démarrer désactivé
- [ ] 3 joueurs : jeu démarre correctement

### Noms de joueurs
- [ ] Espaces trimés automatiquement
- [ ] Noms longs ne cassent pas le layout
- [ ] Caractères spéciaux acceptés

### Flow de jeu
- [ ] Partie complète sans crash (de Home à End)
- [ ] Plusieurs parties d'affilée
- [ ] Rejouer après victoire

### Performance
- [ ] Pas de lag lors des transitions
- [ ] Animations fluides
- [ ] Build production optimisé

## 🧪 Tests automatisés

```bash
# Tests unitaires
npm run test:run
# Résultat attendu : 34 tests passent

# Linter
npm run lint
# Résultat attendu : aucune erreur

# Build
npm run build
# Résultat attendu : build réussi dans dist/
```

## ✅ Critères d'acceptation MVP

- [ ] Tous les écrans fonctionnent
- [ ] Flow complet jouable (Home → End)
- [ ] Mr.White avec guess implémenté
- [ ] Aucune erreur console
- [ ] Responsive mobile-first
- [ ] Tests unitaires passent
- [ ] Build de production OK
- [ ] Lint sans erreur
- [ ] README à jour

---

**Note** : Cette check-list est indicative. Selon les retours utilisateurs, des ajustements peuvent être nécessaires.
