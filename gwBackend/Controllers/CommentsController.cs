using gwBackend.Data;
using gwBackend.Data.DTO;
using gwBackend.Data.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Security.Claims;
using System.Text.Json;

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
            try
            {
                Response.Headers.Add("Access-Control-Allow-Origin", "*"); // Temporary fix to test CORS

                var comments = await _context.Comments
                    .Where(c => c.GameId == postId)
                    .Include(c => c.User)
                    .OrderByDescending(c => c.DateTime)
                    .ToListAsync();

                try
                {
                    var json = JsonSerializer.Serialize(comments);
                    Console.WriteLine(json);  // Log serialized data
                }
                catch (Exception ex)
                {
                    Console.WriteLine($"Serialization error: {ex.Message}");
                }

                return Ok(comments);
            }
            catch (Exception ex)
            {
                Console.WriteLine($"Error fetching comments: {ex.Message}");
                return StatusCode(500, "Internal server error");
            }
        }

        // Add Comments
        [HttpPost]
        [Authorize]
        public async Task<ActionResult<Comment>> AddComment([FromRoute] int postId, [FromBody] CommentDto commentDto)
        {
            try
            {
                var userId = User.FindFirstValue(ClaimTypes.NameIdentifier);
                if (string.IsNullOrEmpty(userId))
                    return Unauthorized("User not authenticated");

                var user = await _userManager.FindByIdAsync(userId);
                if (user == null)
                {
                    Console.WriteLine("User not found in DB");
                    return Unauthorized("User not found.");
                }

                var comment = new Comment
                {
                    Text = commentDto.Text,
                    GameId = postId,
                    UserId = userId,
                    DateTime = DateTime.UtcNow
                };

                _context.Comments.Add(comment);
                await _context.SaveChangesAsync();

                //return CreatedAtAction(nameof(GetCommentsByGame), new { gameId = postId }, comment);
                return Created($"/api/posts/{comment.GameId}/comments/{comment.CommentId}", comment);

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
                var comment = await _context.Comments.FindAsync(commentId);
                if (comment == null) return NotFound();

                comment.Text = commentDto.Text;

                await _context.SaveChangesAsync();
                return NoContent();

            }

            // Delete Comments
            [Authorize(Roles = "Moderator")]
            [HttpDelete("{commentId}")]
            public async Task<ActionResult<Comment>> DeleteComment(int commentId)
            {
                var comment = await _context.Comments.FindAsync(commentId);
                if (comment == null) return NotFound();

                _context.Comments.Remove(comment);
                await _context.SaveChangesAsync();

                return NoContent();
            }
        }
    }
}
