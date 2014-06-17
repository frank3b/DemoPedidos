sap.ui.jsview("app.details.Stock", {

	/**
	 * Specifies the Controller belonging to this View. In the case that it is
	 * not implemented, or that "null" is returned, this View does not have a
	 * Controller.
	 * 
	 * @memberOf app.master.Stock
	 */
	getControllerName : function() {
		return "app.details.Stock";
	},

	/**
	 * Handler to onBeforeShow event that fires by the NavContainer.<BR>
	 * 
	 * @param oEvent
	 */
	onBeforeShow : function(oEvent) {
		this.getController().onBeforeShow(oEvent);
	},

	/**
	 * Is initially called once after the Controller has been instantiated. It
	 * is the place where the UI is constructed. Since the Controller is given
	 * to this method, its event handlers can be attached right away.
	 * 
	 * @memberOf app.details.Stock
	 */
	createContent : function(oController) {
		
		var oAcceptButton = new sap.m.Button({
			text: "{i18n>BUTTON_ACCEPT}",
			type: sap.m.ButtonType.Accept,
			press: [ oController.onFilterSearchTap, oController ]
		});
		
		var oCancelButton = new sap.m.Button({
			text: "{i18n>BUTTON_CANCEL}",
			type: sap.m.ButtonType.Reject,
			press: function(){
				oFilterResponsivePopover.close();
			}
		});
		
		var oFilterResponsivePopover = new sap.m.ResponsivePopover({
			placement: sap.m.PlacementType.Bottom,
			title: "{i18n>STOCK_SEARCH_FILTERS_TITLE}",
			showHeader: true,
			beginButton: oAcceptButton,
			endButton: oCancelButton,
			horizontalScrolling: false,
			beforeOpen: function(oEvent){
				jQuery.sap.log.info("before popover opens!!!");
			},
			afterOpen: function(oEvent){
				jQuery.sap.log.info("popover is opened finally!!!");
			},
			beforeClose: function(oEvent){
				jQuery.sap.log.info("before popover closes!!!");
			},
			afterClose: function(oEvent){
				jQuery.sap.log.info("popover is closed properly!!!");
			},
			content: [
				new sap.m.List({
					items : [
						new sap.m.InputListItem({
							label : "{i18n>STOCK_SHOP_TITLE}",
							content : new sap.m.Input( { value : "{/Tienda}" } )
						}),
						new sap.m.InputListItem({
							label : "{i18n>STOCK_MATERIAL_TITLE}",
							content : new sap.m.Input( { value : "{/Material}" } )
						}),
						new sap.m.InputListItem({
							label : "{i18n>STOCK_CODE_TITLE}",
							content : new sap.m.Input( { value : "{/Codigo}" } )
						})
					],
				})
			]
		});
		
		// Stock list
		this.oList = new sap.m.List({
			id : "stockList",
			growing : true,
			growingScrollToLoad : false,
			growingThreshold : 10,
		});
		this.oList.setModel(oStockModel);

		this.items = new sap.m.ObjectListItem({
			title : "{Description}",
			intro : "{Code}",
			number : {path : "Stock", formatter : util.formatter.Number},
			type : "Active",
			numberUnit : "Cant.",
			//press : [ oController.onListSelect, oController ],
			attributes : [ 
			new sap.m.ObjectAttribute({
				text : "En Transito {Transit}"
			}), 
			new sap.m.ObjectAttribute({
				text : "Pendiente {Pending}"
			}) ],
			firstStatus : new sap.m.ObjectStatus({
				text : { path: 'Stock',
					formatter: util.formatter.ProductsStateText },
				state: { path: 'Stock',
					formatter: util.formatter.ProductsState }
			})
		});
		//var sorter = new sap.ui.model.Sorter("_kmd/ect", true);
		this.oList.bindItems("/", this.items);

		// create search field
		this.searchFieldStock = new sap.m.SearchField("searchFieldStock", {
			placeholder : "{i18n>SEARCH_PLACEHOLDER}",
			layoutData : new sap.m.FlexItemData({
				growFactor : 1
			}),
			liveChange : [ oController.onLiveChange, oController],
			maxLength : 127,
		});
		var searchBar = new sap.m.Bar({
			enableFlexBox : true,
			contentMiddle : [ this.searchFieldStock ]
		});

		return new sap.m.Page({
			title : "{i18n>TITLE__STOCK}",
			showNavButton : jQuery.device.is.phone,
	    	navButtonTap : [ oController.onNavButtonTap, oController ],
			content : [ searchBar,  this.oList],
			headerContent : [ new sap.m.Button({
				icon : "sap-icon://filter",
				press : function() {
					oFilterResponsivePopover.openBy(this);
				}
			}) ]
		});
	}

});