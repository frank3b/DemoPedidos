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
		// this.getController().onBeforeShow(oEvent);
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

		this.petitioner = new sap.m.Input({
			id : "petitionerInput",
			type : "Text",
			placeholder : "Seleccione el solicitante",
			//showSuggestion : true,
			showValueHelp : true,
			valueHelpRequest : oController.handlePetitionerValueHelp/*,
			suggestionItems : "{/PetitionerCollection}",	
			suggestionItems : [ new sap.ui.core.Item({
				text: "{FirstName}"
				})
			]	*/
		});
		
		this.petitionerHelpDialog = sap.m.SelectDialog({
			title : "Solicitantes",
			class : "sapUiPopupWithPadding",
			//items : "{/PetitionerCollection}",
			search : oController.handlePetitionerValueHelpSearch,
			confirm : oController.handlePetitionerValueHelpClose,
			cancel : oController.handlePetitionerValueHelpClose
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
			//	text : "Datos Generales",
			//	tooltip : "Title tooltip"
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
			icon : "sap-icon://cart-full",
			tap : oController.onItemsTap			
		});
		
		//Products Table
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
	                text : "{i18n>SALENOTE_COLUMN_HEADER_PNAME}"
	            })
	        }), new sap.m.Column({
	            width : "2em",
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

		//oTableItems.setModel(oModel);

		return new sap.m.Page({
			title : "{i18n>TITLE__SALE_NOTE}",
			showNavButton : true,
	    	navButtonTap : [ oController.onNavButtonTap, oController ],
			content : [ oForm1, oTableItems ],
			//headerContent : [  ]
		});
	}

});