CREATE DATABASE CitasSOAPDB;
GO

USE CitasSOAPDB;
GO

CREATE TABLE Paciente
(
    IdPaciente INT IDENTITY(1,1) PRIMARY KEY,
    Cedula VARCHAR(10) NOT NULL,
    Nombre NVARCHAR(50) NOT NULL,
    Apellido NVARCHAR(50) NOT NULL,
    Telefono VARCHAR(15) NULL,
    Estado BIT NOT NULL DEFAULT 1
);
GO

CREATE TABLE Medico
(
    IdMedico INT IDENTITY(1,1) PRIMARY KEY,
    Cedula VARCHAR(10) NOT NULL,
    Nombre VARCHAR(100) NOT NULL,
    Apellido VARCHAR(100) NOT NULL,
    Cargo VARCHAR(100) NOT NULL,
    Especialidad VARCHAR(100) NOT NULL
);
GO

CREATE TABLE Cita
(
    IdCita INT IDENTITY(1,1) PRIMARY KEY,
    Fecha DATE NOT NULL,
    Hora TIME NOT NULL,
    Motivo NVARCHAR(150) NOT NULL,
    Tratamiento NVARCHAR(200) NOT NULL,
    Estado BIT NOT NULL DEFAULT 1,
    IdPaciente INT NOT NULL,
    IdMedico INT NOT NULL,

    CONSTRAINT FK_Cita_Paciente
        FOREIGN KEY (IdPaciente)
        REFERENCES Paciente(IdPaciente),

    CONSTRAINT FK_Cita_Medico
        FOREIGN KEY (IdMedico)
        REFERENCES Medico(IdMedico)
);
GO

INSERT INTO Paciente
(
    Cedula,
    Nombre,
    Apellido,
    Telefono,
    Estado
)
VALUES
(
    '0912345678',
    'Maria',
    'Lopez',
    '0991234567',
    1
);
GO

INSERT INTO Medico
(
    Cedula,
    Nombre,
    Apellido,
    Cargo,
    Especialidad
)
VALUES
(
    '1722382926',
    'Jorge',
    'Mendoza',
    'Medico',
    'Medicina General'
);
GO

INSERT INTO Cita
(
    Fecha,
    Hora,
    Motivo,
    Tratamiento,
    Estado,
    IdPaciente,
    IdMedico
)
VALUES
(
    '2026-08-25',
    '10:30:00',
    'Dolor dental',
    'Evaluacion general',
    1,
    1,
    1
);
GO

SELECT * FROM Paciente;
SELECT * FROM Medico;
SELECT * FROM Cita;
GO