using System.ComponentModel.DataAnnotations;

namespace gwBackend.Data.DTO
{
    public class CommentDto
    {
        [Required]
        public string? Text { get; set; }
    }
}