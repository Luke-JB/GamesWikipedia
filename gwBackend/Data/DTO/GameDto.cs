using System.ComponentModel.DataAnnotations;

namespace gwBackend.Data.DTO
{
    public class GameDto
    {
        public int GameId { get; set; }
        [Required]
        public string? GameName { get; set; }
        [Required]
        public string? GameGenre { get; set; }
        [Required]
        public string? GameDeveloper { get; set; }
        [Required]
        public string? GamePublisher { get; set; }
        public string? GameRelease { get; set; }
        [Required]
        public bool GameCoop { get; set; }
        [Required]
        public bool GameIndie { get; set; }
        [Required]
        public List<string> GamePlatform { get; set; }
        public string? GameDirector { get; set; }
        public string? GameWriter { get; set; }
        public string? GameComposer { get; set; }
        [Required]
        public string? GameDescription { get; set; }
        [Required]
        public string? GameInfo { get; set; }
    }
}
