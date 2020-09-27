using System.Collections.Generic;

namespace WebApi.Repositories.Entities
{
    public class User
    {
        public int Id { get; set; }
        public string Login { get; set; }
        public string Password { get; set; }

        public List<Content> Contents { get; set; }
    }
}