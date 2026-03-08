using Microsoft.AspNetCore.Authentication;
using Microsoft.AspNetCore.Authentication.Google;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using server.DTO;
using server.Models;
using server.Services.Song;
using server.Shared;

namespace server.Controllers
{
    [Route("[controller]")]
    [ApiController]
    public class UserController : ControllerBase
    {
        private readonly IUser _userService;
        private readonly IConfiguration _configuration;
        private readonly UserManager<ApplicationUser> _userManager;
        public UserController(
            IUser userService,
            UserManager<ApplicationUser> userManager,
            IConfiguration configuration)
        {
            _userService = userService;
            _userManager = userManager;
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

        [HttpPost("signin-google/confirm")]
        public async Task<IActionResult> GoogleSignup([FromBody] UserDTO.UserLogin userLogin)
        {
            if (userLogin?.DateOfBirth == null)
            {
                throw new ErrorException(StatusCodes.Status400BadRequest, "DateOfBirth is required");
            }

            int day = int.Parse(userLogin.DateOfBirth.Day);
            int month = int.Parse(userLogin.DateOfBirth.Month);
            int year = int.Parse(userLogin.DateOfBirth.Year);

            DateOnly dob = new DateOnly(year, month, day);

            var user = await _userService.CreateUser(userLogin, dob);

            return Ok(user);
        }

        [HttpPost("signup-email")]
        public async Task<IActionResult> EmailSignup([FromBody] UserDTO.EmailSignup emailSignup)
        {
            ApplicationUser? existedUser = await _userManager.FindByEmailAsync(emailSignup.Email);

            if (existedUser != null)
            {
                throw new ErrorException(StatusCodes.Status409Conflict, "User with this email already exists");
            }

            return Ok(emailSignup);
        }

    }
}