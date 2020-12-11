using System;
using System.Collections.Generic;
using System.IO;
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
        
        public void CheckUserExists(int userId)
        {
            var user = _repository.GetUser(userId);

            if (user == null)
                throw new UserNotExistError("User not exist");
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

            if (folderId != null && _repository.GetFolder(folderId.Value) == null)
                throw new ContentNotExistError("parent folder doesn't exist");

            var guid = Guid.NewGuid().ToString();
            var uniqueFileName = guid + Path.GetExtension(fileName);

            Image image = new Image
            {
                Name = fileName,
                Guid = guid,
                FolderId = folderId,
                Path = folderId == null
                    ? GetRootContentPath(uniqueFileName, user)
                    : GetContentPath(uniqueFileName, user, folderId.Value),
                Starred = false,
                UserId = userId,
            };

            int imageId = _repository.AddImage(image);

            return imageId;
        }

        public void RenameContent(int contentId, string newName)
        {
            if (_repository.GetContent(contentId) == null)
                throw new ContentNotExistError("cannot find removable content");

            _repository.RenameContent(contentId, newName);
        }

        public int AddFolder(string folderName, int? parentFolderId, int userId)
        {
            if (parentFolderId != null && _repository.GetFolder(parentFolderId.Value) == null)
                throw new ContentNotExistError("parent folder doesn't exist");

            var guid = Guid.NewGuid().ToString();

            Folder folder = new Folder()
            {
                Name = folderName,
                Guid = guid,
                FolderId = parentFolderId,
                UserId = userId,
            };

            int folderId = _repository.AddFolder(folder);

            return folderId;
        }

        public void UploadImage(IFormFile image, string uploadUrl)
        {
            if (_fileStorage.ImageExist(uploadUrl))
                throw new ImageAlreadyUploadError("Image already upload");

            _fileStorage.SaveImage(uploadUrl, image);
        }

        public string GetImageUploadUrl(Image image)
        {
            return _fileStorage.GetRootPath() + "/" + image.Path;
        }

        public void DeleteContent(int contentId, int userId)
        {
            if (_repository.GetContent(contentId) == null)
                throw new ContentNotExistError("cannot find removable content");
    
            Image image = _repository.GetImage(contentId);
            if (image != null)
            {
                _fileStorage.DeleteImage(image.Path);
            }
            else
            {
                List<Content> contents = GetContents(contentId, userId);

                foreach (var content in contents)
                {
                    DeleteContent(content.Id, userId);
                }
            }

            _repository.DeleteContent(contentId);
        }

        public Content GetContent(int contentId)
        {
            Content content = _repository.GetContent(contentId);
            
            if (content == null)
                throw new ContentNotExistError("content doesn't exist");

            return content;
        }

        public List<Folder> ListFoldersTree(int folderId)
        {
            List<Folder> foldersTree = new List<Folder>();

            Folder folder = _repository.GetFolder(folderId);
            foldersTree.Add(folder);

            if (folder.FolderId != null)
            {
                FillFoldersTree(foldersTree, folder.FolderId.Value);
            }

            foldersTree.Reverse();

            return foldersTree;
        }

        private void FillFoldersTree(List<Folder> foldersTree, int folderId)
        {
            Folder folder = _repository.GetFolder(folderId);
            foldersTree.Add(folder);            

            if (folder.FolderId != null)
            {
                FillFoldersTree(foldersTree, folder.FolderId.Value);
            }
        }

        public List<Content> GetContents(int? folderId, int userId)
        {
            if (folderId != null && _repository.GetFolder(folderId.Value) == null)
                throw new ContentNotExistError("folder doesn't exist");

            return _repository.GetContents(folderId, userId);
        }

        public void SetImageStarred(int imageId, bool starred)
        {
            if (_repository.GetContent(imageId) == null)
                throw new ContentNotExistError("cannot find content");
            
            _repository.SetImageStarred(imageId, starred);
        }

        public List<Content> GetStarredContents(int userId)
        {
            return _repository.GetStarredContents(userId);
        }

        private string GetRootContentPath(string contentName, User user)
        {
            return "/" + user.Guid + "/" + contentName;
        }

        private string GetContentPath(string contentName, User user, int folderId)
        {
            string path = "";

            Folder folder = _repository.GetFolder(folderId);

            return folder == null
                ? "/" + user.Guid + "/" + contentName
                : "/" + user.Guid + "/" + GetFolderPath(path, folder) + contentName;
        }

        private string GetFolderPath(string path, Folder folder)
        {
            string newPath = folder.Guid + "/" + path;

            if (folder.FolderId == null)
            {
                return newPath;
            }
            
            Folder nextFolder = _repository.GetFolder(folder.FolderId.Value);
            return GetFolderPath(newPath, nextFolder);
        }
    }
}