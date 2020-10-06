using System.ComponentModel.DataAnnotations;

namespace WebApi.Controllers.RequestModels
{
    public class AuthRequest
    {
        [Required]
        public string Login { get; set; }

        [Required]
        public string Password { get; set; }
    }
}