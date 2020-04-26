sap.ui.define([
	"sap/ui/core/UIComponent",
	"sap/ui/Device",
	"vm/com/five/star/federation/model/models",
	"sap/ui/core/routing/HashChanger",
	"sap/m/MessageBox"
], function (UIComponent, Device, models, HashChanger, MessageBox) {
	"use strict";

	return UIComponent.extend("vm.com.five.star.federation.Component", {

		metadata: {
			//manifest: "json"
			"name": "Fivestar Federation",
			"version": "1.0",
			"library": "vm.com.five.star.federation",
			//rootView: "vm.com.five.star.federation.view.AppView",
			"includes": ["css/style.css", "js/util.js"],
			"dependencies": {
				"libs": ["sap.m", "sap.ui.layout", "sap.f", "sap.tnt"],
				"components": []
			},
			"rootView": {
				"viewName": "vm.com.five.star.federation.view.AppView",
				"type": "XML",
				"async": true
			},
			"config": {
				"serviceConfig": {
					"name": "",

					"odataServiceURL1": "",
					"odataServiceURL2": "",
					"odataServiceURL3": ""
				}
			},
			"models": {
				"i18n": {
					"type": "sap.ui.model.resource.ResourceModel",
					"bundleName": "vm.com.five.star.federation.i18n.i18n"
				},
				"CreateRef": {
					"type": "sap.ui.model.json.JSONModel"
				},
				"ReadRef": {
					"type": "sap.ui.model.json.JSONModel"
				},
				"UpdateRef": {
					"type": "sap.ui.model.json.JSONModel"
				},
				"DeleteRef": {
					"type": "sap.ui.model.json.JSONModel"
				}
			},
			"routing": {
				"config": {
					"routerClass": "sap.m.routing.Router",
					"viewType": "XML",
					"viewPath": "vm.com.five.star.federation.view",
					"controlId": "app",
					"controlAggregation": "pages",
					"clearTarget": false,
					"transition": "slide",
					"async": true
				},
				"routes": [{
					"pattern": "",
					"name": "home",
					"target": "home"
				}, {
					"pattern": "about/{BinaryKey}",
					"name": "about",
					"target": "about"
				}],
				"targets": {
					"home": {
						"viewLevel": 0,
						"viewName": "HomeView"
					},
					"about": {
						"viewLevel": 1,
						"viewName": "AboutView"
					}
				}
			}
		},

		/**
		 * The component is initialized by UI5 automatically during the startup of the app and calls the init method once.
		 * @public
		 * @override
		 */
		init: function () {
			//HashChanger.getInstance().replaceHash("");

			// call the base component's init function
			UIComponent.prototype.init.apply(this, arguments);

			// enable routing
			this.getRouter().initialize();

			// set the device model
			//this.setModel(models.createDeviceModel(), "device");
			var deviceModel = new sap.ui.model.json.JSONModel({
				isTouch: sap.ui.Device.support.touch,
				isNoTouch: sap.ui.Device.support.touch,
				isPhone: Device.system.phone, //$.device.is.phone,
				isNoPhone: Device.system.phone, //$.device.is.phone,
				isDesktop: Device.system.desktop, //$.device.is.desktop,
				listMode: (Device.system.phone) ? "None" : "SingleSelectMaster",
				listItemType: (Device.system.phone) ? "Active" : "Inactive"
			});
			deviceModel.setDefaultBindingMode("OneWay");
			this.setModel(deviceModel, "device");
		},

		destroy: function () {
			if (this.router.routeHandler) {
				this.router.destroy();
				UIComponent.destroy.apply(this, arguments);
			}
		},

		/**
		 * Create oData Model.
		 */
		initODataModel: function (sServiceUrl, oConfig, sModelName) {
			$.sap.require("vm.com.five.star.federation.js.messages");
			var oModel = new sap.ui.model.odata.v2.ODataModel(sServiceUrl, oConfig);
			oModel.setSizeLimit(2000);
			(!sModelName ? this.setModel(oModel) : this.setModel(oModel, sModelName));
		}
	});
});