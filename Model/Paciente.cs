using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace CitasSOAP.Model
    {

      [Table("Paciente")] 
     public class Paciente
        {
               
            [Key]
            public int IdPaciente { get; set; }

            public string Cedula { get; set; } = string.Empty;

            public string Nombre { get; set; } = string.Empty;

            public string Apellido { get; set; } = string.Empty;

            public string Telefono { get; set; } = string.Empty;

            public bool Estado { get; set; }
        }
    }
   

