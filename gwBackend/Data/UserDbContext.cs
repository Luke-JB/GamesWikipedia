using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using gwBackend.Data.Models;
using Microsoft.EntityFrameworkCore;

namespace gwBackend.Data
{
    public class UserDbContext : IdentityDbContext<User>
    {
        public UserDbContext(DbContextOptions<UserDbContext> options)
            : base(options) 
        { 
        }

        protected override void OnModelCreating(ModelBuilder builder)
        {
            base.OnModelCreating(builder);

            builder.Entity<User>().Property(u => u.UserId).HasMaxLength(10);

            builder.HasDefaultSchema("identity");
        }
    }
}
