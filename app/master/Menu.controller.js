sap.ui.controller("app.master.Menu", {

	/**
	 * Called when a controller is instantiated and its View controls (if
	 * available) are already created. Can be used to modify the View before it
	 * is displayed, to bind event handlers and do other one-time
	 * initialization.
	 * 
	 * @memberOf app.master.Menu
	 */
	// onInit: function() {
	//
	// },
	/**
	 * Similar to onAfterRendering, but this hook is invoked before the
	 * controller's View is re-rendered (NOT before the first rendering!
	 * onInit() is used for that one!).
	 * 
	 * @memberOf app.master.Menu
	 */
	// onBeforeRendering: function() {
	//
	// },
	/**
	 * Called when the View has been rendered (so its HTML is part of the
	 * document). Post-rendering manipulations of the HTML could be done here.
	 * This hook is the same one that SAPUI5 controls get after being rendered.
	 * 
	 * @memberOf app.master.Menu
	 */
	// onAfterRendering: function() {
	//
	// },
	/**
	 * Called when the Controller is destroyed. Use this one to free resources
	 * and finalize activities.
	 * 
	 * @memberOf app.master.Menu
	 */
	// onExit: function() {
	//
	// }
	onListSelect : function() {
		alert('list select ');
	},
	
	ordersTap : function() {
		alert('ordersTap');
	},

	salesNoteTap : function() {

		// oBindingContext.saleNote.saleNote.item.amount = "";
		// oBindingContext.saleNote.saleNote.item.code = "";
	},

	exitTap : function(oEvent) {
		var oBindingContext = oEvent.oSource.getBindingContext();

		sap.ui.getCore().getEventBus().publish("nav", "to", {
			viewId : "app.master.Login",
			data : {
				bindingContext : oBindingContext
			}
		});
	},
	
	newSaleNoteTap : function(oEvent) {
		var oBindingContext = oEvent.oSource.getBindingContext();

		sap.ui.getCore().getEventBus().publish("nav", "to", {
			viewId : "app.details.SaleNote",
			data : {
				bindingContext : oBindingContext
			}
		});
	},
	
	onLiveChange : function(oEvent) {
		//jQuery.sap.require("util.Utility");
		//search(this.getView(), oEvent.getParameters().newValue);
		this._updateList();
    },
    
    _updateList : function () {
		
		var filters = [];
		var oView = this.getView();
		
		// add filter for search
		var searchString = oView.searchField.getValue();
		if (searchString && searchString.length > 0) {
			var filter = new sap.ui.model.Filter("Code", sap.ui.model.FilterOperator.Contains, searchString);
			filters.push(filter);
		}	
		
		// update list binding
		var list = oView.oList;
		var binding = list.getBinding("items");
		binding.filter(filters);		
		
	},

});