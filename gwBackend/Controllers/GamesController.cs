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

        // Search for games
        // GET: api/Games/search?name=GameName
        [HttpGet("search")]
        public async Task<ActionResult<IEnumerable<Game>>> SearchGames([FromQuery] string name, [FromQuery] string genre, [FromQuery] string developer, [FromQuery] string publisher, [FromQuery] string release, [FromQuery] bool coop, [FromQuery] bool indie, [FromQuery] string platform, [FromQuery] string director, [FromQuery] string writer, [FromQuery] string composer, [FromQuery] string description)
        {
            var query = _context.Games.AsQueryable();

            if (!string.IsNullOrEmpty(name))
            {
                query = query.Where(p => p.GameName.Contains(name));
            }
            if (!string.IsNullOrEmpty(genre))
            {
                query = query.Where(p => p.GameGenre.Contains(genre));
            }
            if (!string.IsNullOrEmpty(developer))
            {
                query = query.Where(p => p.GameDeveloper.Contains(developer));
            }
            if (!string.IsNullOrEmpty(publisher))
            {
                query = query.Where(p => p.GamePublisher.Contains(publisher));
            }
            if (!string.IsNullOrEmpty(release))
            {
                query = query.Where(p => p.GameRelease.Contains(release));
            }
            if (coop)
            {
                query = query.Where(p => p.GameCoop == coop);
            }
            if (indie)
            {
                query = query.Where(p => p.GameIndie== indie);
            }
            if (!string.IsNullOrEmpty(platform))
            {
                query = query.Where(p => p.GamePlatform.Contains(platform));
            }
            if (!string.IsNullOrEmpty(director))
            {
                query = query.Where(p => p.GameDirector.Contains(director));
            }
            if (!string.IsNullOrEmpty(writer))
            {
                query = query.Where(p => p.GameWriter.Contains(writer));
            }
            if (!string.IsNullOrEmpty(composer))
            {
                query = query.Where(p => p.GameComposer.Contains(composer));
            }
            if (!string.IsNullOrEmpty(description))
            {
                query = query.Where(p => p.GameDescription.Contains(description));
            }

            var games = await query.ToListAsync();

            return Ok(games);
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
