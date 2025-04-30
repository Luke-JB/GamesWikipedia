using System.ComponentModel.DataAnnotations;

namespace gwBackend.Data.DTO
{
    public class NewUserDto
    {
        [StringLength(100, MinimumLength = 3)]
        public string? Name { get; set; }

        [Required]
        [StringLength(100, MinimumLength = 3)]
        public string? Username { get; set; }

        [Required]
        [EmailAddress]
        public string? Email { get; set; }

        [Required]
        [DataType(DataType.Password)]
        [StringLength(100, MinimumLength = 6)]
        public string? Password { get; set; }

        [Required]
        [DataType(DataType.Password)]
        [Compare("Password")]
        public string? ConfirmPassword { get; set; }
    }
}