-- Tabla de usuarios
CREATE TABLE Usuarios (
    UsuarioID INT IDENTITY(1,1) PRIMARY KEY,
    Nombre NVARCHAR(100) NOT NULL,
    Email NVARCHAR(100) NOT NULL UNIQUE,
    PasswordHash NVARCHAR(255) NOT NULL,
    FechaRegistro DATETIME DEFAULT GETDATE(),
    EsActivo BIT DEFAULT 1
);

-- Tabla de roles (opcional, para permisos)
CREATE TABLE Roles (
    RolID INT IDENTITY(1,1) PRIMARY KEY,
    NombreRol NVARCHAR(50) NOT NULL UNIQUE
);

-- Tabla intermedia para asignar roles a usuarios
CREATE TABLE UsuarioRoles (
    UsuarioRolID INT IDENTITY(1,1) PRIMARY KEY,
    UsuarioID INT NOT NULL,
    RolID INT NOT NULL,
    FOREIGN KEY (UsuarioID) REFERENCES Usuarios(UsuarioID),
    FOREIGN KEY (RolID) REFERENCES Roles(RolID)
);

-- Tabla de logs de inicio de sesión (opcional, para auditoría)
CREATE TABLE LoginLogs (
    LogID INT IDENTITY(1,1) PRIMARY KEY,
    UsuarioID INT NOT NULL,
    FechaLogin DATETIME DEFAULT GETDATE(),
    Exitoso BIT,
    FOREIGN KEY (UsuarioID) REFERENCES Usuarios(UsuarioID)
);