using server.Models;

namespace server.Services.Song
{
    public interface IUser
    {
        Task<(ApplicationUser user, bool isNewUser)> FindOrCreateUserByEmail(string email, string name);
        Task<bool> SaveRefreshToken(Guid userId, string token);
    }
}