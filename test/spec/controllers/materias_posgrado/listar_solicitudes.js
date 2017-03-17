'use strict';

describe('Controller: MateriasPosgradoListarSolicitudesCtrl', function () {

  // load the controller's module
  beforeEach(module('poluxClienteApp'));

  var MateriasPosgradoListarSolicitudesCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    MateriasPosgradoListarSolicitudesCtrl = $controller('MateriasPosgradoListarSolicitudesCtrl', {
      $scope: scope
      // place here mocked dependencies
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(MateriasPosgradoListarSolicitudesCtrl.awesomeThings.length).toBe(3);
  });
});
