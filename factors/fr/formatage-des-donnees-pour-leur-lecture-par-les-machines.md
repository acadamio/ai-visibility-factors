---
id: machine-readable-data-formatting
language: fr
slug: formatage-des-donnees-pour-leur-lecture-par-les-machines
factor: Formatage des données pour leur lecture par les machines
subtitle: Le formatage des données lisibles par machine influence-t-il la visibilité dans les IA ?
category: Technical
impact: Medium
influences:
  - Understanding & Retrieval
proof: Medium
consensus: Mixed
status: Published
last_reviewed: 2026-09-30
---

## De quoi s’agit-il ?

Un format lisible par machine exprime les faits sous des formes reconnaissables et sans ambiguïté. Les exemples incluent une date au format ISO dans `<time datetime>`, un prix de produit associé à son code de devise à trois lettres, une mesure avec son unité et un identifiant stable pour une entité. La formulation visible par l’homme peut être localisée, mais sa valeur machine doit représenter le même fait. La norme HTML définit `<time>` et `<data>` à cet effet.

## Détails de l’impact

**Impact : moyen là où les faits exacts comptent.** Un simple « 50 $ » peut signifier différentes devises, tandis que « 50 USD » supprime cette ambiguïté. Une date sans année ni fuseau horaire peut devenir obsolète ou trompeuse. Les valeurs standardisées peuvent aider les analyseurs à relier le texte affiché à un fait précis, et Google affirme que les données structurées sur les produits peuvent améliorer sa compréhension du prix et des détails de l'offre associée. Ceci est particulièrement pertinent pour les achats, les événements, les spécifications techniques et autres pages riches en faits. Il reste à déduire que des faits plus clairs pourraient réduire les erreurs de réponse de l’IA ; cela ne constitue pas une preuve mesurée que les formats standardisés augmentent les citations. [Conseils sur les données produit de Google](https://developers.google.com/search/docs/specialty/ecommerce/share-your-product-data-with-google?hl=fr), [Guide des extraits de produit](https://developers.google.com/search/docs/appearance/structured-data/product-snippet?hl=fr) et [Conseils sur les fonctionnalités IA](https://developers.google.com/search/docs/appearance/ai-features?hl=fr).

## Détails des preuves et du consensus

**Preuve : moyenne. Consensus : mitigé** pour la visibilité dans les IA. La norme HTML définit des valeurs machine fiables et la documentation de recherche de Google spécifie les formats de devise et de date pour des fonctionnalités particulières du produit. Cela établit la manière dont les systèmes peuvent traiter de tels faits, mais n’établit pas de règle universelle de classement de l’IA. Les exigences diffèrent également selon les fonctionnalités : `priceCurrency` est recommandé pour les extraits de produits Google et requis pour les expériences de référencement des marchands. Une valeur machine qui n'est pas d'accord avec le texte visible peut créer une représentation pire qu'aucune valeur. La normalisation doit donc favoriser l’exactitude et non masquer les divergences. [Norme HTML](https://html.spec.whatwg.org/multipage/text-level-semantics.html), [Guide des extraits de produits de Google](https://developers.google.com/search/docs/appearance/structured-data/product-snippet?hl=fr) et [Règles relatives aux données structurées](https://developers.google.com/search/docs/appearance/structured-data/sd-policies?hl=fr).

## Recommandation

Écrivez les dates avec suffisamment de contexte pour un visiteur, y compris l'année et le fuseau horaire le cas échéant, et codez une valeur correspondante lisible par machine, le cas échéant. Épelez les codes ou les noms de devises pour les prix ambigus, attachez des unités aux quantités et utilisez des identifiants stables de manière cohérente sur les pages ou les flux associés. Pour les fonctionnalités de recherche prises en charge, suivez exactement le format de propriété et de valeur requis dans la documentation de cette fonctionnalité. Générez des valeurs d'affichage et de machine à partir d'un seul enregistrement conservé et vérifiez leur alignement après la localisation ou les mises à jour. N'ajoutez pas de précision cachée que la page visible ne prend pas en charge.

## Plateformes IA

**Google AI Overviews et AI Mode** utilise du contenu normal éligible à la recherche ; Les champs de produits exacts pris en charge peuvent aider Google à comprendre une offre, mais il n'existe pas de format de données IA spécial. [Conseils sur les fonctionnalités d'IA de Google](https://developers.google.com/search/docs/appearance/ai-features?hl=fr), [Conseils sur les données produit](https://developers.google.com/search/docs/specialty/ecommerce/share-your-product-data-with-google?hl=fr)

**Bing et Copilot** conseillent des faits structurés précis et un accord de contenu visible. [Consignes Bing aux webmasters](https://www.bing.com/webmasters/help/bing-webmaster-guidelines-30fba23a)

**ChatGPT** n'a pas de règle universelle publiée pour `<time>`, les codes de devise ou la syntaxe des unités. Des faits clairs peuvent améliorer le matériel disponible pour n’importe quel système, tandis qu’une source visible et actuelle reste essentielle.

**Perplexity :** Son annonce concernant le programme destiné aux commerçants décrit le partage des spécifications du produit et des détails actuels du produit. Cela prend en charge la fourniture de données d'offre sans ambiguïté via le canal pris en charge, mais n'établit pas la reconnaissance de date, de devise ou d'encodages d'unité HTML particuliers. [Annonce d'achat de Perplexity](https://www.perplexity.ai/fr/hub/blog/shop-like-a-pro).

## Instructions d’audit

1. Sélectionnez les pages contenant des dates, des prix, des mesures ou des identifiants importants. Énumérez les faits qui pourraient être mal interprétés sans année, devise, unité ou contexte.
2. Comparez les valeurs visibles avec n'importe quelle valeur `<time>`, `<data>`, JSON-LD ou flux ; vérifiez les formats par rapport à la norme applicable ou à la fonction de recherche.
3. Corrigez les ambiguïtés et les incohérences à leur source, puis inspectez à nouveau la page rendue. Enregistrez les réponses réelles de l’IA séparément de la conformité du formatage.
