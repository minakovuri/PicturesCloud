using System.ComponentModel.DataAnnotations;

namespace WebApi.Controllers.RequestModels
{
    public class AddImageRequest
    {
        [Required]
        public string FileName { get; set; }
        public int? FolderId { get; set; }
    }
}