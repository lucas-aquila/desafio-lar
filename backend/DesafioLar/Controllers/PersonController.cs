using DesafioLar.Application.People.DTOs;
using DesafioLar.Application.People.Interfaces;
using Microsoft.AspNetCore.Mvc;

namespace DesafioLar.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class PersonController : ControllerBase
    {
        private readonly IPersonService _personService;

        public PersonController(IPersonService personService)
        {
            _personService = personService;
        }

        [HttpPost]
        public async Task<IActionResult> Create(
            [FromBody] PersonRequest request)
        {
            try
            {
                var person = await _personService.CreateAsync(request);

                return CreatedAtAction(
                    nameof(GetById),
                    new { id = person.Id },
                    person);
            }
            catch (InvalidOperationException ex)
            {
                return Conflict(new
                {
                    message = ex.Message
                });
            }
        }

        [HttpGet]
        public async Task<IActionResult> GetAll(
            [FromQuery] string? name = null,
            [FromQuery] int page = 1,
            [FromQuery] int pageSize = 10)
        {
            if (page < 1)
            {
                return BadRequest(new
                {
                    message = "A página deve ser maior ou igual a 1."
                });
            }

            if (pageSize < 1 || pageSize > 100)
            {
                return BadRequest(new
                {
                    message = "O tamanho da página deve estar entre 1 e 100."
                });
            }

            var people = await _personService.GetAllAsync(
                name,
                page,
                pageSize);

            return Ok(people);
        }

        [HttpGet("{id:int}")]
        public async Task<IActionResult> GetById(int id)
        {
            var person = await _personService.GetByIdAsync(id);

            if (person is null)
            {
                return NotFound();
            }

            return Ok(person);
        }

        [HttpPut("{id:int}")]
        public async Task<IActionResult> Update(
            int id,
            [FromBody] PersonRequest request)
        {
            try
            {
                var person = await _personService.UpdateAsync(
                    id,
                    request);

                if (person is null)
                {
                    return NotFound();
                }

                return Ok(person);
            }
            catch (InvalidOperationException ex)
            {
                return Conflict(new
                {
                    message = ex.Message
                });
            }
        }

        [HttpDelete("{id:int}")]
        public async Task<IActionResult> Delete(int id)
        {
            var deleted = await _personService.DeleteAsync(id);

            if (!deleted)
            {
                return NotFound();
            }

            return NoContent();
        }
    }
}