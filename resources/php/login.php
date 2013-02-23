<?php
	require 'session.php';

	$basecampUsername = $_POST['user'];
	$basecampPassword = $_POST['pass'];
    $basecampAccountId = $_POST['account']; 
    $basecamp = basecamp_api_client($appName, $appContact,
    $basecampAccountId, $basecampUsername, $basecampPassword);
    $user = $basecamp('GET', '/people/me.json');
    $_SESSION['user'] = $_POST['user'];
    $_SESSION['pass'] = $_POST['pass'];
    $_SESSION['account'] = $_POST['account'];

    echo json_encode($user);

?>