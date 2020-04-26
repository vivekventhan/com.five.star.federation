jQuery.sap.declare("vm.com.five.star.federation.js.messages");
jQuery.sap.require("sap.ca.ui.message.message");

com.five.star.federation.js.messages = {};

/**
 * Show an error dialog with information from the oData response object.
 *
 * @param {object}
 *            oParameter The object containing error information
 * @return {void}
 * @public
 */
com.five.star.federation.js.messages.showErrorMessage = function(oParameter) {
	var oErrorDetails = com.five.star.federation.js.messages._parseError(oParameter);
	var oMsgBox = sap.ca.ui.message.showMessageBox({
		type: sap.ca.ui.message.Type.ERROR,
		message: oErrorDetails.sMessage,
		
	});
	if (!sap.ui.Device.support.touch) {
		oMsgBox.addStyleClass("sapUiSizeCompact");
	}
};



com.five.star.federation.js.messages.getErrorContent = function(oParameter) {
	return com.apple.ui5.ivan.util.messages._parseError(oParameter).sMessage;
};

com.five.star.federation.js.messages._parseError = function(oParameter) {
	var sMessage = "",
		sDetails = "",
		oEvent = null,
		oResponse = null,
		oError = {};

//	if (oParameter.mParameters) {
//		oEvent = oParameter;
//		sMessage = oEvent.getParameter("message");
//		sDetails = oEvent.getParameter("responseText");
//	} else {
//		oResponse = oParameter;
//		sMessage = oResponse.message;
//		sDetails = oResponse.responseText;
//		//sDetails = oResponse.response.body;
//	}
	
	if (oParameter.mParameters) {
		/*oEvent = oParameter;
		sMessage = oEvent.getParameter("message");
		sDetails = oEvent.getParameter("responseText");*/
		//Start
		oResponse =oParameter.getParameter("response");
		if(oResponse)
		sMessage = oResponse.message;
		if(oResponse.response)
		sDetails = oResponse.response.body;
		else if(oResponse.responseText)
		sDetails =oResponse.responseText;

		//end
		} else {
		oResponse = oParameter;
		if(oResponse)
		sMessage = oResponse.message;
		if(oResponse.response)
		sDetails = oResponse.response.body;
		else if(oResponse.responseText)
		sDetails =oResponse.responseText;

		}

	if (jQuery.sap.startsWith(sDetails, "{\"error\":")) {
		var oErrModel = new sap.ui.model.json.JSONModel();
		oErrModel.setJSON(sDetails);
		sMessage = oErrModel.getProperty("/error/message/value");
	}

	//oError.sDetails = sDetails;
	oError.sMessage = sMessage;
	return oError;
};