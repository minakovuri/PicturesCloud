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

        public User Authenticate(string login, string password)
        {
            if (string.IsNullOrEmpty(login) || string.IsNullOrEmpty(password))
                throw new InvalidParamsError("Password and login are required");

            var user = _repository.GetUser(login);
            if (user == null)
                throw new UserNotExistError("User with login \"" + login + "\" doesn't exist");
            
            if (!PasswordManager.VerifyPasswordHash(password, user.PasswordHash, user.PasswordSalt))
                throw new AuthVerifyPasswordError("Password \"" + password + "\"is incorrect");

            return user;
        }

        public void AddUser(string login, string password)
        {
            if (string.IsNullOrWhiteSpace(password))
                throw new InvalidParamsError("Password is required");
            
            if (_repository.LoginAlreadyTaken(login))
                throw new RegistrationLoginTakenError("Login \"" + login + "\" is already taken");

            byte[] passwordHash, passwordSalt;
            PasswordManager.CreatePasswordHash(password, out passwordHash, out passwordSalt);

            User user = new User()
            {
                Login = login,
                Guid = Guid.NewGuid().ToString(),
                PasswordHash = passwordHash,
                PasswordSalt = passwordSalt,
            };

            _repository.AddUser(user);
        }
    }
}