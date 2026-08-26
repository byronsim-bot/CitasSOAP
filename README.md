# CitasSOAP

Servicio web SOAP desarrollado en ASP.NET Core utilizando CoreWCF, Entity Framework Core y SQL Server.

## Descripción

El proyecto permite administrar pacientes y citas mediante operaciones SOAP.

La aplicación utiliza:

- ASP.NET Core
- CoreWCF
- Entity Framework Core
- SQL Server
- Postman para las pruebas del servicio

## Base de datos

La base de datos utilizada es:

CitasSOAPDB

Contiene las tablas:

- Paciente
- Cita

La tabla Cita se relaciona con Paciente mediante IdPaciente como clave foránea.

El script para crear la base de datos se encuentra en:

SQL/CitasSOAPDB.sql

## Operaciones SOAP

El servicio implementa las siguientes operaciones:

- ObtenerPacientes
- ObtenerCitas
- ObtenerCita
- AgregarCita
- ActualizarCita
- EliminarCita
- ObtenerCitaPorTratamiento
- ObtenerCitaPorCedula

## Configuración

La cadena de conexión se encuentra en appsettings.json.

Ejemplo:

Server=.\MSSQLSERVER01;Database=CitasSOAPDB;Trusted_Connection=True;TrustServerCertificate=True;

El nombre de la instancia de SQL Server puede variar dependiendo del equipo.

## Ejecución

1. Ejecutar el script SQL para crear la base de datos.
2. Verificar la cadena de conexión en appsettings.json.
3. Ejecutar el proyecto CitasSOAP.
4. Consultar el WSDL desde:

http://localhost:PUERTO/CitaService.svc?wsdl

El puerto depende de la configuración local del proyecto.

## Pruebas

Las operaciones SOAP fueron probadas utilizando Postman mediante solicitudes POST.

Cada solicitud utiliza:

Content-Type: text/xml; charset=utf-8

y el SOAPAction correspondiente a cada operación.