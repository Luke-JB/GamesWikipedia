using gwBackend.Data;
using gwBackend.Data.Models;
using Microsoft.AspNetCore.Mvc;
using System.Diagnostics.Eventing.Reader;

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
        [HttpPost]
        [Route("NewGame")]
        public async Task<IActionResult> NewGame([FromBody] Game game)
        {
            await _context.AddAsync(game);
            await _context.SaveChangesAsync();
            return Ok();
        }
    }
}
