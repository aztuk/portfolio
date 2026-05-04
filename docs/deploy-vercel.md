# Deploiement Vercel

Ce portfolio est plus adapte a Vercel qu'a GitHub Pages, car il utilise des routes API, des cookies et le middleware Next.js pour les locales.

## Premiere mise en ligne

1. Pousse le projet sur GitHub.
2. Dans Vercel, cree un nouveau projet et importe ce repository.
3. Garde le framework detecte sur `Next.js`.
4. Ajoute la variable d'environnement `PORTFOLIO_PASSWORD_HASH` dans les environnements `Production` et `Preview`.
5. Lance le premier deploy.

## Mot de passe

Pour generer ou changer le hash localement:

```bash
npm run set-password
```

Copie ensuite la valeur `PORTFOLIO_PASSWORD_HASH` dans Vercel, sans la commiter.

## Verification locale

Avant de partager le lien:

```bash
npm run typecheck
npm run lint
npm run test
npm run build
```

Le lien Vercel en production se comportera comme une app Next.js de production, avec les pages protegees accessibles via le mot de passe.
