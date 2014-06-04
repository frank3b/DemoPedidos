sap.ui.controller("app.master.Menu", {

	/**
	 * Called when a controller is instantiated and its View controls (if
	 * available) are already created. Can be used to modify the View before it
	 * is displayed, to bind event handlers and do other one-time
	 * initialization.
	 * 
	 * @memberOf app.master.Menu
	 */
	 onInit: function() {
			var oView = this.getView();
			var oFilter = new sap.ui.model.Filter("Status", sap.ui.model.FilterOperator.Contains, "Inicial");
			
			// update list binding
			var list = oView.oList;
			var binding = list.getBinding("items");
			binding.filter([oFilter]);
	 },
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
	
	//FIXME - update with the real status
	handleTabSelect : function(oEvent) {
		
		var sKey = oEvent.getParameter("selectedKey");
		var oFilter = null;
		
		if (sKey === "Status1") {
			oFilter = new sap.ui.model.Filter("Status", sap.ui.model.FilterOperator.Contains, "Inicial");
		} else if (sKey === "Status2") {
			oFilter = new sap.ui.model.Filter("Status", sap.ui.model.FilterOperator.Contains, "Pendiente");
		} else if (sKey === "Status3") {
			oFilter = new sap.ui.model.Filter("Status", sap.ui.model.FilterOperator.Contains, "Terminado");
		}
		
		if(oFilter){
			// update list binding
			var oView = this.getView();
			var list = oView.oList;
			var binding = list.getBinding("items");
			binding.filter([oFilter]);
		}
		
	},
	//Open Menu
	onMenuTap : function(oEvent) {
		var oButton = oEvent.getSource();
		var oView = this.getView();
		oView._actionSheet.openBy(oButton);
	},
	
	onListSelect : function(oEvent) {
		alert('list select...');
	},

	onBills : function(oEvent) {
		alert('onBills...');
	},

	onExit : function(oEvent) {
		var oBindingContext = oEvent.oSource.getBindingContext();

		sap.ui.getCore().getEventBus().publish("nav", "to", {
			viewId : "app.master.Login",
			data : {
				bindingContext : oBindingContext
			}
		});
	},
	
	onNewSaleNote : function(oEvent) {
		var oBindingContext = oEvent.oSource.getBindingContext();

		sap.ui.getCore().getEventBus().publish("nav", "to", {
			viewId : "app.master.NewSaleNote",
			data : {
				bindingContext : oBindingContext
			}
		});
	},
	
	onNewSalesOrders : function(oEvent) {
		alert('onNewSalesOrders');
	},
	
	onConfig : function(oEvent) {
		alert('onConfig');
	},
	
	handleFilterChange : function(oEvent) {
		var filters = [];
		var oView = this.getView();
		
		// add filter for filter
		var select = oView.filterSelect;
		var key = select.getSelectedKey();
		var filterMap = {
			"5k" : new sap.ui.model.Filter("TotalValue", sap.ui.model.FilterOperator.GE, 100),
			"10k" : new sap.ui.model.Filter("TotalValue", sap.ui.model.FilterOperator.GE, 1000)
		};
		if (filterMap[key]) {
			filters.push(filterMap[key]);
		}
		
		// update list binding
		var list = oView.oList;
		var binding = list.getBinding("items");
		binding.filter(filters);	
    },
	
	onLiveChange : function(oEvent) {
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