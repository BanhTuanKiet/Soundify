using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using Microsoft.IdentityModel.Tokens;
using server.DTO;
using server.Models;
using server.Shared;

namespace server.Util
{
    public static class JwtUtils
    {
        public static string GenerateToken(
            ApplicationUser user,
            IList<string> roles,
            int timeExp,
            IConfiguration configuration)
        {
            string jwtKey = configuration["JWT:KEY"]
                ?? throw new ErrorException("JWT KEY is null");

            JwtSecurityTokenHandler tokenHandler =
                new JwtSecurityTokenHandler();

            List<Claim> claims = new List<Claim>
            {
                new Claim(ClaimTypes.NameIdentifier, user.Id.ToString()),
                new Claim(ClaimTypes.Name, user.UserName ?? string.Empty),
                new Claim(ClaimTypes.Email, user.Email ?? string.Empty),
                new Claim("avatar_url", user?.AvatarUrl ?? string.Empty)
            };

            foreach (string role in roles)
            {
                claims.Add(new Claim(ClaimTypes.Role, role));
            }

            SecurityTokenDescriptor tokenDescriptor =
                new SecurityTokenDescriptor
                {
                    Subject = new ClaimsIdentity(claims),
                    Expires = DateTime.UtcNow.AddHours(timeExp),
                    Issuer = configuration["JWT:ISSUER"],
                    Audience = configuration["JWT:AUDIENCE"],
                    SigningCredentials =
                        new SigningCredentials(
                            new SymmetricSecurityKey(Encoding.UTF8.GetBytes(jwtKey)),
                            SecurityAlgorithms.HmacSha256
                        )
                };

            SecurityToken token =
                tokenHandler.CreateToken(tokenDescriptor);

            return tokenHandler.WriteToken(token);
        }

        public static bool VerifyToken(
            string token,
            IConfiguration configuration)
        {
            string jwtKey = configuration["JWT:KEY"]
                ?? throw new ErrorException("JWT KEY is null");

            TokenValidationParameters validationParameters =
                new TokenValidationParameters
                {
                    ValidateIssuer = true,
                    ValidateAudience = true,
                    ValidateLifetime = true,
                    ValidateIssuerSigningKey = true,
                    ValidIssuer = configuration["JWT:ISSUER"],
                    ValidAudience = configuration["JWT:AUDIENCE"],
                    IssuerSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(jwtKey))
                };

            JwtSecurityTokenHandler tokenHandler = new JwtSecurityTokenHandler();
            tokenHandler.ValidateToken(token, validationParameters, out SecurityToken validatedToken);

            return true;
        }

        public static TokenDTO.DecodedToken DecodeToken(string token)
        {
            JwtSecurityTokenHandler tokenHandler = new JwtSecurityTokenHandler();

            JwtSecurityToken jwtToken = tokenHandler.ReadJwtToken(token);

            Claim? nameIdClaim = jwtToken.Claims.FirstOrDefault(c => c.Type == ClaimTypes.NameIdentifier || c.Type == "nameid");
            Claim? nameClaim = jwtToken.Claims.FirstOrDefault(c => c.Type == ClaimTypes.Name || c.Type == "unique_name");
            Claim? emailClaim = jwtToken.Claims.FirstOrDefault(c => c.Type == ClaimTypes.Email || c.Type == "email");
            Claim? avatarClaim = jwtToken.Claims.FirstOrDefault(c => c.Type == "avatar_url");
            List<string> roles = jwtToken.Claims
                .Where(c => c.Type == ClaimTypes.Role || c.Type == "role")
                .Select(c => c.Value)
                .ToList();

            return new TokenDTO.DecodedToken
            {
                UserId = nameIdClaim?.Value ?? string.Empty,
                Name = nameClaim?.Value ?? string.Empty,
                Email = emailClaim?.Value ?? string.Empty,
                AvatarUrl = avatarClaim?.Value ?? string.Empty,
                Roles = roles
            };
        }
    }
}