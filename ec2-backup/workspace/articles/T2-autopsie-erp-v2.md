---
projet: Pragmaltar
type: article
objet: Article blog — signaux échec ERP
description: "Projet ERP en dérive ? 7 signaux d'alerte ignorés par les DSI. Diagnostic et méthode de redressement par un Project Fixer — Pragmaltar."
date: 2026-03-16
statut: draft
tags: [pragmaltar, erp, redressement, article, seo]
meta-description: "Projet ERP en dérive ? 7 signaux d'alerte ignorés par les DSI. Diagnostic et méthode de redressement par un Project Fixer — Pragmaltar."
---

# Déploiement ERP : 7 signaux d'échec que personne ne voulait voir

Le projet est officiellement "vert". Le planning tient. Les Steering Committees valident. L'intégrateur (partenaire de mise en oeuvre) livre ses rapports dans les délais.

Et pourtant — tout le monde sait.

Le chef de projet qui ne regarde plus personne dans les yeux. Les Key Users "en urgence opérationnelle" depuis trois mois. Le registre des risques ouvert en janvier, jamais retouché.

**75 % des projets ERP connaissent des dépassements significatifs de délais ou de budget** (Standish Group, CHAOS Report). Gartner estime que 55 à 75 % n'atteignent pas leurs objectifs initiaux. Ces chiffres ne font pas les manchettes. Ils s'enterrent dans des bilans internes que personne ne partage.

En vingt ans d'intervention sur des programmes ERP et PLM — de l'aérospatial à l'agroalimentaire, de Paris à l'Amérique latine — j'ai appris une chose : les mêmes patterns se répètent, dans les mêmes industries, avec les mêmes acteurs. Un projet D365 F&O qui dérape en 2025 reproduit exactement la cinématique d'un déploiement SAP raté en 2018. Même déni. Même atterrissage brutal.

Voici les 7 signaux que j'ai vus, à chaque fois.

---

## 1. Le planning est "vert" mais personne ne croit aux dates

C'est ma signature de diagnostic. La première chose que je regarde.

Le tableau de bord affiche un RAG vert. En réunion, quand on pose la question directe — _"Est-ce qu'on va tenir le Go Live ?"_ — les regards se détournent. Personne ne dit non. Personne ne dit oui non plus.

Le Green Status est une convention sociale avant d'être un outil de pilotage. Passer en rouge, c'est déclencher une escalade. Alors on ajuste les critères de complétion. On repousse les jalons d'une semaine à la fois. On rebaptise un retard en "recalage du planning".

J'ai vu un programme ERP piloté par un Big4 où tous les indicateurs sont restés au vert pendant dix-huit mois. Sur le terrain, aucun test de bout en bout n'avait été validé avec des données réelles. Le projet vivait dans une simulation parfaite, déconnectée de l'activité, jusqu'au crash de la mise en service.

**Le seuil critique** : tant que l'écart entre planning affiché et planning réel reste sous les 20 %, le projet est récupérable. Au-delà, on ne redresse plus — on limite les dégâts.

---

## 2. Le conflit intégrateur vit dans les couloirs, le périmètre dérive en silence

Je fusionne volontairement deux signaux ici, parce qu'ils se nourrissent l'un l'autre.

**Le conflit invisible.** Les réunions officielles sont cordiales. Les comptes-rendus sont lisses. Mais dans les mails de fin de soirée, le ton change. Accusations de périmètre mal défini. Disputes sur les TMA. Reproches mutuels sur les livrables. Formaliser ce conflit, c'est risquer d'activer des clauses contractuelles. Alors la direction "gère la relation". On lisse. On évite.

**Le scope creep silencieux.** En parallèle, sprint après sprint, de petites adaptations s'accumulent. "Exception métier" ici, "ajustement mineur" là. Cumulées sur six mois : 30 % de charge supplémentaire non budgétée. Le métier obtient ses adaptations. L'intégrateur facture. Personne n'a intérêt à consolider le total.

Le mécanisme est le même : **ce qui n'est pas documenté ne se résout pas — ça grossit.** Un conflit non formalisé et un changement de périmètre non tracé par Change Request produisent le même effet : une dette invisible qui explose au moment du Go Live.

---

## 3. La migration de données n'a ni responsable ni Data Owner

De tous les signaux, c'est celui qui fait le plus de dégâts. Et le plus silencieux.

Sur une migration récente dans l'agroalimentaire, nous avons découvert que 40 % des nomenclatures produits n'existaient que dans les fichiers Excel personnels des préparateurs de commande. Le système legacy AS400 ne contenait qu'une fraction de la réalité opérationnelle. On a passé six mois à parler de "complexité de mapping" plutôt que d'admettre le vrai problème : le socle de données de l'entreprise était devenu une tradition orale.

Il y a toujours une ligne dans le RACI. Mais quand on demande _"Qui est responsable de la qualité des données sources ?"_, l'intégrateur pointe vers le client. Le client pointe vers l'IT. L'IT pointe vers le métier.

**La règle est simple : si la propriété des données n'est pas assignée nominativement — avec un nom, pas une fonction — avant la fin de la phase Design, la migration sera en retard.** C'est une certitude statistique, pas une hypothèse.

> **Test rapide à faire lundi matin**
> Posez cette question en réunion : _"Qui signe personnellement la qualité des données de migration ?"_
> Si la réponse prend plus de 5 secondes, vous avez votre signal.

---

## 4. Le SteerCo valide sans décider : le théâtre de la gouvernance

Les slides sont présentées. Les indicateurs sont verts. La DSI (CIO) valide. Réunion terminée en 45 minutes. Aucune question de fond.

J'appelle ça le **théâtre de la gouvernance** : le Comité de Pilotage se transforme en chambre d'enregistrement de diapositives lissées. On valide la forme pour éviter de trancher le fond. Le rituel de la réunion l'emporte sur l'arbitrage du réel.

Les executives n'ont pas le temps de creuser. Questionner, c'est risquer de paraître ignorant du détail technique. Valider, c'est déléguer la responsabilité vers le bas. C'est confortable. C'est mortel pour le projet.

**Un Steering qui ne pose jamais de questions difficiles n'exerce pas de gouvernance. Il fournit une couverture institutionnelle.**

---

> **Vous reconnaissez ces signaux ?** Si vous en avez identifié 3 ou plus dans votre programme en cours, la fenêtre d'intervention est encore ouverte — mais elle se referme vite. [Parlons-en](https://www.pragmaltar.com/contact).

---

## 5. Pas de critères Go/No-Go : on avance à l'inertie

Ce signal est le plus sous-estimé. Tout le monde parle du Go Live. Personne n'a défini les conditions du No-Go.

Sans critères explicites et mesurables — taux de complétion des tests, volumétrie de migration validée, formation des utilisateurs certifiée — la décision de passer en production devient politique. On y va parce qu'on a annoncé la date. On y va parce que revenir en arrière coûterait trop cher en crédibilité.

Le fiasco Phoenix au Canada — un système de paie fédéral déployé sans que les signaux d'alerte des phases de test aient été pris en compte — reste le cas d'école mondial de ce qui arrive quand le calendrier politique écrase les critères techniques.

**Le Go/No-Go n'est pas une réunion. C'est un jeu de critères objectifs définis en phase de cadrage, pas la veille du déploiement.**

---

## 6. Les Key Users ne sont jamais disponibles (et ce n'est pas leur faute)

Ils figurent dans le RACI. Mais en pratique, ils sont toujours "sur une urgence opérationnelle". Les ateliers se tiennent avec des remplaçants de dernière minute. Les validations sont signées sans lecture approfondie.

**Le problème n'est pas les Key Users. C'est leur management.**

Personne n'a arbitré leur charge. Ils portent 100 % de leur activité courante plus 50 % de charge projet. L'équation est impossible et tout le monde le sait. Mais personne ne veut prendre la décision de les libérer — parce que ça rend visible le vrai coût du projet pour l'organisation.

Sur un déploiement PLM multi-sites que j'ai piloté entre l'Europe et les Amériques, chaque filiale avait désigné des Key Users "en plus de leur poste". Au bout de quatre mois, aucun n'avait participé à plus de la moitié des ateliers. On a déployé un outil que personne n'avait validé. Le rejet en production a été immédiat.

**Un ERP paramétré sans implication réelle des Key Users sera rejeté en production.** La phase UAT révélera des inadéquations fonctionnelles majeures — trop tard pour les corriger proprement.

---

## 7. Le registre des risques est un document mort

Il existe. Il a été créé en phase de cadrage. La dernière mise à jour date de trois mois.

C'est un signal d'une banalité désarmante, et pourtant c'est un des meilleurs indicateurs de santé d'un projet. Un registre vivant, c'est une équipe qui accepte de regarder le réel en face. Un registre mort, c'est une équipe en mode survie qui a abandonné la gouvernance proactive.

Les risques réalisés ne sont pas marqués. Les nouveaux risques identifiés en réunion ne sont jamais consignés. Dans une équipe déjà sous pression, c'est la première tâche sacrifiée. Normal — mais fatal.

**Les risques qui ne sont pas nommés ne disparaissent pas. Ils se réalisent en silence.**

---

> ### Ce que fait un Project Fixer (et ce qu'il ne fait pas)
>
> Un Fixer ne remplace pas le chef de projet. Il ne refait pas le planning dans son coin. Il **nomme ce que tout le monde voit mais que personne ne dit** — les vrais écarts, les vrais risques, les vraies décisions à prendre. Il crée les conditions pour que l'équipe en place reprenne la maîtrise. Puis il sort.

---

## 5 questions à poser dès lundi matin

1. _"Qui est responsable de la qualité des données de migration — nominativement ?"_ (L'hésitation dit tout.)
2. _"Montrez-moi le dernier Change Request validé."_ (S'il n'y en a pas, le scope creep est déjà là.)
3. _"Quand le registre des risques a-t-il été mis à jour pour la dernière fois ?"_ (La date suffit.)
4. _"Les Key Users ont-ils été libérés à 50 % minimum pour le projet ?"_
5. _"Quel est le dernier point de désaccord documenté avec l'intégrateur ?"_

Ces cinq questions nécessitent la volonté de **nommer le réel**. C'est exactement ce que les équipes immergées ne peuvent plus faire seules.

---

## FAQ

**Comment savoir si mon projet ERP est vraiment en dérive ?**
Les signaux sont rarement spectaculaires. Le meilleur indicateur : comparez le discours officiel avec ce qui se dit dans les couloirs. Si les deux ne racontent pas la même histoire, la dérive est déjà là — vos tableaux de bord ne l'ont simplement pas encore captée.

**À quel moment faut-il appeler un Project Fixer ?**
Dès que vous identifiez 3 signaux parmi les 7 listés ici. La fenêtre d'intervention se referme vite : passé un certain seuil, on ne redresse plus, on négocie une sortie de crise. Deux semaines de cadrage changent la trajectoire. Deux mois de déni la verrouillent.

**Peut-on récupérer un projet ERP à 6 mois du Go Live ?**
Oui — si les décisions structurelles sont prises dans les deux premières semaines d'intervention. Un redressement, ce n'est pas de la magie. C'est une série d'arbitrages difficiles que personne n'a voulu faire. Avec un mandat clair et un sponsor qui assume, ça se fait.

---

## Prochaine étape

**Session de cadrage stratégique — 90 minutes, pro bono.** Pas un audit formel. Une conversation structurée pour cartographier où en est votre programme et identifier les 2-3 leviers à activer en priorité.

[Réservez votre session](https://www.pragmaltar.com/contact)

Une question que je pose toujours en fin de session : _"Qu'est-ce que tout le monde sait mais que personne n'a encore dit à voix haute ?"_ — La réponse change généralement la trajectoire du projet.

---

_Tarik Poulain est fondateur de Pragmaltar et intervient depuis 20 ans en redressement de projets IT complexes — ERP, PLM, ITSM — dans l'aérospatial, l'industrie, l'agroalimentaire et le transport urbain. Ancien d'EADS/Ariane 5, Gemalto et de programmes de déploiement internationaux, il accompagne les DSI qui choisissent de nommer le réel plutôt que de maintenir l'illusion du Green Status._
