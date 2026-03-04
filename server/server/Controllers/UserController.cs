using Microsoft.AspNetCore.Authentication;
using Microsoft.AspNetCore.Authentication.Google;
using Microsoft.AspNetCore.Mvc;
using server.Services.Song;

namespace server.Controllers
{
    [Route("[controller]")]
    [ApiController]
    public class UserController : ControllerBase
    {
        private readonly IUser _userService;
        private readonly IConfiguration _configuration;
        public UserController(
            IUser userService,
            IConfiguration configuration)
        {
            _userService = userService;
            _configuration = configuration;
        }

        [HttpGet("signin-google")]
        public IActionResult SignGoogle()
        {
            var returnUrl = _configuration["Authentication:Google:ReturnUrl"];
            var properties = new AuthenticationProperties
            {
                RedirectUri = Url.Action("GoogleCallback", new { returnUrl })
            };

            return Challenge(properties, GoogleDefaults.AuthenticationScheme);
        }
    }
}