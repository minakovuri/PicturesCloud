using System.ComponentModel.DataAnnotations;

namespace WebApi.Repositories.Entities
{
    public class Content
    {
        public int Id { get; set; }
        [Required]
        public string Name { get; set; }

        [Required]
        public string Guid { get; set; }
        public Folder Folder { get; set; }

        [Required]
        public User User { get; set; }
    }
}