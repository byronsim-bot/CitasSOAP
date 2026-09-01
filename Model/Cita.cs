using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace CitasSOAP.Model
{
    [Table("Cita")]
    public class Cita
    {
        [Key]
        public int IdCita { get; set; }

        public DateTime Fecha { get; set; }

        public TimeSpan Hora { get; set; }

        public string Motivo { get; set; } = string.Empty;

        public string Tratamiento { get; set; } = string.Empty;

        public bool Estado { get; set; }

        public int IdPaciente { get; set; }

        public int IdMedico { get; set; }
    }
}