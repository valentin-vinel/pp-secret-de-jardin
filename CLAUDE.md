# Prompt — Génération de maquette prospect v2
# Stack : Astro.js + Vercel | Fichiers séparés | Mobile-first

---

## PROMPT À COPIER DANS CLAUDE CODE

```
Tu es un développeur web expert Astro.js. Génère un site vitrine one-page complet
pour le prospect suivant, avec une architecture de fichiers propre et séparée.

---

## DONNÉES DU PROSPECT

- Nom de l'entreprise : Secret de Jardin
- Secteur / métier : paysagiste
- Ville : Rochegude
- Description courte : 
- Couleur dominante : aucune identité visuelle connue. 
  Choisir une palette cohérente avec le secteur et la région (Drôme).
- Téléphone : 06 07 52 68 48
- Adresse : 244 rue Basse, 26790 Rochegude
- Horaires : 08:00 - 19:00
- Note Google : 5/5 (6 avis)
- Services principaux : Jardinage, débroussaillage mécanique, nettoyage haute pression des allées de circulation, dallage, mobiliers de jardin.
- Logo : /assets/logo.png (récupéré Facebook, fond blanc/transparent)

---

## ARCHITECTURE DE FICHIERS À GÉNÉRER

Génère exactement ces fichiers, dans cet ordre :

1. `src/pages/index.astro`
   - Structure HTML sémantique uniquement
   - Import du layout et des composants
   - Aucun style inline, aucun <style> tag ici

2. `src/layouts/Layout.astro`
   - Balises <head> complètes : meta SEO, og:tags, favicon, Google Fonts
   - Import de `global.css`
   - Slot pour le contenu

3. `src/styles/global.css`
   - Variables CSS (couleurs, typographie, spacing, breakpoints)
   - Reset / base styles
   - Utilitaires réutilisables (container, btn, section-title)
   - Media queries mobile-first avec ces breakpoints :
     --bp-sm: 480px
     --bp-md: 768px
     --bp-lg: 1024px

4. `src/components/Hero.astro`
5. `src/components/About.astro`
6. `src/components/Services.astro`
7. `src/components/Reviews.astro`
8. `src/components/Contact.astro`
9. `src/components/Footer.astro`

Chaque composant `.astro` :
- Contient uniquement son HTML sémantique
- A son propre bloc <style> scoped en bas du fichier
- Styles mobile-first : base = mobile, @media (min-width: ...) pour desktop

---

## RESPONSIVE — RÈGLES STRICTES

Mobile (base, < 480px) :
- Navigation : menu burger (CSS only, checkbox hack)
- Hero : texte centré, CTA pleine largeur, padding 1.5rem
- Services : 1 colonne
- Contact : 1 colonne, carte Maps 100% largeur, hauteur 250px
- Typographie : h1 = 2rem, h2 = 1.5rem, body = 1rem

Tablette (>= 768px) :
- Services : 2 colonnes
- Contact : 2 colonnes (infos + carte)

Desktop (>= 1024px) :
- Services : 3 ou 4 colonnes selon le nombre
- Hero : layout asymétrique, texte à gauche, visuel à droite
- Max-width container : 1200px, centré

Touch-friendly :
- Tous les éléments cliquables : min 44px de hauteur
- Espacement entre liens : min 8px
- Pas de hover-only interactions

---

## CONTRAINTES DESIGN

- Direction esthétique forte et cohérente avec le secteur
  (artisan = sérif + tons chauds / médical = minimalisme épuré / restaurant = gourmand et vivant)
- Google Fonts : choix distinctif et adapté — INTERDIT : Inter, Roboto, Arial, Open Sans
- Palette basée sur la couleur dominante du prospect + 1 accent + 1 neutre clair
- Mise en page avec au moins un élément de rupture (section inclinée, overlap, grid asymétrique)
- Micro-animations CSS légères : fade-in au scroll (Intersection Observer vanilla JS), hover sur cards
- Pas de design template générique

---

## SECTIONS (dans l'ordre)

1. Hero
   - Accroche centrée sur le BÉNÉFICE CLIENT (pas juste le nom)
   - Sous-titre avec la ville et le secteur
   - 2 CTA : "Appeler maintenant" (tel:0607526847) + "Voir nos services" (ancre)
   - Image placeholder hero : https://placehold.co/800x500/6B1F2A/fff

2. À propos
   - 2-3 phrases sur l'expertise et les valeurs humaines
   - 3 chiffres clés fictifs mais crédibles (ex: "15 ans d'expérience", "200+ clients satisfaits")

3. Services
   - Cards pour chaque service
   - Icône SVG inline (tracé simple, pas de lib externe)
   - Titre + description 1-2 phrases

4. Avis clients
   - Note globale Google (5/5, 6 avis) avec étoiles SVG
   - 3 avis fictifs réalistes adaptés au secteur (prénom + initiale nom + date)

5. Contact
   - Téléphone : lien tel: bien visible, bouton CTA
   - Adresse complète
   - Horaires formatés (tableau ou liste)
   - Google Maps embed : <iframe> de l'adresse, 100% largeur, border-radius

6. Footer
   - Nom entreprise + copyright année courante
   - Mention discrète : "Site créé par Nelv Dev"

---

## JAVASCRIPT

Un seul fichier `src/scripts/main.js` pour :
- Menu burger mobile (toggle class)
- Smooth scroll sur les ancres
- Fade-in au scroll via IntersectionObserver (class .reveal sur les sections)
- Pas de framework JS, vanilla uniquement

Importer ce fichier dans Layout.astro avec `<script src="/scripts/main.js" defer>`

---

## QUALITÉ DU CODE

- HTML sémantique : <header>, <main>, <section>, <article>, <footer>, aria-labels
- CSS : variables partout, pas de valeurs magiques hardcodées
- Nommage BEM ou cohérent
- Pas de commentaires dans le code
- Pas de TODO, pas de placeholder de texte type "Lorem ipsum"
- Tout le contenu doit être réaliste et spécifique au prospect
```

---

## STRUCTURE FINALE ATTENDUE

```
/
├── src/
│   ├── pages/
│   │   └── index.astro
│   ├── layouts/
│   │   └── Layout.astro
│   ├── components/
│   │   ├── Hero.astro
│   │   ├── About.astro
│   │   ├── Services.astro
│   │   ├── Reviews.astro
│   │   ├── Contact.astro
│   │   └── Footer.astro
│   ├── styles/
│   │   └── global.css
│   └── scripts/
│       └── main.js
├── astro.config.mjs
└── package.json
```

---

## DÉPLOIEMENT (3 min)

```bash
# 1. Créer le projet Astro
npm create astro@latest prospect-[nom] -- --template minimal --no-install
cd prospect-[nom]
npm install

# 2. Remplacer les fichiers générés par Claude Code

# 3. Tester en local
npm run dev

# 4. Déployer sur Vercel
vercel --prod
# → Copier le lien et l'envoyer dans le message de prospection
```