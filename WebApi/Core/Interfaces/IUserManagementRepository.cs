using WebApi.Core.Models;

namespace WebApi.Core.Interfaces
{
    public interface IUserManagementRepository
    {
        public void AddUser(User user);

        public bool LoginAlreadyTaken(string login);

        public User? GetUserByLogin(string login);
    }
}