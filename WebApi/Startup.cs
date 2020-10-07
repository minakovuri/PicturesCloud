using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using Microsoft.Extensions.Logging;
using WebApi.Core.Services;
using WebApi.Repositories.DbContexts;
using WebApi.Repositories.ContentManagement;
using WebApi.Repositories.UserManagement;

namespace WebApi
{
    public class Startup
    {
        public Startup(IConfiguration configuration)
        {
            Configuration = configuration;
        }

        public IConfiguration Configuration { get; }

        public void ConfigureServices(IServiceCollection services)
        {
            services.AddDbContext<MySqlContext>(o
                => o.UseMySQL(Configuration.GetConnectionString("MySqlConnection"))
            );

            services.AddScoped<ContentManagementRepository>();
            services.AddScoped<UserManagementRepository>();
            
            services.AddScoped(s => new ContentManagementService(
                s.GetRequiredService<ContentManagementRepository>()
            ));

            services.AddScoped(s => new UserManagementService(
                s.GetRequiredService<UserManagementRepository>()
            ));

            services.AddControllers();
        }

        public void Configure(IApplicationBuilder app, IWebHostEnvironment env)
        {
            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
            }

            app.UseHttpsRedirection();

            app.UseRouting();

            app.UseAuthorization();

            app.UseEndpoints(endpoints =>
            {
                endpoints.MapControllers();
            });
        }
    }
}
