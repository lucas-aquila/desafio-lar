using DesafioLar.Application.People.Interfaces;
using DesafioLar.Domain.Entities;
using DesafioLar.Infrastructure.Data;
using Microsoft.EntityFrameworkCore;

namespace DesafioLar.Infrastructure.Repositories
{
    public class PersonRepository : IPersonRepository
    {
        private readonly AppDbContext _context;

        public PersonRepository(AppDbContext context)
        {
            _context = context;
        }

        public async Task AddAsync(Person person)
        {
            await _context.People.AddAsync(person);
        }

        public async Task<Person?> GetByIdAsync(int id)
        {
            return await _context.People
                .Where(p => p.IsActive)
                .Include(p => p.Phones)
                .FirstOrDefaultAsync(p => p.Id == id);
        }

        public async Task<List<Person>> GetAllAsync()
        {
            return await _context.People
                .Where(p => p.IsActive)
                .Include(p => p.Phones)
                .ToListAsync();
        }

        public void Update(Person person)
        {
            _context.People.Update(person);
        }

        public async Task<bool> ExistsByCpfAsync(
            string cpf,
            int? personId = null)
        {
            return await _context.People
                .Where(p => p.IsActive)
                .AnyAsync(p =>
                    p.Cpf == cpf &&
                    (!personId.HasValue || p.Id != personId.Value));
        }

        public async Task SaveChangesAsync()
        {
            await _context.SaveChangesAsync();
        }
    }
}