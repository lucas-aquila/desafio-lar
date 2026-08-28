using DesafioLar.Domain.Enums;

namespace DesafioLar.Domain.Entities
{
    public class Phone
    {
        private Phone()
        {
        }

        public Phone(
            PhoneType type,
            string number)
        {
            Type = type;
            Number = number;
        }

        public int Id { get; private set; }

        public PhoneType Type { get; private set; }

        public string Number { get; private set; } = string.Empty;

        public int PersonId { get; private set; }

        public Person Person { get; private set; } = null!;

        public void Update(
            PhoneType type,
            string number)
        {
            Type = type;
            Number = number;
        }
    }
}