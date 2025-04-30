using gwBackend.Data.Models;
using Microsoft.EntityFrameworkCore;
using gwBackend.Data;
using gwBackend.Data.Models;

namespace gwBackend.Data
{
    public class GamesDbContext : DbContext
    {
        public GamesDbContext(DbContextOptions<GamesDbContext> options) : base(options) 
        { 
        }

        public DbSet<Game> Games { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);
        }
    }
}
