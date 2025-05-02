namespace gwBackend.Data.DTO
{
    public class SearchDto
    {
        public string? Name { get; set; }
        public string? Genre { get; set; }
        public string? Developer { get; set; }
        public string? Publisher { get; set; }
        public string? Release { get; set; }
        public bool? Coop { get; set; }
        public bool? Indie { get; set; }
        public string? Platform { get; set; }
        public string? Director { get; set; }
        public string? Writer { get; set; }
        public string? Composer { get; set; }
    }
}
