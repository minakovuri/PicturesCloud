using System.ComponentModel.DataAnnotations;

namespace WebApi.Repositories.Entities
{
    public class Image : Content
    {
        [Required]
        public string Path { get; set; }
        [Required]
        public bool Starred { get; set; }
    }
}