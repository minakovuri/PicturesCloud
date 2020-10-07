using System;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using WebApi.Controllers.RequestModels;
using WebApi.Controllers.ResponseModels;
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
            catch (Exception e)
            {
                return StatusCode(500);
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