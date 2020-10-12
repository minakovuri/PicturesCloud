using System.Collections.Generic;
using Microsoft.AspNetCore.Http;
using WebApi.Core.Errors;
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

        public Image GetImage(int id)
        {
            Image image = _repository.GetImage(id);
            if (image == null)
                throw new ContentNotExistError("content doesn't exist");
            return image;
        }

        public int AddImage(string fileName, int? folderId, int userId)
        {
            return folderId == null
                ? AddImageToRoot(fileName, userId)
                : AddImageToFolder(fileName, folderId.Value, userId);
        }

        public void UploadImage(IFormFile image, string uploadUrl, int userId)
        {
            var user = _repository.GetUser(userId);

            if (user == null)
                throw new UserNotExistError("User not exist");
            
            // TODO: добавить проверку на существование контента для загрузки
            
            _repository.SaveImage(uploadUrl, image);
        }

        public void DeleteContent(string contentId)
        {
            
        }

        public List<Content> GetContents(string? folderId, string userId)
        {
            return _repository.GetContents(folderId, userId);
        }

        private int AddImageToRoot(string fileName, int userId)
        {
            var user = _repository.GetUser(userId);

            if (user == null)
                throw new UserNotExistError("User not exist");

            string path = "/" + user.Login + "/" + fileName;

            Image image = new Image()
            {
                Name = fileName,
                FolderId = null,
                Path = path,
                Starred = false,
                UserId = userId,
            };
            
            int imageId = _repository.AddImage(image);

            return imageId;
        }

        private int AddImageToFolder(string fileName, int folderId, int userId)
        {
            var user = _repository.GetUser(userId);

            if (user == null)
                throw new UserNotExistError("User not exist");
            
            string path = "TODO";
            
            Image image = new Image()
            {
                Name = fileName,
                FolderId = folderId,
                Path = path,
                Starred = false,
                UserId = userId,
            };
            
            int imageId = _repository.AddImage(image);

            return imageId;
        }
        
        /*private string GetFolderPath(Content content)
        {
            if (content.Folder == null)
            {
                return "";
            }
            else
            {
                return GetFolderPath(content.Folder);
            }
        }*/
    }
}