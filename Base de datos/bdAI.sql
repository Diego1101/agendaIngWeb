CREATE TABLE USUARIO (
    USU_CVE					INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
    USU_NOM                 VARCHAR(50) NOT NULL,
	USU_AP                	VARCHAR(50) NOT NULL,
    USU_USUARIO   			VARCHAR(50) NOT NULL,
    USU_CONTRA  			VARCHAR(50) NOT NULL,
	USU_ROL                 INT NOT NULL,
    USU_TEL	    			VARCHAR(20),
	USU_EMAIL				VARCHAR(50),
	USU_CAR					INT,
	USU_SEM					INT,
	USU_GRU					INT
)ENGINE =InnOdb DEFAULT CHARSET=utf8;

CREATE TABLE ROL (
	ROL_CVE					INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
    ROL_NOM                 VARCHAR(50) NOT NULL,
    ROL_DES		   			VARCHAR(50) 
)ENGINE =InnOdb DEFAULT CHARSET=utf8;

CREATE TABLE CARRERA (
	CAR_CVE					INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
    CAR_NOM                 VARCHAR(50) NOT NULL,
    CAR_DES		   			VARCHAR(50) NOT NULL,
	CAR_STA					INT
)ENGINE =InnOdb DEFAULT CHARSET=utf8;

CREATE TABLE SEMESTRE (
	SEM_CVE					INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
    SEM_NOM                 VARCHAR(50) NOT NULL,
    SEM_DES		   			VARCHAR(50) NOT NULL,
	SEM_STA					INT
)ENGINE =InnOdb DEFAULT CHARSET=utf8;

CREATE TABLE GRUPO (
	GRU_CVE					INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
    GRU_NOM                 VARCHAR(50) NOT NULL,
    GRU_REM		   			VARCHAR(50) NOT NULL,
	GRU_STA					INT
)ENGINE =InnOdb DEFAULT CHARSET=utf8;
  
CREATE TABLE MENSAJE (
	MEN_CVE					INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
    MEN_NOM                 VARCHAR(500) NOT NULL,
    MEN_REM		   			INT NOT NULL,
    MEN_FECHA               DATETIME,
    MEN_CAR					INT,
	MEN_SEM					INT,
	MEN_GRU					INT,
    MEN_TIPO    			INT,
	MEN_STA					INT NOT NULL
)ENGINE =InnOdb DEFAULT CHARSET=utf8;

CREATE TABLE TRANSACCION (
	TRA_CVE					INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
    TRA_MEN                 INT NOT NULL,
    TRA_DES		   			INT NOT NULL
)ENGINE =InnOdb DEFAULT CHARSET=utf8;