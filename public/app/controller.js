(function(){
  'use strict';

  angular
    .module('DS')
    .controller('Recipes', Recipes);

    function Recipes($scope){
      var vm = this;

      vm.recipes = 'hello data science';
    }

})();
