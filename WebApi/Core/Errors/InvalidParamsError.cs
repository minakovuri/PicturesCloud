using System;

namespace WebApi.Core.Errors
{
    public class InvalidParamsError : Exception
    {
        public InvalidParamsError() : base() {}
        public InvalidParamsError(string message) : base(message) {}
    }
}