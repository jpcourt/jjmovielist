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
	valuesList.forEach(function(value){
		filterContent += '<li onclick="useFilter('+"'"+filterKey+"','"+value+"'"+')"><a href="#">'+value+'</a></li>';
	});
	filterContent += '<li onclick="useFilter('+"'"+filterKey+"'"+', false)"><a href="#">Tous</a></li>';
	filterContent += '</ul></div><div class="btn-group"><input type"text" class="form-control" placeholder="Pas de filtre" disabled="true" id="'+filterKey+'_Set"></label></div>';
	return filterContent; 
}

function getFilterValues(filterKey){
	var filterIndex = initialMovieList[0].indexOf(filterKey);
	var valuesList = new Array;
	for(var i = 1;i < movieList.length;i++){		
		if(valuesList.indexOf(initialMovieList[i][filterIndex]) == -1){
			valuesList.push(initialMovieList[i][filterIndex]);
		}
	}	
	return valuesList.sort();
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