using System;

namespace WebApi.Core.Errors
{
    public class UserNotExistError : Exception
    {
        public UserNotExistError() : base() {}
        public UserNotExistError(string message) : base(message) {}
    }
}