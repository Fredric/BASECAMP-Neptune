<?php
	require '../session.php';
	$basecamp = basecamp_api_client($appName, $appContact,
    $basecampAccountId, $basecampUsername, $basecampPassword);
    $record = json_decode($_POST['data']);
    
    $result = $basecamp('PUT', '/projects/'.$_POST['project'].'/todolists/'.$record->id.'.json');
    echo json_encode($result);
?>	