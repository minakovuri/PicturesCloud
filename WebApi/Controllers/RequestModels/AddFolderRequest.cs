using System.ComponentModel.DataAnnotations;

namespace WebApi.Controllers.RequestModels
{
    public class AddFolderRequest
    {
        [Required]
        public string UserId { get; set; }
        
        [Required]
        public string Name { get; set; }
        
        [Required]
        public string FolderId { get; set; }
    }
}