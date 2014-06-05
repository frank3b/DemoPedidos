var oProductsModel = new sap.ui.model.json.JSONModel();
var oSalesNotesModel = new sap.ui.model.json.JSONModel();

function getProduct(code) {
	var product = null;

	var oJSON = JSON.parse(oProductsModel.getJSON());

	for ( var i = 0; i < oJSON.length; i++) {
		if (oJSON[i].Code == code) {
			product = oJSON[i];
			break;
		}
	}

	return product;
}

function getProducts() {
	var promiseProducts = Kinvey.DataStore.find('Products', null,	{
		success : function(response) {
			oProductsModel = new sap.ui.model.json.JSONModel();
			oProductsModel.setJSON(JSON.stringify(response));
		},
		error : function(error) {
			jQuery.sap.log.error("Error getting products..." + error.description);
		}
	});
}

function getSalesNotes() {
	var promiseSalesNotes = Kinvey.DataStore.find('SalesNotes', null,	{
		success : function(response) {
			oSalesNotesModel = new sap.ui.model.json.JSONModel();
			oSalesNotesModel.setJSON(JSON.stringify(response));
		},
		error : function(error) {
			jQuery.sap.log.error("Error getting sales notes..." + error.description);
		}
	});
	
}