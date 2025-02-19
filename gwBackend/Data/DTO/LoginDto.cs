using System.ComponentModel.DataAnnotations;

namespace gwBackend.Data.DTO
{
    public class LoginDto
    {
        [Required]
        [Display(Name = "Username or Email")]
        public string UserName { get; set; }

        [Required]
        [DataType(DataType.Password)]
        [Display(Name = "Password")]
        public string Password { get; set; }

        [Display(Name = "Remember Me")]
        public bool RememberMe { get; set; }
    }
}
