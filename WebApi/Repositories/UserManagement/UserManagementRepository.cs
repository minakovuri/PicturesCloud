using System.Collections.Generic;
using System.Linq;
using WebApi.Core.Errors;
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
                Guid = user.Guid,
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

        public User GetUser(string login)
        {
            var user = _dbContext.Users.SingleOrDefault(x => x.Login == login);
            if (user == null)
                throw new UserNotExistError("User not exist");

            return new User()
            {
                Id = user.Id,
                Login = user.Login,
                Guid = user.Guid,
                PasswordHash = user.PasswordHash,
                PasswordSalt = user.PasswordSalt
            };
        }
    }
}