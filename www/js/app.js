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

app.controller("loginController", function($http,$ionicPopup){
  this.usuario = "gre";
  this.senha = "";
  $scope = this;

  // An alert dialog
  this.showAlert = function() {
   var alertPopup = $ionicPopup.alert({
     title: 'Senha incorreta!',
     template: 'Tente novamente.'
   });
   alertPopup.then(function(res) {     
   });
  };

  this.login = function (){

    console.log("entrei em login");

    var url = "http://sandbox.cachina.com.br/webservice.php?login=true&usuario="+$scope.usuario+"&senha="+$scope.senha;

    $http({
        method: 'GET',
        url: url,
        headers: {'Content-Type': 'application/x-www-form-urlencoded'}
    }).success(function(data, status, headers, config) {
      
      console.log("tudo ok!");
      console.log(data);
      
      if(data > 0){
        window.location.href = "painel.html";
      }else{
        $scope.showAlert();
      }

    }).
    error(function(data, status, headers, config) {
      console.log("erro mano");
      console.log(status);
      console.log(config);
    });

  };



});

app.controller("painelController",function($http){
    this.tab = 1;
    this.data = [];
    $scope = this;

    this.changeTab = function(i){
      this.tab = i;
      switch(i){
        case 1:
          // Apenas os tickets com status 1
          this.getData("&where=status@1");
          break;
        case 2:
          // Apenas os tickets com status 0
          this.getData("&where=status@0");
          break;
        case 3:
          // Todos os tickets
          this.getData("");
          break;
      };   
    };

    this.getData = function(query){    
      $http({
          method: 'GET',
          url: "http://sandbox.cachina.com.br/webservice.php?list_ticket=t"+query,
          headers: {'Content-Type': 'application/x-www-form-urlencoded'}
          }).success(function(data, status, headers, config) {          
            $scope.data = data; 
          }).
            error(function(data, status, headers, config) {
            console.log(status);
            console.log(config);     
          }); 
    };
    
    this.getData("&where=status@1");
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
    console.log("erro mano");
    console.log(status);
    console.log(config);
  });

  this.enviar = function(){
    console.log("entrei em gravar")
    /* update_ticket: true,*/
    $http.get('http://sandbox.cachina.com.br/webservice.php',
      {
        setor: $scope.setor,
        assunto: $scope.assunto,
        mensagem: $scope.mensagem,
        usuario: 42,        
        new_ticket: true 
        
      })
    .success(function(data, status, headers, config) {
      // sucesso  
      console.log("foi enviado!");
      console.log(data);
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