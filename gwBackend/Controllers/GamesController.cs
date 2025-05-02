using gwBackend.Data;
using gwBackend.Data.DTO;
using gwBackend.Data.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Security.Claims;

namespace gwBackend.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class GamesController : ControllerBase
    {
        private readonly AppDbContext _context;

        public GamesController(AppDbContext context)
        {
            _context = context;
        }

        // Get Games
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Game>>> GetGames()
        {
            return await _context.Games.ToListAsync();
        }

        [HttpGet("GetGame/{id}")]
        public async Task<ActionResult<Game>> GetGame(int id)
        {
            var game = await _context.Games.FindAsync(id); // Get game by id logic
            if (game == null)
            {
                return NotFound();
            }

            var dto = new GameDto
            {
                GameId = game.GameId,
                GameName = game.GameName,
                GameGenre = game.GameGenre,
                GameDeveloper = game.GameDeveloper,
                GamePublisher = game.GamePublisher,
                GameRelease = game.GameRelease,
                GameCoop = game.GameCoop,
                GameIndie = game.GameIndie,
                GamePlatform = game.GamePlatform,
                GameDirector = game.GameDirector,
                GameWriter = game.GameWriter,
                GameComposer = game.GameComposer,
                GameDescription = game.GameDescription,
                GameInfo = game.GameInfo
            };

            return Ok(game);
        }

        // Search for games
        // GET: api/Games/search?name=GameName
        [HttpGet("Search")]
        public async Task<ActionResult<IEnumerable<Game>>> SearchGames([FromQuery] SearchDto dto)
        {
            var query = _context.Games.AsQueryable();

            if (!string.IsNullOrEmpty(dto.Name))
                query = query.Where(p => p.GameName.Contains(dto.Name));

            if (!string.IsNullOrEmpty(dto.Genre))
                query = query.Where(p => p.GameGenre.Contains(dto.Genre));

            if (!string.IsNullOrEmpty(dto.Developer))
                query = query.Where(p => p.GameDeveloper.Contains(dto.Developer));

            if (!string.IsNullOrEmpty(dto.Publisher))
                query = query.Where(p => p.GamePublisher.Contains(dto.Publisher));

            if (!string.IsNullOrEmpty(dto.Release))
                query = query.Where(p => p.GameRelease.Contains(dto.Release));

            if (dto.Coop == true)
                query = query.Where(p => p.GameCoop == true);

            if (dto.Indie == true)
                query = query.Where(p => p.GameIndie == true);

            if (!string.IsNullOrEmpty(dto.Platform))
                query = query.Where(p => p.GamePlatform.Contains(dto.Platform));

            if (!string.IsNullOrEmpty(dto.Director))
                query = query.Where(p => p.GameDirector.Contains(dto.Director));

            if (!string.IsNullOrEmpty(dto.Writer))
                query = query.Where(p => p.GameWriter.Contains(dto.Writer));

            if (!string.IsNullOrEmpty(dto.Composer))
                query = query.Where(p => p.GameComposer.Contains(dto.Composer));

            var games = await query.ToListAsync();

            return Ok(games);
        }

        // Post / Creates Games
        [HttpPost]
        [Route("NewGame")]
        public async Task<IActionResult> NewGame([FromBody] GameDto game)
        {
            var newGame = new Game
            {
                GameName = game.GameName,
                GameGenre = game.GameGenre,
                GameDeveloper = game.GameDeveloper,
                GameRelease = game.GameRelease,
                GameCoop = game.GameCoop,
                GameIndie = game.GameIndie,
                GamePlatform = game.GamePlatform,
                GameDirector = game.GameDirector,
                GameWriter = game.GameWriter,
                GameComposer = game.GameComposer,
                GameDescription = game.GameDescription,
                GameInfo = game.GameInfo
            };

            await _context.AddAsync(newGame);
            await _context.SaveChangesAsync();
            return Ok(newGame);
        }

        // Update Games
        [HttpPut("UpdateGame/{id}")]
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
        [HttpPut("DeleteGame/{id}")]
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
