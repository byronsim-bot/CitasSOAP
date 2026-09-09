# CitasSOAP

## Sistema de Gestión de Citas Médicas

Proyecto académico desarrollado para la asignatura de Programación Web.

El sistema permite gestionar pacientes, médicos y citas médicas mediante una aplicación web desarrollada con Angular, conectada a servicios SOAP y REST desarrollados en ASP.NET Core.

También integra una API externa de clima para consultar el pronóstico correspondiente a la fecha de una cita médica y mostrar una recomendación al usuario.

---

## Funcionalidades

El sistema permite:

- Registrar, consultar, actualizar y eliminar pacientes.
- Registrar, consultar, actualizar y eliminar médicos.
- Registrar, consultar, actualizar y eliminar citas médicas.
- Relacionar cada cita con un paciente y un médico.
- Consultar los datos completos de una cita.
- Visualizar el nombre del paciente y del médico asociados.
- Consultar el pronóstico del clima para la fecha de una cita.
- Mostrar una recomendación de acuerdo con las condiciones climáticas.
- Validar los datos ingresados en los formularios.
- Mostrar mensajes de confirmación y error durante las operaciones.

---

## Entidades

### Paciente

Contiene la información de los pacientes registrados en el sistema.

Datos principales:

- IdPaciente
- Cédula
- Nombre
- Apellido
- Teléfono
- Estado

### Médico

Contiene la información de los médicos.

Datos principales:

- IdMedico
- Cédula
- Nombre
- Apellido
- Cargo
- Especialidad

### Cita

Representa una cita médica y relaciona a un paciente con un médico.

Datos principales:

- IdCita
- IdPaciente
- IdMedico
- Fecha
- Hora
- Motivo
- Tratamiento
- Estado

### Relaciones

Cada cita pertenece a un paciente y a un médico.

```text
Paciente 1 ───── N Cita N ───── 1 Médico
```

---

## Tecnologías utilizadas

### Backend

- ASP.NET Core
- C#
- CoreWCF
- Entity Framework Core
- REST API
- SOAP

### Frontend

- Angular
- TypeScript
- HTML
- CSS

### Base de datos

- SQL Server

### Herramientas

- Visual Studio
- Visual Studio Code
- Postman
- Git
- GitHub

### API externa

- Open-Meteo

---

## Arquitectura del sistema

El proyecto utiliza una arquitectura basada en servicios.

Angular funciona como frontend y consume los servicios desarrollados en ASP.NET Core.

```text
                 ┌─────────────────────┐
                 │       Angular       │
                 │      Frontend       │
                 └──────────┬──────────┘
                            │
              ┌─────────────┼─────────────┐
              │             │             │
              ▼             ▼             ▼
        Servicio SOAP   Servicio REST   Open-Meteo
        Pacientes       Médicos         API externa
        Citas
              │             │
              └──────┬──────┘
                     ▼
                SQL Server
               CitasSOAPDB
```

---

## Servicios SOAP

El servicio SOAP fue desarrollado utilizando CoreWCF.

Dirección utilizada durante el desarrollo:

```text
http://localhost:5237/CitaService.svc
```

WSDL:

```text
http://localhost:5237/CitaService.svc?wsdl
```

### Operaciones de pacientes

- ObtenerPacientes
- ObtenerPaciente
- AgregarPaciente
- ActualizarPaciente
- EliminarPaciente

### Operaciones de citas

- ObtenerCitas
- ObtenerCita
- AgregarCita
- ActualizarCita
- EliminarCita
- ObtenerCitaPorTratamiento
- ObtenerCitaPorCedula

---

## Servicio REST de médicos

La gestión de médicos se realiza mediante una API REST desarrollada con ASP.NET Core.

Dirección utilizada durante el desarrollo:

```text
https://localhost:7074/api/Medico
```

### Endpoints

| Método | Endpoint | Acción |
|---|---|---|
| GET | `/api/Medico` | Obtener todos los médicos |
| GET | `/api/Medico/{id}` | Obtener médico por ID |
| GET | `/api/Medico/cedula/{cedula}` | Buscar médico por cédula |
| POST | `/api/Medico` | Registrar médico |
| PUT | `/api/Medico/{id}` | Actualizar médico |
| DELETE | `/api/Medico/{id}` | Eliminar médico |

---

## Frontend Angular

El frontend permite administrar las tres entidades desde una interfaz web.

Se incluyen formularios para:

- Pacientes
- Médicos
- Citas

También se muestran los registros almacenados en la base de datos y las opciones necesarias para editar y eliminar información.

En el registro de una cita, el usuario selecciona el paciente y el médico correspondientes.

Además, cada cita dispone de una opción **Ver detalle**, donde se muestran los datos completos de la cita junto con el pronóstico climático y una recomendación.

Durante el desarrollo Angular se ejecuta mediante:

```bash
ng serve
```

Dirección:

```text
http://localhost:4200
```

---

## API externa de clima

El sistema consume directamente desde Angular la API de Open-Meteo.

La consulta utiliza la fecha seleccionada para la cita y obtiene información como:

- Condición climática.
- Temperatura máxima.
- Temperatura mínima.
- Probabilidad de lluvia.

Con estos datos el sistema genera una recomendación para el usuario, por ejemplo tomar precauciones en caso de lluvia o utilizar ropa abrigada cuando se esperan temperaturas bajas.

Si no existe un pronóstico disponible para la fecha seleccionada, el sistema informa al usuario.

---

## Validaciones

Los formularios incluyen validaciones antes de enviar información a los servicios.

Entre ellas:

- Campos obligatorios.
- Cédulas de 10 dígitos.
- Validación de datos numéricos.
- Selección obligatoria de paciente y médico para una cita.
- Fecha y hora obligatorias.
- Motivo y tratamiento obligatorios.

El sistema también presenta mensajes cuando una operación se realiza correctamente o cuando ocurre un error.

---

## Base de datos

La información se almacena en SQL Server en la base de datos:

```text
CitasSOAPDB
```

Las entidades principales son:

```text
Paciente
Medico
Cita
```

La tabla de citas contiene las relaciones correspondientes con paciente y médico.

El script necesario para crear la base de datos se encuentra en:

```text
SQL/
```

---

## Pruebas con Postman

Los servicios fueron probados utilizando Postman.

La colección exportada se encuentra en:

```text
Postman/
```

Esta colección contiene las solicitudes utilizadas para comprobar las operaciones de los servicios.

Para utilizarla:

1. Abrir Postman.
2. Seleccionar Import.
3. Seleccionar el archivo `.json` ubicado en la carpeta `Postman`.
4. Ejecutar las solicitudes con el backend iniciado.

---

## Ejecución del proyecto

### 1. Base de datos

Ejecutar el script incluido en la carpeta:

```text
SQL/
```

en SQL Server para crear la base de datos y sus tablas.

### 2. Backend

Abrir el proyecto `CitasSOAP` en Visual Studio.

Verificar la cadena de conexión de SQL Server en:

```text
appsettings.json
```

Ejecutar el proyecto.

Comprobar que estén disponibles el servicio SOAP y la API REST.

### 3. Frontend

Abrir una terminal en el proyecto Angular.

Instalar las dependencias:

```bash
npm install
```

Ejecutar:

```bash
ng serve
```

Abrir en el navegador:

```text
http://localhost:4200
```

---

## Estructura de entrega

```text
CitasSOAP/
│
├── Controllers/
├── Data/
├── Model/
├── Services/
│
├── FrontendAngular/
│   └── CitasAngular/
│
├── SQL/
│
├── Postman/
│
├── Program.cs
├── appsettings.json
├── README.md
└── .gitignore
```

Las carpetas generadas automáticamente, como `bin`, `obj`, `node_modules` y `.angular`, no son necesarias para ejecutar el proyecto desde el repositorio y no deben incluirse.

---

## Autor

**Byron David Hernández**

Proyecto académico – Programación Web