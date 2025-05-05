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
                GamePlatform = game.GamePlatform.Select(p => p.Trim()).ToList(),
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

            if (!string.IsNullOrWhiteSpace(dto.GameName))
            {
                var nameSearch = dto.GameName.Trim().ToLower();
                query = query.Where(p => p.GameName.ToLower().Contains(nameSearch));
            }

            if (dto.GameGenre != null && dto.GameGenre.Any())
                query = query.Where(p => dto.GameGenre.Contains(p.GameGenre)); // checks if any genre matches

            if (!string.IsNullOrWhiteSpace(dto.GameDeveloper))
            {
                var devSearch = dto.GameDeveloper.Trim().ToLower();
                query = query.Where(p => p.GameDeveloper.ToLower().Contains(devSearch));
            }

            if (!string.IsNullOrWhiteSpace(dto.GamePublisher))
            {
                var publisherSearch = dto.GamePublisher.Trim().ToLower();
                query = query.Where(p => p.GamePublisher.ToLower().Contains(publisherSearch));
            }

            if (!string.IsNullOrWhiteSpace(dto.GameRelease))
                query = query.Where(p => p.GameRelease.Contains(dto.GameRelease));

            if (dto.GameCoop.HasValue)
                query = query.Where(p => p.GameCoop == dto.GameCoop.Value);

            if (dto.GameIndie.HasValue)
                query = query.Where(p => p.GameIndie == dto.GameIndie.Value);

            if (dto.GamePlatform != null && dto.GamePlatform.Any())
                query = query.Where(p => p.GamePlatform.Any(platform => dto.GamePlatform.Contains(platform)));

            var games = await query.ToListAsync();

            return Ok(games);
        }

        // Post / Creates Games
        [HttpPost]
        [Route("NewGame")]
        public async Task<IActionResult> NewGame([FromBody] GameDto game)
        {
            try
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
                    GamePublisher = game.GamePublisher,
                    GameDirector = game.GameDirector,
                    GameWriter = game.GameWriter,
                    GameComposer = game.GameComposer,
                    GameDescription = game.GameDescription,
                    GameInfo = game.GameInfo
                };

                await _context.AddAsync(newGame);
                await _context.SaveChangesAsync();
                //return Ok(newGame);
                return CreatedAtAction(nameof(GetGame), new { id = newGame.GameId }, newGame);
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Internal server error: {ex.Message}");
            }
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
