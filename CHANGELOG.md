# CHANGELOG — Le Tourbillon de la Vigne

> Historique des missions terminées

---

## 14 avril 2026 | Correctif fiabilité EmailJS | Envoi séquentiel

**Objectif :** Stabiliser l’envoi des emails de réservation (client + restaurant) qui échouaient de manière intermittente.

**Actions réalisées :**
- Remplacement de l’envoi parallèle (`Promise.all`) par un envoi séquentiel
- Ordre appliqué : `template_295vy3j` (client) puis `template_fa84d3n` (restaurant)
- Ajout d’un micro-délai entre les 2 envois pour limiter les erreurs liées au rate limit
- Ajout de logs explicites par template envoyé

**Fichiers modifiés :**
- script.js
- PROJET_CONTEXTE.md

**Résultat :** Fiabilité améliorée de l’envoi EmailJS, avec une réception plus stable des emails client et admin.

---

## 14 avril 2026 | Correctif UX complémentaire | Select Windows/Chrome

**Objectif :** Corriger définitivement le rendu blanc sur blanc des listes déroulantes du formulaire de réservation sous Windows/Chrome.

**Actions réalisées :**
- Forçage des champs `select` en fond clair (`var(--fond-contenu)`) et texte sombre (`var(--texte-sombre)`)
- Maintien des styles d’options (`option`) en contraste lisible
- Stabilisation de l’état `:focus` des `select` pour éviter le retour visuel blanc sur blanc

**Fichiers modifiés :**
- styles.css
- PROJET_CONTEXTE.md

**Résultat :** Les menus déroulants `Heure` et `Nombre de couverts` restent lisibles en permanence sur Windows/Chrome.

---

## 14 avril 2026 | Correctif UX | Lisibilité des listes déroulantes réservation

**Objectif :** Corriger le rendu illisible des menus `Heure` et `Nombre de couverts` dans le formulaire de réservation.

**Actions réalisées :**
- Ajustement du style des champs `select` du formulaire (flèche, apparence uniforme)
- Correction du contraste des options ouvertes (`option`) : fond clair + texte sombre lisible
- Harmonisation visuelle avec la palette du site

**Fichiers modifiés :**
- styles.css
- PROJET_CONTEXTE.md

**Résultat :** Les menus déroulants de réservation sont maintenant lisibles et propres sur l’interface utilisateur.

---

## 14 avril 2026 | Finition visuelle | Favicon logo_atelier

**Objectif :** Afficher une icône d’onglet cohérente avec l’identité du site via l’asset local `logo_atelier`.

**Actions réalisées :**
- Ajout du favicon `assets/logo_atelier.jpg` dans `index.html`
- Ajout du favicon `assets/logo_atelier.jpg` dans `admin.html`
- Mise à jour du contexte projet (`PROJET_CONTEXTE.md`, section 8)

**Fichiers modifiés :**
- index.html
- admin.html
- PROJET_CONTEXTE.md

**Résultat :** L’onglet du site et l’onglet admin affichent maintenant le logo atelier comme favicon.

---

## 14 avril 2026 | Finalisation EmailJS | Mise à jour Public Key

**Objectif :** Finaliser la configuration EmailJS avec la nouvelle Public Key pour activer les envois depuis le compte mis à jour.

**Actions réalisées :**
- Mise à jour de la Public Key dans `index.html` : `AO-oBPw9GC0Lc9cQZ`
- Validation de cohérence avec la configuration déjà en place dans `script.js` (service + templates)
- Mise à jour de la documentation projet (`PROJET_CONTEXTE.md`)

**Fichiers modifiés :**
- index.html
- PROJET_CONTEXTE.md

**Résultat :** Configuration EmailJS complète côté code (Service ID, Template IDs, Public Key). Le flux est prêt à être validé en test réel.

---

## 14 avril 2026 | Reconfiguration EmailJS | Nouveau service + nouveaux templates

**Objectif :** Brancher le nouveau service EmailJS et remettre en place les 2 emails (confirmation client + notification restaurant) avec les nouveaux IDs.

**Actions réalisées :**
- Mise à jour du Service ID dans `script.js` : `service_0vr7k2s`
- Ajout des 2 Template IDs dans `script.js` : `template_295vy3j` (client) et `template_fa84d3n` (restaurant)
- Refonte de `sendEmails()` pour générer des paramètres dédiés client et restaurant
- Envoi des 2 emails en parallèle via `Promise.all()`
- Ajout des variables branding dans le template client (`restaurant_name`, `restaurant_team`)

**Fichiers modifiés :**
- script.js
- PROJET_CONTEXTE.md

**Résultat :** Flux email complet rétabli sur le nouveau compte EmailJS, prêt à fonctionner dès que les contenus HTML sont collés dans les 2 templates EmailJS.

---

## 13 avril 2026 | Intégration EmailJS | Envoi automatique emails réservation

**Objectif :** Envoyer automatiquement 2 emails à chaque réservation (confirmation client + notification restaurant)

**Actions réalisées :**
- Ajout CDN EmailJS dans index.html (https://cdn.jsdelivr.net/npm/@emailjs/browser@4/dist/email.min.js)
- Initialisation EmailJS avec Public Key (à configurer manuellement)
- Création constantes configuration : EMAILJS_SERVICE_ID, EMAILJS_TEMPLATE_CLIENT, EMAILJS_TEMPLATE_RESTAURANT
- Création fonction sendEmails() : envoi 2 emails en parallèle avec gestion erreurs
- Intégration dans soumission formulaire : loader "⏳ Envoi en cours..." + messages adaptatifs
- Email client : confirmation avec détails réservation (date, heure, service, couverts)
- Email restaurant : notification complète (nom, email, téléphone, date, heure, service, couverts, message)
- Gestion erreurs : réservation toujours enregistrée même si envoi email échoue
- Message adaptatif : succès = "vous allez recevoir un email" / échec = "email n'a pas pu être envoyé"

**Configuration manuelle requise :**
1. Créer compte sur emailjs.com
2. Connecter service Gmail (atelierconnecte.contact@gmail.com)
3. Créer 2 templates avec variables {{to_name}}, {{reservation_date}}, {{client_phone}}, etc.
4. Récupérer Service ID, Template Client ID, Template Restaurant ID, Public Key
5. Remplacer constantes dans script.js et index.html

**Fichiers modifiés :**
- index.html (CDN EmailJS + initialisation)
- script.js (constantes + fonction sendEmails() + intégration formulaire)
- PROJET_CONTEXTE.md (sections 2, 4, 6, 8 mises à jour)

**Résultat :** Envoi automatique de 2 emails par réservation. Configuration manuelle requise avant test.

---

## 13 avril 2026 | Interface admin améliorée | Éditeur carte + gestion capacités

**Objectif :** Créer un accès admin caché, un éditeur de carte des menus et une gestion des capacités tables

**Actions réalisées :**
- Ajout accès admin caché : 3 clics rapides sur logo hero de index.html redirige vers admin.html
- Transformation section carte en conteneur dynamique chargé depuis localStorage (clé `menuCard`)
- Création éditeur carte complet dans admin.html : ajouter/modifier/supprimer catégories et plats
- Création interface gestion capacités : capacités par défaut + spécifiques par date (clé `tableCapacity`)
- Ajout bandeau "⚠️ Plus de tables disponibles" sur formulaire réservation si capacité atteinte
- Désactivation bouton submit formulaire si service complet
- Ajout onglets navigation dans admin.html (Réservations / Carte des menus / Capacités)
- Fonctions utilitaires : generateMenuHTML(), checkCapacity(), loadAndRenderMenu()

**Fichiers modifiés :**
- index.html (logo avec ID, section carte dynamique, bandeau complet)
- script.js (écouteur 3 clics, fonctions carte et capacités, validation formulaire)
- admin.html (onglets navigation, éditeur carte, interface capacités)
- admin.js (gestion onglets, éditeur complet, gestion capacités)
- styles.css (styles onglets, éditeur, capacités, bandeau complet)
- PROJET_CONTEXTE.md (sections 3, 4, 8 mises à jour)

**Résultat :** Interface admin complète avec éditeur carte et gestion capacités. Formulaire bloque si complet.

---

## 13 avril 2026 | Refactoring admin | Externalisation CSS et organisation code

**Objectif :** Externaliser CSS admin et organiser code JS en sections

**Actions réalisées :**
- Extraction de ~400 lignes CSS de admin.html vers styles.css
- Ajout lien <link rel="stylesheet" href="styles.css"> dans admin.html
- Organisation admin.js en 4 sections commentées (Gestion réservations / Calendrier / Statistiques / Utilitaires)
- Organisation script.js en 3 sections commentées (Animations / Formulaire / Utilitaires localStorage)
- Création de 2 fonctions utilitaires localStorage : loadFromLocalStorage() et saveToLocalStorage()

**Fichiers modifiés :**
- admin.html (530→64 lignes)
- styles.css (~750→~1247 lignes)
- admin.js (257→269 lignes, organisé en sections)
- script.js (86→107 lignes, organisé en sections + fonctions utilitaires)

**Résultat :** Code mieux organisé, CSS externalisé, fonctionnalités identiques

---

## 13 avril 2026 | Reprise projet | Intégration dans la méthode

**Objectif :** Analyser le projet existant et créer PROJET_CONTEXTE.md complet

**Actions réalisées :**
- Analyse complète du projet (stack, architecture, fonctionnalités, dette technique)
- Création de PROJET_CONTEXTE.md avec les 9 sections remplies
- Archivage de PROJET_CONTEXTE_TEMPLATE.md dans _archives/
- Création de CHANGELOG.md

**Fichiers créés :**
- PROJET_CONTEXTE.md
- CHANGELOG.md
- _archives/ (dossier)

**Fichiers archivés :**
- _archives/PROJET_CONTEXTE_TEMPLATE.md

**Résultat :** Projet intégré dans la méthode, prêt pour missions futures

---

## 13 avril 2026 | Création initiale | Site démo Le Tourbillon de la Vigne

**Objectif :** Créer un site vitrine démo pour présenter au gérant du restaurant

**Actions réalisées :**
- Création de index.html (site principal avec identité visuelle réelle)
- Création de admin.html (tableau de bord réservations)
- Création de styles.css (palette #1C0E07 / #FDFAF5 / #B8842A)
- Création de script.js (formulaire + localStorage)
- Création de admin.js (gestion réservations + 6 données de démo)
- Intégration des vraies images du site Wix (logo, photos, bouteilles Instagram)

**Fichiers créés :**
- index.html (362 lignes)
- admin.html (530 lignes)
- styles.css (~750 lignes)
- script.js (86 lignes)
- admin.js (257 lignes)
- assets/ (dossier vide)

**Résultat :** Site démo fonctionnel, responsive, testable en local (ouverture directe index.html)
