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

            // Registra el DbContext
            builder.Services.AddDbContext<CitasDBContext>(options =>
                options.UseSqlServer(
                    builder.Configuration.GetConnectionString("ConexionSQL")
                )
            );

            // Registra el servicio SOAP
            builder.Services.AddScoped<CitaService>();

            // Activa los controladores REST
            builder.Services.AddControllers();

            // Habilita CORS para Angular
            builder.Services.AddCors(options =>
            {
                options.AddPolicy("PermitirAngular", policy =>
                {
                    policy
                        .WithOrigins("http://localhost:4200")
                        .AllowAnyHeader()
                        .AllowAnyMethod();
                });
            });

            // Activa CoreWCF y WSDL
            builder.Services
                .AddServiceModelServices()
                .AddServiceModelMetadata();

            var app = builder.Build();

            // Aplica CORS
            app.UseCors("PermitirAngular");

            // Publica controladores REST
            app.MapControllers();

            // Publica SOAP
            app.UseServiceModel(serviceBuilder =>
            {
                serviceBuilder
                    .AddService<CitaService>()
                    .AddServiceEndpoint<CitaService, ICitaService>(
                        new BasicHttpBinding(),
                        "/CitaService.svc"
                    );
            });

            // Habilita WSDL
            var metadataBehavior =
                app.Services.GetRequiredService<ServiceMetadataBehavior>();

            metadataBehavior.HttpGetEnabled = true;

            app.Run();
        }
    }
}