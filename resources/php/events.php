<?php

	require 'session.php';
	
	$basecamp = basecamp_api_client($appName, $appContact,
    $basecampAccountId, $basecampUsername, $basecampPassword);
    $events = $basecamp('GET', '/projects/'.$_GET['project'].'/events.json?since='.$_GET['since']);
    echo json_encode($events);
?>