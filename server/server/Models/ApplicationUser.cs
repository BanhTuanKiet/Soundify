using Microsoft.AspNetCore.Identity;

namespace server.Models
{
    public class ApplicationUser : IdentityUser<Guid>
    {
        public string DisplayName { get; set; } = string.Empty;
        public string? RefreshToken { get; set; }
        public bool IsActive { get; set; } = true;
        public string AvatarUrl { get; set; } = string.Empty;
        public bool Sex { get; set; }
        public DateOnly DateOfBirth { get; set; }
    }
}
