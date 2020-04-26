sap.ui.define([
	"sap/ui/core/mvc/Controller",
	"sap/ui/core/routing/History",
	"sap/ui/core/UIComponent",
	"sap/m/Dialog",
	"sap/m/Button",
	"sap/m/Text",
], function (Controller,
	History,
	UIComponent,
	Dialog,
	Button,
	Text
) {
	"use strict";

	return Controller.extend("vm.com.five.star.federation.controller.OurBase", {

		// toggling this decides console prints
		isWriteMe: false,
		isDevMode: true,

		getRouter: function () {
			return UIComponent.getRouterFor(this);
		},

		getKMServerURL: function () {
			if (this.isDevMode) {
				return "/content/ivanservices/createimage";
			} else {
				return "/content/services/reseller/createimage";
			}
		},

		onNavBack: function () {
			var oHistory, sPreviousHash;

			oHistory = History.getInstance();
			sPreviousHash = oHistory.getPreviousHash();

			if (sPreviousHash !== undefined) {
				window.history.go(-1);
			} else {
				this.getRouter().navTo("appHome", {}, true /*no history*/ );
			}
		},

		getModel: function (iModel) {
			return this.getOwnerComponent().getModel(iModel) || this.getView().getModel(iModel) || this.getView().getModel();
		},

		onNavBackBayTemplate: function () {
			var oHistory, sPreviousHash;

			oHistory = History.getInstance();
			sPreviousHash = oHistory.getPreviousHash();

			if (sPreviousHash !== undefined) {
				window.history.go(-1);
			} else {
				this.getRouter().navTo("appHome", {}, true /*no history*/ );
			}
		},

		onNavBackWithDialog: function () {
			var that = this;
			var dialog = new Dialog({
				title: 'Confirm',
				type: 'Message',
				content: new Text({
					text: 'Are you sure you want to cancel the request?\n All the changes will be lost'
				}),
				beginButton: new Button({
					text: 'OK',
					press: function () {
						that.getRouter().navTo('displayList');
						dialog.close();
					},
					type: 'Emphasized'
				}).addStyleClass(''),
				endButton: new Button({
					text: 'Cancel',
					press: function () {
						dialog.close();
					},
					type: 'Emphasized'
				}).addStyleClass(''),
				afterClose: function () {
					dialog.close();
				}
			}).addStyleClass('sapUiSizeCompact');
			dialog.open();
		},

		/**
		 * ------------------------------------------------------------------------------------------------------
		 * Utility function to clone data
		 * ------------------------------------------------------------------------------------------------------
		 */
		doClone: function (oObject) {
			try {
				var copy;

				// Handle the 3 simple types, and null or undefined
				if (null === oObject || "object" !== typeof oObject) {
					return oObject;
				}

				// Handle Date
				if (oObject instanceof Date) {
					copy = new Date();
					copy.setTime(oObject.getTime());
					return copy;
				}

				// Handle Array
				if (oObject instanceof Array) {
					copy = [];
					for (var i = 0, len = oObject.length; i < len; i++) {
						copy[i] = this.doClone(oObject[i]);
					}
					return copy;
				}

				// Handle Object
				if (oObject instanceof Object) {
					copy = {};
					for (var attr in oObject) {
						if (oObject.hasOwnProperty(attr)) {
							copy[attr] = this.doClone(oObject[attr]);
						}
					}
					return copy;
				}
			} catch (oError) {
				console.log(oError.message);
			}
		},

		doImageMappings: function (oImgData) {
			var oImgMap = new Map([]);
			if (oImgData && oImgData.length > 0) {
				for (var o = 0; o < oImgData.length; o++) {
					oImgMap.set(oImgData[o].ImageType, oImgData[o]);
				}
			}
			return oImgMap;
		},

		areTheySame: function (vNew, vOld) {
			return !(vNew == vOld);
		},

		logSuccess: function (oWhatever) {
			if (this.isWriteMe) {
				console.log(oWhatever);
			}
		},

		logError: function (oWhatever) {
			if (this.isWriteMe) {
				console.error(oWhatever);
			}
		},

		logInfo: function (oWhatever) {
			if (this.isWriteMe) {
				console.info(oWhatever);
			}
		},

		logWarn: function (oWhatever) {
			if (this.isWriteMe) {
				console.warn(oWhatever);
			}
		},

		logTable: function (oWhatever) {
			if (this.isWriteMe) {
				console.table(oWhatever);
			}
		},

		updateProduct: function (sModel, sEntitySet, oPayload, oSuccessCallback, oErrorCallback, sChangeSetId, sGroupId) {
			this.getModel(sModel).setRefreshAfterChange(false);
			this.getModel(sModel).setDeferredBatchGroups([sGroupId]);
			this.getModel(sModel).update(sEntitySet, oPayload, {
				changeSetId: sChangeSetId,
				groupId: sGroupId
			});
			this.getModel(sModel).submitChanges({
				groupId: sGroupId,
				changeSetId: sChangeSetId,
				success: oSuccessCallback(),
				error: oErrorCallback()
			});
		}

	});

});