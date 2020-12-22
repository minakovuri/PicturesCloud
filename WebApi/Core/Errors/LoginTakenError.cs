using System;

namespace WebApi.Core.Errors
{
    public class LoginTakenError : Exception
    {
        public LoginTakenError() : base() {}
        
        public LoginTakenError(string message) : base(message) {}
    }
}