using DesafioLar.Domain.Entities;

namespace DesafioLar.Application.People.Interfaces
{
    public interface IPersonRepository
    {
        Task AddAsync(Person person);

        Task<Person?> GetByIdAsync(int id);

        Task<List<Person>> GetAllAsync(
            string? name,
            int page,
            int pageSize);

        Task<int> CountAsync(string? name);

        void Update(Person person);

        Task<bool> ExistsByCpfAsync(
            string cpf,
            int? personId = null);

        Task SaveChangesAsync();
    }
}