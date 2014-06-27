var titledTable = function(headerArray, bodyArray){
	this.header = headerArray;
	this.bodyTable = bodyArray;
	this.colSize = headerArray.length;
	this.rowSize = bodyArray.length;
}

titledTable.prototype.display = function(){
	var tableContent = "<table class='table table-hover'><tr>";
	this.header.forEach(function(cell){
		tableContent += "<th>"+cell+"</th>";
	});
	tableContent += "</tr>";
	this.bodyTable.forEach(function(row){
		tableContent += "<tr>";
		row.forEach(function(cell){
			tableContent += "<td>"+cell+"</td>";
		});
		tableContent += "</tr>";
	});
	tableContent += "</table>";
	return tableContent;
};

titledTable.prototype.partialDisplay = function(displayArray){
	var tableContent = "<table class='table table-hover'><tr>";
	this.header.forEach(function(cell){
		if(displayArray.indexOf(cell) != -1){
			tableContent += "<th>"+cell+"</th>";
		}
	});
	tableContent += "</tr>";
	this.bodyTable.forEach(function(row){
		tableContent += "<tr>";
		row.forEach(function(cell){
			if(displayArray.indexOf(this.headerOf(cell, row)) != -1){
				tableContent += "<td>"+cell+"</td>";
			}
		});
		tableContent += "</tr>";
	});
	tableContent += "</table>";
	return tableContent;
};

titledTable.prototype.headerOf = function(cell, row){
	var index = row.indexOf(cell);
	return this.header[i];
};

titledTable.prototype.addRow = function(newRow){
	if(newRow.length != this.colSize){
		return false;
	}else{
		this.bodyTable.push(newRow);
		return true;
	}
};

titledTable.prototype.renderAsArray = function(){
	var tmp = new Array;
	tmp.push(this.header);
	this.bodyTable.forEach(function(row){
		tmp.push(row);
	});
	return tmp;
};

titledTable.prototype.deleteRowByIndex = function(index){
	this.bodyTable.splice(index,1);
};

titledTable.prototype.deleteRowByValue = function(key, value){
	var colIndex = this.header.indexOf(key);
	for(var i = 0; i < this.rowSize; i++){
		if(this.bodyTable[i][colIndex] == value){
			this.bodyTable.splice(i,1);
		}
	}
}