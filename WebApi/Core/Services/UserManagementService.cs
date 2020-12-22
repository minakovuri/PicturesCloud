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
                throw new VerifyPasswordError("Password is incorrect");

            return user;
        }

        public User GetUser(int userId)
        {
            var user = _repository.GetUser(userId);
            if (user == null)
                throw new UserNotExistError("User doesn't exist");

            return user;
        }

        public void AddUser(string login, string password)
        {
            if (string.IsNullOrWhiteSpace(password))
                throw new InvalidParamsError("Password is required");
            
            if (_repository.LoginAlreadyTaken(login))
                throw new LoginTakenError("Login is already taken");

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

        public void UpdateUserLogin(int userId, string newLogin)
        {
            if (_repository.LoginAlreadyTaken(newLogin))
                throw new LoginTakenError("Login is already taken");
            
            var user = _repository.GetUser(userId);
            if (user == null)
                throw new UserNotExistError("User doesn't exist");

            User updatedUser = new User
            {
                Login = newLogin,
                Guid = user.Guid,
                PasswordHash = user.PasswordHash,
                PasswordSalt = user.PasswordSalt,
            };
            
            _repository.UpdateUser(userId, updatedUser);
        }

        public void UpdateUserPassword(int userId, string password, string newPassword)
        {
            var user = _repository.GetUser(userId);
            if (user == null)
                throw new UserNotExistError("User doesn't exist");
            
            if (!PasswordManager.VerifyPasswordHash(password, user.PasswordHash, user.PasswordSalt))
                throw new VerifyPasswordError("Password is incorrect");
            
            byte[] newPasswordHash, newPasswordSalt;
            PasswordManager.CreatePasswordHash(newPassword, out newPasswordHash, out newPasswordSalt);
            
            User updatedUser = new User
            {
                Login = user.Login,
                Guid = user.Guid,
                PasswordHash = newPasswordHash,
                PasswordSalt = newPasswordSalt,
            };
            
            _repository.UpdateUser(userId, updatedUser);
        }
    }
}