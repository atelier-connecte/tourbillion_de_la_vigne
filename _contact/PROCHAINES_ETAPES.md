# PROCHAINES ÉTAPES — LE TOURBILLON DE LA VIGNE

## ✅ CE QUI EST FAIT

- Démo complète créée (index.html + admin.html)
- Corrections visuelles appliquées (fidèle au site original)
- Menu réel intégré (13 plats du PDF)
- Système de réservation fonctionnel (localStorage)
- Éditeur de carte dynamique opérationnel
- 3 accès admin (logo 3 clics + bouton test + footer)
- Fiche client complétée avec toutes les infos croisées
- Email de premier contact rédigé

## 🚀 ÉTAPE 1 : DÉPLOYER SUR GITHUB PAGES

### Actions à faire

1. **Créer un repo GitHub**
   - Nom suggéré : `tourbillon-demo` ou `tourbillon-de-la-vigne-demo`
   - Visibilité : Public (pour GitHub Pages gratuit)

2. **Pousser le code**
   ```bash
   cd c:\DEV\PROJETS\Clients\tourbillon-de-la-vigne
   git init
   git add index.html admin.html styles.css script.js admin.js
   git commit -m "Démo Le Tourbillon de la Vigne - Site vitrine + réservation + éditeur carte"
   git branch -M main
   git remote add origin https://github.com/[TON_USERNAME]/tourbillon-demo.git
   git push -u origin main
   ```

3. **Activer GitHub Pages**
   - Aller dans Settings > Pages
   - Source : Deploy from a branch
   - Branch : main / (root)
   - Save

4. **Récupérer le lien live**
   - Format : `https://[TON_USERNAME].github.io/tourbillon-demo/`
   - Tester le lien (attendre 1-2 minutes le déploiement)

### ⚠️ Avant de déployer

**Retirer le bouton "Admin" visible** (c'était pour les tests uniquement) :
- Supprimer la ligne 26 dans `index.html` : `<a href="admin.html" class="admin-test-btn">Admin</a>`
- Garder uniquement les 2 accès discrets (logo 3 clics + footer)

## 📧 ÉTAPE 2 : ENVOYER L'EMAIL

### Remplacer dans la fiche client

```
👉 **[LIEN DÉMO GITHUB PAGES]**
```

Par :

```
👉 **https://[TON_USERNAME].github.io/tourbillon-demo/**
```

### Destinataires

- **Email principal** : letourbi@gmail.com
- **Objet** : Le Tourbillon — j'ai créé quelque chose pour vous

### Timing

- **Meilleur moment** : Mardi ou mercredi matin (9h-11h)
- **À éviter** : Weekend, lundi (rush), jeudi-vendredi soir (préparation weekend)

## 📞 ÉTAPE 3 : RELANCE (si pas de réponse sous 7 jours)

### Option 1 : Email doux

**Objet :** Re: Le Tourbillon — j'ai créé quelque chose pour vous

Bonjour Pierre et Virginie,

Je ne sais pas si vous avez eu le temps de jeter un œil à la maquette que je vous ai envoyée la semaine dernière.

Pas de souci si ce n'est pas le bon moment. Je voulais juste m'assurer que mon message n'était pas passé dans les spams.

Si ça ne vous intéresse pas, dites-le moi franchement — aucun problème.

Bonne continuation,

[PRÉNOM]

### Option 2 : Passage physique

- Aller au restaurant un soir calme (mardi ou mercredi)
- Demander à parler à Pierre ou Virginie
- Speech : "Bonjour, je suis [PRÉNOM], je vous ai envoyé un email la semaine dernière avec une maquette de site. Je voulais juste m'assurer que vous l'aviez bien reçu."
- Laisser carte de visite si pas disponibles

## 💰 ÉTAPE 4 : SI INTÉRESSÉS (2ème contact)

### Proposition tarifaire

**Offre complète :**
- Site vitrine moderne (design actuel)
- Système de réservation en ligne
- Éditeur de carte dynamique
- Tableau de bord admin
- Formation 1h (prise en main)
- Support 1 mois inclus

**Tarif normal :** 850€  
**Offre lancement (5 premiers clients) :** **595€** (-30%)

**En échange :** Un retour d'expérience sincère après 1 mois d'utilisation

### Accompagnement mensuel (optionnel)

**39€/mois** :
- Mises à jour de la carte si besoin
- Ajustements visuels mineurs
- Support technique prioritaire
- Sauvegardes automatiques

## 📋 CHECKLIST AVANT ENVOI

- [ ] Démo déployée sur GitHub Pages
- [ ] Lien testé (fonctionne bien)
- [ ] Bouton "Admin" test retiré
- [ ] Email relu (pas de [PRÉNOM] ou [LIEN] oubliés)
- [ ] Signature complète (nom, téléphone, email)
- [ ] Envoyé depuis atelierconnecte.contact@gmail.com
- [ ] Copie envoyée à soi-même (pour suivi)

---

**Créé le :** 14 avril 2026  
**Statut :** Prêt à déployer
