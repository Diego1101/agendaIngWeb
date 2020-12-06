<?php

if(isset($_REQUEST['op'])) {
    switch($_REQUEST['op']) {
        case 'listar':
            listarMensajes();
        break;
    
        case 'crear':
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

function crearMensaje() {
    if (isset($_REQUEST['id']) && isset($_REQUEST['mensaje'])) {
        $datos = array();
        $id = $_REQUEST['id'];
        $mensaje = $_REQUEST['mensaje'];
        $rol = -1;
        $carrera = -1;
        $grupo = -1;
        $semestre = -1;
        if (isset($_REQUEST['rol'])) $rol = $_REQUEST['rol'];
        if (isset($_REQUEST['carrera'])) $carrera = $_REQUEST['carrera'];
        if (isset($_REQUEST['grupo'])) $grupo = $_REQUEST['grupo'];
        if (isset($_REQUEST['semestre'])) $semestre = $_REQUEST['semestre'];

        include_once 'conexion.php';
        if ($conn = mysqli_connect($server, $dbuser, $dbpass, $bd)) {
            $renglon = mysqli_query($conn, "CALL stpNuevoMensaje('$mensaje', $id, $rol, $carrera, $grupo, $semestre)");
            while ($resultado = mysqli_fetch_assoc($renglon)) {
                $datos["RES"] = $resultado['RES'];
            }
            mysqli_close($conn);
        }
        echo json_encode($datos);

    }
    else {
        http_response_code(400);
        echo json_encode([400, 'Bad Request']);
    }
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

