Webdesign_Projet
================
					WebDesign : Radio Choose Helper

Théo POULAIN
Thibaut RENAULT
EPF - 4A TIC

Le site que nous avons réalisé permet de visualiser les titres les plus diffusés à la radio et de vous aider à choisir la ou les stations de radios qui vous correspondent le plus :
- En recherchant des titres de chanson ou des artistes afin d'obtenir le nombre passage sur chaque station et la répartition des stations de radios qui les diffusent.
- Ou bien en visualisant les titres de chanson les plus diffusés sur une station de radio séléctionnée.

Notre application web va tout d'abord récupérer notre source de données qui est l'ensemble des titres diffusés sur 6 stations de radios, par paquets.
On va ensuite les ajouter dans un tableau pour les stocker puis les trier au fur et à mesure par rapport au nombre de diffusion sur l'ensemble des stations de radio.
On a alors rajouté une pagination pour n'afficher qu'un certain nombre de titres par page pour plus de lisibilité.

Pour cela, nous avons eu recours à l'utilisation de Bootstrap (pour un rendu design et une application responsive),
des principales fonctionnalités de SASS (mixins, nesting, variables), et de fonctionnalités gérées par AngularJS,
afin de créer une application web utilisant les ressources du client avec le framework AngularJs (architecture MVC, filter, routeProvider, directive personnalisée).

Nous avons également pensé à certaines perspectives de développement que nous n'avons pas eu le temps d'implémenter :
- Afficher les résultats sous la forme d'un graphique (camembert ou autre)
- Ajouter un système de notation/like des titres
