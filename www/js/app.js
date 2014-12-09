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
    this.teste = "nao mudou"; 
    this.data = [{"assunto":"sdds"}];

    this.changeTab = function(i){      
      this.tab = i;      
    };
    


    $http({
        method: 'GET',
        url: "http://sandbox.cachina.com.br/webservice.php?list_ticket=t&where=status@1",
        headers: {'Content-Type': 'application/x-www-form-urlencoded'}
        }).success(function(data, status, headers, config) {          
          console.log(data);
          this.data = data;          
        }).
          error(function(data, status, headers, config) {
          console.log(status);
          console.log(config);     
        });  

});


app.controller('novoTicketController', function($scope, $http) {
  this.setor = '';
  this.setorClass = "hidden";

  var id = getParameterByName('id');
  $http({
        method: 'GET',
        url: "http://sandbox.cachina.com.br/webservice.php?edit_ticket=t&id="+id,
        headers: {'Content-Type': 'application/x-www-form-urlencoded'}
    }).success(function(data, status, headers, config) {
      
      console.log(data)
      this.setor = data.setor;
      this.mensagem = data.mensagem;
      this.assunto = data.assunto;

    }).
    error(function(data, status, headers, config) {
    console.log(status)
    console.log(config)
    //alert('error')
  });

  this.gravar = function(){

  }

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