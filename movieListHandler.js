var movieList = new Array();
var initialMovieList = new Array();

var ttmovieList = new titledTable(new Array, new Array);

function initialize(){
	var xhr = new XMLHttpRequest();
	xhr.open('GET', 'spreadsheet.php');
	xhr.onreadystatechange = function(aEvt) {
		if (xhr.readyState == 4) {
			if (xhr.status == 200) {
				movieList = JSON.parse(xhr.response);
				initialMovieList = JSON.parse(xhr.response);
				aggregateColumns('ACTEUR', 'ACTEUR2', 'ACTEURS');
				aggregateColumns('GENRE I', 'GENRE II', 'GENRES');
				displayMovieList();
				manageFilters();

				ttmovieList.changeheader(initialMovieList[0]);
				for(var i = 1;i < initialMovieList.length;i++){
					ttmovieList.addRow(initialMovieList[i]);
				}
				console.log(ttmovieList.renderAsArray());
				//document.getElementById('movieList').innerHTML = ttmovieList.display();
			}
		}
	}
	xhr.send();
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

function displayMovieList(){
	document.getElementById('movieList').innerHTML = displayTable(movieList);
	document.getElementById('movieRecap').innerHTML = "<div class='page-header'><h3>La vidéothèque contient actuellement <strong>"+(movieList.length-1)+"</strong> films !</h3></div>";
}

function displayFilteredList(){
	var filteredList = new Array();
	filteredList.push(movieList[0]);
	var filterIndex;
	var match;
	for(var i = 1;i < movieList.length;i++){		
		match = true;
		setFilters.forEach(function(filter){
			filterIndex = movieList[0].indexOf(filter[0]);
			if(movieList[i][filterIndex] == ""){
				match = false;
			}else{
				if(filter[2] == 'match'){
					if(movieList[i][filterIndex] != filter[1]){
						match = false;
					}
				}
				if(filter[2] == 'contain'){
					if(stringInText(filter[1], movieList[i][filterIndex]) == false){
						match = false;
					}	
				}
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

function resetList(){
	setFilters = new Array();
	filterList.forEach(function(filter){
		document.getElementById(filter['aggregatedColumn']+'_Set').value = "";
	});
	displayMovieList();
}


