using CitasSOAP.Model;
using CoreWCF;


namespace CitasSOAP.Services
{
    [ServiceContract]
    public interface ICitaService
    {
        [OperationContract]
        List<Paciente> ObtenerPacientes();

        [OperationContract]
        List<Cita> ObtenerCitas();

        [OperationContract]
        Cita? ObtenerCita(int id);

        [OperationContract]
        Cita AgregarCita(Cita cita);

        [OperationContract]
        Cita? ActualizarCita(Cita cita);

        [OperationContract]
        bool EliminarCita(int id);

        [OperationContract]
        List<Cita> ObtenerCitaPorTratamiento(string tratamiento);

        [OperationContract]
        List<Cita> ObtenerCitaPorCedula(string cedula);
    }
}