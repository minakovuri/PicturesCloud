using System;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using WebApi.Controllers.RequestModels;
using WebApi.Controllers.ResponseModels;
using WebApi.Core.Errors;
using WebApi.Core.Models;
using WebApi.Core.Services;

namespace WebApi.Controllers
{
    [ApiController]
    public class UserManagementController : ControllerBase
    {
        private readonly UserManagementService _service;

        public UserManagementController(UserManagementService service)
        {
            _service = service;
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
            catch (LoginTakenError e)
            {
                return StatusCode(StatusCodes.Status409Conflict, e.Message);
            }
            catch (InvalidPasswordError e)
            {
                return StatusCode(StatusCodes.Status400BadRequest, e.Message);
            }
            catch (Exception e)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, e.Message);
            }
        }

        [AllowAnonymous]
        [HttpPost]
        [Route("api/user/auth")]
        public ActionResult<AuthResponse> Auth([FromBody] AuthRequest request)
        {
            AuthResponse response = new AuthResponse()
            {
                User = new User(),
                Token = Guid.NewGuid().ToString(),
            };

            return Ok(response);
        }
    }
}