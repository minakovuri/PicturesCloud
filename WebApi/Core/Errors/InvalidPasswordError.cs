using System;

namespace WebApi.Core.Errors
{
    public class InvalidPasswordError : Exception
    {
        public InvalidPasswordError() : base() {}
        public InvalidPasswordError(string message) : base(message) {}
    }
}