using DesafioLar.Application.People.DTOs;
using System;
using System.Collections.Generic;
using System.Text;

namespace DesafioLar.Application.People.Interfaces
{
    public interface IPersonService
    {
        Task<PersonResponse> CreateAsync(PersonRequest request);

        Task<PersonResponse?> GetByIdAsync(int id);

        Task<IEnumerable<PersonResponse>> GetAllAsync();

        Task<PersonResponse?> UpdateAsync(int id, PersonRequest request);

        Task<bool> DeleteAsync(int id);
    }
}
