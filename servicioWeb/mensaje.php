<?php
header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');
header("Access-Control-Allow-Headers: X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Request-Method");
header("Access-Control-Allow-Methods: GET, POST, OPTIONS, PUT, DELETE");
header("Allow: GET, POST, OPTIONS, PUT, DELETE");

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
        $dest = -1;
        if (isset($_REQUEST['rol'])) $rol = $_REQUEST['rol'];
        if (isset($_REQUEST['carrera'])) $carrera = $_REQUEST['carrera'];
        if (isset($_REQUEST['grupo'])) $grupo = $_REQUEST['grupo'];
        if (isset($_REQUEST['semestre'])) $semestre = $_REQUEST['semestre'];
        if (isset($_REQUEST['us'])) $dest = $_REQUEST['us'];

        include_once 'conexion.php';
        if ($conn = mysqli_connect($server, $dbuser, $dbpass, $bd)) {
            $renglon = mysqli_query($conn, "CALL stpNuevoMensaje('$mensaje', $id, $rol, $carrera, $grupo, $semestre, $dest)");
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
        $usuarios = obtenerUsuarios();
        
        $datos = array();
        $id = $_REQUEST['id'];

        $conditions = '';
        $rol = '';
        $carrera = '';
        $grupo = '';
        $semestre = '';
        $idUs = '';
        if (isset($_REQUEST['rol'])) {
            $rol = $_REQUEST['rol'];
            $conditions .= $conditions.'AND MEN_TIPO = '.$rol.' ';
        }
        if (isset($_REQUEST['carrera'])) {
            $carrera = $_REQUEST['carrera'];
            $conditions .= 'AND MEN_CAR = '.$carrera.' ';
        }
        if (isset($_REQUEST['grupo'])) {
            $grupo = $_REQUEST['grupo'];
            $conditions .= 'AND MEN_GRU = '.$grupo.' ';
        }
        if (isset($_REQUEST['semestre'])) {
            $semestre = $_REQUEST['semestre'];
            $conditions .= 'AND MEN_SEM = '.$semestre.' ';
        }
        if (isset($_REQUEST['idDes'])) {
            $idDes = $_REQUEST['idDes'];
            $conditions .= 'AND (TRA_DES = '.$idDes.' OR MEN_REM = '.$idDes.') ';
        }

        include 'conexion.php';
        if ($conn = mysqli_connect($server, $dbuser, $dbpass, $bd)) {
            $renglon = mysqli_query($conn, "SELECT MEN_CVE ID, MEN_REM REMITENTE, MEN_NOM MENSAJE, TRA_DES DESTINATARIO, MEN_FECHA FECHA, MEN_CAR CARRERA, MEN_SEM SEMESTRE, MEN_GRU GRUPO, MEN_TIPO ROL FROM MENSAJE, TRANSACCION WHERE MEN_STA=1 AND MEN_REM=$id AND TRA_MEN=MEN_CVE $conditions
            UNION
            SELECT MEN_CVE ID, MEN_REM REMITENTE, MEN_NOM MENSAJE, TRA_DES DESTINATARIO, MEN_FECHA FECHA, MEN_CAR CARRERA, MEN_SEM SEMESTRE, MEN_GRU GRUPO, MEN_TIPO ROL FROM MENSAJE, TRANSACCION WHERE MEN_STA=1 AND TRA_MEN=MEN_CVE AND TRA_DES=$id $conditions ");
            $i = -1;
            while ($resultado = mysqli_fetch_assoc($renglon)) {
                if($i<0 || $datos[$i]["ID"] != $resultado["ID"]) {
                    $i=$i+1;
                    $datos[$i]["ID"] = $resultado["ID"];
                    $datos[$i]["MENSAJE"] = utf8_encode($resultado["MENSAJE"]);
                    
                    $datos[$i]["CARRERA"] = $resultado["CARRERA"];
                    $datos[$i]["SEMESTRE"] = $resultado["SEMESTRE"];
                    $datos[$i]["GRUPO"] = $resultado["GRUPO"];
                    $datos[$i]["ROL"] = $resultado["ROL"];

                    $datos[$i]["FECHA"] = $resultado["FECHA"];
                    $datos[$i]["TIPO"] = '';
                    $datos[$i]["REMITENTE"] = $usuarios[$resultado["REMITENTE"]];
                    
                    $datos[$i]["DESTINATARIOS"] = array();
                }

                if ($resultado["REMITENTE"] == $id) {
                    $datos[$i]["TIPO"] = 'Enviado'; 
                    array_push($datos[$i]["DESTINATARIOS"], $usuarios[$resultado["DESTINATARIO"]]);
                }
                else $datos[$i]["TIPO"] = 'Recibido'; 
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

function obtenerUsuarios() {
    $users = array();
    include 'conexion.php';
    if ($conn = mysqli_connect($server, $dbuser, $dbpass, $bd)) {
        $renglon = mysqli_query($conn, "SELECT * FROM USUARIO ORDER BY USU_CVE");
        while ($resultado = mysqli_fetch_assoc($renglon)) {
            $users[$resultado["USU_CVE"]]["Id"] = utf8_encode($resultado["USU_CVE"]);
            $users[$resultado["USU_CVE"]]["Nombre"] = utf8_encode($resultado["USU_NOM"]);
            $users[$resultado["USU_CVE"]]["Apellido"] =utf8_encode( $resultado["USU_AP"]);
        }
        mysqli_close($conn);
    }
    return $users;
}

