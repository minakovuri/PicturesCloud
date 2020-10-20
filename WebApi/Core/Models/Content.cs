namespace WebApi.Core.Models
{
    public enum ContentType
    {
        Folder,
        Image,
    }

    public class Content
    {
        public int Id { get; set; }

        public string Guid { get; set; }
        public string Name { get; set; }
        public int? FolderId { get; set; }

        public ContentType Type { get; set; }

        public int UserId { get; set; }
    }
}