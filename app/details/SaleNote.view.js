sap.ui.jsview("app.details.SaleNote", {

	/**
	 * Specifies the Controller belonging to this View. In the case that it is
	 * not implemented, or that "null" is returned, this View does not have a
	 * Controller.
	 * 
	 * @memberOf app.detail.SaleNote
	 */
	getControllerName : function() {
		return "app.details.SaleNote";
	},
	
	/**
	 * Handler to onBeforeShow event that fires by the NavContainer.<BR>
	 * 
	 * @param oEvent
	 */
	onBeforeShow : function(oEvent) {
		//this.getController().onBeforeShow(oEvent);
	},

	/**
	 * Is initially called once after the Controller has been instantiated. It
	 * is the place where the UI is constructed. Since the Controller is given
	 * to this method, its event handlers can be attached right away.
	 * 
	 * @memberOf app.detail.SaleNote
	 */
	createContent : function(oController) {

		var petitioner = new sap.m.Input({
			id:"productInput",
			type:"Text",
			placeholder:"Enter Product ..."
		});
		
		/*
		<Input
		id="productInput"
		type="Text"
		placeholder="Enter Product ..."
		showSuggestion="true"
		showValueHelp="true"
		valueHelpRequest="handleValueHelp"
		suggestionItems="{/ProductCollection}" >
		<suggestionItems>
			<core:Item text="{Name}" />
		</suggestionItems>
	</Input>
		*/
		return new sap.m.Page({
			title : oBundle.getText("TITLE__SALE_NOTE"),
			content : [ petitioner ]
		});
	}

});