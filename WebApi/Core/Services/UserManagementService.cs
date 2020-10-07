using System;
using WebApi.Core.Errors;
using WebApi.Core.Interfaces;
using WebApi.Core.Models;

namespace WebApi.Core.Services
{
    public class UserManagementService
    {
        private readonly IUserManagementRepository _repository;

        public UserManagementService(IUserManagementRepository repository)
        {
            _repository = repository;
        }

        public void AddUser(string login, string password)
        {
            if (string.IsNullOrWhiteSpace(password))
                throw new InvalidPasswordError("Password is required");
            
            if (_repository.LoginAlreadyTaken(login))
                throw new LoginTakenError("Login \"" + login + "\" is already taken");

            byte[] passwordHash, passwordSalt;
            CreatePasswordHash(password, out passwordHash, out passwordSalt);

            User user = new User()
            {
                Login = login,
                PasswordHash = passwordHash,
                PasswordSalt = passwordSalt,
            };

            _repository.AddUser(user);
        }
        
        private static void CreatePasswordHash(string password, out byte[] passwordHash, out byte[] passwordSalt)
        {
            using (var hmac = new System.Security.Cryptography.HMACSHA512())
            {
                passwordSalt = hmac.Key;
                passwordHash = hmac.ComputeHash(System.Text.Encoding.UTF8.GetBytes(password));
            }
        }
    }
}