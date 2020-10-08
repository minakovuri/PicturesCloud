using System;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Options;
using WebApi.Controllers.RequestModels;
using WebApi.Controllers.ResponseModels;
using WebApi.Core.Errors;
using WebApi.Core.Services;
using WebApi.Settings;
using System.Text;
using Microsoft.IdentityModel.Tokens;

namespace WebApi.Controllers
{
    [Authorize]
    [ApiController]
    public class UserManagementController : ControllerBase
    {
        private readonly UserManagementService _service;
        private readonly JwtSettings _jwtSettings;

        public UserManagementController(UserManagementService service, IOptions<JwtSettings> jwtSettings)
        {
            _service = service;
            _jwtSettings = jwtSettings.Value;
        }

        [AllowAnonymous]
        [HttpPost]
        [Route("api/user/register")]
        public IActionResult Register([FromBody] RegisterRequest request)
        {
            try
            {
                _service.AddUser(request.Login, request.Password);
                return Ok();
            }
            catch (RegistrationLoginTakenError e)
            {
                return StatusCode(StatusCodes.Status409Conflict, new {message = e.Message});
            }
            catch (RegistrationInvalidParamsError e)
            {
                return StatusCode(StatusCodes.Status400BadRequest, new {message = e.Message});
            }
            catch (Exception e)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, new {message = e.Message});
            }
        }

        [AllowAnonymous]
        [HttpPost]
        [Route("api/user/auth")]
        public ActionResult<AuthResponse> Auth([FromBody] AuthRequest request)
        {
            try
            {
                var user = _service.Authenticate(request.Login, request.Password);
                var tokenHandler = new JwtSecurityTokenHandler();
                var key = Encoding.ASCII.GetBytes(_jwtSettings.Secret);

                var tokenDescriptor = new SecurityTokenDescriptor()
                {
                    Subject = new ClaimsIdentity(new Claim[]
                    {
                        new Claim(ClaimTypes.Name, user.Id.ToString())
                    }),
                    Expires = DateTime.UtcNow.AddDays(7),
                    SigningCredentials = new SigningCredentials(new SymmetricSecurityKey(key), SecurityAlgorithms.HmacSha256Signature)
                };

                var token = tokenHandler.CreateToken(tokenDescriptor);
                var tokenString = tokenHandler.WriteToken(token);

                return Ok(new AuthResponse
                {
                    User = user,
                    Token = tokenString
                });
            }
            catch (AuthInvalidParamsError e)
            {
                return StatusCode(StatusCodes.Status400BadRequest, new {message = e.Message});
            }
            catch (AuthUserNotExistError e)
            {
                return StatusCode(StatusCodes.Status404NotFound, new {message = e.Message});
            }
            catch (AuthVerifyPasswordError e)
            {
                return StatusCode(StatusCodes.Status400BadRequest, new {message = e.Message});
            }
            catch (Exception e)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, new {message = e.Message});
            }
        }
    }
}