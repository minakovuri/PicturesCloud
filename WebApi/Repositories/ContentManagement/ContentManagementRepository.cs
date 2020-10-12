using System.Collections.Generic;
using System.IO;
using System.Linq;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Http;
using WebApi.Core.Interfaces;
using WebApi.Core.Models;
using WebApi.Repositories.DbContexts;

namespace WebApi.Repositories.ContentManagement
{
    public class ContentManagementRepository : IContentManagementRepository
    {
        private readonly MySqlContext _dbContext;
        private readonly string _rootPath;

        public ContentManagementRepository(MySqlContext dbContext, IWebHostEnvironment webHostEnvironment)
        {
            _dbContext = dbContext;
            _rootPath = webHostEnvironment.ContentRootPath + "/Storage";
        }

        public int AddImage(Image image)
        {
            var user = _dbContext.Users.SingleOrDefault(x => x.Id == image.UserId);

            var entity = new Entities.Image
            {
                Name = image.Name,
                User = user,
                Folder = null,
                Path = image.Path,
                Starred = image.Starred,
            };

            _dbContext.Images.Add(entity);
            _dbContext.SaveChanges();

            return entity.Id;
        }

        public void AddImage(Image image, Folder folder)
        {
            
        }

        public void DeleteContent(string contentId)
        {
            
        }

        public Image? GetImage(int id)
        {
            var entity = _dbContext.Images.SingleOrDefault(x => x.Id == id);

            if (entity == null)
            {
                return null;
            }

            return new Image()
            {
                Id = entity.Id,
                Name = entity.Name,
                FolderId = entity.Folder == null
                    ? (int?) null
                    : entity.Folder.Id,
                Path = entity.Path,
                Starred = entity.Starred,
            };
        }

        public User? GetUser(int id)
        {
            var user = _dbContext.Users.SingleOrDefault(x => x.Id == id);
            
            if (user == null)
            {
                return null;  
            }
            
            return new User()
            {
                Id = user.Id,
                Login = user.Login,
                PasswordHash = user.PasswordHash,
                PasswordSalt = user.PasswordSalt
            };
        }

        public List<Content> GetContents(string? folderId, string userId)
        {
            var contents = new List<Content>();
            return contents;
        }
        
        public void SaveImage(string path, IFormFile image)
        {
            Directory.CreateDirectory(Path.GetDirectoryName(_rootPath + path));

            using (var fileStream = new FileStream(_rootPath + path, FileMode.Create))
            {
                image.CopyTo(fileStream);
            }  
        }
    }
}