using DesafioLar.Domain.Enums;
using System;
using System.Collections.Generic;
using System.Text;

namespace DesafioLar.Application.People.DTOs
{
    using System.ComponentModel.DataAnnotations;

    public class PersonRequest
    {
        [Required]
        [StringLength(
            11,
            MinimumLength = 11,
            ErrorMessage = "CPF deve conter exatamente 11 caracteres."
        )]
        [RegularExpression(
            @"^\d{11}$",
            ErrorMessage = "CPF deve conter exatamente 11 dígitos."
        )]
        public string Cpf { get; set; } = string.Empty;

        [Required]
        public string Name { get; set; } = string.Empty;

        [Required]
        public DateOnly BirthDate { get; set; }

        public List<PhoneRequest> Phones { get; set; } = [];
    }
}
