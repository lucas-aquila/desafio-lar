using DesafioLar.Domain.Enums;
using System.ComponentModel.DataAnnotations;

namespace DesafioLar.Application.People.DTOs;

public class PersonRequest
{
    [Required(
        ErrorMessage = "CPF é obrigatório."
    )]
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

    [Required(
        ErrorMessage = "Nome é obrigatório."
    )]
    [StringLength(
        150,
        ErrorMessage = "Nome deve possuir no máximo 150 caracteres."
    )]
    public string Name { get; set; } = string.Empty;

    [Required(
        ErrorMessage = "Data de nascimento é obrigatória."
    )]
    public DateOnly BirthDate { get; set; }

    public List<PhoneRequest> Phones { get; set; } = [];
}