using System.Collections.Generic;
using WebApi.Core.Models;

namespace WebApi.Core.Interfaces
{
    public interface IContentManagementRepository
    {
        public int AddImage(Image image);

        public int AddFolder(Folder folder);

        public void DeleteContent(string contentId);

        public Image? GetImage(int id);

        public Folder? GetFolder(int id);

        public User? GetUser(int id);

        public List<Content> GetContents(string? folderId, string userId);
    }
}