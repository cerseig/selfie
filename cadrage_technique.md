# Cadrage technique
<br/>

## Rappel de l'expérience
L'utilisateur participe à une expérience web multi-device. Elle est disponible à la fois en anglais et en français pour élargir son accessibilité. 

L'utilisateur va être accompagné tout au long de l'expérience par une voix pré-enregistrée qui va l'orienter dans ses choix et ses actions. Il devra d'abord personnaliser un avatar qui représentera son visage et qui suivra ses mouvements et expressions. 

Il devra ensuite suivre une combinaison de poses que lui conseillera la voix. Lorsqu'il aura effectué la pose finale, son avatar et lui-même seront pris en photos et son avatar s'ajoutera à une galerie regroupant tous les avatars déjà existants. Il comprendra ainsi le dénouement de l'histoire et aura la possibilité de partager son contenu sur les réseaux sociaux, de se l'envoyer par mail ou de l'enregistrer dans la galerie de son téléphone selon le contexte.

En effet, nous avons également pensé l'expérience de façon physique, en installant un photomaton revisité, composé d'une chaise, d'un rideau et d'un iPad en guise d'écran tactile. 

<br/>

## Point clés
Notre expérience se caractérise principalement par ces aspects :
* **Experience multi-device** : pouvoir accéder partout avec une connexion Internet au site de l'expérience (mobile, tablet, desktop)
* **International** : pouvoir suivre l'expérience à la fois en anglais et en français
* **Avatar** : représente l'utilisateur grâce à une personnalisation 3D de son visage. Ses mouvements et ses actions seront détectés et l'avatar suivra ses gestes. 
* **Voix** : gérer le son selon les moments
* **Partage** : permettre à l'utilisateur de partager son avatar et/ou sa photo perso sur les réseaux sociaux et/ou de se les envoyer par mail

<br/>

## Choix techniques

### Environnement : 
Dans le but d'avoir une expérience web multi-device (mobile, tablet, desktop), nous avons pensé à une technologie web comme [**Vue.js**](https://vuejs.org/) qui est un framework JS open-source nous permettant de créer une PWA (Progressive Web App). Nous aurons peu de vues différentes mais le système de composants pourra être utile pour toute la partie d'UI. Le fait de réaliser une PWA permettra de pouvoir vivre l'expérience de manière plus immersive sur mobile en plein écran si l'utilisateur le souhaite.
Le fait que nous pensons à une installation pour permettre à l'expérience d'avoir un plus gros impact sur les gens ne change pas notre envie de faire de notre projet une expérience accessible pour tous. 

Si nous n'avions pas souhaités ouvrir notre expérience au plus grand nombre mais que nous étions concentrées
uniquement sur l'installation, nous aurions pu réaliser une application native avec [**Unity**](https://unity.com/fr) qui groupé, à **[ARKit](https://developer.apple.com/arkit/)** ou **[ARCore](https://developers.google.com/ar/)** aurait pu permettre de détecter des visages et de simplifier la gestion d'assets 3D avec les graphistes. Cependant, cette option ne répondait pas à notre concept d'expérience web multi-device. De plus, compte tenu du temps et des capacités de chaque membre de l'équipe, il était préférable de partir sur un socle de technos connu. 

### Gestion du son : 
Le fait d'avoir une voix permanente dans l'application demande beaucoup d'assets d'audio à charger (5 types de phrases par étape de pose, plus toutes les phrases d'explications, d'introduction et conclusion). Nous avons également des fichiers de sound design au niveau des retours d'action utilisateur. 
Afin de pouvoir gérer ces fichiers plus facilement et de n'avoir qu'un seul fichier à charger, nous allons utiliser un système de **sprites** (3 fichiers seulement à charger : 1 avec la voix française, 1 avec la voix anglaise et 1 avec le sound design) ce qui permettra d'obtenir de meilleures performances. Nous allons donc établir une suite de timecodes dans des fichiers de config (.json) à jouer selon la séquence. Nous allons donc utiliser la librairie audio open source et gratuite[ **Howler.js**](https://github.com/goldfire/howler.js/) qui permet notamment la gestion de sprites de manière simple.

### Détection faciale / tracking : 
Afin de reproduire les mouvements de notre utilisateur, nous devons utiliser un système de détection faciale et de tracking. N'ayant pas le temps de faire du machine learning, nous avons cherché des modules déjà existants. 
Nous souhaitons pouvoir détecter différents événements : clignement des yeux, le haussement/froncement des sourcils, l'ouverture de la bouche, les sourires et une "duckface". 
De ce besoin, nous avons recherché des API JS qui pourraient nous aider.

Nous avons d'abord effectué des tests avec la [**jeelizAPIFace**](https://github.com/jeeliz/jeelizWeboji), qui permet de détecter les mouvements d'un visage et de détecter les événements que nous souhaitions. En terme de data, nous recupérions des coefficients de morphing, variant entre 0 et 1. La valeur 1 représentant la qualité maximale d'une détection de mouvement et la valeur 0 représentant la détection du mouvement nulle.
Cependant, nous nous sommes rendu compte que la détection des événements facials n'était pas assez précise.

***Le test :***
![](https://i.imgur.com/ZuIkph1.jpg)
On remarque rapidement que la détection de la "duck face" n'est pas assez précise, de même que pour la détection de mouvement des sourcils. Sur un visage neutre sans expression, la bouche et le sourcil droit sont reconnus alors qu'ils ne le devraient pas. De cette précision approximative, nous avons laissé de côté cette solution.

<br/>

Nous avons également testé la [**faceApi.js**](https://https://github.com/justadudewhohacks/face-api.js) qui permet de faire du tracking, détecter des émotions et déterminer des repères correspondant à la forme du visage, aux yeux, aux sourcils et à la bouche. Cependant, celle ci ne permet pas de détecter les yeux ouverts et a quelques problèmes au niveau des expressions quand on tourne la tête. 

![](https://i.imgur.com/4LjegmQ.jpg)
![](https://i.imgur.com/pYw8W5Z.jpg)

<br/>

Nous nous sommes inspirés du process de **[Stinkmoji](https://stinkmoji.cool/)** qui reprend le concept d'avatar (animoji) qui suit l'utilisateur, pour la détection et le tracking. Après avoir lu leur **[case-study](https://medium.com/@stinkstudios/how-we-made-stinkmoji-1496856eb195)**, nous avons découvert que le studio s'était basé sur l'API **[Beyond Reality Face](https://www.beyond-reality-face.com/)** qui est un trackeur multi-visage. Dans le cas où nous utiliserons cette API, nous devrons nous même mettre en place les calculs entre les différents points trackés (65 points) pour déterminer un événement (oeil qui se ferme, bouche qui s'ouvre, sourcil qui se hausse...). Même si cela demande un travail supplémentaire, cela reste faisable et plus accessible pour nous afin d'obtenir une détection de qualité. De plus, nous pourrions détecter uniquement les événements qui nous intéressent et correspondent à notre expérience. L'utilisation de cette librairie en mode test / demo est gratuite, mais pour une utilisation au sein d'un projet il est nécessaire d'obtenir une licence auprès de BRFv4. 

![](https://i.imgur.com/AnAffuj.jpg)
![](https://i.imgur.com/YmLGDOE.jpg)
![](https://i.imgur.com/XhvZCoo.jpg)
![](https://i.imgur.com/gROBVA1.jpg)




### 3D :
Pour la gestion des assets 3D et leurs animations, nous souhaitons nous tourner vers **[Three.JS](https://threejs.org/)**. Nous avons déjà eu quelques occasions de l'utiliser et nous trouvons qu'il serait facile de le prendre en main compte tenu de ce que nous avons besoin de réaliser à savoir importer des objets, jouer des animations et personnaliser les couleurs de certains éléments. 
De plus, grâce à la grande communauté présente autour de cette techno et les nombreux exemples, nous pourrons être aidés et répondre à nos questions. 
Enfin, il s'agit d'un challenge technique pour nous puisque nous souhaitons améliorer nos connaissances dan cette technologie. 

Nous avons testé d'importer le fichier .glb (fichier glTF binaire) avec Three.js. Ce fichier comporte le squelette de l'avatar et les différentes animations associées. Grâce à un système de toggle de coupe de cheveux, on va pouvoir afficher seulement la coupe de cheveux que l'utilisateur aura choisit. 
Ici on a voulu afficher la coupe de cheveux n°1 et jouer l'animation de la bouche qui s'ouvre.

![](https://i.imgur.com/a4cwaCx.png)

Ici, nous avons choisi d'affiche la coiffure n°2 :

![](https://i.imgur.com/e7EuXWa.png)

*Légende : la sphère jaune / cube marron représente une coupe de cheveux particulière, la sphère bleu représenté la tête de 
l'avatar, le torus rouge représente la bouche et le cône vert représente le cou du personnage.*

### Partage :
Dans le cas de l'installation interactive (photomaton), pour éviter que l'utilisateur n'ait à rentrer ses identifiants de ses comptes sur les réseaux sociaux, nous allons procéder par QRCode. L'utilisateur pourra scanner le QRCode sur le dispositif avec son téléphone qui le rediregera ensuite sur une page du site consacrée au partage de sa photo et/ou son avatar sur ses réseaux sociaux avec ses identifiants déjà enregistrés. 
Nous allons donc utiliser un générateur de QRCode, nous pensons à utiliser le [**QR-Code-generator**](https://github.com/nayuki/QR-Code-generator).

### Store :
Afin de conserver des données utilisateur tout au long de l'expérience (choix des décors, choix de l'avatar, choix de la langue), nous allons utiliser **[Vuex](https://vuex.vuejs.org/)** qui met en place un store avec des systèmes de states. 

### Base de données : 
Nous avons besoin de stocker les avatars de tous les utilisateurs dans une BDD afin d'y avoir accès facilement et de les afficher dans la galerie finale. Dans le cas de l'installation, nous avons également besoin de stocker temporairement la photo et l'avatar de l'utilisateur pour qu'il puisse les partager sur son téléphone via une redirection grâce à un QR Code. 
Pour la gestion des données et l’échange entre le serveur et le site web, nous allons avoir besoin d’**[Apollo](https://www.apollographql.com/)** et de **[GraphCool](https://www.graph.cool/)** (framework qui inclut un système de base de donnée  **[GraphQL](https://graphql.org/)**) qui nous permettront de gérer les requêtes envoyés au serveur et de récupérer les données stockées en base de données.

### Déploiement  :
Pour le déploiement de l'application, nous utiliserons la plateforme **[Netlify](https://www.netlify.com/)**. 
<br/>

## Architecture

### Scope fonctionnel :

![](https://i.imgur.com/oDLKump.jpg)


* *Les liens back et front, le découpage de ce qui doit se passer ou. Par exemple : si je construis une API que mon front va interroger, ou si mon back communique en temps réel avec mon front. Un schéma pourrait aider à mieux comprendre ces découpages et échanges !*

<br/>

### Schéma des données
![](https://i.imgur.com/QbVcn6Q.png)

#### Base de données : 
Nous stockerons en BDD seulement l'URL de l'image de l'avatar de l'utilisateur ainsi que les données du QRCode temporaire qui contiendra l'ID de l'avatar déjà enregistré et l'URL de la photo représentative de la personne. 

#### Store : 
Quant au store, on y stockera les données de l'utilisateur : la langue qu'il aura choisi, sa personnalisation de l'avatar (garder en mémoire la coupe de cheveux, la couleur de cheveux, la couleur de la peau et la couleur des yeux) et le fond de l'avatar sélectionné. On y stockera également les étapes en cours qui seront composé d'un objet voix et d'un index. On pourra aussi retrouver un objet voix qui contiendra les différents types de séquences audio de l'étape et un statut qui indiquera si ils ont déjà été joué ou non.  

#### Configuration :
Nous mettrons aussi en place une configuration, contenant les différents types de langue (par défaut français) et les traductions textuelles correspondantes. On y trouvera également le background souhaité par la voix et les étapes avec les positions souhaitées pour chaque et les voix correspondantes.

<br/>

## Workflow 

### Developpeur / Graphistes
Pour faciliter la communication entre développeurs et graphistes, nous communiquons via **[Messenger](https://www.messenger.com/)**.

Quant aux assets (3D, sound design, voix, illustrations..), ils seront déposé sur le **[Google Drive](https://www.google.com/drive/)** par les graphistes, dans le dossier consacré aux assets. Une nomenclature des fichiers assets a été préalablement déterminée.

A peu près toutes les semaines, nous mettrons en ligne une version stable du site via **[Netlify](https://www.netlify.com/)** pour permettre aux graphistes de voir l'avancé du projet et pouvoir nous notifier de leur retour (bug, évolution, remarque..) grâce à leur accès au [**Github Project**](https://help.github.com/en/articles/about-project-boards). Elles pourront alors créer des issues dans lesquelles elles expliqueront explicitement leur retours. Une nomenclature de ces issues a été conçu afin de clairement les identifier.

En ce qui concerne la répartition des tâches et la mise en place du planning, nous avons utilisé **[Trello](https://trello.com/)** et la fonction Power Up Planyway Calender.

 
### Developpeurs

Etant donné que nous partons sur le framework Vue.js, nous allons utiliser son utilitaire de développement **[Vue CLI 3](https://cli.vuejs.org/guide/#components-of-the-system)** pour nous simplifier les tâches. 

Quant à la lisibilité du code, nous utiliserons le linter **[Eslint](hhttps://eslint.org/)** pour éviter les erreurs pouvant entrainer des bugs  et garder le même styleguide. 

Dans le but de nous simplifier la stylisation du site, nous allons utiliser **[SASS](https://sass-lang.com/)**, un des préprocesseur CSS les plus puissants.  

Afin de se retrouver dans les commits et de déterminer clairement ce qui a été fait, nous utiliserons le guide d'émoji **[Gitmoji](https://gitmoji.carloscuesta.me/)**. Celui-ci nous permettra de commit plus souvent nos modifications et de les identifier.

Pour le workflow git, nous utiliserons **[Gitflow](https://fr.atlassian.com/git/tutorials/comparing-workflows/gitflow-workflow)**, ce qui permettra d'attribuer des branches à chaque feature et d'en attribuer également pour la prod et la pre-prod. 
