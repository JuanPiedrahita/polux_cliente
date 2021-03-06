'use strict';

/**
 * @ngdoc function
 * @name poluxClienteApp.decorator:TextTranslate
 * @description
 * # TextTranslate
 * Decorator of the poluxClienteApp
 */
var text_es = {
  TITULO: "GENERATOR-OAS",
  MENSAJE_INICIAL: "Ahora puede comenzar con el desarrollo ...",
  GESTION_SOLICITUD: "Módulo de gestión de solicitudes. "
};
var text_en = {
  TITULO: "GENERATOR-OAS",
  MENSAJE_INICIAL: "Now get to start to develop"
};
angular.module('poluxClienteApp')
  .config(function($translateProvider) {
    $translateProvider
      .translations("es", text_es)
      .translations("en", text_en);
    $translateProvider.preferredLanguage("es");
    $translateProvider.useSanitizeValueStrategy("sanitizeParameters");
  });
