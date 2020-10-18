using System.Collections.Generic;
using System.Linq;
using Microsoft.EntityFrameworkCore;
using WebApi.Core.Interfaces;
using WebApi.Core.Models;
using WebApi.Repositories.DbContexts;

namespace WebApi.Repositories.ContentManagement
{
    public class ContentManagementRepository : IContentManagementRepository
    {
        private readonly MySqlContext _dbContext;

        public ContentManagementRepository(MySqlContext dbContext)
        {
            _dbContext = dbContext;
        }

        public int AddImage(Image image)
        {
            var user = _dbContext.Users.SingleOrDefault(x => x.Id == image.UserId);

            var folder = image.FolderId == null
                ? null
                : _dbContext.Folders.SingleOrDefault(x => x.Id == image.FolderId);

            var entity = new Entities.Image
            {
                Name = image.Name,
                Guid = image.Guid,
                User = user,
                Folder = folder,
                Path = image.Path,
                Starred = image.Starred,
            };

            _dbContext.Images.Add(entity);
            _dbContext.SaveChanges();

            return entity.Id;
        }

        public int AddFolder(Folder folder)
        {
            var user = _dbContext.Users.SingleOrDefault(x => x.Id == folder.UserId);
            
            var parentFolder = folder.FolderId == null
                ? null
                : _dbContext.Folders.SingleOrDefault(x => x.Id == folder.FolderId);

            var entity = new Entities.Folder()
            {
                Name = folder.Name,
                Guid = folder.Guid,
                User = user,
                Folder = parentFolder,
            };
            
            _dbContext.Folders.Add(entity);
            _dbContext.SaveChanges();

            return entity.Id;
        }

        public void DeleteContent(int id)
        {
            var entity = _dbContext.Contents
                .SingleOrDefault(x => x.Id == id);

            _dbContext.Contents.Remove(entity);
            _dbContext.SaveChanges();
        }

        public Content? GetContent(int id)
        {
            var entity = _dbContext.Contents
                .Include(x => x.Folder)
                .SingleOrDefault(x => x.Id == id);
            
            if (entity == null)
            {
                return null;
            }

            return new Content
            {
                Id = entity.Id,
                Guid = entity.Guid,
                Name = entity.Name,
                FolderId = entity.Folder == null
                    ? (int?) null
                    : entity.Folder.Id,
            };
        }

        public Image? GetImage(int id)
        {
            var entity = _dbContext.Images
                .Include(x => x.Folder)
                .SingleOrDefault(x => x.Id == id);

            if (entity == null)
            {
                return null;
            }

            return new Image()
            {
                Id = entity.Id,
                Guid = entity.Guid,
                Name = entity.Name,
                FolderId = entity.Folder == null
                    ? (int?) null
                    : entity.Folder.Id,
                Path = entity.Path,
                UserId = entity.User.Id,
                Starred = entity.Starred,
            };
        }

        public Folder? GetFolder(int id)
        {
            var entity = _dbContext.Folders
                .Include(f => f.Folder)
                .SingleOrDefault(x => x.Id == id);

            if (entity == null)
            {
                return null;
            }

            return new Folder
            {
                Id = entity.Id,
                Guid = entity.Guid,
                Name = entity.Name,
                FolderId = entity.Folder == null
                    ? (int?) null
                    : entity.Folder.Id,
            };
        }

        public User? GetUser(int id)
        {
            var user = _dbContext.Users.SingleOrDefault(x => x.Id == id);
            
            if (user == null)
            {
                return null;  
            }

            return new User
            {
                Id = user.Id,
                Guid = user.Guid,
                Login = user.Login,
                PasswordHash = user.PasswordHash,
                PasswordSalt = user.PasswordSalt
            };
        }

        public List<Content> GetContents(int? folderId, int userId)
        {
            var user = _dbContext.Users.SingleOrDefault(x => x.Id == userId);
            var folder = folderId == null
                ? null
                : _dbContext.Folders.SingleOrDefault(x => x.Id == folderId.Value);

            var entitiesList = _dbContext.Contents
                .Where(x => x.Folder == folder && x.User == user);

            var contents = new List<Content>();

            foreach (var entity in entitiesList)
            {
                Content content = new Content
                {
                    Id = entity.Id,
                    Name = entity.Name,
                    Guid = entity.Guid,
                    FolderId = entity.Folder == null
                        ? (int?) null
                        : entity.Folder.Id,
                };
                
                contents.Add(content);
            }
            
            return contents;
        }
    }
}