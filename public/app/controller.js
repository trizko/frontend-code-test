(function(){
  'use strict';

  angular
    .module('DS')
    .controller('Recipes', Recipes);

    function Recipes($scope, $http){
      var vm = this;

      vm.recipes = null;
      vm.ingredients = [];

      $http.get('../content/recipes.json').success(function(data){
        vm.recipes = data;
      });
    }

})();
