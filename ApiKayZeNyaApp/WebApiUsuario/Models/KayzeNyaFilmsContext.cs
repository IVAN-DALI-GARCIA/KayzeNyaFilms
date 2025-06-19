using System;
using System.Collections.Generic;
using Microsoft.EntityFrameworkCore;

namespace WebApiUsuario.Models;

public partial class KayzeNyaFilmsContext : DbContext
{
    public KayzeNyaFilmsContext()
    {
    }

    public KayzeNyaFilmsContext(DbContextOptions<KayzeNyaFilmsContext> options)
        : base(options)
    {
    }

    public virtual DbSet<Usuario> Usuarios { get; set; }


    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        modelBuilder.Entity<Usuario>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("PK__Usuario__3213E83F8D0B4971");

            entity.ToTable("Usuario");

            entity.Property(e => e.Id).HasColumnName("id");
            entity.Property(e => e.Apellido)
                .HasMaxLength(60)
                .HasColumnName("apellido");
            entity.Property(e => e.Correo)
                .HasMaxLength(100)
                .HasColumnName("correo");
            entity.Property(e => e.FechaRegistro)
                .HasDefaultValueSql("(getdate())")
                .HasColumnType("datetime")
                .HasColumnName("fecha_registro");
            entity.Property(e => e.Nombre)
                .HasMaxLength(60)
                .HasColumnName("nombre");
            entity.Property(e => e.UserName)
                .HasMaxLength(100)
                .IsUnicode(false)
                .HasColumnName("USER_NAME");
        });

        OnModelCreatingPartial(modelBuilder);
    }

    partial void OnModelCreatingPartial(ModelBuilder modelBuilder);
}
