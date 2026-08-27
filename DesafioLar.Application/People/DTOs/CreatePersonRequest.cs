using DesafioLar.Domain.Enums;
using System;
using System.Collections.Generic;
using System.Text;

namespace DesafioLar.Application.People.DTOs
{
    public class CreatePersonRequest
    {
        public string Name { get; set; } = string.Empty;

        public string Cpf { get; set; } = string.Empty;

        public DateOnly BirthDate { get; set; }

        public bool IsActive { get; set; }

        public List<CreatePhoneRequest> Phones { get; set; } = new();
    }
}
