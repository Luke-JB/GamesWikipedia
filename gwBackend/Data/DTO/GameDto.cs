using System.ComponentModel.DataAnnotations;

namespace gwBackend.Data.DTO
{
    public class GameDto
    {
        public int GameId { get; set; }
        public string GameName { get; set; }
        public string GameGenre { get; set; }
        public string GameDeveloper { get; set; }
        public string GamePublisher { get; set; }
        public string GameRelease { get; set; }
        public bool GameCoop { get; set; }
        public bool GameIndie { get; set; }
        public string GamePlatform { get; set; }
        public string GameDirector { get; set; }
        public string GameWriter { get; set; }
        public string GameComposer { get; set; }
        public string GameDescription { get; set; }
    }
}
