'use strict';

angular
  .module('webdesignApp', [
    'ngCookies',
    'ngResource',
    'ngSanitize',
    'ngRoute',
    'ui.bootstrap'
  ])
  .config(function ($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'views/main.html',
        controller: 'CtrlAccueil'
      })
      .when('/list',{
        templateUrl: 'views/list.html',
        controller: 'MainCtrl'
      })
      .when('/list/:range:nbJsonFrames',{
        templateUrl: 'views/list.html',
        controller: 'MainCtrl'
      })
      .otherwise({
        redirectTo: '/'
      });
  });
