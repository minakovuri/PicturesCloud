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
        private readonly IFileStorage _fileStorage;

        public ContentManagementService(IContentManagementRepository repository, IFileStorage fileStorage)
        {
            _repository = repository;
            _fileStorage = fileStorage;
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
            var user = _repository.GetUser(userId);

            var login = user.Login;

            Image image = new Image
            {
                Name = fileName,
                FolderId = folderId == null
                    ? null
                    : folderId,
                Path = folderId == null
                    ? GetRootImagePath(fileName, login)
                    : GetImagePath(fileName, login, userId),
                Starred = false,
                UserId = userId,
            };

            int imageId = _repository.AddImage(image);

            return imageId;
        }

        public void CheckUserExists(int userId)
        {
            var user = _repository.GetUser(userId);

            if (user == null)
                throw new UserNotExistError("User not exist");
        }

        public void UploadImage(IFormFile image, string uploadUrl)
        {
            if (_fileStorage.ImageExist(uploadUrl))
                throw new ImageAlreadyUploadError("Image already upload");

            _fileStorage.SaveImage(uploadUrl, image);
        }

        public void DeleteContent(string contentId)
        {
            
        }

        public List<Content> GetContents(string? folderId, string userId)
        {
            return _repository.GetContents(folderId, userId);
        }

        private string GetRootImagePath(string fileName, string userLogin)
        {
            return "/" + userLogin + "/" + fileName;
        }

        private string GetImagePath(string fileName, string userLogin, int folderId)
        {
            string path = "/" + userLogin + "/";

            Folder folder = _repository.GetFolder(folderId);

            return folder == null
                ? path + "/" + fileName
                : GetFolderPath(path, folder) + "/" + fileName;
        }

        private string GetFolderPath(string path, Folder folder)
        {
            string newPath = folder.Name + "/" + path;

            if (folder.FolderId == null)
            {
                return newPath;
            }
            else
            {
                Folder nextFolder = _repository.GetFolder(folder.FolderId.Value);
                return GetFolderPath(newPath, nextFolder);
            }
        }
    }
}