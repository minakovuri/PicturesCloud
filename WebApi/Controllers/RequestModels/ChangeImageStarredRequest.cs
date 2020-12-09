using System.ComponentModel.DataAnnotations;

namespace WebApi.Controllers.RequestModels
{
    public class ChangeImageStarredRequest
    {
        [Required]
        public int ImageId { get; set; }

        [Required]
        public bool Starred { get; set; }
    }
}