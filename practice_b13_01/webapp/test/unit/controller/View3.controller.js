/*global QUnit*/

sap.ui.define([
	"practice_b13_01/controller/View3.controller"
], function (Controller) {
	"use strict";

	QUnit.module("View3 Controller");

	QUnit.test("I should test the View3 controller", function (assert) {
		var oAppController = new Controller();
		oAppController.onInit();
		assert.ok(oAppController);
	});

});
