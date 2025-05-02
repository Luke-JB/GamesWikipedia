using gwBackend.Data;
using gwBackend.Data.DTO;
using gwBackend.Data.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Security.Claims;

namespace gwBackend.Controllers
{
    [ApiController]
    [Route("api/posts/{postId}/comments")]
    public class CommentsController : ControllerBase
    {
        private readonly AppDbContext _context;
        private readonly UserManager<IdentityUser> _userManager;

        public CommentsController(AppDbContext context, UserManager<IdentityUser> userManager)
        {
            _context = context;
            _userManager = userManager;
        }

        // Get Comments
        [HttpGet]
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
        public async Task<ActionResult<Comment>> AddComment(int gameId, CommentDto commentDto)
        {
            var userId = User.FindFirstValue(ClaimTypes.NameIdentifier);
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

        [ApiController]
        [Route("api/comments")]
        public class SingleCommentController : ControllerBase
        {
            private readonly AppDbContext _context;

            public SingleCommentController(AppDbContext context)
            {
                _context = context;
            }

            // Update Comments
            [HttpPut("{commentId}")]
            public async Task<ActionResult<Comment>> UpdateComment(int commentId, [FromBody] CommentDto commentDto)
            {
                var existingText = await _context.Comments.FindAsync(commentId);
                _context.Entry(commentId).State = EntityState.Modified;
                await _context.SaveChangesAsync();

                return NoContent();
            }

            // Delete Comments
            [HttpDelete("{commentId}")]
            [Authorize(Roles = "Moderator")]
            public async Task<ActionResult<Comment>> DeleteComment(int commentId)
            {
                var comment = await _context.Comments.FindAsync(commentId);
                _context.Comments.Remove(comment);
                await _context.SaveChangesAsync();

                return NoContent();
            }
        }
    }
}
