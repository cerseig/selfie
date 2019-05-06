# Cadrage technique
<br/>

## Rappel de l'expérience
L'utilisateur participe à une expérience web multi-device. Elle est disponible à la fois en anglais et en français pour élargir son accessibilité. 

L'utilisateur va être accompagné tout au long de l'expérience par une voix pré-enregistrée (assistante vocale) qui va l'orienter dans ses choix et ses actions. Il devra d'abord personnaliser un avatar qui représentera son visage et qui suivra ses mouvements et expressions. 

Il devra ensuite suivre une combinaison de poses que lui conseillera la voix. Lorsqu'il aura effectué la pose finale, son avatar et lui-même seront pris en photos et son avatar s'ajoutera à une galerie regroupant tous les avatars déjà existants. Il comprendra ainsi le dénouement de l'histoire et aura la possibilité de partager son contenu sur les réseaux sociaux, de se l'envoyer par mail ou de l'enregistrer dans la galerie de son téléphone selon le contexte.

En effet, nous avons également pensé l'expérience de façon physique, en installant un photomaton revisité composé d'une chaise, d'un rideau et d'un iPad en guise d'écran tactile. 

<br/>

## Point clés
Notre expérience se caractérise principalement par les aspects suivants :
* **Experience multi-device** : pouvoir accéder partout avec une connexion Internet au site de l'expérience (mobile, tablet, desktop)
* **International** : pouvoir suivre l'expérience à la fois en anglais et en français
* **Avatar** : représente l'utilisateur grâce à une personnalisation 3D de son visage. Ses mouvements et ses actions seront traqués et l'avatar suivra ses gestes. 
* **Voix** : gérer le son selon les moments et les actions de l'utilisateeur
* **Partage** : permettre à l'utilisateur de partager son avatar et/ou sa photo perso sur les réseaux sociaux et/ou de se les envoyer par mail

<br/>

## Choix techniques

### Environnement : 
Dans le but d'avoir une expérience web multi-device (mobile, tablet, desktop), nous avons pensé à une technologie web comme [**Vue.js**](https://vuejs.org/) qui est un framework JS open-source nous permettant de créer une PWA (Progressive Web App). Nous aurons peu de vues différentes mais le système de composants pourra être utile pour toute la partie d'UI. Le fait de réaliser une PWA permettra de pouvoir vivre l'expérience de manière plus immersive sur mobile en plein écran si l'utilisateur le souhaite.
Le fait que nous pensons à une installation pour permettre à l'expérience d'avoir un plus gros impact sur les gens ne change pas notre envie de faire de notre projet une expérience accessible pour tous. 

Si nous n'avions pas souhaité ouvrir notre expérience au plus grand nombre mais que nous nous étions concentrées uniquement sur l'installation, nous aurions pu réaliser une application native avec [**Unity**](https://unity.com/fr) qui groupé, à **[ARKit](https://developer.apple.com/arkit/)** ou **[ARCore](https://developers.google.com/ar/)** aurait pu permettre de détecter des visages et de simplifier la gestion d'assets 3D avec les graphistes. Cependant, cette option ne répondait pas à notre concept d'expérience web multi-device. De plus, compte tenu du temps et des capacités de chaque membre de l'équipe, il était préférable de partir sur un socle de technos connu. 

### Gestion du son : 
Le fait d'avoir une voix permanente dans l'application demande beaucoup d'assets d'audio à charger (5 types de phrases par étape de pose, plus toutes les phrases d'explications, d'introduction et conclusion). Nous avons également du sound design au niveau des retours d'action utilisateur. 
Afin de pouvoir gérer ces fichiers plus facilement et de n'avoir qu'un seul fichier à charger, nous allons utiliser un système de **sprites** (3 fichiers seulement à charger : 1 avec la voix française, 1 avec la voix anglaise et 1 avec le sound design) ce qui permettra d'obtenir de meilleures performances. Nous allons donc établir une suite de timecodes dans des fichiers de config (objets) à jouer selon la séquence. Nous allons donc utiliser la librairie audio open source et gratuite[ **Howler.js**](https://github.com/goldfire/howler.js/) qui permet notamment la gestion de sprites de manière simple.

### Détection faciale / tracking : 
Afin de reproduire les mouvements de notre utilisateur, nous devons utiliser un système de détection faciale et de tracking. N'ayant pas le temps de faire du machine learning, nous avons cherché des modules déjà existants. 
Nous souhaitons pouvoir détecter différents événements : clignement des yeux, le haussement/froncement des sourcils, l'ouverture de la bouche, les sourires et une "duckface". 
De ce besoin, nous avons recherché des API JS qui pourraient nous aider.

Nous avons d'abord effectué des tests avec la [**jeelizAPIFace**](https://github.com/jeeliz/jeelizWeboji), qui permet de détecter les mouvements d'un visage et de détecter les événements que nous souhaitions. En terme de data, nous avons récupéré des coefficients de morphing, variant entre 0 et 1 : la valeur 1 représentant la qualité maximale d'une détection de mouvement et la valeur 0 représentant la détection du mouvement nulle.
Cependant, nous nous sommes rendues compte que la détection des événements faciaux n'était pas assez précise.

***Le test :***
![](https://i.imgur.com/ZuIkph1.jpg)
On remarque rapidement que la détection de la "duck face" n'est pas assez précise, de même que pour la détection de mouvement des sourcils. Sur un visage neutre sans expression, la bouche et le sourcil droit sont reconnus alors qu'ils ne le devraient pas. De cette précision approximative, nous avons laissé de côté cette solution.

<br/>

Nous avons également testé la [**faceApi.js**](https://https://github.com/justadudewhohacks/face-api.js) qui permet de faire du tracking, détecter des émotions et déterminer des repères correspondant à la forme du visage, aux yeux, aux sourcils et à la bouche. Cependant, celle ci ne permet pas de détecter les yeux ouverts et a quelques problèmes au niveau des expressions quand on tourne la tête. 

![](https://i.imgur.com/4LjegmQ.jpg)
![](https://i.imgur.com/pYw8W5Z.jpg)

<br/>

Nous nous sommes ensuite inspirées du process de **[Stinkmoji](https://stinkmoji.cool/)** qui reprend le concept d'avatar (animoji) qui suit l'utilisateur, pour la détection et le tracking. Après avoir lu leur **[case-study](https://medium.com/@stinkstudios/how-we-made-stinkmoji-1496856eb195)**, nous avons découvert que le studio s'était basé sur l'API **[Beyond Reality Face](https://www.beyond-reality-face.com/)** qui est un trackeur multi-visage. Après plusieurs tests, nous avons décidé d'utiliser cette API. Pour cela nous avons du nous même mettre en place les calculs entre les différents points trackés (68 points) pour déterminer un événement (oeil qui se ferme, bouche qui s'ouvre, sourcil qui se hausse...). Même si cela a demandé un travail supplémentaire, cela restait faisable et plus accessible pour nous afin d'obtenir une détection de qualité. De plus, nous avons pu détecter uniquement les événements qui nous intéressent et correspondent à notre expérience. L'utilisation de cette librairie en mode test / demo est gratuite, mais pour une utilisation au sein d'un projet il est nécessaire d'obtenir une licence auprès de BRFv4. Après avoir contacté les auteurs de cette API, nous avons été libres d'utiliser la demo gratuitement et en contre-partie nous devons citer la technologie utilisée.

![](https://i.imgur.com/AnAffuj.jpg)
![](https://i.imgur.com/YmLGDOE.jpg)
![](https://i.imgur.com/XhvZCoo.jpg)
![](https://i.imgur.com/gROBVA1.jpg)

Nous avons décidé d'écouter plus d'une dizaine d'évènements de tracking : 
- mouthOpen (ouvrir la bouche)
- smile (sourire)
- smileLeft (sourire du côté gauche)
- smileRight (sourire du côté droit)
- eyeRightClose (ferme l'oeil droit)
- eyeLeftClose (ferme l'oeil gauche)
- eyeBrowLeftDown (baisser le sourcil gauche)
- eyeBrowRightDown (baisser le sourcil droit)
- eyeBrowLeftUp (lever le sourcil gauche)
- eyeBrowRightUp (lever le sourcil droit)
- rotationUp (lever la tête)
- rotationDown (baisser la tête)
- rotationLeft (tourner la tête vers la gauche)
- rotationRight (tourner la tête vers la droite)
- tiltRight (incliner la tête vers la droite)
- tiltLeft (incliner la tête vers la gauche)

Chacun de ces évènements retourne un facteur de mouvement entre 0 et 1. Lors de l'initialisation du visage, nous enregistrons la position initiale des points ainsi que la distance entre les points utiles pour nos évènements. La position initiale représente la valeur 0 du facteur. Lorsque l'utilisateur bougera, la position des différents points sera mise à jour et les calculs seront mis à jour au fur et à mesure. Ces calculs permettront de déterminer le facteur de mouvement. Si celui ci atteint la valeur 1 c'est que l'utilisateur est arrivé au bout de son mouvement. 
On considère qu'une position est complète lorsque le facteur est supérieur à un certain seuil pouvant aller de 0.5 à 1. 

Afin de pourvoir visualiser le tracking des différents évènements, nous avons créé une interface de debug. Celle ci représente le visage de l'utilisateur avec ses 68 points trackés et un panneau listant tous les évènements. Chacun de ces events on une barre de progression qui symbolise l'évolution du facteur de mouvement de 0 à 1.
Vous avez la possibilité de retrouver cette interface de debug via [**ce lien**](https://https://a-m-y.netlify.com/#/debug-experience). (https://a-m-y.netlify.com/#/debug-experience)
Grâce à cette interface, nous pouvons vite nous rendre compte de ce qui fonctionne ou non. Il nous reste encore quelques évènements à optimiser comme le mouvement des sourcils et des yeux. 

![](https://i.imgur.com/GGO2WcC.png)

#### Schéma du système de détection (avatar) : 
![](https://i.imgur.com/KTefApm.png)

<br/>

### 3D :
Pour la gestion des assets 3D et leurs animations, nous souhaitons nous tourner vers **[Three.JS](https://threejs.org/)**. Nous avons déjà eu quelques occasions de l'utiliser et nous trouvons qu'il serait facile de le prendre en main compte tenu de ce que nous avons besoin de réaliser à savoir importer des objets, jouer des animations et personnaliser les couleurs de certains éléments. 
De plus, grâce à la grande communauté présente autour de cette techno et les nombreux exemples, nous pourrons être aidées et répondre à nos questions. 
Enfin, il s'agit d'un challenge technique pour nous puisque nous souhaitons améliorer nos connaissances dans cette technologie. 

Nous avons testé d'importer un fichier .glb (fichier glTF binaire) avec Three.js. Ce fichier comporte le squelette de l'avatar et ses différentes animations associées. 
En ce qui concerne la personnalisation, pour l'instant, l'utilisateur pourra choisir la couleur de la peau, sa coupe de cheveux, sa couleur de cheveux, sa couleur des yeux, sa couleur de t-shirt, sa pilosité et le port ou non de lunettes. Pour ce qui est de la coupe de cheveux, de la pilosité et des lunettes, nous nous baserons sur un système simple de toggle d'affichage des éléments sélectionnés par l'utilisateur. En ce qui concerne les couleurs, nous récupérons la couleur sélectionnée et l'appliquerons directement sur l'objet 3D en question (cheveux, visage, corps).

Voici donc le résultat de notre simple test :
Ici on a voulu afficher la coupe de cheveux n°1 et jouer l'animation de la bouche qui s'ouvre.

![](https://i.imgur.com/a4cwaCx.png)

Ici, nous avons choisi d'affiche la coiffure n°2 :

![](https://i.imgur.com/e7EuXWa.png)

*Légende : la sphère jaune / cube marron représente une coupe de cheveux particulière, la sphère bleu représente la tête de l'avatar, le torus rouge représente la bouche et le cône vert représente le corps du personnage.*

Le tracking des différents évènements va nous permettre de récupérer son facteur et de l'utiliser afin de savoir si l'on doit jouer telle(s) ou telle(s) animation(s). Le facteur sera transformé en pourcentage afin que l'animation suive progressivement le mouvement de l'utilisateur.


### Partage :
Dans le cas de l'installation interactive (photomaton), pour éviter que l'utilisateur n'ait à rentrer ses identifiants de ses comptes sur les réseaux sociaux, nous allons procéder par QRCode. L'utilisateur pourra scanner le QRCode sur le dispositif avec son téléphone qui le redirigera ensuite sur une page du site consacrée au partage de sa photo et/ou son avatar sur ses réseaux sociaux avec ses identifiants déjà enregistrés. 
Nous allons donc utiliser un générateur de QRCode, nous pensons à utiliser le [**QR-Code-generator**](https://github.com/nayuki/QR-Code-generator).

### Store :
Afin de conserver des données utilisateur tout au long de l'expérience (choix des décors, choix de l'avatar, choix de la langue), nous allons utiliser **[Vuex](https://vuex.vuejs.org/)** qui met en place un store avec des systèmes de states. 

### Traduction :
Pour les traductions anglaises et françaises, nous avons choisi d'utiliser le plugin **[Vue I18n](https://kazupon.github.io/vue-i18n/)** qui s'ajoute facilement à Vue cli. Il propose de définir des variables d'environnement de langue par défaut, des valeurs de fallback et de créer des traductions dans des fichiers json séparés pour chaque langue. 

### Base de données : 
Nous avons besoin de stocker les avatars de tous les utilisateurs dans une BDD afin d'y avoir accès facilement et de les afficher dans la galerie finale. Dans le cas de l'installation, nous avons également besoin de stocker temporairement la photo et l'avatar de l'utilisateur pour qu'il puisse les partager sur son téléphone via une redirection par un QR Code. 
Pour la gestion des données et l’échange entre le serveur et le site web, nous allons avoir besoin d’**[Apollo](https://www.apollographql.com/)** et de **[GraphCool](https://www.graph.cool/)** (framework qui inclut un système de base de donnée  **[GraphQL](https://graphql.org/)**) qui nous permettront de gérer les requêtes envoyés au serveur et de récupérer les données stockées en base de données.

### Déploiement  :
Pour le déploiement de l'application, nous utiliserons la plateforme **[Netlify](https://www.netlify.com/)**. 
<br/>

## Architecture

### Architecture du projet :
``` yaml
# project server graphQL
__/server

# project src
__/src
  |__/assets
     |__/img
     |__/fonts
     |__/3D
     |__/styles
        |__/base
        |__/mixins
        |__/variables
        |__index.scss
  |__/components
     |__/icons
     |__/personnalisation
     |__/posing
     |__/gallery
     |__/share
  |__/config
     |__categories.js
     |__config.js
     |__steps.js
  |__/graphQL
     |__mutations.js
     |__queries.js
  |__/modules
     |__/detection
     |__/face
     |__/avatar3D
  |__/store
     |__/modules
  |__/translations
     |__en.json
     |__fr.json
     |__index.js
  |__/views
     |__About.vue
     |__Conclusion.vue
     |__DebugExperience.vue
     |__Experience.vue
     |__Gallery.vue
     |__Home.vue
     |__Intro.vue
     |__Share.vue
```
<br/>

### Scope fonctionnel :

![](https://i.imgur.com/oDLKump.jpg)

<br/>

### Schéma des données :
![](https://i.imgur.com/3t3HSvg.png)


#### Base de données : 
Nous stockons en BDD seulement l'URL de l'image de l'avatar de l'utilisateur ainsi que les données du QRCode temporaire qui contiendra l'ID de l'avatar déjà enregistré et l'URL de la photo représentative de la personne. Une fois que l'utilisateur aura récupéré sa photo personnelle et son avatar sur son téléphone, la table éphémère va se supprimer de la base de données.

#### Store : 
Quant au store, on y stocke les données de l'utilisateur : la langue qu'il a choisi, sa personnalisation d'e l''avatar (garder en mémoire la coupe de cheveux, la couleur de cheveux, la couleur de la peau et la couleur des yeux...) et le fond de l'avatar sélectionné. On y stocke également les étapes en cours qui sont composées d'un objet voix, de positions et d'un index. L'objet voix contient les différents types de séquences audio de l'étape et un statut qui indiquera si ils ont déjà été joué ou non. Pour les positions on stocke si l'utilisateur a atteint les positions souhaités ou non.  

#### Configuration :
Nous avons également mis en place une configuration, contenant le background souhaité par la voix et les étapes avec les positions souhaitées pour chaque ainsi que les voix correspondantes. On y recense également toutes les catégories de personnalisation, les attributs possibles et les couleurs possibles. 
<br/>

## Workflow 

### Developpeur / Graphistes
Pour faciliter la communication entre développeurs et graphistes, nous communiquons via **[Messenger](https://www.messenger.com/)**. Pour s'entendre de vive voix et partager nos écrans, nous avons eu l'occasion d'utiliser [**Appear**](https://appear.in/).

Quant aux assets (3D, sound design, voix, illustrations..), ils seront déposés sur le **[Google Drive](https://www.google.com/drive/)** par les graphistes, dans le dossier consacré aux assets. Une nomenclature des fichiers assets a été préalablement déterminée.

A peu près toutes les 2 semaines, nous mettrons en ligne une version stable du site via **[Netlify](https://www.netlify.com/)** pour permettre aux graphistes de voir l'avancé du projet et pouvoir nous notifier de leur retour (bug, évolution, remarque..) grâce à leur accès au [**Github Project**](https://help.github.com/en/articles/about-project-boards). Elles pourront alors créer des issues dans lesquelles elles expliqueront explicitement leur retours. Une nomenclature de ces issues a été conçu afin de clairement les identifier.

En ce qui concerne la répartition des tâches et la mise en place du planning, nous avons utilisé **[Trello](https://trello.com/)** et la fonction Power Up Planyway Calender.

 
### Developpeurs

Etant donné que nous partons sur le framework Vue.js, nous utilisons son utilitaire de développement **[Vue CLI 3](https://cli.vuejs.org/guide/#components-of-the-system)** pour nous simplifier les tâches. 

Quant à la lisibilité du code, nous utilisons le linter **[Eslint](hhttps://eslint.org/)** pour éviter les erreurs pouvant entrainer des bugs et respecter le même styleguide. 

Dans le but de nous simplifier la stylisation du site, nous utilisons **[SASS](https://sass-lang.com/)**, un des préprocesseurs CSS les plus puissants.  

Afin de se retrouver dans les commits et de déterminer clairement ce qui a été fait, nous utilisons le guide d'émoji **[Gitmoji](https://gitmoji.carloscuesta.me/)**. Celui-ci nous permet de commit plus souvent nos modifications et de les identifier.

Pour le workflow git, nous utilisons **[Gitflow](https://fr.atlassian.com/git/tutorials/comparing-workflows/gitflow-workflow)**, ce qui permett d'attribuer des branches à chaque feature et d'en attribuer également pour la prod et la pre-prod. 

Pour reprendre un peu le principe de Trello, nous utilisons également en développement le [**Github Project**](https://help.github.com/en/articles/about-project-boards) où nous pouvons créer toutes nos issues en pouvant les détailler et ainsi voir notre avancement dans le projet. Cela nous permet de voir clairement ce qui est à faire, ce qui est en cours, ce qui a été fait et par qui.  