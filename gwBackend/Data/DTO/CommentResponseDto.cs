namespace gwBackend.Data.DTO
{
    public class CommentResponseDto
    {
        public int CommentId { get; set; }
        public string? Text { get; set; }
        public DateTime DateTime { get; set; }

        public string? UserId {  get; set; }
        public string? UserName { get; set; }
    }
}
