namespace WebApi.Core.Models
{
    public class Image : Content
    {
        public string Path { get; set; }
        public bool Starred { get; set; }
    }
}