'use strict';

describe('Directive: documento/verDocumento', function () {

  // load the directive's module
  beforeEach(module('poluxApp'));

  var element,
    scope;

  beforeEach(inject(function ($rootScope) {
    scope = $rootScope.$new();
  }));

  it('should make hidden element visible', inject(function ($compile) {
    element = angular.element('<documento/ver-documento></documento/ver-documento>');
    element = $compile(element)(scope);
    expect(element.text()).toBe('this is the documento/verDocumento directive');
  }));
});