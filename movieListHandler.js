var movieList = new Array();
var filterList = ['ANNEE', 'GENRE I', 'FORMAT'];
var setFilters = new Array();

function initialize(){
	var xhr = new XMLHttpRequest();
	xhr.open('GET', 'spreadsheet.php');
	xhr.onreadystatechange = function(aEvt) {
		if (xhr.readyState == 4) {
			if (xhr.status == 200) {
				movieList = JSON.parse(xhr.response);	
				aggregateColumns('ACTEUR', 'ACTEUR2', 'ACTEURS');
				aggregateColumns('GENRE I', 'GENRE II', 'GENRES');
				displayMovieList();
				manageFilters();
			}
		}
	}
	xhr.send();
}

function displayMovieList(){
	document.getElementById('movieList').innerHTML = displayTable(movieList);
	document.getElementById('movieRecap').innerHTML = "<div class='page-header'><h3>La vidéothèque contient actuellement <strong>"+(movieList.length-1)+"</strong> films !</h3></div>";
}

function aggregateColumns(columnToComplete, columnToSuppress, newName){
	var colToCompleteIndex = movieList[0].indexOf(columnToComplete);
	var colToSuppressIndex = movieList[0].indexOf(columnToSuppress);
	movieList[0][colToCompleteIndex] = newName;
	movieList[0].splice(colToSuppressIndex,1);
	for(var i = 1;i < movieList.length;i++){
		if(movieList[i][colToSuppressIndex] != ""){
			movieList[i][colToCompleteIndex] = movieList[i][colToCompleteIndex]+", "+movieList[i][colToSuppressIndex];
		}
		movieList[i].splice(colToSuppressIndex,1);
	}
}

function resetList(){
	setFilters = new Array();
	filterList.forEach(function(filter){
		document.getElementById(filter+'_Set').value = "";
	});
	displayMovieList();
}

function useFilter(filterKey, filterValue){
	if(filterValue == false){
		resetFilter(filterKey);
	}else{
		setFilter(filterKey, filterValue);
	}
	displayFilteredList();
}

function setFilter(filterKey, filterValue){
	for(var i = setFilters.length;i--;){
		if(setFilters[i][0] == filterKey){
			setFilters.splice(i,1);
		}
	}
	setFilters.push([filterKey,filterValue]);
	document.getElementById(filterKey+'_Set').value = "Filtre : "+filterValue;
}

function resetFilter(filterKey){
	for(var i = setFilters.length;i--;){
		if(setFilters[i][0] == filterKey){
			setFilters.splice(i,1);
		}
	}
	document.getElementById(filterKey+'_Set').value = "Pas de filtre";
}

function displayFilteredList(){
	var filteredList = new Array();
	filteredList.push(movieList[0]);
	var filterIndex;
	var match;
	
	//console.log("L'index de "+filterKey+" est "+filterIndex);
	for(var i = 1;i < movieList.length;i++){		
		match = true;
		setFilters.forEach(function(filter){
			filterIndex = movieList[0].indexOf(filter[0]);
			if(movieList[i][filterIndex] != filter[1]){
				match = false
			}
		});
		if(match == true){
			filteredList.push(movieList[i]);
		}
	}
	document.getElementById('movieList').innerHTML = displayTable(filteredList);
	if(filteredList.length > 2){
		var movieWord = 'films';
	}else{
		var movieWord = 'film';
	}
	document.getElementById('movieRecap').innerHTML = "<div class='page-header'><h3>La sélection filtrée contient <strong>"+(filteredList.length-1)+"</strong> "+movieWord+"</h3></div>";
}

function getFilterValues(filterKey){
	var filterIndex = movieList[0].indexOf(filterKey);
	var valuesList = new Array;
	for(var i = 1;i < movieList.length;i++){		
		if(valuesList.indexOf(movieList[i][filterIndex]) == -1){
			valuesList.push(movieList[i][filterIndex]);
		}
	}	
	return valuesList.sort();
}

function manageFilters(){
	var filterGlobal = "";

	filterList.forEach(function(filterKey){
		filterGlobal += manageFilter(filterKey);
	});

	filterGlobal += "<div class='form-group'><button class='btn btn-default' onclick='resetList()'>Reset</button></div>";

	document.getElementById('filterPanel').innerHTML = filterGlobal;
}

function manageFilter(filterKey){
	var filterContent = '<div class="btn-group"><button type="button" class="btn btn-default dropdown-toggle" data-toggle="dropdown">';
	filterContent += 'Filtrer par '+filterKey+'<span class="caret"></span>';
	filterContent += '</button>';
	filterContent += '<ul class="dropdown-menu text-center" role="menu">';
	var valuesList = getFilterValues(filterKey);
	//console.log("Valeurs pour le filtre : "+filterKey);
	valuesList.forEach(function(value){
		//console.log("- "+value);
		filterContent += '<li onclick="useFilter('+"'"+filterKey+"','"+value+"'"+')"><a href="#">'+value+'</a></li>';
	});
	filterContent += '<li onclick="useFilter('+"'"+filterKey+"'"+', false)"><a href="#">Tous</a></li>';
	filterContent += '</ul></div><div class="btn-group"><input type"text" class="form-control" placeholder="Pas de filtre" disabled="true" id="'+filterKey+'_Set"></label></div>';
	//document.getElementById(filterKey).innerHTML = filterContent;
	return filterContent; 
}