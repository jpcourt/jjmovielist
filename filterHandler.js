var filterList = new Array();
filterList.push({'initialColumn' : ['ANNEE'], 'aggregatedColumn' : 'ANNEE', 'filterType' : 'match'});
filterList.push({'initialColumn': ['GENRE I', 'GENRE II'], 'aggregatedColumn' : 'GENRES', 'filterType' : 'contain'});
filterList.push({'initialColumn' : ['FORMAT'], 'aggregatedColumn' : 'FORMAT', 'filterType' : 'match'});
filterList.push({'initialColumn' : ['ACTEUR', 'ACTEUR2'], 'aggregatedColumn' : 'ACTEURS', 'filterType' : 'contain'});

var setFilters = new Array();

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
	filterContent += 'Filtrer par '+filterKey['aggregatedColumn']+'<span class="caret"></span>';
	filterContent += '</button>';
	filterContent += '<ul class="dropdown-menu text-center" role="menu">';
	var valuesList = getFilterValues(filterKey['initialColumn']);
	valuesList.forEach(function(value){
		filterContent += '<li onclick="useFilter('+"'"+filterKey['aggregatedColumn']+"','"+value+"', '"+filterKey['filterType']+"'"+')"><a href="#">'+value+'</a></li>';
	});
	filterContent += '<li onclick="useFilter('+"'"+filterKey['aggregatedColumn']+"'"+', false, '+"'reset'"+')"><a href="#">Tous</a></li>';
	filterContent += '</ul></div><div class="btn-group"><input type"text" class="form-control" placeholder="Pas de filtre" disabled="true" id="'+filterKey['aggregatedColumn']+'_Set"></label></div>';
	return filterContent; 
}

function getFilterValues(filterKey){
	var valuesList = new Array;
	var filterIndex;
	filterKey.forEach(function(filterKeyItem){
		filterIndex = initialMovieList[0].indexOf(filterKeyItem);
		for(var i = 1;i < movieList.length;i++){		
			if(valuesList.indexOf(initialMovieList[i][filterIndex]) == -1){
				valuesList.push(initialMovieList[i][filterIndex]);
			}
		}	
	});
	return valuesList.sort();
}

function useFilter(filterKey, filterValue, filterType){
	if(filterType == "reset"){
		resetFilter(filterKey);
	}else{
		setFilter(filterKey, filterValue, filterType);
	}
	displayFilteredList();
}

function setFilter(filterKey, filterValue, filterType){
	for(var i = setFilters.length;i--;){
		if(setFilters[i][0] == filterKey){
			setFilters.splice(i,1);
		}
	}
	setFilters.push([filterKey,filterValue, filterType]);
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