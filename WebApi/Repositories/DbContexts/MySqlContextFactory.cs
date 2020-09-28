using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Design;

namespace WebApi.Repositories.DbContexts
{
    public class SampleContextFactory : IDesignTimeDbContextFactory<MySqlContext>
    {
        public MySqlContext CreateDbContext(string[] args)
        {
            var optionsBuilder = new DbContextOptionsBuilder<MySqlContext>();

            // TODO: сейчас получается дублирование строки подключения
            optionsBuilder.UseMySQL(
                "server=localhost;UserId=pictures_cloud_admin;Password=1234;database=pictures_cloud;"
            );
            return new MySqlContext(optionsBuilder.Options);
        }
    }
}