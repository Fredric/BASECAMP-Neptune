<?php
	require '../session.php';
	$basecamp = basecamp_api_client($appName, $appContact,
    $basecampAccountId, $basecampUsername, $basecampPassword);
    $todos = $basecamp($_SERVER['REQUEST_METHOD'], '/people/'.$_GET['userid'].'/assigned_todos.json');
    echo json_encode($todos);
?>