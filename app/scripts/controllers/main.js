'use strict';

angular.module('webdesignApp')
  .controller('MainCtrl', function ($scope,$http,$routeParams) {
    var sampleRow = new Array(9);
    var tableauTitres = new Array(sampleRow);
    var i = 1;
    $scope.itemsPerPage = 50;
    $scope.valeurs = new Array();
    $scope.debut = 1;
    $scope.fin = 50;
    $scope.actual = 0;
    $scope.total = $routeParams.nbJsonFrames;
    $scope.barColor = "danger"
    $scope.chargement = 0;
    $scope.pageChange = function(){
      var j = 0;
      $scope.valeurs.length = $scope.itemsPerPage;
      for(var i = ($scope.currentPage - 1)*$scope.itemsPerPage;i < ($scope.currentPage*$scope.itemsPerPage);i++){
        if(i >= $scope.counts.length){
          $scope.valeurs.length = j;
          break;
        }
        $scope.valeurs[j] = $scope.counts[i];
        j++;
      }
      $scope.debut = ($scope.currentPage - 1)*$scope.itemsPerPage +1;
      $scope.fin = $scope.debut + $scope.valeurs.length-1;
      console.info($scope.valeurs);
    }

    $scope.search = function(){
      var found = false;
      for(var i = 0;i < $scope.counts.length;i++){
        if($scope.counts[i][0] === $scope.searchVal || $scope.counts[i][1] === $scope.searchVal){
          found = true;
          $scope.currentPage = Math.floor(i/$scope.itemsPerPage)+1;
          $scope.pageChange();
          $scope.fil = $scope.searchVal;
          found = true;
          break;
        }
      }
      if(found = false){
        window.alert("Le titre ou l'artiste :"+$scope.searchVal+ "n'a pas été trouvé");
      }
    }
    for(var i = 0;i < $scope.total;i = i+500){
      $http
        .get('http://public.opendatasoft.com/api/records/1.0/search?dataset=titres-diffuses-sur-6-stations-de-radios-francaises&rows=500&start='+i+'&sort=tstamp&facet=radio&facet=artiste&facet=titre')
        .success(function(data){
          for(var j = 0;j < 500;j++){
            var flag = true;
            var chanson = data.records[j].fields.titre
            var artiste = data.records[j].fields.artiste
            var radio = data.records[j].fields.radio
            if($routeParams.range != "tousCheck"){
              if(radio === $routeParams.range)
                tableauTitres = addCountForTitle(chanson,tableauTitres,radio,artiste);
            }else{
              tableauTitres = addCountForTitle(chanson,tableauTitres,radio,artiste);
            }
          }
          if(flag === true){
            $scope.valeurs = initPage1(tableauTitres,$scope.itemsPerPage);
            flag = false;
          }
          $scope.actual = $scope.actual+500;
          $scope.chargement = Math.ceil(($scope.actual/$scope.total)*100);
          if($scope.actual == $scope.total){
            $scope.barColor = "success";
          }
        })
        .error(function(data,status){
          console.error('Error : status'+status);
          console.error(data);
          $scope.valeurs = new Array(1,9);
          $scope.valeurs[0] = new Array("404 Not Found","Check your internet connection",0,0,0,0,0,0,0);
          $scope.valeurs.length = 1;
          $scope.fin = 1;
        });
    }
    $scope.counts = tableauTitres;
    console.info($scope.counts);
    $scope.currentPage = 1;

  });

function addCountForTitle(title,titleArray,radio,artiste){
  var found = false;
  var pos = 0;
  if(titleArray != null){
    if(titleArray.length != 0){
      for(var i = 0;i < titleArray.length;i++){
        if(titleArray[i][0] === title){
          found = true;
          pos = i;
          break;
        }
      }
    }
  }
  if(found === false){
    pos = titleArray.length;
    if(titleArray[0][0] == null){
      pos = 0;
    }
    if(titleArray == null){
      titleArray = new Array();
    }
    titleArray[pos] = new Array(title,artiste,0,0,0,0,0,0,0);
  }
  countByRadio(titleArray[pos],radio);
  if(found === true){
    autoSortByTotal(titleArray,pos);
  }
  return titleArray;

}

function countByRadio(titleArrayLine,radio){
  switch(radio){
    case "NRJ":
      titleArrayLine[2]++;
      break;
    case "Fun Radio":
      titleArrayLine[3]++;
      break;
    case "Virgin Radio":
      titleArrayLine[4]++;
      break;
    case "RTL 2":
      titleArrayLine[5]++;
      break;
    case "Oui FM":
      titleArrayLine[6]++;
      break;
    case "Radio Nova":
      titleArrayLine[7]++;
      break;
  }
  titleArrayLine[8]++;
}

function autoSortByTotal(titleArray,addPosition){
  var i = addPosition;
  if(i-1 >= 0){
    while(titleArray[i][8]>titleArray[i-1][8]){
      permutation(titleArray,i-1,i);
      i--;
      if(i <= 1){
        break;
      }
    }
  }
}

function permutation(titleArray,pos1,pos2){
  var temp = titleArray[pos1];
  titleArray[pos1] = titleArray[pos2];
  titleArray[pos2] = temp;
}

function initPage1(titleArray,nbTitresPerPage){
  var arrayOfTitles = new Array(nbTitresPerPage);
  for(var i = 0;i < nbTitresPerPage;i++){
    arrayOfTitles[i] = titleArray[i];
  }
  return arrayOfTitles;
}