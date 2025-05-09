using Microsoft.AspNetCore.Identity;
using System.Text.Json.Serialization;

namespace gwBackend.Data.Models
{
    public class User : IdentityUser
    {
        public int InternalUserId { get; set; }
        public string? Name { get; set; }
        [JsonIgnore]
        public ICollection<Comment> Comments { get; set; }
        public ICollection<UserFavoriteGame> FavoriteGames { get; set; }
    }
}