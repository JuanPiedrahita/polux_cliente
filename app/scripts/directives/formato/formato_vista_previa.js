'use strict';

/**
 * @ngdoc directive
 * @name poluxClienteApp.directive:formato/vistaPreviaFormato
 * @description
 * # formato/vistaPreviaFormato
 */
angular.module('poluxClienteApp')
  .directive('vistaPreviaFormato', function() {
    return {
      restrict: 'E',
      scope: {
        formato: '='
      },
      link: function(scope, elm, attr) {
        scope.$watch('formato', function(newValue, oldValue) {
          if (newValue !== oldValue) {
            scope.refresh_format_view(newValue);
          }
        }, true);
      },
      templateUrl: 'views/directives/formato/vista_previa_formato.html',
      controller: function(poluxRequest, $scope) {
        var ctrl = this;
        $scope.formato_vista = {};
        $scope.refresh_format_view = function(id) {
          $scope.respuestas_vista = [];
          poluxRequest.get("tr_formato/" + id,'')
            .then(function(response) {
              $scope.formato_vista = response.data;
            });
        };
      },
      controllerAs: 'vistaPrevia'
    };
  });
