sap.ui.jsview("app.master.NewSaleNote", {

	/**
	 * Specifies the Controller belonging to this View. In the case that it is
	 * not implemented, or that "null" is returned, this View does not have a
	 * Controller.
	 * 
	 * @memberOf app.master.NewSaleNote
	 */
	getControllerName : function() {
		return "app.master.NewSaleNote";
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
	 * @memberOf app.master.NewSaleNote
	 */
	createContent : function(oController) {
		
		//oModel = new sap.ui.model.json.JSONModel("model/mockSaleNote.json");
		
		//Products Search Help
		this.productsHelpDialog = new sap.m.SelectDialog({
			id : "productsHelpDialog",
			title : "{i18n>PRODUCTS_LIST_TITLE}",
			class : "sapUiPopupWithPadding",
			search : function(oEvent) {
				oController.handleProductsValueHelpSearch(oEvent);
			},
			confirm : function(oEvent) {
				oController.handleProductsValueHelpClose(oEvent);
			},
			cancel : function(oEvent) {
				oController.handleProductsValueHelpClose(oEvent);
			},
		});
		this.productsHelpDialog.setModel( oProductsModel );
		var olistProductsTemplate = new sap.m.StandardListItem({
			title : "{Code} {ProductName}",
			type : sap.m.ListType.Active,
			description : "{Price} {CurrencyCode}"
		});	
		this.productsHelpDialog.bindAggregation("items", "/", olistProductsTemplate);
		

		//Petitioner Search Help
		this.petitioner = new sap.m.Input({
			id : "petitionerInput",
			type : "Text",
			placeholder : "{i18n>PETITIONER_PLACEHOLDER}",
			showValueHelp : true,
			valueHelpRequest : function(oEvent) {
				oController.handlePetitionerValueHelp(oEvent);
			}
		});
		
		this.petitionerHelpDialog = new sap.m.SelectDialog({
			title : "{i18n>PETITIONER_LIST_TITLE}",
			class : "sapUiPopupWithPadding",
			search : function(oEvent) {
				oController.handlePetitionerValueHelpSearch(oEvent);
			},
			confirm : function(oEvent) {
				oController.handlePetitionerValueHelpClose(oEvent);
			},
			cancel : function(oEvent) {
				oController.handlePetitionerValueHelpClose(oEvent);
			}
		});
		this.petitionerHelpDialog.setModel(new sap.ui.model.json.JSONModel("model/mockPetitioners.json"));
		
		var olistPetitionerTemplate = new sap.m.StandardListItem({
			title : "{FirstName} {LastName}",
			type : sap.m.ListType.Active,
			description : "{Code}"
		});	
		this.petitionerHelpDialog.bindAggregation("items", "/", olistPetitionerTemplate);
		
		//var oLayout1 = new sap.ui.layout.form.GridLayout();
		//var oLayout2 = new sap.ui.layout.form.ResponsiveLayout();
		var oLayout3 = new sap.ui.layout.form.ResponsiveGridLayout();

		var oForm1 = new sap.ui.layout.form.Form("F1", {
			//title : new sap.ui.core.Title({
			//	text : "Datos - Nota de Venta",
			//	tooltip : "Ingrese los siguientes datos..."
			//}),
			layout : oLayout3,
			formContainers : [ new sap.ui.layout.form.FormContainer("F1C1", {
				//title : "Person data",
				formElements : [ new sap.ui.layout.form.FormElement({
					label : "{i18n>SALENOTE_TOTAL_VALUE}",
					fields : [ new sap.m.Input({
						value : "0",
						type : "Number",
						editable : false
					})	],
					layoutData : new sap.ui.layout.ResponsiveFlowLayoutData({
						linebreak : true,
						margin : true
					})
				}),
				new sap.ui.layout.form.FormElement({
					label : "{i18n>SALENOTE_TOTAL_WEIGHT}",
					fields : [ new sap.m.Input({
						value : "0",
						type : "Number",
						editable : false
					})	]
				}),
				new sap.ui.layout.form.FormElement({
					label : "{i18n>SALENOTE_PETITIONER}",
					fields : [ this.petitioner ]
				}),
				new sap.ui.layout.form.FormElement({
					label : "{i18n>SALENOTE_VALID_FROM}",
					fields : [ new sap.m.DateTimeInput({
						type : "Date",
						placeholder : "{i18n>DATE_PLACEHOLDER}"
					})	]
				}),
				new sap.ui.layout.form.FormElement({
					label : "{i18n>SALENOTE_VALID_TO}",
					fields : [ new sap.m.DateTimeInput({
						type : "Date",
						placeholder : "{i18n>DATE_PLACEHOLDER}"
					})	]
				})
				]
			})

			]
		});
		
		// Create new button
		var itemsButton = new sap.m.Button({
			icon : "sap-icon://add",
			tap : function(oEvent) {
				oController.onItemsTap(oEvent);			
			}
		});
		// Create new button
		var deleteButton = new sap.m.Button({
			icon : "sap-icon://delete",
			tap : oController.onDeleteItemsTap			
		});
		
		//Products Table
		var oTableItems = new sap.m.Table("itemsDataTable", {
			mode : "MultiSelect",
			includeItemInSelection : true,
	        headerToolbar : new sap.m.Toolbar({
	            content : [ new sap.m.Label({
	                text : "Productos"
	            }), new sap.m.ToolbarSpacer({}), deleteButton, itemsButton  
	            ]
	        }),
	        columns : [ new sap.m.Column({
	            width : "2em",
	            header : new sap.m.Label({
	                text : "{i18n>SALENOTE_COLUMN_HEADER_PNAME}"
	            })
	        }), new sap.m.Column({
	            width : "1em",
	            header : new sap.m.Label({
	                text : "{i18n>SALENOTE_COLUMN_HEADER_PRICE}"
	            })
	        }), new sap.m.Column({
	            width : "1em",
	            header : new sap.m.Label({
	                text : "{i18n>SALENOTE_COLUMN_HEADER_PAMOUNT}"
	            })
	        }) ]
	    });
		
		oTableItems.bindItems("/Products", new sap.m.ColumnListItem({
	        cells : [ 
	            new sap.m.Text({
	            	text : "{ProductName}"
		        }), new sap.m.Text({
		            text : "{Price}"
		        }), new sap.m.Input({
					value : "{Amount}",
					type : "Number"
				})
	        ]
	    }));

		//Icon Tabs
		var iconTabsBar = new sap.m.IconTabBar({
			expanded : true,
			expandable : false,
			class: "iconTabBarPaddingTop",
			items : [ new sap.m.IconTabFilter({
				icon: "sap-icon://hint",
				iconColor: "Default",
				key : "detail",
				content : [ oForm1 ]	
			}), new sap.m.IconTabFilter({
				icon: "sap-icon://cart-full",
				iconColor: "Default",
				key : "cart",
				content : [ oTableItems ]	
			})
			]
		});

		return new sap.m.Page({
			title : "{i18n>TITLE__SALE_NOTE}",
			showNavButton : true,
	    	navButtonTap : [ oController.onNavButtonTap, oController ],
			content : [ iconTabsBar ],
			//headerContent : [  ]
		});
	}

});