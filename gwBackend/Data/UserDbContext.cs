using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
using gwBackend.Data.Models;

namespace gwBackend.Data
{
    public class UserDbContext : IdentityDbContext<User>
    {
        public UserDbContext(DbContextOptions<UserDbContext> options)
            : base(options) 
        { 
        }

        public DbSet<User> Users { get; set; }

        protected override void OnModelCreating(ModelBuilder builder)
        {
            base.OnModelCreating(builder);

            List<IdentityRole> roles = new()
            {
                new IdentityRole()
                {
                    Name = "User",
                    NormalizedName = "USER"
                },
                new IdentityRole()
                {
                    Name = "Moderator",
                    NormalizedName = "MODERATOR"
                },
                new IdentityRole()
                {
                    Name = "Admin",
                    NormalizedName = "ADMIN"
                }
            };

            builder.Entity<IdentityRole>().HasData(roles);

            builder.Entity<User>().Property(u => u.UserId).HasMaxLength(10);

            builder.HasDefaultSchema("identity");
        }
    }
}
