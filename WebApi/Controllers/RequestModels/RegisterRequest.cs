using System.ComponentModel.DataAnnotations;

namespace WebApi.Controllers.RequestModels
{
    public class RegisterRequest
    {
        [Required]
        public string Login { get; set; }

        [Required]
        public string Password { get; set; }
    }
}