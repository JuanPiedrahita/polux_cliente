'use strict';

/**
 * @ngdoc directive
 * @name poluxClienteApp.directive:materias/consultarSolicitudes
 * @description
 * # materias/consultarSolicitudes
 */
angular.module('poluxClienteApp')
  .directive('consultarSolicitudes', function (poluxRequest, academicaRequest, $route) {
    return {
      restrict: 'E',
      scope: {
          estudiante:'=',
          s:'=',
          modalidad: '='
      },
      templateUrl: 'views/directives/materias/consultar_solicitudes.html',

      controller:function($scope){
        var ctrl = this;
        ctrl.solicitud=[];
        ctrl.solicitud2=[];
        ctrl.a=[];
        ctrl.carreras=[];
        ctrl.estudiante = $scope.estudiante;

        ctrl.obtenerNombres = function(asignaturas, arreglo){
          var arreglo=[];
          angular.forEach(asignaturas, function(value) {
            //buscar los datos de la asignatura

            var parametros = {
             'codigo': value.IdAsignaturasElegibles.CodigoAsignatura
            };

            academicaRequest.buscarAsignaturas(parametros).then(function(resp){
              arreglo.push(resp[0]);
            });
          });
          return arreglo;
        };

        ctrl.formalizarSolicitud = function (solicitud){


          //si existen más solicitudes, quedan canceladas
          console.log("ctrl.solicitud2: ");
          console.log(ctrl.solicitud2);
          //se formaliza la solicitud
          angular.forEach(ctrl.solicitud2, function(value) {
            console.log("value.Id: " );
            console.log(value.Id);
            if(value.Id==solicitud.Id){
              value.Formalizacion='confirmado';
              poluxRequest.put("solicitud_materias",solicitud.Id, value).then(function(response){
                console.log("response.data confirmado: " + response.data);
              });
            }
            //se cancelan las sols adicionales
            else{
              value.Estado='rechazado';
              poluxRequest.put("solicitud_materias",value.Id, value).then(function(response){
                console.log("response.data rechazado: " + response.data);
              });
            }
          })

          $route.reload();

        };

        academicaRequest.obtenerPeriodo().then(function(response){
          ctrl.periodo=response[0];

          //buscar si hay TG para el estudiante en la modalidad de materias de posgrado
          var parametros=$.param({
            query:"CodigoEstudiante:"+ctrl.estudiante.Codigo+","+ "IdTrabajoGrado.IdModalidad.Id:3",
            related:"IdTrabajoGrado"
          });
          poluxRequest.get("estudiante_tg",parametros).then(function(response){
            console.log(response.data)
            if(response.data){

              //por cada TG, buscar la solicitud asociada al TG
              angular.forEach(response.data, function(value) {

                console.log(value.IdTrabajoGrado.IdModalidad.Id);
                console.log(ctrl.estudiante.Tipo);

                if((ctrl.estudiante.Tipo=='POSGRADO') && (value.IdTrabajoGrado.IdModalidad.Id==3)){

                  var parametros=$.param({
                    query:"IdTrabajoGrado:"+value.IdTrabajoGrado.Id+",Anio:"+ctrl.periodo.APE_ANO+",Periodo:"+ctrl.periodo.APE_PER
                  });

                  //buscar las solicitudes asociadas al TG
                  poluxRequest.get("solicitud_materias",parametros).then(function(response){

                    console.log(response.data);

                    angular.forEach(response.data, function(value) {
                      ctrl.solicitud2.push(value);
                      //buscar nombre de la carrera
                      var parametros = {
                        'codigo': value.CodigoCarrera
                      };
                      ctrl.carreras.push(value.CodigoCarrera);
                      console.log(ctrl.carreras);

                      academicaRequest.obtenerCarreras(parametros).then(function(resp){
                        var parametros=$.param({
                          query:"IdSolicitudMaterias:"+value.Id,
                          related:"IdAsignaturasElegibles"
                        });

                        //buscar asignaturas asociadas a la solicitud
                        poluxRequest.get("asignatura_inscrita",parametros).then(function(resp2){

                          angular.forEach(resp2.data, function(value) {
                            //buscar nombre-datos de la asignaturas
                            var parametros = {
                             'codigo': value.IdAsignaturasElegibles.CodigoAsignatura
                            };
                            academicaRequest.buscarAsignaturas(parametros).then(function(resp3){
                              var asign=resp3[0];
                              ctrl.a.push(asign);

                            });
                          });

                          //console.log(resp2.data);
                          ctrl.asignaturas=resp2.data;
                          var aaa=ctrl.obtenerNombres(resp2.data);

                          var sol = {
                            "Id": value.Id,
                            "Fecha": value.Fecha,
                            "Estado": value.Estado,
                            "Formalizacion": value.Formalizacion,
                            "Carrera": resp[0].NOMBRE
                          };
                          var data = {
                            "Solicitud": sol,
                            "Asignaturas": aaa
                          };

                          ctrl.solicitud.push(data);
                        });
                      });



                    });


                  });

                }else{

                  if((ctrl.estudiante.Tipo=='PREGRADO') && (value.IdTrabajoGrado.IdModalidad.Id==4)){

                    var parametros=$.param({
                      query:"IdTrabajoGrado:"+value.IdTrabajoGrado.Id+",Anio:"+ctrl.periodo.APE_ANO+",Periodo:"+ctrl.periodo.APE_PER
                    });
                    //buscar la solicitud asociada al TG
                    poluxRequest.get("solicitud_materias",parametros).then(function(response){
                      //buscar nombre de la carrera
                      var parametros = {
                        'codigo': response.data[0].CodigoCarrera
                     };

                      academicaRequest.obtenerCarreras(parametros).then(function(resp){
                        var parametros=$.param({
                          query:"IdSolicitudMaterias:"+response.data[0].Id
                        });
                        //buscar asignaturas asociadas a la solicitud
                        poluxRequest.get("asignatura_inscrita",parametros).then(function(resp2){

                          angular.forEach(resp2.data, function(value) {
                            //buscar nombre-datos de la asignaturas
                            var parametros = {
                             'codigo': value.IdAsignaturasElegibles.CodigoAsignatura
                            };
                            academicaRequest.buscarAsignaturas(parametros).then(function(resp3){
                              var asign=resp3[0];
                              ctrl.a.push(asign);
                            });
                  	      });

                          //console.log(resp2.data);
                          ctrl.asignaturas=resp2.data;
                          var aaa=ctrl.obtenerNombres(resp2.data);

                          var sol = {
                            "Id": response.data[0].Id,
                            "Fecha": response.data[0].Fecha,
                            "Estado": response.data[0].Estado,
                            "Formalizacion": response.data[0].Formalizacion,
                            "Carrera": resp[0].NOMBRE
                          };
                          var data = {
                            "Solicitud": sol,
                            "Asignaturas": aaa
                          };

                          ctrl.solicitud.push(data);
                        });
                      });
                    });

                  }
                  console.log("No coincide con ninguna modalidad");
                }


              });
            }
          });

        });
      },
      controllerAs:'d_consultarSolicitudes'
    };
  });
