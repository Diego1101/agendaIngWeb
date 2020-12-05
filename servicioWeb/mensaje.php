<?php

if(isset($_REQUEST['op'])) {
    switch($_REQUEST['op']) {
        case 'listar':
            listarMensajes();
        break;
    
        case 'carrera':
            crearMensaje();
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

function listarMensajes() {
    if(isset($_REQUEST['id'])) {
        $datos = array();
        include_once 'conexion.php';
        if ($conn = mysqli_connect($server, $dbuser, $dbpass, $bd)) {
            $renglon = mysqli_query($conn, 'SELECT * FROM TRANSACCION, MENSAJE WHERE');
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
    else {
        http_response_code(400);
        echo json_encode([400, 'Bad Request']);
    }
}

