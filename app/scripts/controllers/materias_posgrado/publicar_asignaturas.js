'use strict';

/**
 * @ngdoc function
 * @name poluxApp.controller:MateriasPosgradoPublicarAsignaturasCtrl
 * @description
 * # MateriasPosgradoPublicarAsignaturasCtrl
 * Controller of the poluxApp
 */
angular.module('poluxApp')
  .controller('MateriasPosgradoPublicarAsignaturasCtrl', function (academicaRequest) {
    var ctrl = this;
    ctrl.periodo=[];
    ctrl.carreras=[];
    ctrl.modalidad="POSGRADO";

    academicaRequest.obtenerPeriodo().then(function(response){
      ctrl.periodo=response[0];
    });

    academicaRequest.obtenerCarreras({
      'tipo': 'POSGRADO'
    }).then(function(response){
      ctrl.carreras=response;
    });

    ctrl.myFunc = function(carreraSeleccionada) {
      ctrl.pensums=[];
      academicaRequest.obtenerPensums({
       'carrera' : carreraSeleccionada
      }).then(function(response){
        ctrl.carrera=carreraSeleccionada;
        ctrl.pensums=response;
      });
    };

  });
