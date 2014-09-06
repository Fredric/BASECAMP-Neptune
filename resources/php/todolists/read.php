<?php
	require '../session.php';
	$basecamp = basecamp_api_client($appName, $appContact,
    $basecampAccountId, $basecampUsername, $basecampPassword);



     if($_GET['id']){

        $todo = $basecamp('GET', '/projects/'.$_GET['project'].'/todolists/'.$_GET['id'].'.json');
        $result = array('success' => true, 'data' => $todo);

     }else{
        $todos = $basecamp($_SERVER['REQUEST_METHOD'], '/projects/'.$_GET['project'].'/todolists.json');
        $result = array('success' => true, 'data' => $todos);

     }


    echo json_encode($todos);
?>