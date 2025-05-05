using gwBackend.Data.Models;
using Microsoft.EntityFrameworkCore;
using gwBackend.Data;
using gwBackend.Data.Models;

namespace gwBackend.Data
{
    public class AppDbContext : DbContext
    {
        public AppDbContext(DbContextOptions<AppDbContext> options) : base(options)
        {
        }

        public DbSet<Game> Games { get; set; }
        public DbSet<Comment> Comments { get; set; }

        protected override void OnModelCreating(ModelBuilder builder)
        {
            base.OnModelCreating(builder);
            
            builder.Entity<Comment>()
                .HasOne(c => c.User)
                .WithMany(u => u.Comments)
                .HasForeignKey(c => c.UserId)
                .OnDelete(DeleteBehavior.Restrict); // Prevent cascading delete if needed

            builder.Entity<Comment>()
                .HasOne(c => c.Game)
                .WithMany() // or .WithMany(g => g.Comments) if navigation property exists
                .HasForeignKey(c => c.GameId);

            builder.Entity<Game>()
                .Property(g => g.GamePlatform)
                .HasConversion(
                v => string.Join(',', v), // List<string> → string
                v => v.Split(',', StringSplitOptions.RemoveEmptyEntries).Select(p => p.Trim()).ToList()); // string → List<string>
        }
    }
}
