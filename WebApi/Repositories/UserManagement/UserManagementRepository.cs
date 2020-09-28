using WebApi.Core.Interfaces;
using WebApi.Repositories.DbContexts;

namespace WebApi.Repositories.UserManagement
{
    public class UserManagementRepository : IUserManagementRepository
    {
        private readonly MySqlContext _dbContext;
    }
}