using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using WebApi.Controllers.RequestModels;
using WebApi.Controllers.ResponseModels;
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
            AddImageResponse response = new AddImageResponse();
            return Ok(response);
        }

        [HttpPost]
        [Route("api/image/upload")]
        public IActionResult UploadImage(IFormFile file)
        {
            return Ok();
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