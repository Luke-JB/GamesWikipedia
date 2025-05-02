using System.ComponentModel.DataAnnotations;

namespace gwBackend.Data.DTO
{
    public class CommentDto
    {
        [Required]
        public string? Text { get; set; }

        // Foreign Keys
        public int GameId { get; set; }
        public string? UserId { get; set; }
    }
}