using DesafioLar.Application.People.DTOs;

namespace DesafioLar.Application.People.Interfaces
{
    public interface IPersonService
    {
        Task<PersonResponse> CreateAsync(PersonRequest request);

        Task<PersonResponse?> GetByIdAsync(int id);

        Task<PagedResult<PersonResponse>> GetAllAsync(
            string? name,
            int page,
            int pageSize);

        Task<PersonResponse?> UpdateAsync(
            int id,
            PersonRequest request);

        Task<bool> DeleteAsync(int id);
    }
}