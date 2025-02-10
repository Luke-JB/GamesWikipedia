using gwBackend.Data.Models;
using Microsoft.EntityFrameworkCore;

namespace gwBackend.Data
{
    public class GamesDbContext : DbContext
    {
        public DbSet<Game> Games { get; set; }
        public GamesDbContext(DbContextOptions<GamesDbContext> options)
            : base(options) 
        { 
        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);
        }
    }
}
