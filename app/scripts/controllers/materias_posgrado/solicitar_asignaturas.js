'use strict';

/**
 * @ngdoc function
 * @name poluxApp.controller:MateriasPosgradoSolicitarAsignaturasCtrl
 * @description
 * # MateriasPosgradoSolicitarAsignaturasCtrl
 * Controller of the poluxApp
 */
angular.module('poluxApp')
  .controller('MateriasPosgradoSolicitarAsignaturasCtrl', function (poluxMidRequest) {
    var ctrl = this;

    ctrl.estudiante={
      "Codigo": "20102020070",
      "Nombre": "PARRA FUENTES FABIO ANDRES",
      "Tipo": "POSGRADO"
    };
    ctrl.modalidad="MATERIAS POSGRADO";

    poluxMidRequest.post("disponibilidad/Registrar?tdominio=2", self.colegio).then(function(response){
        console.log(response);
        ctrl.validar= response.data;
    });
  });