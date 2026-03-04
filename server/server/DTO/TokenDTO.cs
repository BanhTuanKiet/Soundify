namespace server.DTO
{
    public class TokenDTO
    {
        public class DecodedToken
        {
            public string UserId { get; set; } = string.Empty;
            public string Email { get; set; } = string.Empty;
            public string Name { get; set; } = string.Empty;
            public List<string> Roles { get; set; } = new();
            public string? AvatarUrl { get; set; }
        }
    }
}