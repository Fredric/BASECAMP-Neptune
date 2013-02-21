<?php
	require '../session.php';
	$basecamp = basecamp_api_client($appName, $appContact,
    $basecampAccountId, $basecampUsername, $basecampPassword);
    $record = json_decode($_POST['data']);
    
    $result = $basecamp('DELETE', '/projects/'.$_POST['project'].'/todolists/'.$record->id.'.json');
   	$response = array('success' => 'true');
   	echo json_encode($response);
?>