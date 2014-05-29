function initializeModel() {	
	var oModel = new sap.ui.model.json.JSONModel();
	var myData = {};
	myData.UserName = "demo"; 
	myData.Password = "demo";
		
	oModel.setData(myData);
	sap.ui.getCore().setModel(oModel);
	
	jQuery.sap.registerModulePath('Application', 'Application');
	// launch application
	jQuery.sap.require("Application");

	new Application({
		root : "content"
	});
	
}

function getInitialSaleNote(){
	
	var saleNote = {"code":"", "totalWeight":"", "totalValue":"", "petitioner":"", "validFrom":"", "validTo":"", 
			"items": [ { "code": "", "name":"", "amount":"" } ] 
	};
		
	return saleNote;
}

