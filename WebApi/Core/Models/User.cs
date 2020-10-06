using System.Collections.Generic;

namespace WebApi.Core.Models
{
    public struct User
    {
        public int Id;
        public string Login;
        public string Password;
        public string Avatar;

        public List<Content> Contents;
    }
}