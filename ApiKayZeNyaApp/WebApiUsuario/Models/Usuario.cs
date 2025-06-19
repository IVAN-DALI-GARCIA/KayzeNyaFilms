using System;
using System.Collections.Generic;

namespace WebApiUsuario.Models;

public partial class Usuario
{
    public int Id { get; set; }

    public string Nombre { get; set; } = null!;

    public string Apellido { get; set; } = null!;

    public string Correo { get; set; } = null!;

    public string? UserName { get; set; }

    public DateTime? FechaRegistro { get; set; }
}
