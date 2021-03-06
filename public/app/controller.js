(function(){
  'use strict';

  angular
    .module('DS')
    .controller('Recipes', Recipes);

    function Recipes($scope, $http, $localStorage){
      var vm = this;

      vm.recipes = null;
      vm.$storage = $localStorage;
      vm.$storage.selectedRecipes = vm.$storage.selectedRecipes || [];
      vm.$storage.ingredientsNeeded = vm.$storage.ingredientsNeeded || [];
      vm.ingredients = [];
      vm.toggleSelection = toggleSelection;

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

      function toggleSelection(recipeName){
        var idx = vm.$storage.selectedRecipes.indexOf(recipeName);
        if(idx !== -1){
          vm.$storage.selectedRecipes.splice(idx, 1);
        } else {
          vm.$storage.selectedRecipes.push(recipeName);
        }

        vm.$storage.ingredientsNeeded = getIngredientsForSelectedRecipes(vm.$storage.selectedRecipes);
      }

      function getIngredientsForSelectedRecipes(recipes){
        var ingredientsNeeded = [];

        for(var i = 0; i < recipes.length; i++){
          for(var j = 0; j < vm.recipes.length; j++){
            if(recipes[i] === vm.recipes[j].name){
              for(var k = 0; k < vm.recipes[j].ingredients.length; k++){
                if(ingredientsNeeded.indexOf(vm.recipes[j].ingredients[k]) === -1){
                  ingredientsNeeded.push(vm.recipes[j].ingredients[k]);
                }
              }
            }
          }
        }

        return ingredientsNeeded;
      }
    }

})();
