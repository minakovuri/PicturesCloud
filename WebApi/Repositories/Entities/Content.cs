using System.ComponentModel.DataAnnotations;

namespace WebApi.Repositories.Entities
{
    public class Content
    {
        public int Id { get; set; }
        [Required]
        public int Name { get; set; }
        public Folder Folder { get; set; }
    }
}