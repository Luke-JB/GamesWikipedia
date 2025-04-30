using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
using gwBackend.Data.Models;

namespace gwBackend.Data
{
    public class UserDbContext : IdentityDbContext<User>
    {
        //public UserDbContext(DbContextOptions<UserDbContext> options) : base(options)
        public UserDbContext(DbContextOptions dbContextOptions) : base(dbContextOptions)
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
