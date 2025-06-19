using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using WebApiUsuario.Models;

namespace WebApiUsuario.Controllers;
// /api/Usuario/ListarUsuarios

[ApiController]
[Route("api/[controller]")] // api/Usuario
// El prefijo "api/[controller]" se reemplaza por el nombre del controlador sin la palabra "Controller"
// Por ejemplo, si el controlador se llama UsuarioController, la ruta completa será "api/Usuario"
// Esto permite que el controlador responda a solicitudes HTTP en la ruta "api/Usuario"
public class UsuarioController : ControllerBase
{
  private readonly KayzeNyaFilmsContext _context;
  public UsuarioController(KayzeNyaFilmsContext context)
  {
    _context = context;
  }

  [HttpGet("ListarUsuarios")]
  // Ruta completa: api/Usuario/ListarUsuarios
  // Este método maneja solicitudes GET a la ruta "api/Usuario/ListarUsuarios"
  public async Task<ActionResult<IEnumerable<Usuario>>> ListarUsuarios()
  {
    var usuarios = await _context.Usuarios.ToListAsync();
    return Ok(usuarios);//codigo de estado 200 OK
  }

  [HttpGet("ObtenerUsuario/{id}")]
  // Ruta completa: api/Usuario/ObtenerUsuario/{id}
  public async Task<ActionResult<Usuario>> ObtenerUsuario(int id)
  {
    var usuario = await _context.Usuarios.FindAsync(id);
    if (usuario == null)
    {
      return NotFound(); // codigo de estado 404 Not Found
    }
    return Ok(usuario); // codigo de estado 200 OK
  }
  [HttpPost("CrearUsuario")]
  // Ruta completa: api/Usuario/CrearUsuario
  public async Task<ActionResult<Usuario>> CrearUsuario(Usuario usuario)
  {
    usuario.FechaRegistro = DateTime.Now; // Asignar la fecha de registro actual
    _context.Usuarios.Add(usuario);
    await _context.SaveChangesAsync();
    return StatusCode(StatusCodes.Status201Created, usuario); // codigo de estado 201 Created
  }

  [HttpPut("ActualizarUsuario/{id}")]
  // Ruta completa: api/Usuario/ActualizarUsuario/{id}
  public async Task<IActionResult> ActualizarUsuario(int id, Usuario usuario)
  {
    if (id != usuario.Id)
    {
      return BadRequest(); // codigo de estado 400 Bad Request
    }
    _context.Entry(usuario).State = EntityState.Modified;
    try
    {
      await _context.SaveChangesAsync();
    }
    catch (DbUpdateConcurrencyException)
    {
      if (!UsuarioExists(id))
      {
        return NotFound(); // codigo de estado 404 Not Found
      }
      else
      {
        throw;
      }
    }
    return NoContent(); // codigo de estado 204 No Content
  }

  private bool UsuarioExists(int id)
  {
    return _context.Usuarios.Any(e => e.Id == id);
  }

  [HttpDelete("EliminarUsuario/{id}")]
  // Ruta completa: api/Usuario/EliminarUsuario/{id}
  public async Task<IActionResult> EliminarUsuario(int id)
  {
    var usuario = await _context.Usuarios.FindAsync(id);
    if (usuario == null)
    {
      return NotFound(); // codigo de estado 404 Not Found
    }
    _context.Usuarios.Remove(usuario);
    await _context.SaveChangesAsync();
    return NoContent(); // codigo de estado 204 No Content
  }
}
