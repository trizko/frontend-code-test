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
        vm.ingredients = getUniqueIngredientsList(vm.recipes);
      });

      function getUniqueIngredientsList(recipes){
        var results = [];

        for(var i = 0; i < recipes.length; i++){
          for(var j = 0; j < recipes[i].ingredients.length; j++){
            if(results.indexOf(recipes[i].ingredients[j]) === -1){
              results.push(recipes[i].ingredients[j]);
            }
          }
        }

        return results;
      }
    }

})();
