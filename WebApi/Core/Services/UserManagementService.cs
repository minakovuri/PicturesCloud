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
        
        public void CheckUserExists(int userId)
        {
            var user = _repository.GetUser(userId);

            if (user == null)
                throw new UserNotExistError();
        }

        public User Authenticate(string login, string password)
        {
            if (string.IsNullOrEmpty(login) || string.IsNullOrEmpty(password))
                throw new InvalidParamsError();

            var user = _repository.GetUser(login);
            if (user == null)
                throw new UserNotExistError();
            
            if (!PasswordManager.VerifyPasswordHash(password, user.PasswordHash, user.PasswordSalt))
                throw new VerifyPasswordError();

            return user;
        }

        public User GetUser(int userId)
        {
            var user = _repository.GetUser(userId);
            if (user == null)
                throw new UserNotExistError();

            return user;
        }

        public void AddUser(string login, string password)
        {
            if (string.IsNullOrWhiteSpace(password))
                throw new InvalidParamsError();
            
            if (_repository.LoginAlreadyTaken(login))
                throw new LoginTakenError();

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
                throw new LoginTakenError();
            
            var user = _repository.GetUser(userId);
            if (user == null)
                throw new UserNotExistError();

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
                throw new UserNotExistError();
            
            if (!PasswordManager.VerifyPasswordHash(password, user.PasswordHash, user.PasswordSalt))
                throw new VerifyPasswordError();
            
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