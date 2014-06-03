sap.ui.jsview("com.products.ThemeSetting", {

	onBeforeShow : function(oEvent) {
		return;
	},

	getControllerName : function() {
		return "com.products.ThemeSetting";
	},

	createContent : function(oController) {

		// Check which theme was selected
		//var bBlueCrystalSelected = !oStorage.get(sKeyTheme)
		//		|| oStorage.get(sKeyTheme) == "sap_bluecrystal";
		
		
		var bBlueCrystalSelected = false;
		var bMviSelected = false;
		var bCustomSelected = false;
		switch (oStorage.get(sKeyTheme)) {
			case "sap_mvi":
				bMviSelected = true;
				break;
			case "sap_bluecrystal":
				bBlueCrystalSelected = true;
				break;
			case "custom_bluecrystal":
				bCustomSelected = true;
				break;
			default:	
				bCustomSelected = true;
				break;
		}
		
		
		this.page = new sap.m.Page({
			showNavButton : jQuery.device.is.phone,
			navButtonTap : [ oController.onNavButtonTap, oController ],
			content : [ new sap.m.List({
				mode : sap.m.ListMode.SingleSelect,
				select : [ oController.onListItemTap ],
				items : [ new sap.m.StandardListItem({
					title : "sap_mvi",
					selected : bMviSelected,
				}).data(sKeyTheme, "sap_mvi"), new sap.m.StandardListItem({
					title : "sap_bluecrystal",
					selected : bBlueCrystalSelected,
				}).data(sKeyTheme, "sap_bluecrystal"), new sap.m.StandardListItem({
					title : "custom_bluecrystal",
					selected : bCustomSelected,
				}).data(sKeyTheme, "custom_bluecrystal") ],
			}), ],
		});
		
		return this.page;
	}

});
