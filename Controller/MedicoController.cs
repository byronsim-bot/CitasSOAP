using CitasSOAP.Data;
using CitasSOAP.Model;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace CitasSOAP.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class MedicoController : ControllerBase
    {
        private readonly CitasDBContext _context;

        public MedicoController(CitasDBContext context)
        {
            _context = context;
        }

       
        [HttpGet]
        public async Task<ActionResult<List<Medico>>> ObtenerMedicos()
        {
            var medicos = await _context.Medicos
                .AsNoTracking()
                .OrderBy(m => m.IdMedico)
                .ToListAsync();

            return Ok(medicos);
        }

        
        [HttpGet("{id:int}")]
        public async Task<ActionResult<Medico>> ObtenerMedico(int id)
        {
            var medico = await _context.Medicos
                .AsNoTracking()
                .FirstOrDefaultAsync(m => m.IdMedico == id);

            if (medico == null)
            {
                return NotFound(new { mensaje = "Medico no encontrado" });
            }

            return Ok(medico);
        }

        [HttpGet("cedula/{cedula}")]
        public async Task<ActionResult<Medico>> ObtenerMedicoPorCedula(string cedula)
        {
            var medico = await _context.Medicos
                .AsNoTracking()
                .FirstOrDefaultAsync(m => m.Cedula == cedula);

            if (medico == null)
            {
                return NotFound(new { mensaje = "Medico no encontrado" });
            }

            return Ok(medico);
        }

       
        [HttpPost]
        public async Task<ActionResult<Medico>> AgregarMedico(Medico medico)
        {
            _context.Medicos.Add(medico);
            await _context.SaveChangesAsync();

            return CreatedAtAction(
                nameof(ObtenerMedico),
                new { id = medico.IdMedico },
                medico
            );
        }

   
        [HttpPut("{id:int}")]
        public async Task<ActionResult> ActualizarMedico(int id, Medico medico)
        {
            var medicoExistente = await _context.Medicos.FindAsync(id);

            if (medicoExistente == null)
            {
                return NotFound(new { mensaje = "Medico no encontrado" });
            }

            medicoExistente.Cedula = medico.Cedula;
            medicoExistente.Nombre = medico.Nombre;
            medicoExistente.Apellido = medico.Apellido;
            medicoExistente.Cargo = medico.Cargo;
            medicoExistente.Especialidad = medico.Especialidad;

            await _context.SaveChangesAsync();

            return Ok(medicoExistente);
        }

        [HttpDelete("{id:int}")]
        public async Task<ActionResult> EliminarMedico(int id)
        {
            var medico = await _context.Medicos.FindAsync(id);

            if (medico == null)
            {
                return NotFound(new { mensaje = "Medico no encontrado" });
            }

            _context.Medicos.Remove(medico);
            await _context.SaveChangesAsync();

            return NoContent();
        }
    }
}