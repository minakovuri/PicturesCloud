using System;

namespace WebApi.Core.Errors
{
    public class AuthUserNotExistError : Exception
    {
        public AuthUserNotExistError() : base() {}
        public AuthUserNotExistError(string message) : base(message) {}
    }
}