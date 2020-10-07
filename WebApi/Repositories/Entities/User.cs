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
        [MaxLength(16)]
        public byte[] PasswordHash { get; set; }
        [Required]
        [MaxLength(16)]
        public byte[] PasswordSalt { get; set; }

        [Required]
        public List<Content> Contents { get; set; }
    }
}