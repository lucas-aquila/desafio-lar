using DesafioLar.Application.People.DTOs;
using DesafioLar.Application.People.Interfaces;
using Microsoft.AspNetCore.Mvc;

namespace DesafioLar.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class PeopleController : ControllerBase
    {
        private readonly IPersonService _personService;

        public PeopleController(IPersonService personService)
        {
            _personService = personService;
        }

        [HttpPost]
        public async Task<IActionResult> Create(
            [FromBody] CreatePersonRequest request)
        {
            var person = await _personService.CreateAsync(request);

            return CreatedAtAction(
                nameof(GetById),
                new { id = person.Id },
                person);
        }

        [HttpGet]
        public async Task<IActionResult> GetAll()
        {
            var people = await _personService.GetAllAsync();

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
            [FromBody] UpdatePersonRequest request)
        {
            var person = await _personService.UpdateAsync(id, request);

            if (person is null)
            {
                return NotFound();
            }

            return Ok(person);
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