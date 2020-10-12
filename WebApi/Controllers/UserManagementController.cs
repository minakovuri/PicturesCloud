using System;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Options;
using WebApi.Controllers.RequestModels;
using WebApi.Controllers.ResponseModels;
using WebApi.Core.Errors;
using WebApi.Core.Services;
using WebApi.Settings;
using WebApi.Controllers.Utils;

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
            catch (InvalidParamsError e)
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
        public IActionResult Auth([FromBody] AuthRequest request)
        {
            try
            {
                var user = _service.Authenticate(request.Login, request.Password);
                string token = TokenGenerator.GenerateToken(_jwtSettings.Secret, user.Id.ToString());

                return Ok(new AuthResponse
                {
                    User = user,
                    Token = token
                });
            }
            catch (InvalidParamsError e)
            {
                return StatusCode(StatusCodes.Status400BadRequest, new {message = e.Message});
            }
            catch (UserNotExistError e)
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

        [HttpPut]
        [Route("api/user")]
        public IActionResult Update([FromBody] UpdateUserRequest request)
        {
            var userId = User.Identity.Name;

            // TODO

            return Ok();
        }
    }
}