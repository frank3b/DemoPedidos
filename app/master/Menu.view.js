sap.ui.jsview("app.master.Menu", {

	/**
	 * Specifies the Controller belonging to this View. In the case that it is
	 * not implemented, or that "null" is returned, this View does not have a
	 * Controller.
	 * 
	 * @memberOf app.master.Menu
	 */
	getControllerName : function() {
		return "app.master.Menu";
	},

	/**
	 * Is initially called once after the Controller has been instantiated. It
	 * is the place where the UI is constructed. Since the Controller is given
	 * to this method, its event handlers can be attached right away.
	 * 
	 * @memberOf app.master.Menu
	 */
	createContent : function(oController) {

		oModel = new sap.ui.model.json.JSONModel("model/mockSalesNotes.json");
		

		var iconTabBar = new sap.m.IconTabBar({
			expanded : jQuery.device.is.desktop,
			select : function(oEvent) {
				oController.handleTabSelect(oEvent);
			},
			items : [ new sap.m.IconTabFilter({
				key : "Status1",
				icon : "sap-icon://flag",
				iconColor: sap.ui.core.IconColor.Positive
			}), new sap.m.IconTabFilter({
				key : "Status2",
				icon : "sap-icon://flag",
				iconColor: sap.ui.core.IconColor.Default 
			}), new sap.m.IconTabFilter({
				key : "Status3",
				icon : "sap-icon://flag",
				iconColor: sap.ui.core.IconColor.Negative
			}) ]
		});
		

		this.oList = new sap.m.List({
			id : "list",
			showUnread : true,
			mode : jQuery.device.is.phone ? sap.m.ListMode.None
					: sap.m.ListMode.SingleSelectMaster,
			select : [ oController.onListSelect, oController ]
		});
		this.oList.setModel(oModel);

		this.items = new sap.m.ObjectListItem({
			title : "{Code}",
			number : "{TotalValue}",
			numberUnit : "{CurrencyCode}",
			press : [ oController.salesNoteTap, oController ],
			attributes : [ new sap.m.ObjectAttribute({
				text : "{ValidFrom}"
			}), new sap.m.ObjectAttribute({
				text : "{Petitioner/FirstName}"
			}) ],
			firstStatus : new sap.m.ObjectStatus({
				text : "Initial"
			})
		});
		this.oList.bindItems("/", this.items);

		// create search field
		this.searchField = new sap.m.SearchField("searchField", {
			placeholder : oBundle.getText("SEARCH_PLACEHOLDER"),
			layoutData : new sap.m.FlexItemData({
				growFactor : 1
			}),
			liveChange : [ oController.onLiveChange, oController ],
			maxLength : 127,
		});

		// Create new button
		var newButton = new sap.m.Button({
			icon : "sap-icon://add",
			tap : oController.newSaleNoteTap			
		});

		var exitButton = new sap.m.Button({
			icon : "sap-icon://log",
			text : oBundle.getText("CLOSE"),
			tap : [ oController.exitTap, oController ]
		});

		return new sap.m.Page({
			title : oBundle.getText("TITLE__MENU"),
			content : [ iconTabBar, new sap.m.Bar({
				enableFlexBox : true,
				contentMiddle : [ this.searchField ]

			}), this.oList ],
			headerContent : [ newButton ],
			footer : new sap.m.Bar({
				contentMiddle : [ exitButton ]
			}),

		});
	}

});