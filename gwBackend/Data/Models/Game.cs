using Microsoft.EntityFrameworkCore;

namespace gwBackend.Data.Models
{
    public class Game
    {
        public int GameId { get; set; }
        public string GameName { get; set; }
        public string GameGenre {  get; set; }
        public string GameDeveloper { get; set; }
        public string GamePublisher { get; set; }
        public string GameRelease { get; set; }

        public Game() { }
    }
}
