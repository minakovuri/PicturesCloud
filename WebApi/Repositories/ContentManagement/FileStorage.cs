using System.IO;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Http;
using WebApi.Core.Interfaces;

namespace WebApi.Repositories.ContentManagement
{
    public class FileStorage : IFileStorage
    {
        private readonly string _rootPath;
        
        public FileStorage(IWebHostEnvironment webHostEnvironment)
        {
            _rootPath = webHostEnvironment.ContentRootPath + "/Storage";
        }
        
        public void SaveImage(string path, IFormFile image)
        {
            Directory.CreateDirectory(Path.GetDirectoryName(_rootPath + path));

            using (var fileStream = new FileStream(_rootPath + path, FileMode.Create))
            {
                image.CopyTo(fileStream);
            }  
        }

        public bool ImageExist(string path)
        {
            return File.Exists(_rootPath + path);
        }

        public string GetRootPath()
        {
            return _rootPath;
        }
    }
}