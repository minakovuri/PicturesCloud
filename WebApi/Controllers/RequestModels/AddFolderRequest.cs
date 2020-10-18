using System.ComponentModel.DataAnnotations;

namespace WebApi.Controllers.RequestModels
{
    public class AddFolderRequest
    {
        [Required]
        public string FolderName { get; set; }
        public int? ParentFolderId { get; set; }
    }
}