CREATE TABLE USUARIO (
    USU_CVE					INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
    USU_NOM                 VARCHAR(50) NOT NULL,
	USU_AP                	VARCHAR(50) NOT NULL,
    USU_USUARIO   			VARCHAR(50) NOT NULL,
    USU_CONTRA  			VARCHAR(50) NOT NULL,
	USU_ROL                 INT NOT NULL,
    USU_TEL	    			VARCHAR(20),
	USU_EMAIL				VARCHAR(50)
)ENGINE =InnOdb DEFAULT CHARSET=utf8;

CREATE TABLE ROL (
	ROL_CVE					INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
    ROL_NOM                 VARCHAR(50) NOT NULL,
    ROL_DES		   			VARCHAR(50) 
)ENGINE =InnOdb DEFAULT CHARSET=utf8;

CREATE TABLE CARRERA (
	CAR_CVE					INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
    CAR_NOM                 VARCHAR(50) NOT NULL,
    CAR_DES		   			VARCHAR(50) NOT NULL
)ENGINE =InnOdb DEFAULT CHARSET=utf8;

CREATE TABLE SEMESTRE (
	SEM_CVE					INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
    SEM_NOM                 VARCHAR(50) NOT NULL,
    SEM_DES		   			VARCHAR(50) NOT NULL
)ENGINE =InnOdb DEFAULT CHARSET=utf8;

CREATE TABLE GRUPO (
	GRU_CVE					INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
    GRU_NOM                 VARCHAR(50) NOT NULL,
    GRU_DES		   			VARCHAR(50) NOT NULL
)ENGINE =InnOdb DEFAULT CHARSET=utf8;
  
CREATE TABLE MENSAJE (
	MEN_CVE					INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
    MEN_NOM                 VARCHAR(500) NOT NULL,
    MEN_REM		   			INT NOT NULL,
	MEN_STA					INT NOT NULL
)ENGINE =InnOdb DEFAULT CHARSET=utf8;

CREATE TABLE TRANSACCION (
	TRA_CVE					INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
    TRA_MEN                 INT NOT NULL,
    TRA_DES		   			INT NOT NULL
)ENGINE =InnOdb DEFAULT CHARSET=utf8;


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
	SELECT A.USU_CVE CLAVE, CONCAT(A.USU_NOM,' ',A.USU_AP) NOMBRE, B.ROL_DES ROL, A.USU_ROL USUROL, A.USU_TEL TEL, A.USU_TEL TELEFONO, A.USU_EMAIL EMAIL
	FROM USUARIO A, ROL B
	WHERE A.USU_USUARIO = USU
	AND A.USU_CONTRA=CONTRA
	AND A.USU_ROL=B.ROL_CVE;
ELSE
	SELECT 0 CLAVE;
END IF;
END $$

--- REGISTRO