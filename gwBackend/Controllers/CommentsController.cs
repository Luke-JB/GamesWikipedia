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
    [Route("api/controller")]
    public class CommentsController : ControllerBase
    {
        private readonly CommentDbContext _context;

        public CommentsController(CommentDbContext context)
        {
            _context = context;
        }

        // Get Comments
        [HttpGet("{gameId}")]
        public async Task<ActionResult<IEnumerable<Comment>>> GetCommentsByGame(int gameId)
        {
            var comments = await _context.Comments
                .Where(c => c.GameId == gameId)
                .OrderByDescending(c => c.DateTime)
                .ToListAsync();

            return Ok(comments);
        }

        // Add Comments
        [HttpPost]
        [Authorize]
        public async Task<ActionResult<Comment>> AddComment(CommentDto commentDto)
        {
            var userId = User.FindFirstValue(ClaimTypes.NameIdentifier);
            {

            }
            var comment = new Comment
            {
                Text = commentDto.Text,
                GameId = commentDto.GameId,
                UserId = commentDto.UserId,
                DateTime = DateTime.UtcNow
            };

            _context.Comments.Add(comment);
            await _context.SaveChangesAsync();

            return CreatedAtAction(nameof(GetCommentsByGame), new { gameId = comment.GameId }, comment);
        }

        // Update Comments
        [HttpPut("{gameId}")]
        public async Task<ActionResult<Comment>> UpdateComment(int gameId, [FromBody] CommentDto commentDto)
        {
            var existingText = await _context.Comments.FindAsync(gameId);
            _context.Entry(gameId).State = EntityState.Modified;
            await _context.SaveChangesAsync();

            return NoContent();
        }

        // Delete Comments
        [HttpDelete("{gameId}")]
        public async Task<ActionResult<Comment>> DeleteGame(int gameId, [FromBody] CommentDto commentDto)
        {
            var comment = await _context.Comments.FindAsync(gameId);
            _context.Comments.Remove(comment);
            await _context.SaveChangesAsync();

            return NoContent();

        }
    }
}
