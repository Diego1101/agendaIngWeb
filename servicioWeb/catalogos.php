<?php

if(isset($_REQUEST['op'])) {
    switch($_REQUEST['op']) {
        case 'rol':
            listarCatalogo('SELECT ROL_CVE ID, ROL_NOM NOMBRE FROM ROL ORDER BY ROL_CVE');
        break;
    
        case 'carrera':
            listarCatalogo('SELECT CAR_CVE ID, CAR_NOM NOMBRE FROM CARRERA WHERE CAR_STA=1 ORDER BY CAR_CVE');
        break;
    
        case 'semestre':
            listarCatalogo('SELECT SEM_CVE ID, SEM_NOM NOMBRE FROM SEMESTRE WHERE SEM_STA=1 ORDER BY SEM_CVE');
        break;
    
        case 'grupo':
            listarCatalogo('SELECT GRU_CVE ID, GRU_NOM NOMBRE FROM GRUPO WHERE GRU_STA=1 ORDER BY GRU_CVE');
        break;
    
        default:
        http_response_code(400);
        echo json_encode([400, 'Bad Request']);
        break;
    }
}
else {
    http_response_code(400);
    echo json_encode([400, 'Bad Request']);
}

function listarCatalogo($query) {
    $datos = array();
    include_once 'conexion.php';
    if ($conn = mysqli_connect($server, $dbuser, $dbpass, $bd)) {
        $renglon = mysqli_query($conn, $query);
        $i=0;
        while ($resultado = mysqli_fetch_assoc($renglon)) {
            $datos[$i]["ID"] = htmlspecialchars($resultado["ID"]);
            $datos[$i]["NOMBRE"] = utf8_encode($resultado["NOMBRE"]);
            $i=$i+1;
        }
        mysqli_close($conn);
    }
    echo json_encode($datos, JSON_UNESCAPED_UNICODE);
}

