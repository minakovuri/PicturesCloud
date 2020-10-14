namespace WebApi.Core.Models
{
    public class Content
    {
        public int Id { get; set; }

        public string Guid { get; set; }
        public string Name { get; set; }
        public int? FolderId { get; set; }

        public int UserId { get; set; }
    }
}