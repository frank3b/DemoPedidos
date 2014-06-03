sap.ui.controller("app.master.NewSaleNote", {

/**
* Called when a controller is instantiated and its View controls (if available) are already created.
* Can be used to modify the View before it is displayed, to bind event handlers and do other one-time initialization.
* @memberOf app.master.NewSaleNote
*/
	onInit: function() {
		var oModel = new sap.ui.model.json.JSONModel("model/mockSaleNote.json");
		this.getView().setModel(oModel);
		
		
		//var oModelPetitioner = new sap.ui.model.json.JSONModel("model/mockPetitioners.json");
		//sap.ui.getCore().setModel(oModelPetitioner, "PetitionerCollection");
	},

/**
* Similar to onAfterRendering, but this hook is invoked before the controller's View is re-rendered
* (NOT before the first rendering! onInit() is used for that one!).
* @memberOf app.master.NewSaleNote
*/
//	onBeforeRendering: function() {
//
//	},

/**
* Called when the View has been rendered (so its HTML is part of the document). Post-rendering manipulations of the HTML could be done here.
* This hook is the same one that SAPUI5 controls get after being rendered.
* @memberOf app.master.NewSaleNote
*/
//	onAfterRendering: function() {
//
//	},

/**
* Called when the Controller is destroyed. Use this one to free resources and finalize activities.
* @memberOf app.master.NewSaleNote
*/
//	onExit: function() {
//
//	}
	
	onBeforeShow : function(oData) {
		//this.getView().bindElement(oData.data.bindingContext.getPath());
	},
	
	onNavButtonTap : function() {
		sap.ui.getCore().getEventBus().publish("nav", "back");
	},
	
	onItemsTap : function() {
		// open value help dialog
		oView = sap.ui.getCore().byId("app.master.NewSaleNote");
		oView.productsHelpDialog.open();
	},
	
	handlePetitionerValueHelp : function(evt) {
		// open value help dialog
		oView = sap.ui.getCore().byId("app.master.NewSaleNote");
		oView.petitionerHelpDialog.open();
	},
	
	handlePetitionerValueHelpSearch : function (evt) {
		var sValue = evt.getParameter("value");
		var oFilter = new sap.ui.model.Filter(
			"FirstName",
			sap.ui.model.FilterOperator.Contains, sValue
		);
		evt.getSource().getBinding("items").filter([oFilter]);
	},

	handlePetitionerValueHelpClose : function (evt) {
		var oSelectedItem = evt.getParameter("selectedItem");
		if (oSelectedItem) {
			oView = sap.ui.getCore().byId("app.master.NewSaleNote");
			oView.petitioner.setValue(oSelectedItem.getTitle());
		}
		evt.getSource().getBinding("items").filter([]);
	},
	
	handleProductsValueHelpSearch : function (evt) {
		var sValue = evt.getParameter("value");
		var oFilter = new sap.ui.model.Filter(
			"ProductName",
			sap.ui.model.FilterOperator.Contains, sValue
		);
		evt.getSource().getBinding("items").filter([oFilter]);
	},

	handleProductsValueHelpClose : function (evt) {
		var oSelectedItem = evt.getParameter("selectedItem");
		if (oSelectedItem) {
			oView = sap.ui.getCore().byId("app.master.NewSaleNote");
			//FIXME - Add row
			alert(oSelectedItem.getTitle());
			oView.petitioner.setValue(oSelectedItem.getTitle());
		}
		evt.getSource().getBinding("items").filter([]);
	},
	
	handleDeleteProduct : function (evt) {
		evt.getSource().removeItem(evt.getParameter("listItem"));
	},
	
	onDeleteItemsTap : function (evt) {
		alert("delete item");
	}
	
	//refresh responsive
	/*handlePushNewProduct: function () {
		var oView = this.getView();
		var oData = oView.getModel().getData();
		oData.ProductCollection.push(aColl[this._productCount++]);
		oView.getModel().setData(oData);
	},*/

});