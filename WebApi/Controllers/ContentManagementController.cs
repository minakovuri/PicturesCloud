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
            catch (ContentNotExistError e)
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
        public IActionResult DeleteContent(int contentId)
        {
            try
            {
                var userId = Int32.Parse(User.Identity.Name);
                _service.CheckUserExists(userId);
                
                _service.DeleteContent(contentId);

                return Ok();
            }
            catch (UserNotExistError e)
            {
                return StatusCode(StatusCodes.Status404NotFound, new {message = e.Message});
            }
            catch (ContentNotExistError e)
            {
                return StatusCode(StatusCodes.Status404NotFound, new {message = e.Message});
            }
            catch (Exception e)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, new {message = e.Message});
            }
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
            try
            {
                var userId = Int32.Parse(User.Identity.Name);
                _service.CheckUserExists(userId);

                int folderId = _service.AddFolder(request.FolderName, request.ParentFolderId, userId);

                return Ok(new AddFolderResponse()
                {
                    FolderId = folderId,
                });
            }
            catch (UserNotExistError e)
            {
                return StatusCode(StatusCodes.Status404NotFound, new {message = e.Message});
            }
            catch (ContentNotExistError e)
            {
                return StatusCode(StatusCodes.Status404NotFound, new {message = e.Message});
            }
            catch (Exception e)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, new {message = e.Message});
            }
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
            try
            {
                var userId = Int32.Parse(User.Identity.Name);
                _service.CheckUserExists(userId);

                var contents  = _service.GetContents(null, userId);

                return Ok(new GetContentsResponse()
                {
                    Contents = contents.ToArray(),
                });
            }
            catch (UserNotExistError e)
            {
                return StatusCode(StatusCodes.Status404NotFound, new {message = e.Message});
            }
            catch (ContentNotExistError e)
            {
                return StatusCode(StatusCodes.Status404NotFound, new {message = e.Message});
            }
            catch (Exception e)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, new {message = e.Message});
            }
        }
        
        [HttpGet]
        [Route("api/contents/{folderId}")]
        public ActionResult<GetContentsResponse> GetContents(int folderId)
        {
            try
            {
                var userId = Int32.Parse(User.Identity.Name);
                _service.CheckUserExists(userId);

                var contents  = _service.GetContents(folderId, userId);

                return Ok(new GetContentsResponse()
                {
                    Contents = contents.ToArray(),
                });
            }
            catch (UserNotExistError e)
            {
                return StatusCode(StatusCodes.Status404NotFound, new {message = e.Message});
            }
            catch (ContentNotExistError e)
            {
                return StatusCode(StatusCodes.Status404NotFound, new {message = e.Message});
            }
            catch (Exception e)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, new {message = e.Message});
            }
        }

        [HttpGet]
        [Route("api/contents/starred")]
        public ActionResult<GetContentsResponse> GetStarredContents()
        {
            GetContentsResponse response = new GetContentsResponse();
            return Ok(response);
        }

        [HttpGet]
        [Route("api/image/download/{imageId}")]
        public IActionResult DownloadImage(int imageId)
        {
            try
            {
                var userId = Int32.Parse(User.Identity.Name);
                _service.CheckUserExists(userId);

                Image image = _service.GetImage(imageId);

                string downloadUrl = _service.GetImageUploadUrl(image);
                string mimeType = MimeMapping.MimeUtility.GetMimeMapping(image.Name);

                return PhysicalFile(downloadUrl, mimeType, image.Name);
            }
            catch (UserNotExistError e)
            {
                return StatusCode(StatusCodes.Status404NotFound, new {message = e.Message});
            }
            catch (ContentNotExistError e)
            {
                return StatusCode(StatusCodes.Status404NotFound, new {message = e.Message});
            }
            catch (Exception e)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, new {message = e.Message});
            }
        }
    }
}