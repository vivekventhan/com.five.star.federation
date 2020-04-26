sap.ui.define([
	"sap/ui/model/json/JSONModel",
	"sap/ui/Device"
], function (JSONModel, Device) {
	"use strict";

	return {

		createFederationModel: function () {
			var oModel = new JSONModel(this.getData());
			oModel.setDefaultBindingMode("OneWay");
			return oModel;
		},

		getData: function () {
			return {
				Menu: [{
					id: "Home",
					text: "Home"
				}, {
					id: "Administration",
					text: "Administration"
				}, {
					id: "Achievements",
					text: "Achievements"
				}, {
					id: "MinutesOfMeetings",
					text: "Minutes Of Meetings"
				}, {
					id: "Gallery",
					text: "Gallery"
				}, {
					id: "Projects",
					text: "Projects"
				}, {
					id: "ContactUs",
					text: "Contact Us"
				}, {
					id: "Suggestions",
					text: "Suggestions"
				}],
				Home: {
					Aim: "<p class=\"FF_FormatTextSize\">Our federation aims to assist people in protecting the legitimate <strong>social, economic, educational</strong> and <strong>cultural</strong> values.</p>",
					Objective: "<ul>" +
						"<li class=\"FF_FormatTextListItem FF_FormatTextListItemText\">Build a <strong>healthy environment</strong> with basic needs and amenities.</li>" +
						"<li class=\"FF_FormatTextListItem FF_FormatTextListItemText\">Provide a good <strong>educational support</strong> to achieve individual supreme goal.</li>" +
						"<li class=\"FF_FormatTextListItem FF_FormatTextListItemText\">Support people in need during unexpected <strong>crisis time</strong>.</li>" +
						"<li class=\"FF_FormatTextListItem FF_FormatTextListItemText\">Create awarness on <strong>competitive exams</strong>.</li>" +
						"<li class=\"FF_FormatTextListItem FF_FormatTextListItemText\">Arrange required training in all sectors and place good qualified individuals.</li>" +
						"<li class=\"FF_FormatTextListItem FF_FormatTextListItemText\">Guidance on the available <strong>employment opportunities</strong> in all sectors.</li>" +
						"</ul>",
					Membership: "<p class=\"FF_FormatTextSize\">We provide <strong>two</strong> options to get registered as a member of our federation. Once registered you will be getting a <strong>Unique Membership ID.</strong></p>" +
						"<ul>" +
						"<li class=\"FF_FormatTextListItem\"><strong>Life Time Membership</strong><ul><li class=\"FF_FormatTextListItem FF_FormatTextListItemText\">One Time Member Subscription Amount : <strong>Rs.5000</strong></li><li class=\"FF_FormatTextListItem FF_FormatTextListItemText\">Validity of this membership exists for <strong>a decade (10 years only)</strong> from day of joining</li></ul></li>" +
						"<li class=\"FF_FormatTextListItem\"><strong>Annual Membership</strong><ul><li class=\"FF_FormatTextListItem FF_FormatTextListItemText\">Yearly Member Subscription Amount : <strong>Rs.500</strong></li><li class=\"FF_FormatTextListItem FF_FormatTextListItemText\">Validity of this membership exists for <strong>a year (365 days only)</strong> from day of joining</li></ul></li>" +
						"</ul>"
				},
				Administration: {},
				Membership: {},
				Achievements: {},
				MinutesOfMeeting: {},
				Gallery: {},
				Projects: {},
				ContactUs: {
					Name: "",
					EmailId: "",
					MobileNo: "",
					EnquiryMessage: "",
					federationEmailId: "fivestarfederation@gmail.com",
					federationCCEmailId: "fivestarfederation@outlook.com"
				},
				Suggestions: {}
			};
		}

	};
});