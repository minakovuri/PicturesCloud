using System.Collections.Generic;
using WebApi.Core.Models;

namespace WebApi.Core.Interfaces
{
    public interface IContentManagementRepository
    {
        public int AddImage(Image image);

        public int AddFolder(Folder folder);

        public void DeleteContent(int id);

        public Content? GetContent(int id);

        public Image? GetImage(int id);

        public Folder? GetFolder(int id);

        public User? GetUser(int id);

        public List<Content> GetContents(int? folderId, int userId);

        public List<Content> GetStarredContents(int userId);
    }
}