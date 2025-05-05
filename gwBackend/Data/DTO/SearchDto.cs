namespace gwBackend.Data.DTO
{
    public class SearchDto
    {
        public string? GameName { get; set; }
        public string? GameGenre { get; set; }
        public string? GameDeveloper { get; set; }
        public string? GamePublisher { get; set; }
        public string? GameRelease { get; set; }
        public bool? GameCoop { get; set; }
        public bool? GameIndie { get; set; }
        public string? GamePlatform { get; set; }
    }
}
