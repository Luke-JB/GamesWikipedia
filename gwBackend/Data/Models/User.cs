using Microsoft.AspNetCore.Identity;

namespace gwBackend.Data.Models
{
    public class User : IdentityUser
    {
        public int UserId { get; set; }
        public string? Name { get; set; }
        public string UserName {  get; set; }
        public string Password { get; set; }
        public string Email {  get; set; }
        public bool RememberMe { get; set; } = false;
    }
}
