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
	
	onBeforeShow : function(oEvent) {
		//this.getView().bindElement(oData.data.bindingContext.getPath());
		
	},
	
	onNavButtonTap : function() {
		sap.ui.getCore().getEventBus().publish("nav", "back");
	},
	
	onItemsTap : function(evt) {
		// open value help dialog
		var oView = this.getView();
		
		//oView.byId("productsHelpDialog").open();
		oView.productsHelpDialog.open();
	},
	
	handlePetitionerValueHelp : function(evt) {
		// open value help dialog
		var oView = this.getView();
		
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
			var oView = this.getView();
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
			var oView = this.getView();
			
			var productCode = oSelectedItem.getTitle().split(" ")[0];
			
			var product = getProduct( productCode );
			
			var newProduct = {"Code" : product.Code,
				"ProductName": product.ProductName,
				"Price": product.Price,
				"Weight": product.Weight,
				"Amount": 1,
				"CurrencyCode": product.CurrencyCode
			};
			
			var oData = oView.getModel().getData();
			oData.Products.push(newProduct);
			oView.getModel().setData(oData);
		}
		evt.getSource().getBinding("items").filter([]);
	},
	
	onDeleteItemsTap : function (evt) {
		var oList = this.getView().oTableItems;
		var paths = oList._aSelectedPaths;
		
		var lpath, posPath;
		var oData = this.getView().getModel().getData();
		
		var itemsSelected = oList.getSelectedItems();
		for ( var i = 0; i < itemsSelected.length; i++) {			
			//delete from model
			var sPath = itemsSelected[i].getBindingContext().sPath;
			var lpath = sPath.split("/");
			posPath = lpath[lpath.length - 1];
			oData.Products.splice(posPath, 1);
			this.getView().getModel().setData(oData);
		}
		oList.removeSelections(true);
		
	},
	
	onSaveSaleNote : function (evt) {
		//FIXME - save the sale note in Kinvey
	}
	
});