'use strict'
angular
  .module('webdesignApp').directive('titleDisplay',function(){
      return{
        restrict:'AEC',
        templateUrl:'views/titre.html'
      }
  });