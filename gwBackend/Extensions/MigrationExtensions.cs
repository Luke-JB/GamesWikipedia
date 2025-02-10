using gwBackend.Data;
using Microsoft.EntityFrameworkCore;

namespace gwBackend.Extensions
{
    public static class MigrationExtensions
    {
        public static void ApplyMigrations(this IApplicationBuilder app)
        {
            using IServiceScope scope = app.ApplicationServices.CreateScope();

            using UserDbContext context = scope.ServiceProvider.GetRequiredService<UserDbContext>();

            context.Database.Migrate();
        }
    }
}
