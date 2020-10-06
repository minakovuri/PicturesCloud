using System.ComponentModel.DataAnnotations;

namespace WebApi.Controllers.RequestModels
{
    public class AddToStarredRequest
    {
        [Required]
        public string ContentId { get; set; }
        
        [Required]
        public bool Starred { get; set; }
    }
}