using gwBackend.Data.Models;
using Microsoft.EntityFrameworkCore;
using gwBackend.Data;
using gwBackend.Data.Models;

namespace gwBackend.Data
{
    public class CommentDbContext : DbContext
    {
        public CommentDbContext(DbContextOptions<CommentDbContext> options)
            : base(options)
        {
        }

        public DbSet<Comment> Comments { get; set; }
    }
}
