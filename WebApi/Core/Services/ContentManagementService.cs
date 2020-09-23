using System.Collections.Generic;
using WebApi.Core.Interfaces;
using WebApi.Core.Models;

namespace WebApi.Core.Services
{
    public class ContentManagementService
    {
        private readonly IContentManagementRepository _repository;

        public ContentManagementService(IContentManagementRepository repository)
        {
            _repository = repository;
        }

        public void AddContent(Content content, string? folderId, string userId)
        {
            
        }

        public void DeleteContent(string contentId)
        {
            
        }

        public List<Content> GetContents(string? folderId, string userId)
        {
            return _repository.GetContents(folderId, userId);
        }
    }
}