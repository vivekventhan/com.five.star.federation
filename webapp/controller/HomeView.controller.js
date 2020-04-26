sap.ui.define([
	"vm/com/five/star/federation/controller/OurBase",
	"vm/com/five/star/federation/model/fivestarfederation"
], function (OurBase, fivestarfederation) {
	"use strict";

	return OurBase.extend("vm.com.five.star.federation.controller.HomeView", {

		/**
		 * Called when a controller is instantiated and its View controls (if available) are already created.
		 * Can be used to modify the View before it is displayed, to bind event handlers and do other one-time initialization.
		 * @memberOf vm.com.five.star.federation.view.HomeView
		 */
		onInit: function () {
			if (!String.prototype.trim) {
				String.prototype.trim = function () {
					return this.replace(/^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g, '');
				};
			}

			this.i18n = this.getModel("i18n").getResourceBundle();
			this.ReadRef = this.getModel('ReadRef');
			this.ReadRef.setSizeLimit(5000);
			this.ReadRef.setData(fivestarfederation.getData());
			console.log(this.ReadRef);

			this.getOwnerComponent().getRouter().getRoute("home").attachPatternMatched(this.onRouteInitialize, this);
		},

		onRouteInitialize: function () {
			this.ReadRef.getData().SelectedMenu = "Home";
			this.ReadRef.refresh();
		},

		handleMenuSelection: function (oEvent) {
			var selected = oEvent.getParameter("listItems")[0].getProperty("title");

			if (selected == "Home") {

			} else if (selected == "Administration") {

			} else {}

			this.ReadRef.getData().SelectedMenu = selected;
			this.ReadRef.refresh();
		},

		handleSend: function (oEvent) {
			if (this.ReadRef.getData().ContactUs.Name != "" && this.ReadRef.getData().ContactUs.Name != null && this.ReadRef.getData().ContactUs
				.Name != undefined && this.ReadRef.getData().ContactUs.EmailId != "" && this.ReadRef.getData().ContactUs.EmailId != null && this.ReadRef
				.getData().ContactUs.EmailId != undefined && this.ReadRef.getData().ContactUs.MobileNo != "" && this.ReadRef.getData().ContactUs.MobileNo !=
				null && this.ReadRef.getData().ContactUs.MobileNo != undefined && this.ReadRef.getData().ContactUs.EnquiryMessage != "" && this.ReadRef
				.getData()
				.ContactUs.EnquiryMessage != null && this.ReadRef.getData().ContactUs.EnquiryMessage != undefined) {
				sap.m.URLHelper.triggerEmail(this.ReadRef.getData().ContactUs.federationEmailId, this.ReadRef.getData().ContactUs.Name +
					" - Enquiry Request", this.ReadRef
					.getData()
					.ContactUs.EnquiryMessage + '/n' + "Regards," + '/n' + this.ReadRef.getData().ContactUs.Name, this.ReadRef
					.getData().ContactUs.EmailId, this.ReadRef.getData().ContactUs.federationCCEmailId);
			} else {
				sap.m.MessageToast.show("Please enter all fields to send enquiry message.");
			}
		},
		
		handleClear: function (oEvent) {
			this.ReadRef.getData().ContactUs.Name = "";
			this.ReadRef.getData().ContactUs.EmailId = "";
			this.ReadRef.getData().ContactUs.MobileNo = "";
			this.ReadRef.getData().ContactUs.EnquiryMessage = "";
			this.ReadRef.refresh();
		}

		/**
		 * Similar to onAfterRendering, but this hook is invoked before the controller's View is re-rendered
		 * (NOT before the first rendering! onInit() is used for that one!).
		 * @memberOf vm.com.five.star.federation.view.HomeView
		 */
		//	onBeforeRendering: function() {
		//
		//	},

		/**
		 * Called when the View has been rendered (so its HTML is part of the document). Post-rendering manipulations of the HTML could be done here.
		 * This hook is the same one that SAPUI5 controls get after being rendered.
		 * @memberOf vm.com.five.star.federation.view.HomeView
		 */
		//	onAfterRendering: function() {
		//
		//	},

		/**
		 * Called when the Controller is destroyed. Use this one to free resources and finalize activities.
		 * @memberOf vm.com.five.star.federation.view.HomeView
		 */
		//	onExit: function() {
		//
		//	}

	});

});