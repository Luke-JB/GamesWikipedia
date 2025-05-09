using gwBackend.Data.Models;
using Microsoft.EntityFrameworkCore;
using gwBackend.Data;
using gwBackend.Data.Models;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.AspNetCore.Identity;

namespace gwBackend.Data
{
    public class AppDbContext : IdentityDbContext<User>

    {
        public AppDbContext(DbContextOptions<AppDbContext> options) : base(options)
        {
        }

        public DbSet<Game> Games { get; set; }
        public DbSet<Comment> Comments { get; set; }
        public DbSet<UserFavoriteGame> UserFavoriteGames { get; set; }


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

            builder.Entity<UserFavoriteGame>()
                .HasKey(uf => new { uf.UserId, uf.GameId });

            builder.Entity<UserFavoriteGame>()
                .HasOne(uf => uf.User)
                .WithMany(u => u.FavoriteGames)
                .HasForeignKey(uf => uf.UserId);

            builder.Entity<UserFavoriteGame>()
                .HasOne(uf => uf.Game)
                .WithMany(g => g.FavoritedByUsers)
                .HasForeignKey(uf => uf.GameId);



            List<IdentityRole> roles = new()
            {
                new IdentityRole()
                {
                    Id = "01",
                    Name = "User",
                    NormalizedName = "USER"
                },
                new IdentityRole()
                {
                    Id = "02",
                    Name = "Moderator",
                    NormalizedName = "MODERATOR"
                },
                new IdentityRole()
                {
                    Id = "03",
                    Name = "Admin",
                    NormalizedName = "ADMIN"
                }
            };

            builder.Entity<IdentityRole>().HasData(roles);
        }
    }
}
