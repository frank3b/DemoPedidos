sap.ui.jsview("app.details.SaleNoteItems", {

	/**
	 * Specifies the Controller belonging to this View. In the case that it is
	 * not implemented, or that "null" is returned, this View does not have a
	 * Controller.
	 * 
	 * @memberOf app.detail.SaleNoteItems
	 */
	getControllerName : function() {
		return "app.details.SaleNoteItems";
	},

	/**
	 * Handler to onBeforeShow event that fires by the NavContainer.<BR>
	 * 
	 * @param oEvent
	 */
	onBeforeShow : function(oEvent) {
		// this.getController().onBeforeShow(oEvent);
	},

	/**
	 * Is initially called once after the Controller has been instantiated. It
	 * is the place where the UI is constructed. Since the Controller is given
	 * to this method, its event handlers can be attached right away.
	 * 
	 * @memberOf app.detail.SaleNoteItems
	 */
	createContent : function(oController) {

		var petitioner = new sap.m.Input({
			id : "productInput",
			type : "Text",
			placeholder : ""
		});

		//var oLayout1 = new sap.ui.layout.form.GridLayout();
		//var oLayout2 = new sap.ui.layout.form.ResponsiveLayout();
		var oLayout3 = new sap.ui.layout.form.ResponsiveGridLayout();

		var oForm1 = new sap.ui.layout.form.Form("F1", {
			//title : new sap.ui.core.Title({
			//	text : "Datos Generales",
			//	tooltip : "Title tooltip"
			//}),
			layout : oLayout3,
			formContainers : [ new sap.ui.layout.form.FormContainer("F1C1", {
				//title : "Person data",
				formElements : [ new sap.ui.layout.form.FormElement({
					label : "Valor Neto",
					fields : [ new sap.m.Input({
						value : ""
					})	],
					layoutData : new sap.ui.layout.ResponsiveFlowLayoutData({
						linebreak : true,
						margin : true
					})
				}),
				new sap.ui.layout.form.FormElement({
					label : "Peso Total",
					fields : [ new sap.m.Input({
						value : ""
					})	]
				}),
				new sap.ui.layout.form.FormElement({
					label : "Solicitante",
					fields : [ new sap.m.Input({
						value : ""
					})	]
				}),
				new sap.ui.layout.form.FormElement({
					label : "Valido De",
					fields : [ new sap.m.Input({
						value : ""
					})	]
				}),
				new sap.ui.layout.form.FormElement({
					label : "Valido Hasta",
					fields : [ new sap.m.Input({
						value : ""
					})	]
				})
				]
			})

			]
		});
		
		// Create new button
		var itemsButton = new sap.m.Button({
			icon : "sap-icon://cart-full",
			tap : oController.onItemsTap			
		});
		
		var oTableItems = new sap.m.Table("itemsDataTable", {
	        headerToolbar : new sap.m.Toolbar({
	            content : [ new sap.m.Label({
	                text : "Productos"
	            }), new sap.m.ToolbarSpacer({}), itemsButton 
	            ]
	        }),
	        columns : [ new sap.m.Column({
	            width : "2em",
	            header : new sap.m.Label({
	                text : "Current Value"
	            })
	        }), new sap.m.Column({
	            width : "2em",
	            header : new sap.m.Label({
	                text : "Article"
	            })
	        }), new sap.m.Column({
	            width : "2em",
	            header : new sap.m.Label({
	                text : "Question"
	            })
	        }) ]
	    });
		
		oTableItems.bindItems("/subvariants", new sap.m.ColumnListItem({
	        cells : [ new sap.m.Text({
	            text : "{currentValue}"
	        }), new sap.m.Text({
	            text : "{Article}"
	        }), new sap.m.Text({
	            text : "{question}",
	        }), ]
	    }));

		//oTableItems.setModel(new sap.ui.model.json.JSONModel(summaryDetailData));

		return new sap.m.Page({
			title : "{i18n>TITLE__SALE_NOTE}",
			showNavButton : jQuery.device.is.phone,
	    	navButtonTap : [ oController.onNavButtonTap, oController ],
			content : [ oForm1, oTableItems ],
			//headerContent : [  ]
		});
	}

});