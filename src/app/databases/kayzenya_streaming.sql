-- Tabla de usuarios
CREATE TABLE Usuarios (
    UsuarioID INT IDENTITY(1,1) PRIMARY KEY,
    Nombre NVARCHAR(100) NOT NULL,
    Email NVARCHAR(100) NOT NULL UNIQUE,
    PasswordHash NVARCHAR(255) NOT NULL,
    FechaRegistro DATETIME DEFAULT GETDATE(),
    EsActivo BIT DEFAULT 1
);

-- Tabla de roles
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

-- Tabla de películas/series
CREATE TABLE Peliculas (
    PeliculaID INT IDENTITY(1,1) PRIMARY KEY,
    Titulo NVARCHAR(200) NOT NULL,
    Descripcion NVARCHAR(1000),
    FechaEstreno DATE,
    Genero NVARCHAR(100),
    ImagenUrl NVARCHAR(255),
    EsSerie BIT DEFAULT 0,
    EsRetro BIT DEFAULT 0
);

-- Tabla de favoritos
CREATE TABLE Favoritos (
    FavoritoID INT IDENTITY(1,1) PRIMARY KEY,
    UsuarioID INT NOT NULL,
    PeliculaID INT NOT NULL,
    FechaAgregado DATETIME DEFAULT GETDATE(),
    FOREIGN KEY (UsuarioID) REFERENCES Usuarios(UsuarioID),
    FOREIGN KEY (PeliculaID) REFERENCES Peliculas(PeliculaID)
);

-- Tabla de sugeridos
CREATE TABLE Sugeridos (
    SugeridoID INT IDENTITY(1,1) PRIMARY KEY,
    UsuarioID INT NOT NULL,
    PeliculaID INT NOT NULL,
    FechaSugerido DATETIME DEFAULT GETDATE(),
    FOREIGN KEY (UsuarioID) REFERENCES Usuarios(UsuarioID),
    FOREIGN KEY (PeliculaID) REFERENCES Peliculas(PeliculaID)
);

-- Tabla Top10
CREATE TABLE Top10 (
    Top10ID INT IDENTITY(1,1) PRIMARY KEY,
    PeliculaID INT NOT NULL,
    Ranking INT NOT NULL,
    FechaTop DATE NOT NULL,
    FOREIGN KEY (PeliculaID) REFERENCES Peliculas(PeliculaID)
);

-- Tabla de nuevos
CREATE TABLE Nuevos (
    NuevoID INT IDENTITY(1,1) PRIMARY KEY,
    PeliculaID INT NOT NULL,
    FechaAgregado DATETIME DEFAULT GETDATE(),
    FOREIGN KEY (PeliculaID) REFERENCES Peliculas(PeliculaID)
);

-- Tabla de más vistos
CREATE TABLE MasVistos (
    MasVistoID INT IDENTITY(1,1) PRIMARY KEY,
    PeliculaID INT NOT NULL,
    VecesVisto INT NOT NULL DEFAULT 0,
    FOREIGN KEY (PeliculaID) REFERENCES Peliculas(PeliculaID)
);

-- Tabla de retro
CREATE TABLE Retro (
    RetroID INT IDENTITY(1,1) PRIMARY KEY,
    PeliculaID INT NOT NULL,
    FechaRetro DATE,
    FOREIGN KEY (PeliculaID) REFERENCES Peliculas(PeliculaID)
);

-- Tabla de logs de inicio de sesión
CREATE TABLE LoginLogs (
    LogID INT IDENTITY(1,1) PRIMARY KEY,
    UsuarioID INT NOT NULL,
    FechaLogin DATETIME DEFAULT GETDATE(),
    Exitoso BIT,
    FOREIGN KEY (UsuarioID) REFERENCES Usuarios(UsuarioID)
);