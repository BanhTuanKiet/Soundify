using System.Security.Claims;
using Microsoft.AspNetCore.Authentication;
using Microsoft.AspNetCore.Authentication.Google;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using server.Models;
using server.Services.Song;
using server.Shared;
using server.Util;

namespace server.Configs
{
    public static class GoogleAuthConfig
    {
        public static AuthenticationBuilder AddGoogleAuth(this AuthenticationBuilder builder, IConfiguration configuration)
        {
            builder.AddGoogle(options =>
            {
                string clientId = configuration["Authentication:Google:ClientId"]
                    ?? throw new ErrorException("ClientId is null");

                string clientSecret = configuration["Authentication:Google:ClientSecret"]
                    ?? throw new ErrorException("ClientSecret is null");

                string returnUrl = configuration["Google:ReturnUrl"]
                    ?? throw new ErrorException("ReturnUrl is null");

                options.ClientId = clientId;
                options.ClientSecret = clientSecret;
                options.CallbackPath = configuration["Authentication:Google:Callback"];
                options.SaveTokens = true;
                options.AccessType = "offline";
                options.Scope.Add("email");
                options.Scope.Add("profile");

                options.Events.OnTicketReceived = async context =>
                {
                    HttpContext httpContext = context?.HttpContext
                        ?? throw new ErrorException("HttpContext is null");

                    HttpResponse httpResponse = context?.Response
                        ?? throw new ErrorException("HttpResponse is null");

                    string email = context?.Principal?.FindFirstValue(ClaimTypes.Email)
                        ?? throw new ErrorException(400, "Email is required");

                    string name = context?.Principal?.FindFirstValue(ClaimTypes.Name)
                        ?? throw new ErrorException(400, "Name is required");

                    IUser? userService = httpContext.RequestServices.GetRequiredService<IUser>();
                    UserManager<ApplicationUser>? userManager = httpContext.RequestServices.GetRequiredService<UserManager<ApplicationUser>>();
                    AppDbContext? db = httpContext.RequestServices.GetRequiredService<AppDbContext>();

                    var (user, isNewUser) = await userService.FindOrCreateUserByEmail(email, name);
                    var roles = await userManager.GetRolesAsync(user);

                    var accessToken = JwtUtils.GenerateToken(user, roles, 1, configuration);
                    var refreshToken = JwtUtils.GenerateToken(user, roles, 24, configuration);

                    CookieUtils.SetCookie(httpResponse, "token", accessToken, 24);

                    await userService.SaveRefreshToken(user.Id, refreshToken);
                    await db.SaveChangesAsync();

                    context?.Response.Redirect(returnUrl);
                    context?.HandleResponse();
                };

                options.Events.OnRemoteFailure = context =>
                {
                    context.Response.Redirect($"{returnUrl}?false");
                    context.HandleResponse();
                    return System.Threading.Tasks.Task.CompletedTask;
                };
            });

            return builder;
        }
    }
}