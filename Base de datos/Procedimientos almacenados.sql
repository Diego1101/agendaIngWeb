--- ACCESO
DROP PROCEDURE tspAcceso;
DELIMITER $$
CREATE PROCEDURE tspAcceso
(
IN USU VARCHAR(50),
IN CONTRA VARCHAR(50)
)
BEGIN
IF EXISTS(SELECT* FROM USUARIO WHERE USU_USUARIO=USU AND USU_CONTRA=CONTRA) THEN
	SELECT A.USU_CVE CLAVE, CONCAT(A.USU_NOM,' ',A.USU_AP) NOMBRE, B.ROL_NOM ROL, A.USU_ROL USUROL, A.USU_TEL TEL, A.USU_TEL TELEFONO, A.USU_EMAIL EMAIL
	FROM USUARIO A, ROL B
	WHERE A.USU_USUARIO = USU
	AND A.USU_CONTRA=CONTRA
	AND A.USU_ESTATUS=1
	AND A.USU_ROL=B.ROL_CVE;
ELSE
	SELECT 0 CLAVE;
END IF;
END $$

--- REGISTRO CONTACTO
DELIMITER $$
CREATE PROCEDURE tspRegistrarC
(
IN nom VARCHAR(50),
IN ap VARCHAR(50),
IN usu VARCHAR(50),
IN contra VARCHAR(50),
IN rol INT,
IN tel VARCHAR(20),
IN email VARCHAR(50),
IN car INT,
IN sem INT,
IN gru INT
)
BEGIN
IF EXISTS(SELECT * FROM USUARIO WHERE USU_USUARIO=usu) THEN
	SELECT 0 CLAVE;
ELSE
	INSERT INTO USUARIO VALUES(NULL,nom, ap, usu, contra, rol, tel, email, car, sem,gru,1);
	SELECT USU_CVE CLAVE, CONCAT(USU_NOM, ' ', USU_AP) NOMBRE
	FROM USUARIO;
END IF;
END $$

-- Modificar contacto
DELIMITER $$
CREATE PROCEDURE tspModConta
(
	IN id INT,
	IN nom VARCHAR(50),
	IN ap VARCHAR(50),
	IN contra VARCHAR(50),
	IN tel VARCHAR(20),
	IN email VARCHAR(50),
	IN car INT,
	IN sem INT,
	IN gru INT
)
BEGIN
	UPDATE USUARIO
	SET USU_NOM=nom, USU_AP=ap, USU_CONTRA=contra, USU_TEL=tel, USU_EMAIL=email, USU_CAR=car, USU_SEM=sem, USU_GRU=gru
	WHERE USU_CVE = id;
	SELECT USU_CVE CLAVE, CONCAT(USU_NOM, ' ', USU_AP) NOMBRE
	FROM USUARIO
	WHERE USU_CVE=id;
END $$

--Eliminar contacto
DELIMITER $$
CREATE PROCEDURE tspBajaC(
	IN id	INT
)
BEGIN
	IF EXISTS(SELECT * FROM USUARIO WHERE USU_CVE=id)
	THEN
		UPDATE USUARIO
		SET USU_ESTATUS = 0
        WHERE USU_CVE = id;
		SELECT 1 BAJA;
	ELSE
		SELECT 0 BAJA;
	END IF;
END $$




-- Crear mensaje
DELIMITER $$
CREATE PROCEDURE stpNuevoMensaje 
(
	IN MENSAJE VARCHAR(500),
	IN USU INT,
	IN ROL INT,
	IN CARRERA INT,
	IN GRUPO INT,
	IN SEMESTRE INT,
	IN DEST INT
)
BEGIN

	-- INSERTAR EL MENSAJE EN LA TABLA Y EL ID
	INSERT INTO MENSAJE VALUES(NULL, MENSAJE, USU,NOW(), CARRERA, SEMESTRE, GRUPO, ROL, 1);

	SET @ID_MENSAJE = (SELECT MAX(MEN_CVE) FROM MENSAJE);

	CREATE TEMPORARY TABLE TEMP(ID INT NOT NULL PRIMARY KEY AUTO_INCREMENT, ID_US INT NOT NULL);
	INSERT INTO TEMP 
	SELECT null, USU_CVE FROM USUARIO WHERE USU_ROL=ROL OR USU_CAR=CARRERA OR USU_SEM=SEMESTRE OR USU_GRU=GRUPO OR USU_CVE=DEST;

	INSERT INTO TRANSACCION
	SELECT NULL, @ID_MENSAJE, ID_US FROM TEMP;

	SELECT '1' RES;

END $$;