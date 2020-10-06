using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace WebApi.Repositories.Entities
{
    public class User
    {
        public int Id { get; set; }
        [Required]
        public string Login { get; set; }
        [Required]
        public string Password { get; set; }
        public string Avatar { get; set; }

        [Required]
        public List<Content> Contents { get; set; }
    }
}