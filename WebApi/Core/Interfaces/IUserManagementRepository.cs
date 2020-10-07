using WebApi.Core.Models;

namespace WebApi.Core.Interfaces
{
    public interface IUserManagementRepository
    {
        public void AddUser(User user);
    }
}