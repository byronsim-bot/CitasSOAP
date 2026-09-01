using CitasSOAP.Model;
using Microsoft.EntityFrameworkCore;


namespace CitasSOAP.Data
{
    public class CitasDBContext : DbContext
    {
        public CitasDBContext(DbContextOptions<CitasDBContext> options)
            : base(options)
        {
        }

        public DbSet<Paciente> Pacientes { get; set; }
        public DbSet<Cita> Citas { get; set; }
        public DbSet<Medico> Medicos { get; set; }

    }
}