using Microsoft.AspNetCore.Authorization;
using System;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using WebApi.Controllers.RequestModels;
using WebApi.Controllers.ResponseModels;
using WebApi.Core.Errors;
using WebApi.Core.Models;
using WebApi.Core.Services;

namespace WebApi.Controllers
{
    [Authorize]
    [ApiController]
    public class ContentManagementController : ControllerBase
    {
        private readonly ContentManagementService _service;

        public ContentManagementController(ContentManagementService service)
        {
            _service = service;
        }

        [HttpPost]
        [Route("api/image")]
        public ActionResult<AddImageResponse> AddImage([FromBody] AddImageRequest request)
        {
            try
            {
                var userId = Int32.Parse(User.Identity.Name);
                _service.CheckUserExists(userId);

                int imageId = _service.AddImage(request.FileName, request.FolderId, userId);
                Image image = _service.GetImage(imageId);

                return Ok(new AddImageResponse()
                {
                    UploadUrl = image.Path,
                    ContentId = image.Id
                });
            }
            catch (UserNotExistError e)
            {
                return StatusCode(StatusCodes.Status404NotFound, new {message = e.Message});
            }
            catch (Exception e)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, new {message = e.Message});
            }
        }

        [HttpPost]
        [Route("api/image/upload")]
        public IActionResult UploadImage([FromForm] IFormFile image, [FromForm] string uploadUrl)
        {
            try
            {
                var userId = Int32.Parse(User.Identity.Name);
                _service.CheckUserExists(userId);

                _service.UploadImage(image, uploadUrl);

                return Ok();
            }
            catch (UserNotExistError e)
            {
                return StatusCode(StatusCodes.Status404NotFound, new {message = e.Message});
            }
            catch (ImageAlreadyUploadError e)
            {
                return StatusCode(StatusCodes.Status400BadRequest, new {message = e.Message});
            }
            catch (Exception e)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, new {message = e.Message});
            }
        }

        [HttpDelete]
        [Route("api/content/{contentId}")]
        public IActionResult DeleteContent(string contentId)
        {
            return Ok();
        }

        [HttpGet]
        [Route("api/content/{contentId}")]
        public ActionResult<GetContentResponse> GetContent(string contentId)
        {
            GetContentResponse response = new GetContentResponse();
            return Ok(response);
        }
        
        [HttpPost]
        [Route("api/folder")]
        public ActionResult<AddFolderResponse> AddFolder([FromBody] AddFolderRequest request)
        {
            AddFolderResponse response = new AddFolderResponse();
            return Ok(response);
        }

        [HttpPost]
        [Route("api/content/starred")]
        public IActionResult AddToStarred([FromBody] AddToStarredRequest request)
        {
            return Ok();
        }

        [HttpGet]
        [Route("api/contents")]
        public ActionResult<GetContentsResponse> GetContents()
        {
            GetContentsResponse response = new GetContentsResponse();
            return Ok(response);
        }

        [HttpGet]
        [Route("api/contents/starred")]
        public ActionResult<GetContentsResponse> GetStarredContents()
        {
            GetContentsResponse response = new GetContentsResponse();
            return Ok(response);
        }

        [HttpGet]
        [Route("api/image/download/{path}")]
        public ActionResult<FileStreamResult> DownloadImage()
        {
            return NotFound();
        }
    }
}