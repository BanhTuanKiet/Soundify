using System.Text.Json;
using Microsoft.AspNetCore.Authentication;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.IdentityModel.Tokens;

namespace server.Configs
{
    public static class JWTAuthConfig
    {
        public static AuthenticationBuilder AddJWTConfig(this AuthenticationBuilder builder, IConfiguration configuration)
        {
            return builder.AddJwtBearer(options =>
            {
                options.TokenValidationParameters = new TokenValidationParameters
                {
                    ValidateIssuer = true,
                    ValidateAudience = true,
                    ValidateIssuerSigningKey = true,
                    ValidAudiences = configuration.GetSection("Api:ValidAudiences").Get<string[]>(),
                    ValidIssuers = configuration.GetSection("Api:ValidIssuers").Get<string[]>()
                };

                options.Events = new JwtBearerEvents
                {
                    OnMessageReceived = context =>
                    {
                        var token = context.Request.Cookies["token"];
                        if (!string.IsNullOrEmpty(token))
                        {
                            context.Token = token;
                        }
                        return Task.CompletedTask;
                    },
                    OnTokenValidated = async context =>
                    {

                    },
                    OnForbidden = async context =>
                    {
                        Console.WriteLine("OnForbidden triggered");
                        context.Response.StatusCode = StatusCodes.Status403Forbidden;
                        context.Response.ContentType = "application/json";

                        var message = "You are not authorized to perform this action";
                        var response = new { ErrorMessage = message };

                        await context.Response.WriteAsync(JsonSerializer.Serialize(response));
                    },
                    OnChallenge = async context =>
                    {
                        Console.WriteLine("OnChallenge triggered");
                        context.HandleResponse();
                        context.Response.StatusCode = StatusCodes.Status401Unauthorized;
                        context.Response.ContentType = "application/json";

                        var token = context.Request.Cookies["token"];
                        var errorMessage = string.IsNullOrEmpty(token) ? "Please login to continue!" : "Your session has expired. Please log in again.";

                        // if (!string.IsNullOrEmpty(token))
                        // {
                        //     TokenDTO.DecodedToken decodedToken = JwtUtils.DecodeToken(token);
                        //     Console.WriteLine("Decode" + decodedToken.roles.Count());
                        //     if (decodedToken.userId != null && decodedToken.roles != null && decodedToken.name != null)
                        //     {
                        //         var userManager = context.HttpContext.RequestServices.GetRequiredService<UserManager<ApplicationUser>>();
                        //         var userService = context.HttpContext.RequestServices.GetRequiredService<IUsers>();
                        //         var config = context.HttpContext.RequestServices.GetRequiredService<IConfiguration>();

                        //         var refreshToken = await userService.GetRefreshToken(decodedToken.userId);

                        //         if (string.IsNullOrEmpty(refreshToken))
                        //         {
                        //             await context.Response.WriteAsync(JsonSerializer.Serialize(new { ErrorMessage = "Your session has expired. Please log in again." }));
                        //             return;
                        //         }

                        //         if (!JwtUtils.VerifyToken(refreshToken, config))
                        //         {
                        //             await context.Response.WriteAsync(JsonSerializer.Serialize(new { ErrorMessage = "Your session has expired. Please log in again." }));
                        //             return;
                        //         }

                        //         var user = await userManager.FindByIdAsync(decodedToken.userId);
                        //         var newToken = JwtUtils.GenerateToken(user, decodedToken.roles, 1, config);
                        //         CookieUtils.SetCookie(context.Response, "token", newToken, 1);
                        //         Console.WriteLine("New token: " + newToken);
                        //         await context.Response.WriteAsync(JsonSerializer.Serialize(new
                        //         {
                        //             RetryRequest = true,
                        //         }));

                        //         return;
                        //     }
                        // }

                        await context.Response.WriteAsync(JsonSerializer.Serialize(new { ErrorMessage = errorMessage }));
                    },
                };
            });
        }
    }
}