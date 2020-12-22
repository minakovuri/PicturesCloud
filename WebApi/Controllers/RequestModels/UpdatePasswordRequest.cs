using System.ComponentModel.DataAnnotations;

namespace WebApi.Controllers.RequestModels
{
    public class UpdatePasswordRequest
    {
        [Required]
        public string Password { get; set; }
        
        [Required]
        public string NewPassword { get; set; }
    }
}