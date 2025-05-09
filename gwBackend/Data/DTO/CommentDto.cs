using System.ComponentModel.DataAnnotations;

namespace gwBackend.Data.DTO
{
    public class CommentDto
    {
        [Required]
        [StringLength(500, ErrorMessage = "Comment text cannot exceed 500 characters.")]
        public string Text { get; set; }
    }
}