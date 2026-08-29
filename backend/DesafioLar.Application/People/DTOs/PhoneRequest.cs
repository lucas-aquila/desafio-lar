using DesafioLar.Domain.Enums;
using System.ComponentModel.DataAnnotations;

namespace DesafioLar.Application.People.DTOs;

public class PhoneRequest
{
    [Required(
        ErrorMessage = "Tipo do telefone é obrigatório."
    )]
    public PhoneType Type { get; set; }

    [Required(
        ErrorMessage = "Número do telefone é obrigatório."
    )]
    [StringLength(
        11,
        MinimumLength = 10,
        ErrorMessage = "Telefone deve conter 10 ou 11 dígitos."
    )]
    [RegularExpression(
        @"^\d{10,11}$",
        ErrorMessage = "Telefone deve conter apenas números, com 10 ou 11 dígitos."
    )]
    public string Number { get; set; } = string.Empty;
}