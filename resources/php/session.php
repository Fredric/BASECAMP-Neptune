<?php
	session_start();
	require 'basecamp.php';
	$appName = 'MyApp';
	$appContact = 'yourname@example.com';
	$basecampAccountId = $_SESSION['account'];
	$basecampUsername = $_SESSION['user'];
	$basecampPassword = $_SESSION['pass'];
?>