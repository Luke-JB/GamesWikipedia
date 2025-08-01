using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Diagnostics.Eventing.Reader;
using gwBackend.Data;
using gwBackend.Data.Models;
using gwBackend.Data.DTO;
using System.Text;
using System.Text.Json;
using System.Text.Json.Serialization;
using Microsoft.AspNetCore.Authorization;
using System.Security.Claims;
using System.Xml.Linq;

namespace gwBackend.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class UserController : ControllerBase
    {
        private readonly AppDbContext _context;
        private readonly UserManager<User> _userManager;
        private readonly SignInManager<User> _signInManager;

        public UserController(AppDbContext context, UserManager<User> userManager, SignInManager<User> signInManager)
        {
            _context = context;
            _userManager = userManager;
            _signInManager = signInManager;
        }

        // Register a new user
        [HttpPost]
        [Route("RegisterNewUser")]
        public async Task<IActionResult> Register([FromBody] NewUserDto register)
        {
            try
            {
                if (!ModelState.IsValid)
                {
                    return BadRequest(ModelState);
                }

                var user = new User
                {
                    UserName = register.Username,
                    Email = register.Email,
                    Name = register.Name
                };

                var result = await _userManager.CreateAsync(user, register.Password);
                if (result.Succeeded)
                {
                    await _userManager.AddToRoleAsync(user, "User");
                    await _signInManager.SignInAsync(user, isPersistent: false);
                    return Ok(user);
                }

                foreach (var error in result.Errors)
                {
                    ModelState.AddModelError(string.Empty, error.Description);
                }

                return BadRequest(ModelState);
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Internal server error: {ex.Message}");
            }
        }

        // Login user account
        [HttpPost]
        [Route("LoginUser")]
        public async Task<IActionResult> Login([FromBody] LoginDto login)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var user = await _userManager.FindByNameAsync(login.UserName); //?? await _userManager.FindByEmailAsync(login.UserName);
            if (user == null)
            {
                return Unauthorized();
            }

            var result = await _signInManager.PasswordSignInAsync(user, login.Password, login.RememberMe, lockoutOnFailure: false);
            if (result.Succeeded)
            {
                return Ok();
            }

            return Unauthorized();
        }

        // Logout user account
        [HttpPost]
        [Route("LogoutUser")]
        public async Task<IActionResult> Logout()
        {
            await _signInManager.SignOutAsync();
            return Ok();
        }

        // Get user info
        [Authorize]
        [HttpGet]
        [Route("UserRoles")]
        public async Task<IActionResult> GetUserInfo()
        {
            var userId = User.FindFirst(ClaimTypes.NameIdentifier)?.Value;
            var roles = User.FindAll(ClaimTypes.Role).Select(r => r.Value);
            return Ok(new { UserId = userId, Roles = roles });
        }

        [HttpGet]
        [Route("Profile")]
        public async Task<IActionResult> GetProfile()
        {
            var userId = User.FindFirstValue(ClaimTypes.NameIdentifier);
            var user = await _userManager.GetUserAsync(User);
            if (user == null)
            {
                return NotFound();
            }
            return Ok(new { user.UserName, user.Email });
        }

        [Authorize]
        [HttpPut]
        [Route("UpdateProfile")]
        public async Task<IActionResult> UpdateProfile([FromBody] UpdateUserDto update)
        {
            var user = await _userManager.GetUserAsync(User) as User;

            if (user == null)
            {
                return Unauthorized();
            }
            user.UserName = update.Username;
            user.Email = update.Email;
            user.Name = update.Name;

            var updateResult = await _userManager.UpdateAsync(user);

            if (!updateResult.Succeeded)
            {
                return BadRequest(updateResult.Errors);
            }

            if (!string.IsNullOrWhiteSpace(update.NewPassword))
            {
                var removePasswordResult = await _userManager.RemovePasswordAsync(user);
                if (!removePasswordResult.Succeeded)
                {
                    return BadRequest(removePasswordResult.Errors);
                }

                var addPasswordResult = await _userManager.AddPasswordAsync(user, update.NewPassword);
                if (!addPasswordResult.Succeeded)
                {
                    return BadRequest(addPasswordResult.Errors);
                }
            }
            return Ok();
        }
        [Authorize]
        [HttpGet("Me")]
        public async Task<IActionResult> GetCurrentUser()
        {
            var user = await _userManager.GetUserAsync(User);
            if (user == null) return Unauthorized();

            var roles = await _userManager.GetRolesAsync(user);

            return Ok(new
            {
                //user.UserName,
                //user.Email,
                //Roles = roles
                userName = user.UserName,
                email = user.Email,
                roles = roles
            });
        }
        [Authorize]
        [HttpGet("Favorites")]
        public async Task<IActionResult> GetFavorites()
        {
            var userId = User.FindFirstValue(ClaimTypes.NameIdentifier);
            var favorites = await _context.UserFavoriteGames
                .Where(f => f.UserId == userId)
                .Include(f => f.Game)
                .Select(f => new
                {
                    f.Game.GameId,
                    f.Game.GameName,
                    f.Game.GameGenre
                })
                .ToListAsync();

            return Ok(favorites);
        }
        [HttpGet]
        public IActionResult GetUsers()
        {
            var users = _userManager.Users.ToList();
            return Ok(users); // Ensure data is returning here
        }
    }
}


