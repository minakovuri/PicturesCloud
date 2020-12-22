using System.ComponentModel.DataAnnotations;

namespace WebApi.Controllers.RequestModels
{
    public class UpdateLoginRequest
    {
        [Required]
        public string NewLogin { get; set; }
    }
}