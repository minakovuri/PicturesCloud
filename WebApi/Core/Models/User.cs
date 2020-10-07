namespace WebApi.Core.Models
{
    public struct User
    {
        public int Id;
        public string Login;
        public byte[] PasswordHash { get; set; }
        public byte[] PasswordSalt { get; set; }
    }
}