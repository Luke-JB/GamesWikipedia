using System.ComponentModel.DataAnnotations;

namespace gwBackend.Data.DTO
{
    public class CommentDto
    {
        public string Text { get; set; }
        public int GameId { get; set; }
        public int UserId { get; set; }
    }
}