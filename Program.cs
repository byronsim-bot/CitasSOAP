using CitasSOAP.Data;
using CitasSOAP.Services;
using CoreWCF;
using CoreWCF.Configuration;
using CoreWCF.Description;
using Microsoft.EntityFrameworkCore;

namespace CitasSOAP
{
    public class Program
    {
        public static void Main(string[] args)
        {
            var builder = WebApplication.CreateBuilder(args);

            // Registra el DbContext y usa la cadena "ConexionSQL"
            // que tenemos en appsettings.json
            builder.Services.AddDbContext<CitasDBContext>(options =>
                options.UseSqlServer(
                    builder.Configuration.GetConnectionString("ConexionSQL")
                )
            );

            // Registra la implementación del servicio SOAP
            builder.Services.AddScoped<CitaService>();

            // Activa los controladores para nuestro servicio REST
            builder.Services.AddControllers();

            // Activa CoreWCF y la publicación del WSDL para SOAP
            builder.Services
                .AddServiceModelServices()
                .AddServiceModelMetadata();

            var app = builder.Build();

            // Publica los controladores REST
            // Por ejemplo: /api/Medico
            app.MapControllers();

            // Publica el servicio SOAP
            app.UseServiceModel(serviceBuilder =>
            {
                serviceBuilder
                    .AddService<CitaService>()
                    .AddServiceEndpoint<CitaService, ICitaService>(
                        new BasicHttpBinding(),
                        "/CitaService.svc"
                    );
            });

            // Permite consultar el WSDL de SOAP por HTTP
            var metadataBehavior =
                app.Services.GetRequiredService<ServiceMetadataBehavior>();

            metadataBehavior.HttpGetEnabled = true;

            app.Run();
        }
    }
}