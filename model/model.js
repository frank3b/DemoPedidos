var oProductsModel = new sap.ui.model.json.JSONModel();


function getProduct(code) {	
	var product = {};
	
	var oModel = new sap.ui.model.json.JSONModel("model/mockProducts.json");
	var oJSON = oProductsModel.getJSON();
	
	var oFilter = new sap.ui.model.Filter("Code", sap.ui.model.FilterOperator.Contains, code);
	var products = oJSON.filter( [oFilter] );
	
	if(products.lenght > 0) {
		product = products[0];
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