<?php

	require_once 'sqlite_class.php';

	echo "Création du fichier SQLITE\n";

	$body = json_decode(file_get_contents('php://input'));

	echo 'Body = ';
	print_r($body);

	$db_name = $body->name;
	$db_table = $body->table;
	$db_columns = $body->columns;
	$db_primarykey = $body->primaryKey;
	$db_content = $body->content;

	$db = new dBase($db_name.'.sqlite', './data');

	echo "Fichier SQLITE nommé ".$db_name.".sqlite créé\n";

	$key_list_with_type = "";
	$key_list = "";
	$i = 0;
	foreach ($db_columns as $key => $value) {
		if($i > 0){
			$key_list_with_type .= ', ';
			$key_list .= ', ';
		}
		$key_list .= $value;
		$key_list_with_type .= $value.' STRING';
		$i++;
	}
	$key_list_with_type .= ', PRIMARY KEY ('.$db_primarykey.')';

	echo 'Liste des colonnes : '.$key_list."\n";
	echo 'Liste des colonnes avec type : '.$key_list_with_type."\n";
	echo "Création de la table\n";

	$request_create = 'CREATE TABLE IF NOT EXISTS '.$db_table.' ('.$key_list_with_type.')';

	echo "Requete de création = ".$request_create."\n";

	$q = $db->exec($request_create);

	echo "Table ".$db_table." créée\n";
	echo "Insertion des données dans la table\n";

	foreach ($db_content as $index => $row) {
		$j = 0;
		$value_list = "";
		foreach ($row as $key => $value) {
			if($j > 0){
				$value_list .= ', ';
			}
			$value_list .= $value;
			$j++;
		}
		$request_insert = 'INSERT OR REPLACE INTO '.$db_table.' ('.$key_list.') VALUE ('.$value_list.')';
		echo "Requete d'insert = ".$request_insert."\n";
		$q = $db->exec($request_insert);
	}

	echo $j." lignes insérées dans la table\n";

	echo 'Construction de la DataBase OK';

?>