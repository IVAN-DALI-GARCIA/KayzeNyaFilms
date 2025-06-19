CREATE DATABASE KayzeNyaFilms
GO

Use KayzeNyaFilms
GO
-- Cremaos ua tabla de Usuario

CREATE TABLE Usuario (
    id INT PRIMARY KEY IDENTITY(1,1),
    nombre NVARCHAR(60) NOT NULL,
    apellido NVARCHAR(60) NOT NULL,
    correo NVARCHAR(100) NOT NULL,
    USER_NAME VARCHAR(100),
    fecha_registro DATETIME DEFAULT GETDATE()
);
GO
SELECT * FROM Usuario;
-- INSERTAMOS VALORES EN LA TABLA USUARIO
INSERT INTO Usuario (nombre, apellido, correo, USER_NAME)
VALUES ('Juan Carlos ', 'Sanchez Calderon', 'juan.sanchez@kayzenia.com', 'juancarlos');
INSERT INTO Usuario (nombre, apellido, correo, USER_NAME)
VALUES ('Maria Elena', 'Gomez Torres', 'mariaelena@kayzenia.com', 'mariaelena');
INSERT INTO Usuario (nombre, apellido, correo, USER_NAME)
VALUES ('Carlos Alberto', 'Lopez Ramirez', 'carlosRamirez@@kayzenia.com', 'carlosalberto');