using System.Security.Claims;
using Microsoft.AspNetCore.Authentication;
using Microsoft.AspNetCore.Authentication.Google;
using Microsoft.AspNetCore.Authentication.OAuth;
using Microsoft.AspNetCore.Identity;
using server.Models;
using server.Services.Song;
using server.Shared;
using server.Util;

namespace server.Configs
{
    public static class _GGAuth
    {
        public static AuthenticationBuilder _AddGoogleAuth(
            this AuthenticationBuilder builder,
            IConfiguration configuration
        )
        {
            builder.AddGoogle(options =>
            {
                string clientId = configuration["Authentication:Google:ClientId"]
                    ?? throw new ErrorException("ClientId is null");

                string clientSecret = configuration["Authentication:Google:ClientSecret"]
                    ?? throw new ErrorException("ClientSecret is null");

                string returnUrl = configuration["Authentication:Google:ReturnUrl"]
                    ?? throw new ErrorException("ReturnUrl is null");

                options.ClientId = clientId;
                options.ClientSecret = clientSecret;
                options.CallbackPath = configuration["Authentication:Google:Callback"] ?? "/signin-google";
                options.SaveTokens = true;
                options.Scope.Add("email");
                options.Scope.Add("profile");
                options.CorrelationCookie.SameSite = SameSiteMode.Lax;
                options.CorrelationCookie.SecurePolicy = CookieSecurePolicy.SameAsRequest;

                options.Events = new OAuthEvents
                {
                    OnTicketReceived = async context =>
                    {
                        HttpContext httpContext = context.HttpContext;
                        HttpResponse response = context.Response;

                        string email = context.Principal?.FindFirstValue(ClaimTypes.Email)
                            ?? throw new ErrorException(400, "Email not found");

                        string name = context.Principal?.FindFirstValue(ClaimTypes.Name)
                            ?? "Google User";

                        var userManager = httpContext.RequestServices
                            .GetRequiredService<UserManager<ApplicationUser>>();
                        var userService = httpContext.RequestServices
                            .GetRequiredService<IUser>();

                        var (user, isNewUser) = await userService.FindOrCreateUserByEmail(email, name);
                        var encodedEmail = Uri.EscapeDataString(email);
                        var encodedName = Uri.EscapeDataString(name);

                        if (user == null)
                        {
                            context.Response.Redirect($"{returnUrl}?status=google_error");
                            context.HandleResponse();
                            return;
                        }

                        IList<string> roles = await userManager.GetRolesAsync(user);
                        string accessToken = JwtUtils.GenerateToken(user, roles, 1, configuration);
                        string refreshToken = JwtUtils.GenerateToken(user, roles, 24, configuration);

                        CookieUtils.SetCookie(context.Response, "spotify_token", accessToken, 24);
                        await userService.SaveRefreshToken(user.Id, refreshToken);

                        response.Redirect($"{returnUrl}/signup?email={encodedEmail}&name={encodedName}&status=true");
                        context.HandleResponse();
                    },

                    OnRemoteFailure = context =>
                    {
                        context.Response.Redirect($"{returnUrl}?status=google_error");
                        context.HandleResponse();
                        return Task.CompletedTask;
                    }
                };
            });

            return builder;
        }
    }
}