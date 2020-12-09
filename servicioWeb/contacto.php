<?php
header('Content-Type: application/json');
    $usu="";
    $contra="";
    $nom="";
    $ap="";
    $tel="";
    $email="";
    $rol = -1;
    $carrera = -1;
    $grupo = -1;
    $semestre = -1;
    $datos=array();
    if(isset($_REQUEST['op'])) {
        switch($_REQUEST['op']){
            case 'registrar':
                if(!empty($_REQUEST['nombre']) && !empty($_REQUEST['ap']) && !empty($_REQUEST['usuario']) && !empty($_REQUEST['contra']) && !empty($_REQUEST['rol']))
                {
                    $nom=htmlspecialchars($_REQUEST['nombre']);
                    $ap=htmlspecialchars($_REQUEST['ap']);
                    $usu=htmlspecialchars($_REQUEST['usuario']);
                    $contra=htmlspecialchars($_REQUEST['contra']);
                    $rol= $_REQUEST['rol'];
                    if (isset($_REQUEST['tel'])) $tel = $_REQUEST['tel'];
                    if (isset($_REQUEST['email'])) $email = $_REQUEST['email'];
                    if (isset($_REQUEST['carrera'])) $carrera = $_REQUEST['carrera'];
                    if (isset($_REQUEST['grupo'])) $grupo = $_REQUEST['grupo'];
                    if (isset($_REQUEST['semestre'])) $semestre = $_REQUEST['semestre'];
                    include_once 'conexion.php';
                    if ($conn = mysqli_connect($server, $dbuser, $dbpass, $bd)) {
                        $renglon = mysqli_query($conn, "CALL tspRegistrarC('$nom','$ap','$usu','$contra','$rol','$tel','$email','$carrera','$semestre','$grupo');");
                        while ($resultado = mysqli_fetch_assoc($renglon)) {
                            $datos["ID"]=$resultado['CLAVE'];
                            if((int)$datos["ID"]!=0){
                                $datos["NOMBRE"]= utf8_encode($resultado['NOMBRE']);
                            }else{
                                    $datos["ID"]=0;
                            }
                        }
                        mysqli_close($conn);
                    }
                    echo json_encode($datos, JSON_UNESCAPED_UNICODE);
                }
            break;
            case 'acceso':
                if(!empty($_REQUEST['usuario']) && !empty($_REQUEST['contra'])){
                    $usu=$_REQUEST['usuario'];
                    $contra=$_REQUEST['contra'];
                    include_once 'conexion.php';
                    if ($conn = mysqli_connect($server, $dbuser, $dbpass, $bd)) {
                        $renglon = mysqli_query($conn, "CALL  tspAcceso('$usu','$contra');");
                        while ($resultado = mysqli_fetch_assoc($renglon)) {
                            $datos["ID"] = $resultado['CLAVE'];
                            if ((int) $datos["ID"] != 0) {
                                $datos["NOMBRE"] = utf8_encode($resultado['NOMBRE']);
                                $datos["ROL"] = utf8_encode($resultado['ROL']);
                            }
                        }
                        mysqli_close($conn);
                    }
                    if((int)$datos["ID"]!=0){
                        echo json_encode($datos, JSON_UNESCAPED_UNICODE);
                    }
                }
            break;
            case 'modificar':
                if(!empty($_REQUEST['id']) && !empty($_REQUEST['nombre']) && !empty($_REQUEST['ap']))
                {
                    $id = $_REQUEST['id'];
                    $nom=htmlspecialchars($_REQUEST['nombre']);
                    $ap=htmlspecialchars($_REQUEST['ap']);
                    $contra=htmlspecialchars($_REQUEST['contra']);
                    if (isset($_REQUEST['tel'])) $tel = $_REQUEST['tel'];
                    if (isset($_REQUEST['email'])) $email = $_REQUEST['email'];
                    if (isset($_REQUEST['carrera'])) $carrera = $_REQUEST['carrera'];
                    if (isset($_REQUEST['grupo'])) $grupo = $_REQUEST['grupo'];
                    if (isset($_REQUEST['semestre'])) $semestre = $_REQUEST['semestre'];
                    include_once 'conexion.php';
                    if ($conn = mysqli_connect($server, $dbuser, $dbpass, $bd)) {
                        $renglon = mysqli_query($conn, "CALL tspModConta($id, '$nom', '$ap', '$contra', '$tel', '$email', '$carrera', '$semestre', '$grupo');");
                        while ($resultado = mysqli_fetch_assoc($renglon)) {
                            $datos["ID"] = utf8_encode($resultado['CLAVE']);
                            $datos["NOMBRE"] = utf8_encode($resultado['NOMBRE']);
                        }
                        mysqli_close($conn);
                    }
                    echo json_encode($datos, JSON_UNESCAPED_UNICODE);
                }
            break;
            case 'eliminar':
                if(!empty($_REQUEST['id'])){
                    $id=$_REQUEST['id'];
                    include_once 'conexion.php';
                    if ($conn = mysqli_connect($server, $dbuser, $dbpass, $bd)) {
                        $renglon = mysqli_query($conn, "CALL  tspBajaC('$id');");
                        //$renglon = mysqli_query($conn, "DELETE FROM USUARIO WHERE USU_CVE=$id;");
                        while ($resultado = mysqli_fetch_assoc($renglon)) {
                            $datos= utf8_encode($resultado['BAJA']);
                        }
                        mysqli_close($conn);
                    }
                    echo json_encode($datos, JSON_UNESCAPED_UNICODE);
                }
            break;
            case 'listar':
                include_once 'conexion.php';
                if ($conn = mysqli_connect($server, $dbuser, $dbpass, $bd)) {
                    $renglon = mysqli_query($conn, "SELECT A.USU_CVE ID, CONCAT(A.USU_NOM,' ',A.USU_AP) NOMBRE, B.ROL_DES ROL, A.USU_ROL USUROL, A.USU_TEL TEL, A.USU_EMAIL EMAIL
                    FROM USUARIO A, ROL B 
                    WHERE A.USU_ROL=B.ROL_CVE;");
                    $i=0;
                    while ($resultado=mysqli_fetch_assoc($renglon)) {
                        $datos[$i]["ID"]= utf8_encode($resultado['ID']);
                        $datos[$i]["NOMBRE"]= utf8_encode($resultado['NOMBRE']);
                        $datos[$i]["ROL"] = utf8_encode($resultado['ROL']);
                        $datos[$i]["TELEFONO"] = utf8_encode($resultado['TEL']);
                        $datos[$i]["EMAIL"] = utf8_encode($resultado['EMAIL']);
                        $i++;
                    }
                    mysqli_close($conn);
                }
                echo json_encode($datos, JSON_UNESCAPED_UNICODE);
            break;
            case 'buscar':
            break;
            case 'detalle':
                if (!empty($_REQUEST['id'])) {
                    $id = ($_REQUEST['id']);
                    include_once 'conexion.php';
                    if ($conn = mysqli_connect($server, $dbuser, $dbpass, $bd)) {
                        $renglon = mysqli_query($conn, "SELECT A.USU_CVE ID, CONCAT(A.USU_NOM,' ',A.USU_AP) NOMBRE, B.ROL_DES ROL, A.USU_ROL USUROL, A.USU_TEL TEL, A.USU_EMAIL EMAIL, A.USU_USUARIO USUARIO, A.USU_CAR CARRERA, A.USU_SEM SEMESTRE, A.USU_GRU GRUPO 
                        FROM USUARIO A, ROL B 
                        WHERE A.USU_ROL=B.ROL_CVE
                        AND USU_CVE=".$id);
                        while ($resultado = mysqli_fetch_assoc($renglon)) {
                            $datos["ID"]=utf8_encode($resultado['ID']);
                            $datos["NOMBRE"]= utf8_encode($resultado['NOMBRE']);
                            $datos["ROL"] = utf8_encode($resultado['ROL']);
                            $datos["USUARIO"] = utf8_encode($resultado['USUARIO']);
                            $datos["TELEFONO"] = utf8_encode($resultado['TEL']);
                            $datos["EMAIL"] = utf8_encode($resultado['EMAIL']);
                            $datos["CARRERA"] = utf8_encode($resultado['CARRERA']);
                            $datos["SEMESTRE"] = utf8_encode($resultado['SEMESTRE']);
                            $datos["GRUPO"] = utf8_encode($resultado['GRUPO']);
                        }
                        mysqli_close($conn);
                    }
                    echo json_encode($datos, JSON_UNESCAPED_UNICODE);
                }
            break;
            default:
            break;
        }
    }
    else {
        http_response_code(400);
        echo json_encode([400, 'Bad Request']);
    }
    //USU_CVE, USU_NOM, USU_AP, USU_USUARIO, USU_CONTRA, USU_ROL, USU_TEL, USU_EMAIL, USU_CAR, USU_SEM, USU_GRU

?>