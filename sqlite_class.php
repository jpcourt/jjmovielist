<?php

// Open sqite Files
class dBase extends SQLite3
{
	function __construct($filename, $path)
	{
		$this->open($path.'/'.$filename);
		$this->query('PRAGMA encoding = "UTF-8"'); // set charset to UTF-8
	}
}

// Output sqlite query error
function sql_query($db, $query)
{
	if($db == null)
		echo "\n[SQLITE ERROR> DB IS NULL!\n";

	$sqldata = $db->query($query);

	$res = array();

	if(strpos($db->lastErrorMsg(), 'not an error') === false)
	{
		echo "\n[SQLITE ERROR> ".$query;
		echo "\n".$db->lastErrorMsg();
		echo "\n";
	}
	else
	{
		if(strpos($query, 'SELECT ') !== false || strpos($query, 'select ') !== false)
		{
			while ($row = $sqldata->fetchArray())
			{
				$entry = array();
	
				foreach($row as $key=>$value)
				{
					if(is_numeric($key) == false)
					{
						$entry[$key] = $value;
					}
				}
	
				array_push($res, $entry);
			}
		}
		else
		{
			$res = null;
		}
	}
	return $res;
}

// Unique res sqlite statement
function sql_querySingle($db, $query)
{
	if($db == null)
		echo "\n[SQLITE ERROR> DB IS NULL!\n";

	$res = $db->querySingle($query);

	if(strpos($db->lastErrorMsg(), 'not an error') === false)
	{
		echo "\n[SQLITE ERROR> ".$query;
		echo "\n".$db->lastErrorMsg();
		echo "\n";
	}
	return $res;
}

?>