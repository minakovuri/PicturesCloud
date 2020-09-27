using Microsoft.EntityFrameworkCore;
using WebApi.Repositories.Entities;

namespace WebApi.Repositories.DbContexts
{
    public class MySqlContext : DbContext
    {
        public DbSet<User> Users { get; set; }
        public DbSet<Content> Contents { get; set; }
        public DbSet<File> Files { get; set; }
        public DbSet<Folder> Folders { get; set; }

        public MySqlContext()
        {
            Database.EnsureCreated();
        }

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            optionsBuilder.UseMySQL(
                "server=localhost;UserId=pictures_cloud_admin;Password=1234;database=pictures_cloud;"
            );
        }
    }
}