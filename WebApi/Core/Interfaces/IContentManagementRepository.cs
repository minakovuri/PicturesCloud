using System.Collections.Generic;
using Microsoft.AspNetCore.Http;
using WebApi.Core.Models;

namespace WebApi.Core.Interfaces
{
    public interface IContentManagementRepository
    {
        public int AddImage(Image image);

        public void DeleteContent(string contentId);

        public Image? GetImage(int id);

        public User? GetUser(int id);

        public List<Content> GetContents(string? folderId, string userId);
        
        public void SaveImage(string path, IFormFile image);
    }
}