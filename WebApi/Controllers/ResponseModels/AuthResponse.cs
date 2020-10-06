using System.ComponentModel.DataAnnotations;
using WebApi.Core.Models;

namespace WebApi.Controllers.ResponseModels
{
    public class AuthResponse
    {
        [Required]
        public User User { get; set; }

        [Required]
        public string Token { get; set; }
    }
}