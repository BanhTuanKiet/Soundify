using AutoMapper;
using server.Models;
using Microsoft.EntityFrameworkCore;
using server.Services.Song;
using server.Shared;
using System.Text.RegularExpressions;
using Microsoft.AspNetCore.Identity;

namespace server.Services.Album
{
    public class UserService : IUser
    {
        private readonly AppDbContext _context;
        private readonly IMapper _mapper;
        private readonly UserManager<ApplicationUser> _userManager;
        public UserService(
            AppDbContext context,
            UserManager<ApplicationUser> userManager,
            IMapper mapper)
        {
            _context = context;
            _userManager = userManager;
            _mapper = mapper;
        }

        public async Task<(ApplicationUser user, bool isNewUser)> FindOrCreateUserByEmail(string email, string name)
        {
            var user = await _context.Users
                .FirstOrDefaultAsync(u => u.Email == email);

            if (user != null)
            {
                return (user, false);
            }

            string baseUserName = Regex
                .Replace(name ?? email.Split('@')[0], @"[^a-zA-Z0-9]", "")
                .ToLower();

            string finalUserName = baseUserName;
            int suffix = 1;

            while (await _userManager.FindByNameAsync(finalUserName) != null)
            {
                finalUserName = $"{baseUserName}{suffix}";
                suffix++;
            }

            user = new ApplicationUser
            {
                Email = email,
                UserName = finalUserName,
                EmailConfirmed = true
            };

            var result = await _userManager.CreateAsync(user);

            if (!result.Succeeded)
            {
                var messages = string.Join(" | ",
                    result.Errors.Select(e => $"{e.Code}: {e.Description}"));
                throw new ErrorException(400, "Failed to create user: " + messages);
            }

            var roleResult = await _userManager.AddToRoleAsync(user, "User");
            if (!roleResult.Succeeded)
            {
                var messages = string.Join(" | ",
                    roleResult.Errors.Select(e => $"{e.Code}: {e.Description}"));
                throw new ErrorException(400, "Failed to add role: " + messages);
            }

            return (user, true);
        }

        public async Task<bool> SaveRefreshToken(Guid userId, string token)
        {
            ApplicationUser? user = await _context.Users.FindAsync(userId);
            
            if (user == null)
                return false;

            user.RefreshToken = token;

            _context.Users.Update(user);
            await _context.SaveChangesAsync();

            return true;
        }
    }
}