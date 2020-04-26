/* global QUnit */
QUnit.config.autostart = false;

sap.ui.getCore().attachInit(function () {
	"use strict";

	sap.ui.require([
		"vm/com/five/star/federation/test/integration/AllJourneys"
	], function () {
		QUnit.start();
	});
});