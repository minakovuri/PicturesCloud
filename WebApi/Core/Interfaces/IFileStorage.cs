using Microsoft.AspNetCore.Http;

namespace WebApi.Core.Interfaces
{
    public interface IFileStorage
    {
        public void SaveImage(string path, IFormFile image);

        public void DeleteImage(string path);

        public bool ImageExist(string path);

        public string GetRootPath();
    }
}