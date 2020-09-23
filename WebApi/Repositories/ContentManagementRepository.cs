using System;
using System.Collections.Generic;
using WebApi.Core.Interfaces;
using WebApi.Core.Models;

namespace WebApi.Repositories
{
    public class ContentManagementRepository : IContentManagementRepository
    {
        public void AddContent(Content content, string? folderId, string userId)
        {
            
        }

        public void DeleteContent(string contentId)
        {
            
        }

        public List<Content> GetContents(string? folderId, string userId)
        {
            var contents = new List<Content>();

            for (int i = 0; i < 5; i++)
            {
                contents.Add(new Content
                {
                    Id   = Guid.NewGuid().ToString("N"),
                    Size = 1000,
                    Title = "content",
                    Type = "image"
                });
            }
            
            return contents;
        }
    }
}