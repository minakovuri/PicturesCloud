using System;

namespace WebApi.Core.Errors
{
    public class ContentNotExistError : Exception
    {
        public ContentNotExistError() : base() {}
        public ContentNotExistError(string message) : base(message) {}
    }
}