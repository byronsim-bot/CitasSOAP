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

            // Registra el DbContext y usa la cadena "ConexionSQL" de appsettings.json
            builder.Services.AddDbContext<CitasDBContext>(options =>
                options.UseSqlServer(
                    builder.Configuration.GetConnectionString("ConexionSQL")
                )
            );

            // Registra la implementación del servicio SOAP
            builder.Services.AddScoped<CitaService>();

            // Activa CoreWCF y la publicación del WSDL
            builder.Services
                .AddServiceModelServices()
                .AddServiceModelMetadata();

            var app = builder.Build();

            // Publica el servicio SOAP en esta ruta
            app.UseServiceModel(serviceBuilder =>
            {
                serviceBuilder
                    .AddService<CitaService>()
                    .AddServiceEndpoint<CitaService, ICitaService>(
                        new BasicHttpBinding(),
                        "/CitaService.svc"
                    );
            });

            // Permite consultar el WSDL por HTTP
            var metadataBehavior =
                app.Services.GetRequiredService<ServiceMetadataBehavior>();

            metadataBehavior.HttpGetEnabled = true;

            app.Run();
        }
    }
}