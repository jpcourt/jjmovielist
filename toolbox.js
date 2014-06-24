function displayTable(displayArray){
	var tableContent = "<table class='table table-hover'><tr>";
	displayArray[0].forEach(function(cell){
		tableContent += "<th>"+cell+"</th>";
	});
	tableContent += "</tr>";
	for(var i = 1;i<displayArray.length;i++){
		tableContent += "<tr>";
		displayArray[i].forEach(function(cell){
			tableContent += "<td>"+cell+"</td>";
		});
		tableContent += "</tr>";
	}
	tableContent += "</table>";

	return tableContent;
}

function stringInText(needle, haystack){
  if(haystack.indexOf(needle) != -1){
    return true;
  }else{
    return false;
  }
}
