<?php

	$url = 'https://docs.google.com/spreadsheet/pub?key=0As10YbL_zdnrdGJWdmdzNGhqZU5nZ3NkSDJyc1JWeXc&output=csv';

	// Chargement du fichier

	$handle = fopen($url, "r");

	// Récupération de la ligne de titre du tableau

	$title = fgetcsv($handle);

	// Récupération du contenu du tableau

	$data = fgetcsv($handle);

	while($data !== FALSE){
		$data_array[] = $data;
		$data = fgetcsv($handle);
	}

	$result = array();
	$result['title'] = $title;
	$result['content'] = $data_array;

	echo json_encode($result);

?>