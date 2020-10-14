using System;

namespace WebApi.Core.Errors
{
    public class ImageAlreadyUploadError : Exception
    {
        public ImageAlreadyUploadError(string message) : base(message) {}
    }
}