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
        private readonly UserManager<User> _userManager;

        public CommentsController(AppDbContext context, UserManager<User> userManager)
        {
            _context = context;
            _userManager = userManager;
        }

        // Get Comments
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Comment>>> GetCommentsByGame([FromRoute] int postId)
        {
            var comments = await _context.Comments
                .Where(c => c.GameId == postId)
                .OrderByDescending(c => c.DateTime)
                .ToListAsync();

            return Ok(comments);
        }

        // Add Comments
        [HttpPost]
        //[Authorize]
        public async Task<ActionResult<Comment>> AddComment([FromRoute] int postId, [FromBody] CommentDto commentDto)
        {
            try
            {
                var userId = User.FindFirstValue(ClaimTypes.NameIdentifier);
                var comment = new Comment
                {
                    Text = commentDto.Text,
                    GameId = postId,
                    UserId = userId,
                    DateTime = DateTime.UtcNow
                };

                _context.Comments.Add(comment);
                await _context.SaveChangesAsync();

                return CreatedAtAction(nameof(GetCommentsByGame), new { gameId = postId }, comment);
            }
            catch (Exception ex)
            {
                Console.WriteLine("Error adding comment: " + ex.Message);
                return StatusCode(500, "Internal server error");
            }
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
            //[Authorize(Roles = "Moderator")]
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
