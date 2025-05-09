using Microsoft.EntityFrameworkCore;
using System.ComponentModel.DataAnnotations.Schema;

namespace gwBackend.Data.Models
{
    public class Comment
    {
        public int CommentId { get; set; }
        public string Text { get; set; }
        public DateTime DateTime { get; set; }

        // Foreign Keys
        //[ForeignKey(nameof(Game))]
        public int GameId { get; set; }
        public Game? Game { get; set; }
        //[ForeignKey(nameof(User))]
        public string UserId { get; set; }
        public User? User { get; set; }
    }
}