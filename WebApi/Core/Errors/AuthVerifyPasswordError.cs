using System;

namespace WebApi.Core.Errors
{
    public class AuthVerifyPasswordError : Exception
    {
        public AuthVerifyPasswordError() : base() {}
        public AuthVerifyPasswordError(string message) : base(message) {}
    }
}