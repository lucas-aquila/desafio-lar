using DesafioLar.Application.People.DTOs;
using DesafioLar.Application.People.Interfaces;
using DesafioLar.Domain.Entities;

namespace DesafioLar.Application.People.Services
{
    public class PersonService : IPersonService
    {
        private readonly IPersonRepository _personRepository;

        public PersonService(IPersonRepository personRepository)
        {
            _personRepository = personRepository;
        }

        public async Task<PersonResponse> CreateAsync(
            CreatePersonRequest request)
        {
            if (await _personRepository.ExistsByCpfAsync(request.Cpf))
            {
                throw new InvalidOperationException(
                    "Já existe uma pessoa cadastrada com este CPF.");
            }

            var person = new Person(
                request.Name,
                request.Cpf,
                request.BirthDate,
                request.IsActive);

            foreach (var phoneRequest in request.Phones)
            {
                var phone = new Phone(
                    phoneRequest.Type,
                    phoneRequest.Number);

                person.AddPhone(phone);
            }

            await _personRepository.AddAsync(person);
            await _personRepository.SaveChangesAsync();

            return MapToResponse(person);
        }

        public async Task<PersonResponse?> GetByIdAsync(int id)
        {
            var person = await _personRepository.GetByIdAsync(id);

            return person is null
                ? null
                : MapToResponse(person);
        }

        public async Task<IEnumerable<PersonResponse>> GetAllAsync()
        {
            var people = await _personRepository.GetAllAsync();

            return people.Select(MapToResponse);
        }

        public async Task<PersonResponse?> UpdateAsync(
            int id,
            UpdatePersonRequest request)
        {
            var person = await _personRepository.GetByIdAsync(id);

            if (person is null)
            {
                return null;
            }

            if (await _personRepository.ExistsByCpfAsync(
                    request.Cpf,
                    id))
            {
                throw new InvalidOperationException(
                    "Já existe outra pessoa cadastrada com este CPF.");
            }

            person.Update(
                request.Name,
                request.Cpf,
                request.BirthDate,
                request.IsActive);

            person.ClearPhones();

            foreach (var phoneRequest in request.Phones)
            {
                var phone = new Phone(
                    phoneRequest.Type,
                    phoneRequest.Number);

                person.AddPhone(phone);
            }

            _personRepository.Update(person);

            await _personRepository.SaveChangesAsync();

            return MapToResponse(person);
        }

        public async Task<bool> DeleteAsync(int id)
        {
            var person = await _personRepository.GetByIdAsync(id);

            if (person is null)
            {
                return false;
            }

            _personRepository.Delete(person);

            await _personRepository.SaveChangesAsync();

            return true;
        }

        private static PersonResponse MapToResponse(Person person)
        {
            return new PersonResponse
            {
                Id = person.Id,
                Name = person.Name,
                Cpf = person.Cpf,
                BirthDate = person.BirthDate,
                IsActive = person.IsActive,
                Phones = person.Phones
                    .Select(phone => new PhoneResponse
                    {
                        Id = phone.Id,
                        Type = phone.Type,
                        Number = phone.Number
                    })
                    .ToList()
            };
        }
    }
}