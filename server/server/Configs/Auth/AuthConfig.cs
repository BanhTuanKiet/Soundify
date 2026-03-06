using Microsoft.AspNetCore.Authentication.JwtBearer;

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
                    options.DefaultAuthenticateScheme = "Cookies";
                    options.DefaultSignInScheme = "Cookies";
                    options.DefaultChallengeScheme = "Google";
                })
                .AddCookie("Cookies")
                .AddJWTConfig(configuration)
                .AddGoogleAuth(configuration);

            return services;
        }
    }
}