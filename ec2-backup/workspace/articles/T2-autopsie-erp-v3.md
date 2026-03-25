---
projet: Pragmaltar
type: article
objet: Article blog — signaux échec ERP
description: "Projet ERP en dérive ? 7 signaux d'alerte ignorés par les DSI. Diagnostic et méthode de redressement par un Project Fixer — Pragmaltar."
date: 2026-03-19
statut: draft-v3
tags: [pragmaltar, erp, redressement, article, seo]
meta-description: "Projet ERP en dérive ? 7 signaux d'alerte ignorés par les DSI. Diagnostic et méthode de redressement par un Project Fixer — Pragmaltar."
---

# Déploiement ERP : 7 signaux d'échec que personne ne voulait voir

Le projet est officiellement "vert". Le planning tient. Les comités de pilotage valident sans broncher. L'intégrateur livre ses rapports à l'heure.

Et pourtant — tout le monde sait.

Le chef de projet qui évite les yeux. Les Key Users "en urgence opérationnelle" depuis trois mois. Le registre des risques ouvert en janvier, jamais retouché.

Selon le Standish Group (CHAOS Report, 2020), plus de 66 % des projets ERP connaissent des dépassements de délais ou de budget. Gartner, de son côté, estimait en 2018 que 55 à 75 % des déploiements n'atteignaient pas leurs objectifs initiaux. Ces chiffres ne font pas les manchettes. Ils disparaissent dans des bilans internes que personne ne partage.

Vingt ans d'intervention sur des programmes de transformation — de l'aérospatial à l'agroalimentaire, de Paris à l'Amérique latine — m'ont appris une chose : les mêmes patterns se répètent. Toujours. Un projet ERP qui dérape en 2025 reproduit exactement la cinématique d'un déploiement raté en 2016. Même déni. Même atterrissage brutal.

Voici les 7 signaux que j'ai vus, chaque fois.

---

## 1. Le planning est "vert" mais personne ne croit aux dates

C'est le premier truc que je regarde en arrivant sur un projet.

Le tableau de bord est au vert. Mais quand on pose la question directement en réunion — _"Est-ce qu'on va tenir le Go Live ?"_ — les regards se détournent. Personne ne dit non. Personne ne dit oui non plus. Le silence dure deux secondes de trop.

Le Green Status est une convention sociale avant d'être un outil de pilotage. Passer en rouge, c'est déclencher une escalade que personne ne veut. Alors on ajuste les critères de complétion. On repousse les jalons d'une semaine à la fois. On rebaptise un retard en "recalage du planning".

J'ai intervenu sur un programme piloté par un grand cabinet de conseil où tous les indicateurs sont restés au vert pendant dix-huit mois. Sur le terrain : aucun test de bout en bout n'avait été validé avec des données réelles. Le projet vivait dans une simulation parfaite, déconnectée de l'activité réelle. Jusqu'au crash du Go Live.

**Règle empirique** : tant que l'écart entre planning affiché et planning réel reste sous 20 %, le projet est récupérable. Au-delà, on ne redresse plus — on limite les dégâts.

---

## 2. Le conflit intégrateur vit dans les couloirs. Le périmètre dérive en silence.

Je regroupe ces deux signaux parce qu'ils sont liés à la même mécanique de déni.

Les réunions officielles sont cordiales. Les comptes-rendus sont lisses. Mais dans les mails de fin de soirée, le ton change. Accusations de périmètre mal défini. Disputes sur les TMA. Reproches mutuels. Formaliser ce conflit, c'est risquer d'activer des clauses contractuelles. Alors on "gère la relation". On lisse. On évite.

En parallèle, sprint après sprint, les petites adaptations s'accumulent. "Exception métier" ici, "ajustement mineur" là. Six mois plus tard : 30 % de charge supplémentaire non budgétée. Le métier a ses adaptations. L'intégrateur a facturé. Personne n'a intérêt à consolider le total.

**Ce qui n'est pas documenté ne se résout pas — ça grossit.** Un conflit non formalisé et un changement de périmètre sans Change Request produisent le même effet : une dette invisible qui explose au Go Live.

---

## 3. La migration de données n'a ni responsable ni Data Owner

C'est le signal qui fait le plus de dégâts. Et le plus silencieux.

Sur une migration récente dans le secteur agroalimentaire, 40 % des données produits n'existaient que dans des fichiers Excel personnels des opérateurs. Le système legacy ne contenait qu'une fraction de la réalité opérationnelle. On a passé six mois à parler de "complexité de mapping" plutôt que d'admettre le vrai problème : le référentiel de l'entreprise était devenu une tradition orale.

Il y a toujours une ligne dans le RACI. Mais quand on demande _"Qui est responsable de la qualité des données sources ?"_, l'intégrateur pointe vers le client. Le client pointe vers l'IT. L'IT pointe vers le métier.

**La règle** : si la propriété des données n'est pas assignée nominativement — avec un nom, pas une fonction — avant la fin de la phase Design, la migration sera en retard. Ce n'est pas une hypothèse, c'est une certitude statistique.

> **Test à faire lundi matin**
> Posez cette question en réunion : _"Qui signe personnellement la qualité des données de migration ?"_
> Si la réponse prend plus de 5 secondes, vous avez votre réponse.

---

## 4. Le SteerCo valide sans décider

Les slides défilent. Les indicateurs sont verts. La DSI hoche la tête. Réunion terminée en 45 minutes. Aucune question de fond.

J'appelle ça le **théâtre de la gouvernance**. Le Steering Committee devient une chambre d'enregistrement. On valide la forme pour éviter de trancher le fond. Le rituel l'emporte sur l'arbitrage.

Les executives n'ont pas le temps de creuser. Questionner, c'est risquer de paraître ignorant du détail. Valider, c'est déléguer la responsabilité vers le bas. C'est confortable. C'est souvent fatal pour le projet.

Un SteerCo qui ne pose jamais de questions difficiles n'exerce pas de gouvernance. Il fournit une couverture institutionnelle.

---

> **Vous reconnaissez ces signaux ?** Si vous en avez identifié 3 ou plus dans votre programme, la fenêtre d'intervention est encore ouverte — mais elle se referme vite. [Parlons-en](https://www.pragmaltar.com/contact).

---

## 5. Pas de critères Go/No-Go formalisés

Tout le monde parle du Go Live. Personne n'a défini les conditions du No-Go.

Sans critères explicites et mesurables — taux de complétion des tests, volumétrie de migration validée, formation certifiée — la décision de passer en production devient politique. On y va parce qu'on a annoncé la date. On y va parce que reculer coûterait trop cher en crédibilité.

Le cas Phoenix au Canada — un système de paie fédéral déployé en 2016 malgré des alertes documentées lors des phases de test — reste le cas d'école mondial de ce qui se passe quand le calendrier politique écrase les critères techniques. Le coût de correction a dépassé 2,5 milliards de dollars canadiens (Vérificatrice générale du Canada, rapport 2018).

**Le Go/No-Go n'est pas une réunion.** C'est un jeu de critères objectifs définis en phase de cadrage — pas la veille du déploiement.

---

## 6. Les Key Users ne sont jamais disponibles

Ils figurent dans le RACI. En pratique, ils sont toujours "sur une urgence opérationnelle". Les ateliers se tiennent avec des remplaçants de dernière minute. Les validations sont signées sans lecture sérieuse.

**Le problème n'est pas les Key Users. C'est leur management.**

Personne n'a arbitré leur charge. Ils portent 100 % de leur activité courante et 50 % de charge projet. L'équation est impossible. Tout le monde le sait. Mais personne ne veut prendre la décision de les libérer parce que ça rend visible le vrai coût organisationnel du projet.

Sur un déploiement multi-sites que j'ai piloté entre l'Europe et les Amériques, chaque entité avait désigné des Key Users "en plus de leur poste existant". Après quatre mois, aucun n'avait participé à plus de la moitié des ateliers. On a déployé un outil que personne n'avait vraiment validé. Le rejet en production a été immédiat — et prévisible.

**Un ERP paramétré sans implication réelle des Key Users sera rejeté.** Pas peut-être. Ce sera le cas.

---

## 7. Le registre des risques est un document mort

Il existe. Il a été créé en phase de cadrage. La dernière mise à jour date de trois mois.

C'est un signal d'une banalité désarmante — et c'est pourtant l'un des meilleurs indicateurs de santé d'un projet. Un registre vivant, c'est une équipe qui accepte de regarder le réel en face. Un registre mort, c'est une équipe en survie qui a abandonné la gouvernance proactive.

Les risques réalisés ne sont pas fermés. Les nouveaux risques identifiés en réunion ne sont jamais consignés. Sous pression, c'est la première tâche sacrifiée. Compréhensible — mais fatal.

**Les risques non nommés ne disparaissent pas. Ils se réalisent en silence.**

---

> ### Ce que fait un Project Fixer (et ce qu'il ne fait pas)
>
> Un Fixer ne remplace pas le chef de projet en place. Il ne refait pas le planning dans son coin. Il **nomme ce que tout le monde voit mais que personne ne dit** — les vrais écarts, les vraies décisions à prendre, les sujets qu'on évite depuis des mois. Il crée les conditions pour que l'équipe reprenne la maîtrise. Puis il sort.

---

## 5 questions à poser dès lundi matin

1. _"Qui est responsable de la qualité des données de migration — nominativement ?"_
2. _"Montrez-moi le dernier Change Request validé."_ (S'il n'y en a pas, le scope creep est déjà là.)
3. _"Quand le registre des risques a-t-il été mis à jour pour la dernière fois ?"_
4. _"Les Key Users ont-ils été libérés à hauteur de 50 % minimum pour le projet ?"_
5. _"Quel est le dernier point de désaccord documenté avec l'intégrateur ?"_

Ces cinq questions nécessitent la volonté de **nommer le réel**. C'est exactement ce que les équipes immergées ne peuvent plus faire seules.

---

## FAQ

**Comment savoir si mon projet ERP est vraiment en dérive ?**
Les signaux sont rarement spectaculaires. Le meilleur indicateur : comparez le discours officiel avec ce qui se dit dans les couloirs. Si les deux ne racontent pas la même histoire, la dérive est là — vos tableaux de bord ne l'ont pas encore captée.

**À quel moment faut-il appeler un Project Fixer ?**
Dès que vous identifiez 3 signaux parmi les 7 listés ici. La fenêtre se referme vite : passé un certain seuil, on ne redresse plus, on négocie une sortie de crise. Deux semaines de cadrage changent la trajectoire. Deux mois de déni la verrouillent.

**Peut-on récupérer un projet ERP à 6 mois du Go Live ?**
Oui — si les décisions structurelles sont prises dans les deux premières semaines d'intervention. Un redressement, ce n'est pas de la magie. C'est une série d'arbitrages difficiles que personne n'a voulu faire. Avec un mandat clair et un sponsor qui assume, ça se fait.

---

## Prochaine étape

**Session de cadrage — 90 minutes, pro bono.** Pas un audit formel. Une conversation structurée pour cartographier où en est votre programme et identifier les 2-3 leviers à activer en priorité.

[Réservez votre session](https://www.pragmaltar.com/contact)

Une question que je pose toujours en fin de session : _"Qu'est-ce que tout le monde sait mais que personne n'a encore dit à voix haute ?"_ La réponse change généralement la trajectoire du projet.

---

## Sources

- Standish Group, _CHAOS Report 2020_ — taux d'échec et dépassement projets IT
- Gartner, _ERP Implementation Failures_, 2018 — 55-75 % d'objectifs non atteints
- Vérificatrice générale du Canada, _Rapport de l'automne 2018_ — coût système Phoenix : >2,5 Md$ CAD de corrections

---

_Tarik Poulain est fondateur de Pragmaltar et intervient depuis 20 ans en redressement de projets IT complexes — ERP, ITSM, programmes de transformation — dans l'aérospatial, l'industrie, l'agroalimentaire et le transport urbain. Ancien d'EADS/Ariane 5 et Gemalto, il accompagne les DSI qui choisissent de nommer le réel plutôt que de maintenir l'illusion du Green Status._
