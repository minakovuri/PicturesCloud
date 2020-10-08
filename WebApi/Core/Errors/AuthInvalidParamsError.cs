using System;

namespace WebApi.Core.Errors
{
    public class AuthInvalidParamsError : Exception
    {
        public AuthInvalidParamsError() : base() {}
        public AuthInvalidParamsError(string message) : base(message) {}
    }
}