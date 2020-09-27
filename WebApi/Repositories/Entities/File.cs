namespace WebApi.Repositories.Entities
{
    public class File : Content
    {
        public string Path { get; set; }
        public bool AddedToFavourites { get; set; }
    }
}