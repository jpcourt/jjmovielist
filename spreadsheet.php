<?php

	$url = 'https://docs.google.com/spreadsheet/pub?key=0As10YbL_zdnrdGJWdmdzNGhqZU5nZ3NkSDJyc1JWeXc&output=csv';

	//echo "Chargement du fichier<br>";

	$handle = fopen($url, "r");

	//echo "Construction du tableau<br>";

	$data = fgetcsv($handle);

	while($data !== FALSE){
		$data_array[] = $data;
		$data = fgetcsv($handle);
	}

	//echo "Lecture du tableau<br>";

	/*$i = 0;

	while(isset($data_array[$i])){
		echo "value = ".$data_array[$i][1]."<br>";
		$i++;
	}*/

	//echo "DONE<br>";

	echo json_encode($data_array);

?>