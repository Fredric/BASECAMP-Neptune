<?php
	require 'session.php';
	$basecamp = basecamp_api_client($appName, $appContact,
    $basecampAccountId, $basecampUsername, $basecampPassword);
    $result = $basecamp('POST', '/projects/'.$_POST['project'].'/todolists.json');
    echo json_encode($result);
?>