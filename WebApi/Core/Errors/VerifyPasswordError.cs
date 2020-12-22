using System;

namespace WebApi.Core.Errors
{
    public class VerifyPasswordError : Exception
    {
        public VerifyPasswordError() : base() {}
        public VerifyPasswordError(string message) : base(message) {}
    }
}