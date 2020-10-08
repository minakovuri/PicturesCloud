using System;

namespace WebApi.Core.Errors
{
    public class RegistrationLoginTakenError : Exception
    {
        public RegistrationLoginTakenError() : base() {}
        
        public RegistrationLoginTakenError(string message) : base(message) {}
    }
}