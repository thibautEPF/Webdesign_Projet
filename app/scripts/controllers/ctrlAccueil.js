'use strict';

angular.module('webdesignApp')
  .controller('CtrlAccueil', function ($scope,$http) {
    $scope.cjson = 1000;
    $scope.radio = "tousCheck";
    $scope.clickListe = function(){
      console.info($scope.radio);
    }; 

    $scope.affRadio = function(){
    	if($scope.radio == null){
    		return "Veuillez choisir une radio";
    	}else if($scope.radio === "tousCheck"){
    		return "Toutes les Radios";
    	}else{
    		return $scope.radio;
    	}
    }

    $scope.clickEff = function(){
      console.info($scope.cjson);
    }

  });

