using DesafioLar.Domain.Enums;
using System;
using System.Collections.Generic;
using System.Text;

namespace DesafioLar.Application.People.DTOs
{
    public class CreatePhoneRequest
    {
        public PhoneType Type { get; set; }

        public string Number { get; set; } = string.Empty;
    }
}
