namespace DesafioLar.Application.People.DTOs
{
    public class UpdatePersonRequest
    {
        public string Name { get; set; } = string.Empty;

        public string Cpf { get; set; } = string.Empty;

        public DateOnly BirthDate { get; set; }

        public bool IsActive { get; set; }

        public List<CreatePhoneRequest> Phones { get; set; } = new();
    }
}