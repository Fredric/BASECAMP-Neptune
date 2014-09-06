<?php
	require '../session.php';
	$basecamp = basecamp_api_client($appName, $appContact,
    $basecampAccountId, $basecampUsername, $basecampPassword);


    if($_GET['id']){

        $project = $basecamp('GET', '/projects/'.$_GET['id'].'.json');
        $result = array('success' => true, 'data' => $project);

    }else{

         $projects = $basecamp('GET', '/projects.json');
         $result = array('success' => true, 'data' => $projects);

     }

    echo json_encode($result);
?>