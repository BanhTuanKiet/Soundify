using Microsoft.AspNetCore.Authentication;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using server.Models;
using server.Services.Album;
using server.Services.Artist;
using server.Services.Playlist;
using server.Services.Song;

namespace server.Configs
{
    public static class AuthConfig
    {
        public static IServiceCollection AddAuth(
            this IServiceCollection services,
            IConfiguration configuration)
        {
            services
                .AddAuthentication(options =>
                {
                    options.DefaultAuthenticateScheme = JwtBearerDefaults.AuthenticationScheme;
                    options.DefaultChallengeScheme = JwtBearerDefaults.AuthenticationScheme;
                })
                .AddJWTConfig(configuration)
                .AddGoogleAuth(configuration);

            return services;
        }
    }
}