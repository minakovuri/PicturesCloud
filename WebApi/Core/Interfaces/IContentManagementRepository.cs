using System.Collections.Generic;
using WebApi.Core.Models;

namespace WebApi.Core.Interfaces
{
    public interface IContentManagementRepository
    {
        public void AddContent(Content content, string? folderId, string userId);
        
        public void DeleteContent(string contentId);

        public List<Content> GetContents(string? folderId, string userId);
    }
}