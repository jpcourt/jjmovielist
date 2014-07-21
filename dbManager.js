var requestBody = function(name, table, columns, primaryKey, content){
	this['name'] = name;
	this['table'] = table;
	this['columns'] = columns;
	this['primaryKey'] = primaryKey;
	this['content'] = content;
}

function buildDB(){

	var xhr = new XMLHttpRequest();
	xhr.open('GET', 'spreadsheet.php');
	xhr.onreadystatechange = function(aEvt) {
		if (xhr.readyState == 4) {
			if (xhr.status == 200) {

				//var columns = ["FORMAT","TITRE","ANNEE","GENRE I","GENRE II","ACTEUR","ACTEUR2","IMDB","JJ","DISQUE"];
				var columns = JSON.parse(xhr.response)['title'];
				var content = JSON.parse(xhr.response)['content'];
				var body = new requestBody('jjMovieListDB', 'movie_list', columns, 'TITRE', content);

				var xhr2 = new XMLHttpRequest();
				xhr2.open('POST', 'db_builder.php');
				xhr2.onreadystatechange = function(aEvt) {
					if (xhr2.readyState == 4) {
						if (xhr2.status == 200) {
							console.log(xhr2.response);
						}
					}
				}
				xhr2.send(body);
			}
		}
	}
	xhr.send();
}

