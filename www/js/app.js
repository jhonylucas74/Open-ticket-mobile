// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
var app = angular.module('starter', ['ionic']);

app.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if(window.cordova && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
    }
    if(window.StatusBar) {
      StatusBar.styleDefault();
    }
  });
});


app.controller("painelController",function($http){
    this.tab = 1;
    this.data = [];
    $scope = this;

    this.changeTab = function(i){
      this.tab = i;

      if(i == 2){
        // Apenas os tickets com status 0
        this.getData(0);
      }else{
        // Apenas os tickets com status 1
        this.getData(1);
      }
    };

    this.getData = function(i){    
      $http({
          method: 'GET',
          url: "http://sandbox.cachina.com.br/webservice.php?list_ticket=t&where=status@"+i,
          headers: {'Content-Type': 'application/x-www-form-urlencoded'}
          }).success(function(data, status, headers, config) {          
            $scope.data = data; 
          }).
            error(function(data, status, headers, config) {
            console.log(status);
            console.log(config);     
          }); 
    };
    
    this.getData(1);
});


app.controller('novoTicketController', function($scope, $http) {
  
  this.assunto = "";
  this.setor = "";
  this.mensagem = "";  

  this.setorClass = "hidden";
  $scope = this;

  var id = getParameterByName('id');
  console.log("id igual "+id);

  $http({
        method: 'GET',
        url: "http://sandbox.cachina.com.br/webservice.php?edit_ticket=t&id="+id,
        headers: {'Content-Type': 'application/x-www-form-urlencoded'}
    }).success(function(data, status, headers, config) {
      
      console.log("tudo ok!");
      console.log(data);
      $scope.setor = data.setor;
      $scope.mensagem = data.mensagem;
      $scope.assunto = data.assunto;

    }).
    error(function(data, status, headers, config) {
    console.log("error mano");
    console.log(status);
    console.log(config);
  });

  this.gravar = function(){
    console.log("entrei em gravar")

    $http.post('http://sandbox.cachina.com.br/webservice.php',
      {
        setor: $scope.setor,
        assunto: $scope.assunto,
        mensagem: $scope.mensagem,
        id: id,
        update_ticket: true,
      })
    .success(function(data, status, headers, config) {
      // sucesso
      console.log("foi enviado!");
    }).
    error(function(data, status, headers, config) {
      // erro
      console.log("erro ao enviar");
      console.log(status);
      console.log(config);
    });

  };

  this.showSetor = function (){
    this.setorClass = "";
  };

  this.changeSetor = function(setor) {
    this.setor = setor;
    this.setorClass = "hidden";
  };  

});

function getParameterByName(name) {
          var match = RegExp('[?&]' + name + '=([^&]*)').exec(window.location.search);
          return match && decodeURIComponent(match[1].replace(/\+/g, ' '));
      }