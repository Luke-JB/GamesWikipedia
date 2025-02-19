using gwBackend.Data;
using gwBackend.Data.DTO;
using gwBackend.Data.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace gwBackend.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class GamesController : ControllerBase
    {
        private readonly GamesDbContext _context;

        public GamesController(GamesDbContext context)
        {
            _context = context;
        }

        // Get Games
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Game>>> GetGames()
        {
            return await _context.Games.ToListAsync();
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<Game>> GetGame(int id)
        {
            var game = await _context.Games.FindAsync(id); // Get game by id logic
            if (game == null)
            {
                return NotFound();
            }
            return Ok(game);
        }

        // Post / Creates Games
        [HttpPost]
        [Route("NewGame")]
        public async Task<IActionResult> NewGame([FromBody] GameDto game)
        {
            await _context.AddAsync(game);
            await _context.SaveChangesAsync();
            return Ok();
        }

        // Update Games
        [HttpPut("{id}")]
        [Route("UpdateGame")]
        public async Task<IActionResult> PutGame(int id, GameDto game)
        {
            if (id != game.GameId)
            {
                return BadRequest();
            }

            _context.Entry(game).State = EntityState.Modified;
            await _context.SaveChangesAsync();

            return NoContent();
        }

        // Delete Games
        [HttpDelete("{id}")]
        [Route("DeleteGame")]
        public async Task<IActionResult> DeleteGame(int id)
        {
            var game = await _context.Games.FindAsync(id);
            if (game == null)
            {
                return NotFound();
            }

            _context.Games.Remove(game);
            await _context.SaveChangesAsync();

            return NoContent();
        }
    }
}
