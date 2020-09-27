using System.Collections.Generic;

namespace WebApi.Repositories.Entities
{
    public class Folder : Content
    {
        public List<Content> Contents { get; set; }
    }
}