using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace CitasSOAP.Model
{
    [Table("Medico")]
    public class Medico
    {
        [Key]
        public int IdMedico { get; set; }

        public string Cedula { get; set; } = string.Empty;

        public string Nombre { get; set; } = string.Empty;

        public string Apellido { get; set; } = string.Empty;

        public string Cargo { get; set; } = string.Empty;

        public string Especialidad { get; set; } = string.Empty;
    }
}