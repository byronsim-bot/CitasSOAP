using CoreWCF;
using CitasSOAP.Data;
using CitasSOAP.Model;

namespace CitasSOAP.Services
{
	[ServiceBehavior(InstanceContextMode = InstanceContextMode.PerCall)]
	public class CitaService : ICitaService
	{
		private readonly CitasDBContext _context;

		public CitaService(CitasDBContext context)
		{
			_context = context;
		}

		public List<Paciente> ObtenerPacientes()
		{
			return _context.Pacientes.ToList();
		}
		public List<Cita> ObtenerCitas()
		{
			return _context.Citas.ToList();
		}

		public Cita? ObtenerCita(int id)
		{
			return _context.Citas.Find(id);
		}

		public Cita AgregarCita(Cita cita)
		{
			_context.Citas.Add(cita);
			_context.SaveChanges();

			return cita;
		}

		public Cita? ActualizarCita(Cita cita)
		{
			var citaExistente = _context.Citas.Find(cita.IdCita);

			if (citaExistente == null)
				return null;

			citaExistente.Fecha = cita.Fecha;
			citaExistente.Hora = cita.Hora;
			citaExistente.Motivo = cita.Motivo;
			citaExistente.Tratamiento = cita.Tratamiento;
			citaExistente.Estado = cita.Estado;
			citaExistente.IdPaciente = cita.IdPaciente;

			_context.SaveChanges();

			return citaExistente;
		}

		public bool EliminarCita(int id)
		{
			var cita = _context.Citas.Find(id);

			if (cita == null)
				return false;

			_context.Citas.Remove(cita);
			_context.SaveChanges();

			return true;
		}

		public List<Cita> ObtenerCitaPorTratamiento(string tratamiento)
		{
			return _context.Citas
				.Where(c => c.Tratamiento.Contains(tratamiento))
				.ToList();
		}

		public List<Cita> ObtenerCitaPorCedula(string cedula)
		{
			return _context.Citas
				.Where(c => _context.Pacientes
					.Any(p => p.IdPaciente == c.IdPaciente &&
							  p.Cedula == cedula))
				.ToList();
		}
	}
}