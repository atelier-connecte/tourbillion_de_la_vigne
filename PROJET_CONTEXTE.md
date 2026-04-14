# PROJET_CONTEXTE — Le Tourbillon de la Vigne

> Emplacement de ce fichier une fois rempli : racine du projet concerné
> Template source : METHODO/PROJET_CONTEXTE_TEMPLATE.md
> Créé le : 13 avril 2026
>
> ⚠️ INSTRUCTION POUR L'IA (Claude et Cascade)
> Ce fichier est la source de vérité absolue du projet.
> Le lire EN ENTIER avant toute action.
> Toute décision technique qui le contredit est interdite.
> Si une demande sort de ce cadre : poser UNE question avant d'agir.

---

## 1. IDENTITÉ DU PROJET

| Champ | Valeur |
|---|---|
| Nom | Le Tourbillon de la Vigne |
| Type | Site vitrine statique (démo de vente) |
| Objectif en 1 phrase | Envoyer un lien de démo au gérant du restaurant pour lui donner envie de valider le projet de refonte de son site Wix |
| Statut | En développement (démo) |
| Utilisateurs actuels | 1 (Valentin, testeur unique) |
| Dernière mise à jour de ce fichier | 14 avril 2026 |

---

## 2. STACK TECHNIQUE

> Tout ce qui n'est pas listé ici ne doit pas être utilisé sans validation.

**Frontend :**
- Framework : Aucun — HTML/CSS/JS pur
- Langage : HTML5, CSS3, JavaScript ES6+
- Composants UI : Google Fonts (Playfair Display, Lato, Josefin Sans)
- Gestion de l'affichage dynamique : Vanilla JS (IntersectionObserver pour animations scroll)

**Backend :**
- Framework : Aucun — site statique
- Langage : N/A
- Port local : N/A (ouverture directe du fichier HTML)

**Base de données :**
- Technologie : localStorage (navigateur)
- Outil de liaison avec le code : JSON.parse / JSON.stringify
- Lancement en local : Automatique (navigateur)

**Services externes :**
- Comptes utilisateurs : Aucun (démo)
- Stockage fichiers : CDN Wix (images hébergées sur static.wixstatic.com)
- Envoi emails : EmailJS (confirmation client + notification restaurant)
- Mise en ligne : GitHub Pages
- Autres : Google Maps (lien externe), Instagram (lien externe)

**Décision validée — Écart avec STACK_STANDARD.md :**
- Choix HTML/CSS/JS pur au lieu d'Angular : démo rapide sans dépendances, déploiement GitHub Pages gratuit, présentation à un client non technique
- Pas de backend : site statique suffisant pour la démo
- localStorage au lieu de PostgreSQL : simulation de réservations pour la démo uniquement

---

## 3. ARCHITECTURE

> Cette structure ne change pas sans validation écrite dans ce fichier.

```
tourbillon-de-la-vigne/
├── .git/
├── assets/                    (vide — pas d'images locales prévues)
├── index.html                 (site principal — 362 lignes)
├── admin.html                 (tableau de bord réservations — 64 lignes)
├── styles.css                 (styles partagés + admin — ~1247 lignes)
├── script.js                  (formulaire + localStorage — 107 lignes)
├── admin.js                   (gestion réservations + démo — 269 lignes)
├── PROJET_CONTEXTE.md         (ce fichier)
├── STACK_STANDARD.md
└── CHANGELOG.md
```

**Nombre de services actifs :** 0 / 20 maximum (site statique, pas de backend)

**Couches :**

- **UI :** index.html, admin.html, styles.css
- **Logique :** script.js (formulaire, animations, carte dynamique, capacités), admin.js (gestion réservations, éditeur carte, capacités)
- **Données :** localStorage (clés `reservations`, `menuCard`, `tableCapacity`) + 6 réservations de démo hardcodées

---

## 4. FONCTIONNALITÉS

### ✅ Stables (ne pas toucher sans raison)

- Site vitrine : hero, présentation Pierre & Virginie, carte du moment (dynamique), infos pratiques, footer
- Formulaire de réservation avec validation HTML5 + vérification capacités
- Enregistrement réservations en localStorage
- Envoi emails automatique (confirmation client + notification restaurant)
- Bandeau "complet" si capacité atteinte pour un service
- Accès admin caché : 3 clics rapides sur logo hero
- Page admin : onglets (Réservations / Carte des menus / Capacités)
- Tableau de bord réservations avec filtres (toutes / déjeuner / dîner)
- Changement de statut réservation (confirmer / annuler)
- Calendrier semaine avec compteur réservations par jour
- Statistiques temps réel (couverts du jour, prochain service, en attente)
- Éditeur carte des menus : ajouter/modifier/supprimer catégories et plats
- Gestion capacités : défaut par service + spécifiques par date
- Carte des menus chargée dynamiquement depuis localStorage
- 6 réservations de démo pré-chargées
- Animations scroll (IntersectionObserver)
- Smooth scroll ancres
- Responsive mobile/tablette/desktop
- Identité visuelle réelle du restaurant (palette #1C0E07 / #FDFAF5 / #B8842A, logo, photos)

### 🚧 En cours (mission actuelle uniquement)
- Aucune mission en cours

### ❌ Bugs connus
- Aucun bug détecté

### ✅ Dernières modifications (14 avril 2026)
- **Corrections visuelles** : Variable CSS --texte-sombre ajoutée, palette --accent-principal ajustée (#C4923A), logo hero agrandi (320px), image hero changée (paysage), h1 hero supprimé, textes section esprit remplacés par verbatim site original, lien PDF carte des vins ajouté, footer credit supprimé, titre Instagram modifié
- **Menu réel** : DEFAULT_MENU remplacé dans script.js et admin.js par le vrai menu du PDF (13 plats, 3 catégories : Pour commencer / Assiettes à partager / Pour finir)
- **Bug getServiceType corrigé** : admin.js retourne maintenant 'dejeuner'/'diner' au lieu de 'lunch'/'dinner' pour cohérence avec localStorage
- **Accès admin** : 3 clics rapides sur logo hero (caché, cursor pointer ajouté) + bouton "Admin" visible en haut à droite (test) + lien discret "🔒 Espace restaurant" dans footer
- **EmailJS reconfiguré** : service mis à jour (`service_0vr7k2s`) + 2 templates actifs (`template_295vy3j` client, `template_fa84d3n` restaurant) + envoi parallèle client/admin dans `sendEmails()`
- **EmailJS finalisé** : Public Key mise à jour dans `index.html` (`AO-oBPw9GC0Lc9cQZ`) pour activer l’envoi réel depuis le nouveau compte
- **Favicon personnalisé** : icône d’onglet remplacée par `assets/logo_atelier.jpg` sur `index.html` et `admin.html`
- **Formulaire réservation lisible** : correction du contraste des menus déroulants `Heure` et `Nombre de couverts` (texte/fond des options) dans `styles.css`
- **Compatibilité Windows/Chrome** : champs `select` forcés en fond clair + texte sombre (états fermé/ouvert/focus) pour éviter le blanc sur blanc
- **EmailJS fiabilisé** : envoi client/admin passé en séquentiel avec micro-délai (au lieu de `Promise.all`) pour limiter les échecs intermittents liés au rate limit
- **Flux EmailJS métier aligné** : admin notifié à la création de réservation (`script.js`), client notifié uniquement lors de la confirmation depuis l’espace admin (`admin.js`)

### 🔒 Hors scope (ne jamais implémenter sans décision explicite)
- Authentification admin (mot de passe)
- Widget Zenchef réel
- Embed Instagram SnapWidget
- Backend avec base de données réelle
- Paiement en ligne
- Système de commentaires/avis

**Note production (commentaire HTML ligne 355-361 index.html) :**
En production future (si client valide) :
1. Remplacer formulaire démo par widget Zenchef
2. Remplacer grille Instagram par embed SnapWidget
3. Admin : brancher EmailJS pour envoyer confirmation client
4. Admin : ajouter authentification simple (mot de passe)
5. Vraies photos haute résolution dans assets/

---

## 5. RÈGLES STRICTES DU PROJET

- Ne modifier QUE les fichiers concernés par la mission en cours
- Ne créer aucun nouveau fichier sans le lister ici après création
- Ne pas ajouter de dépendance sans demande explicite
- Modifier l'existant avant d'en créer du nouveau
- Zéro structure vide créée "pour le futur"
- **Règle spécifique démo :** Toute modification doit rester testable en ouvrant index.html dans Chrome (pas de serveur requis)
- **Règle spécifique démo :** Pas de framework NPM, pas de build, pas de compilation
- **Règle spécifique démo :** Toutes les images restent sur CDN Wix (pas d'assets locaux)

---

## 6. DÉCISIONS FIGÉES

> Ces décisions ont été prises et validées. Elles ne se remettent pas en question.

| Date | Décision | Raison |
|---|---|---|
| 13 avril 2026 | HTML/CSS/JS pur (pas de framework) | Démo rapide, déploiement GitHub Pages gratuit, client non technique |
| 13 avril 2026 | localStorage au lieu de base de données | Simulation suffisante pour démo de vente |
| 13 avril 2026 | Images hébergées sur CDN Wix | Pas d'assets locaux, utilisation des vraies images du site existant |
| 13 avril 2026 | Styles CSS inline dans admin.html | Fichier autonome, pas de dépendance externe pour admin |
| 13 avril 2026 | EmailJS accepté comme service cloud | Pas de NPM, CDN uniquement, adapté démo, clés publiques OK pour démo |

---

## 7. FICHIERS DE DOCUMENTATION AUTORISÉS

| Fichier | Rôle |
|---|---|
| PROJET_CONTEXTE.md | Source de vérité (ce fichier) |
| CHANGELOG.md | Historique des missions terminées |
| BUGS.md | Bugs connus et leur statut (vide pour l'instant) |
| README.md | Présentation du projet (à créer si nécessaire) |
| STACK_STANDARD.md | Stack de référence |

Tout autre fichier .md va dans _archives/.

---

## 8. SESSION EN COURS

**Résultat de fin de session :** Flux email de démo corrigé selon besoin métier : email admin envoyé à chaque nouvelle réservation, et email client envoyé uniquement après action "Confirmer" côté admin. `admin.html` initialise désormais EmailJS pour déclencher l’envoi client depuis le back-office.

## 9. BACKLOG (missions suivantes)

> Ordonné par priorité. Ne jamais commencer la suivante sans que la précédente soit ✅ testée.

1. **Déployer sur GitHub Pages** — Créer repo GitHub, pousser le code, activer GitHub Pages, tester le lien live
2. **Externaliser les styles admin** — Extraire les 400+ lignes CSS inline de admin.html vers styles.css (optionnel, amélioration)
3. **Créer README.md** — Documentation pour présentation du projet (optionnel)
4. ⚠️ **Production future (si client valide)** — Intégrer Zenchef, SnapWidget, EmailJS, authentification admin

---

*Template source : METHODO/PROJET_CONTEXTE_TEMPLATE.md*
*Rempli avec : Cascade (mode reprise projet)*
*Lu par : Cascade à chaque début de session*
