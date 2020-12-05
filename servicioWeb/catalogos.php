<?php  

switch($_REQUEST['op']) {
    case 'rol':
        echo $_REQUEST['op'];
    break;

    case 'carrera':
        echo $_REQUEST['op'];
    break;

    case 'semestre':
        echo $_REQUEST['op'];
    break;

    case 'grupo':
        echo $_REQUEST['op'];
    break;

    default:
        echo 'Ninguno';
    break;
}

// $datos = array();
// include_once 'conection.php';
// if ($conn = mysqli_connect($server, $dbuser, $dbpass, $bd)) {
//     $renglon = mysqli_query($conn, "SELECT ID, SE_SERVICIO SERVICIO, SE_TIPO TIPO, SE_DESCR DESCR, SE_COSTO COSTO, SE_DESC DESCU, SE_FECHA FECHA, SE_CONF CONF FROM SERVICIOS WHERE SE_CONF=" . $tipo);
//     $i=0;
//     while ($resultado = mysqli_fetch_assoc($renglon)) {
//         $datos[0]["ID"][$i] = $resultado["ID"];
//         $datos[1]["SERVICIO"][$i] = $resultado["SERVICIO"];
//         $datos[2]["TIPO"][$i] = $resultado["TIPO"];
//         $datos[3]["DESCR"][$i] = $resultado["DESCR"];
//         $datos[4]["COSTO"][$i] = $resultado["COSTO"];
//         $datos[5]["DESCU"][$i] = $resultado["DESCU"];
//         $datos[6]["FECHA"][$i] = $resultado["FECHA"];
//         $datos[7]["CONF"][$i] = $resultado["CONF"];
//         $i=$i+1;
//     }
//     mysqli_close($conn);
// }
// return $datos;
