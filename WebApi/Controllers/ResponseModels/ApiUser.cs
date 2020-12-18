using WebApi.Core.Models;

namespace WebApi.Controllers.ResponseModels
{
    public class ApiUser
    {
        public int Id { get; set; }
        public string Login { get; set; }
    }

    public class ApiUserMapper
    {
        public static ApiUser MapUserData(User user)
        {
            return new ApiUser()
            {
                Id = user.Id,
                Login = user.Login,
            };
        }
    }
}