using WebApi.Core.Services;

namespace WebApi.Controllers
{
    public class UserManagementController
    {
        private readonly UserManagementService _service;

        public UserManagementController(UserManagementService service)
        {
            _service = service;
        }
    }
}