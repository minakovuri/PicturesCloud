using System.ComponentModel.DataAnnotations;

namespace WebApi.Controllers.RequestModels
{
    public class RenameContentRequest
    {
        [Required]
        public string NewName { get; set; }
        
        [Required]
        public int ContentId { get; set; }
    }
}