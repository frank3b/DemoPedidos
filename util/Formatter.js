jQuery.sap.declare("util.Formatter"); 

jQuery.sap.require("sap.ui.core.format.DateFormat");

pedidos.util.formatter = {
		//Function that formats date time values as received from an Odata service. 
		fnDateTimeFormatter : function(oValue){
			if (oValue == undefined || oValue == "")
				return;
			
		    var oDateFormat = sap.ui.core.format.DateFormat.getDateTimeInstance();
		    return oDateFormat.format(new Date(oValue));
		},
		
		_statusStateMap : {
			"Neu" : "Warning",
			"Initial" : "Success"
		},
		
		StatusState :  function (value) {
			return (value && pedidos.util.formatter._statusStateMap[value]) ? pedidos.util.formatter._statusStateMap[value] : "None";
		},
		
		Quantity :  function (value) {
			try {
				return (value) ? parseFloat(value).toFixed(0) : value;
			} catch (err) {
				return "Not-A-Number";
			}
		},
		
		Date : function (value) {
			if (value) {
				var oDateFormat = sap.ui.core.format.DateFormat.getDateTimeInstance({pattern: "yyyy-MM-dd"}); 
				return oDateFormat.format(new Date(value));
			} else {
				return value;
			}
		},
		
		AttachmentMap : {
			"ppt" : "ppt-attachment",
			"pdf" : "pdf-attachment",
			"zip" : "attachment-zip-file"
		},
		
		AttachmentIcon : function (value) {
			var map = pedidos.util.formatter.AttachmentMap;
			var code = (value && map[value]) ? map[value] : "question-mark";
			return "sap-icon://" + code;
		}
		
};		
