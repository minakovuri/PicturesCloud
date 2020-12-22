using System.ComponentModel.DataAnnotations;

namespace WebApi.Controllers.ResponseModels
{
    public class AuthResponse
    {
        [Required]
        public string Token { get; set; }
    }
}