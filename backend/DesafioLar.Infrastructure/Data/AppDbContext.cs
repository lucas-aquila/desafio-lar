using DesafioLar.Domain.Entities;
using Microsoft.EntityFrameworkCore;

namespace DesafioLar.Infrastructure.Data
{
    public class AppDbContext : DbContext
    {
        public AppDbContext(DbContextOptions<AppDbContext> options)
            : base(options)
        {
        }

        public DbSet<Person> People { get; set; }

        public DbSet<Phone> Phones { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Person>(entity =>
            {
                entity.Property(p => p.Name)
                    .HasMaxLength(150)
                    .IsRequired();

                entity.Property(p => p.Cpf)
                    .HasMaxLength(11)
                    .IsRequired();

                entity.HasIndex(p => p.Cpf)
                    .IsUnique();

                entity.HasMany(p => p.Phones)
                    .WithOne(p => p.Person)
                    .HasForeignKey(p => p.PersonId)
                    .OnDelete(DeleteBehavior.Cascade);

                entity.Metadata
                    .FindNavigation(nameof(Person.Phones))!
                    .SetPropertyAccessMode(PropertyAccessMode.Field);
            });

            modelBuilder.Entity<Phone>(entity =>
            {
                entity.Property(p => p.Number)
                    .HasMaxLength(20)
                    .IsRequired();

                entity.Property(p => p.Type)
                    .IsRequired();
            });
        }
    }
}