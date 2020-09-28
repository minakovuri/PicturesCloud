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

        public MySqlContext(DbContextOptions<MySqlContext> options)
            : base(options)
        {
        }
    }
}