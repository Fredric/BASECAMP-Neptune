<?php
	require '../session.php';
	$basecamp = basecamp_api_client($appName, $appContact,
    $basecampAccountId, $basecampUsername, $basecampPassword);
    $project = $basecamp('POST', '/projects.json');
    $result = array('success' => true, 'data' => $project);
    
    echo json_encode($result);
?>