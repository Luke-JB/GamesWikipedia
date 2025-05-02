using Microsoft.AspNetCore.Identity;

namespace gwBackend.Data.Models
{
    public class User : IdentityUser
    {
        public int InternalUserId { get; set; }
        public string? Name { get; set; }
        public ICollection<Comment> Comments { get; set; }
    }
}