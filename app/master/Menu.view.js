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

		//Menu
		this._actionSheet = new sap.m.ActionSheet({
			title: "{i18n>MENU_TITLE}",
			showCancelButton: true,
			placement: "Right",
			buttons : [ new sap.m.Button({
				text: "{i18n>MENU_NEW_SALE_NOTE}", 
				icon: "sap-icon://create", 
				press: [ oController.onNewSaleNote, oController ],
			}),
			//new sap.m.Button({
			//	text: "{i18n>MENU_SALES_NOTES}", 
			//	icon: "sap-icon://order-status", 
			//	press: [ oController.onSalesNote, oController ],
			//}),
			new sap.m.Button({
				text: "{i18n>MENU_SALES_ORDERS}", 
				icon: "sap-icon://my-sales-order", 
				press: [ oController.onNewSalesOrders, oController ],
			}),
			new sap.m.Button({
				text: "{i18n>MENU_BILLS}", 
				icon: "sap-icon://sales-order-item", 
				press: [ oController.onBills, oController ],
			}),
			new sap.m.Button({
				text: "{i18n>MENU_CONFIG}", 
				icon: "sap-icon://action-settings", 
				press: [ oController.onConfig, oController ],
			}),
			new sap.m.Button({
				text: "{i18n>MENU_CLOSE}", 
				icon: "sap-icon://log", 
				press: [ oController.onExit, oController ],
			})
			]
		});

		//Status Icons
		var iconTabBar = new sap.m.IconTabBar({
			expanded : false,
			select : function(oEvent) {
				oController.handleTabSelect(oEvent);
			},
			items : [ new sap.m.IconTabFilter({
				key : "Status1",
				icon: "sap-icon://flag",
				iconColor: "Positive"
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
			id : "list"
			//showUnread : true,
			//mode : jQuery.device.is.phone ? sap.m.ListMode.None
			//		: sap.m.ListMode.SingleSelectMaster,
			//select : [ oController.onListSelect, oController ]
		});
		this.oList.setModel(oModel);

		this.items = new sap.m.ObjectListItem({
			title : "{Code}",
			number : "{TotalValue}",
			type: "Active",
			numberUnit : "{CurrencyCode}",
			press : [ oController.onListSelect, oController ],
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
			placeholder : "{i18n>SEARCH_PLACEHOLDER}",
			layoutData : new sap.m.FlexItemData({
				growFactor : 1
			}),
			liveChange : [ oController.onLiveChange, oController ],
			maxLength : 127,
		});

		// Create new button
		var menuButton = new sap.m.Button({
			icon : "sap-icon://menu2",
			tap : oController.onMenuTap			
		});
		
		this.filterSelect = new sap.m.Select({
			id: "filterSelect",
			change: [ oController.handleFilterChange, oController ],
			icon: "sap-icon://filter",
			type: "IconOnly",
			autoAdjustWidth: true,
			items : [ new sap.ui.core.Item({
				key:  "All",
				text: "{i18n>masterFilterAll}"
			}), new sap.ui.core.Item({
				key: "5k",
				text: "{i18n>masterFilter5k}"
			}), new sap.ui.core.Item({
				key: "10k",
				text: "{i18n>masterFilter10k}"
			}) ]
		});

		return new sap.m.Page({
			title : "{i18n>TITLE__MENU}",
			content : [ iconTabBar, new sap.m.Bar({
				enableFlexBox : true,
				contentMiddle : [ this.searchField ]

			}), this.oList ],
			headerContent : [ menuButton ],
			footer : new sap.m.Bar({
				contentRight : [ this.filterSelect ]
			}),

		});
	}

});