<?php

	require_once 'sqlite_class.php';

	$body = file_get_contents('php://input');

	$db_name = $body['name'];
	$db_table = $body['table'];
	$db_columns = $body['columns'];
	$db_primarykey = $body['primaryKey'];
	$db_content = $body['content'];

	$db = new dBase($db_name.'.sqlite', './data');

	$key_list_with_type = "";
	$key_list = "";
	$i = 0;
	foreach ($db_columns as $key => $value) {
		if($i > 0){
			$key_list_with_type .= ', ';
			$key_list .= ', ';
		}
		$key_list .= $value['name'];
		$key_list_with_type .= $value['name'].' '.$value['type'];
		$i++;
	}
	$key_list_with_type .= ', PRIMARY KEY ('.$db_primarykey.')';

	$q = $db->exec('CREATE TABLE IF NOT EXISTS '.$db_table.' ('.$key_list_with_type.')');

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
		$q = $db->exec('INSERT OR REPLACE INTO '.$db_table.' ('.$key_list.') VALUE ('.$value_list.')');
	}

	echo 'Construction de la DataBase OK';

?>