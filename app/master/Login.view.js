/*
 * Copyright Frank Bedoya 2013
 * openSAP Mobile 1 MOOC
 */

sap.ui.jsview("app.master.Login", {

	getControllerName: function() {
		return "app.master.Login";
	},
	
	onBeforeShow : function(evt) {
		this.getController().onBeforeShow(evt);
	},
	
	createContent : function(controller) {

		// create page
		this.page = new sap.m.Page({
			title : oBundle.getText("TITLE__AUTH"),
			showNavButton : false,
			/*
			 * A simple clean way to add the login button is just to embed it 
			 * in the footer of the page
			 */
			footer: new sap.m.Bar({
				contentMiddle : [
					new sap.m.Button({
						text : oBundle.getText("LOGIN_BUTTON"),
						icon : "sap-icon://sys-enter",
						tap : [ controller.loginTap, controller ]
					}) 
				]
			}), 
			/*
			 * Here we are just create a list and using Input List Items
			 * to host the input text boxes for the user name and password
			 * Please note we are binding to the root of the central
			 * data model.
			 * i.e.
			 * {model}.UserName
			 * {model}.Password
			 */
			content: [
		  		new sap.m.List({
					items : [
						new sap.m.InputListItem({
							label : oBundle.getText("USER_NAME"),
							content : new sap.m.Input( { value : "{/UserName}" } )
						}),
						new sap.m.InputListItem({
							label : oBundle.getText("PASSWORD"),
							content : new sap.m.Input( { value : "{/Password}", type : sap.m.InputType.Password } )
						})
					],
				})
			] 
		});
		
		return this.page;
	}
});