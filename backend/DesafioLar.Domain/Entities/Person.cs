namespace DesafioLar.Domain.Entities
{
    public class Person
    {
        private readonly List<Phone> _phones = new();

        private Person()
        {
        }

        public Person(
            string name,
            string cpf,
            DateOnly birthDate)
        {
            Name = name;
            Cpf = cpf;
            BirthDate = birthDate;
            IsActive = true;
        }

        public int Id { get; private set; }

        public string Name { get; private set; } = string.Empty;

        public string Cpf { get; private set; } = string.Empty;

        public DateOnly BirthDate { get; private set; }

        public bool IsActive { get; private set; }

        public IReadOnlyCollection<Phone> Phones => _phones.AsReadOnly();

        public void AddPhone(Phone phone)
        {
            ArgumentNullException.ThrowIfNull(phone);

            _phones.Add(phone);
        }

        public void RemovePhone(Phone phone)
        {
            ArgumentNullException.ThrowIfNull(phone);

            _phones.Remove(phone);
        }

        public void ClearPhones()
        {
            _phones.Clear();
        }

        public void Update(
            string name,
            string cpf,
            DateOnly birthDate)
        {
            Name = name;
            Cpf = cpf;
            BirthDate = birthDate;
            IsActive = true;
        }

        public void Deactivate()
        {
            IsActive = false;
        }
    }
}