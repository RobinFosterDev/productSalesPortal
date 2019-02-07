var productAUnitCost = 250;
var productBUnitCost = 100;	





function generateQuote(){

	var productAUnitQuantity = document.getElementById('productAUnitQuantity').value;
	var productBUnitQuantity = document.getElementById('productBUnitQuantity').value;

	console.log(productAUnitQuantity);
	console.log(productBUnitQuantity);


	var productATotalCost = productAUnitCost * productAUnitQuantity;
	var productBTotalCost = productBUnitCost * productBUnitQuantity;

	var totalValue = productATotalCost + productBTotalCost
	var total = document.getElementById('total');


	total.innerHTML = "$" + totalValue;
}


function convertArrayOfObjectsToCSV(args) {  
        var result, ctr, keys, columnDelimiter, lineDelimiter, data;

        data = args.data || null;
        if (data == null || !data.length) {
            return null;
        }

        columnDelimiter = args.columnDelimiter || ',';
        lineDelimiter = args.lineDelimiter || '\n';

        keys = Object.keys(data[0]);

        result = '';
        result += keys.join(columnDelimiter);
        result += lineDelimiter;

        data.forEach(function(item) {
            ctr = 0;
            keys.forEach(function(key) {
                if (ctr > 0) result += columnDelimiter;

                result += item[key];
                ctr++;
            });
            result += lineDelimiter;
        });

        return result;
    }
    function generateFilename(){
    	var filename = document.getElementById('quoteFilename').value;
    	console.log(filename);
    	if (filename == ""){
    		alert("Error: Please enter a name for this quote");
    	} else {
    		downloadCSV({filename: filename});
    	}
    	
    }

    function downloadCSV(args) {  
        var data, filename, link;

        var productAUnitQuantity = document.getElementById('productAUnitQuantity').value;
		var productBUnitQuantity = document.getElementById('productBUnitQuantity').value;
		var productAName = document.getElementById('productAUnitQuantity').name;
		var productBName = document.getElementById('productBUnitQuantity').name;

        var productList = [
        	{
	        	Product: productAName,
	        	unitCost: productAUnitCost,
	        	totalCost: (productAUnitQuantity * productAUnitCost) 
        	},
        	{
        		Product: productBName,
        	   	unitCost: productBUnitCost,
        	   	totalCost: (productBUnitQuantity * productBUnitCost)
        	},
        ];

        var csv = convertArrayOfObjectsToCSV({
            data: productList
        });
        if (csv == null) return;

        filename = args.filename || 'export.csv';

        if (!csv.match(/^data:text\/csv/i)) {
            csv = 'data:text/csv;charset=utf-8,' + csv;
        }
        data = encodeURI(csv);

        link = document.createElement('a');
        link.setAttribute('href', data);
        link.setAttribute('download', filename);
        link.click();
    }