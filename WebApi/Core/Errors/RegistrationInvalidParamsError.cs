using System;

namespace WebApi.Core.Errors
{
    public class RegistrationInvalidParamsError : Exception
    {
        public RegistrationInvalidParamsError() : base() {}
        public RegistrationInvalidParamsError(string message) : base(message) {}
    }
}