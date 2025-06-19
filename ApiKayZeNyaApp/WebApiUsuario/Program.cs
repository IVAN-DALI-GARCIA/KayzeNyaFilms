using Microsoft.EntityFrameworkCore;
using WebApiUsuario.Models;

namespace WebApiUsuario;

public class Program
{
    public static void Main(string[] args)
    {
        var builder = WebApplication.CreateBuilder(args);

        // Agregamos el servicio de contexto de base de datos
        builder.Services.AddDbContext<KayzeNyaFilmsContext>(options =>
            options.UseSqlServer(builder.Configuration.GetConnectionString("connectionDB")));

        // Agrega los controladores
        builder.Services.AddControllers();

        builder.Services.AddAuthorization();

        // OpenAPI/Swagger
        builder.Services.AddOpenApi();
        // Agrega la documentación de OpenAPI/Swagger
        builder.Services.AddSwaggerGen();
        var app = builder.Build();
        // agregamos la ruta para que de inicio carge swagger
        app.Use(async (context, next) =>
         {
             if (context.Request.Path == "/")
             {
                 context.Response.Redirect("/swagger/index.html");
                 return;
             }
             await next();
         });
        // Configure the HTTP request pipeline.
        if (app.Environment.IsDevelopment())
        {
            app.MapOpenApi();
            app.UseSwaggerUI();
            app.UseSwagger();
        }

        app.UseHttpsRedirection();

        app.UseAuthorization();

        // Mapea los controladores
        app.MapControllers();

        // Ejemplo de endpoint minimal API (puedes dejarlo o quitarlo)
        var summaries = new[]
        {
            "Freezing", "Bracing", "Chilly", "Cool", "Mild", "Warm", "Balmy", "Hot", "Sweltering", "Scorching"
        };

        app.MapGet("/weatherforecast", (HttpContext httpContext) =>
        {
            var forecast = Enumerable.Range(1, 5).Select(index =>
                new WeatherForecast
                {
                    Date = DateOnly.FromDateTime(DateTime.Now.AddDays(index)),
                    TemperatureC = Random.Shared.Next(-20, 55),
                    Summary = summaries[Random.Shared.Next(summaries.Length)]
                })
                .ToArray();
            return forecast;
        })
        .WithName("GetWeatherForecast");

        app.Run();
    }
}
