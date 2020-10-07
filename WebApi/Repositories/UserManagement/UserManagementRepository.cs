using System.Collections.Generic;
using System.Linq;
using WebApi.Core.Interfaces;
using WebApi.Core.Models;
using WebApi.Repositories.DbContexts;

namespace WebApi.Repositories.UserManagement
{
    public class UserManagementRepository : IUserManagementRepository
    {
        private readonly MySqlContext _dbContext;

        public UserManagementRepository(MySqlContext dbContext)
        {
            _dbContext = dbContext;
        }

        public void AddUser(User user)
        {
            Entities.User entity = new Entities.User()
            {
                Id = user.Id,
                Login = user.Login,
                PasswordHash = user.PasswordHash,
                PasswordSalt = user.PasswordSalt,
                Contents = new List<Entities.Content>(),
            };

            _dbContext.Users.Add(entity);
            _dbContext.SaveChanges();
        }

        public bool LoginAlreadyTaken(string login)
        {
            return _dbContext.Users.Any(user => user.Login == login);
        }
    }
}