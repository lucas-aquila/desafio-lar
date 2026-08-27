using DesafioLar.Domain.Enums;

namespace DesafioLar.Application.People.DTOs
{
    public class PersonResponse
    {
        public int Id { get; set; }

        public string Name { get; set; } = string.Empty;

        public string Cpf { get; set; } = string.Empty;

        public DateOnly BirthDate { get; set; }

        public bool IsActive { get; set; }

        public List<PhoneResponse> Phones { get; set; } = new();
    }

    public class PhoneResponse
    {
        public int Id { get; set; }

        public PhoneType Type { get; set; }

        public string Number { get; set; } = string.Empty;
    }
}