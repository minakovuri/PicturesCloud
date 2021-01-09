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
        private readonly ContentManagementService _contentManagementService;
        private readonly UserManagementService _userManagementService;

        public ContentManagementController(ContentManagementService contentManagementService, UserManagementService userManagementService)
        {
            _contentManagementService = contentManagementService;
            _userManagementService = userManagementService;
        }

        [HttpPost]
        [Route("api/image")]
        public ActionResult<AddImageResponse> AddImage([FromBody] AddImageRequest request)
        {
            try
            {
                var userId = Int32.Parse(User.Identity.Name);
                User user = _userManagementService.GetUser(userId);

                int imageId = _contentManagementService.AddImage(request.FileName, request.FolderId, user);
                Image image = _contentManagementService.GetImage(imageId);

                return Ok(new AddImageResponse()
                {
                    UploadUrl = image.Path,
                    ContentId = image.Id
                });
            }
            catch (UserNotExistError)
            {
                return StatusCode(StatusCodes.Status404NotFound, new
                {
                    message = "Пользователь не найден"
                });
            }
            catch (ContentNotExistError)
            {
                return StatusCode(StatusCodes.Status404NotFound, new
                {
                    message = "Родительская папка не найдена"
                });
            }
            catch (Exception e)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, new {message = e.Message});
            }
        }

        [HttpPost]
        [Route("api/content/update")]
        public IActionResult RenameContent([FromBody] RenameContentRequest request)
        {
            try
            {
                var userId = Int32.Parse(User.Identity.Name);
                _userManagementService.CheckUserExists(userId);

                _contentManagementService.RenameContent(request.ContentId, request.NewName);

                return Ok();
            }
            catch (UserNotExistError)
            {
                return StatusCode(StatusCodes.Status404NotFound, new
                {
                    message = "Пользователь не найден"
                });
            }
            catch (ContentNotExistError)
            {
                return StatusCode(StatusCodes.Status404NotFound, new
                {
                    message = "Материал не найден"
                });
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
                _userManagementService.CheckUserExists(userId);

                _contentManagementService.UploadImage(image, uploadUrl);

                return Ok();
            }
            catch (UserNotExistError)
            {
                return StatusCode(StatusCodes.Status404NotFound, new
                {
                    message = "Пользователь не найден"
                });
            }
            catch (ImageAlreadyUploadError)
            {
                return StatusCode(StatusCodes.Status400BadRequest, new
                {
                    message = "Изображение для материала уже загружено"
                });
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
                _userManagementService.CheckUserExists(userId);
                
                _contentManagementService.DeleteContent(contentId, userId);

                return Ok();
            }
            catch (UserNotExistError)
            {
                return StatusCode(StatusCodes.Status404NotFound, new
                {
                    message = "Пользователь не найден"
                });
            }
            catch (ContentNotExistError)
            {
                return StatusCode(StatusCodes.Status404NotFound, new
                {
                    message = "Материал не найден"
                });
            }
            catch (Exception e)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, new {message = e.Message});
            }
        }

        [HttpGet]
        [Route("api/content/{contentId}")]
        public ActionResult<GetContentResponse> GetContent(int contentId)
        {
            try
            {
                var userId = Int32.Parse(User.Identity.Name);
                _userManagementService.CheckUserExists(userId);

                var content = _contentManagementService.GetContent(contentId);

                GetContentResponse response = new GetContentResponse()
                {
                    Content = ApiContentMapper.MapContentData(content)
                };

                return Ok(response);
            }
            catch (UserNotExistError)
            {
                return StatusCode(StatusCodes.Status404NotFound, new
                {
                    message = "Пользователь не найден"
                });
            }
            catch (ContentNotExistError)
            {
                return StatusCode(StatusCodes.Status404NotFound, new
                {
                    message = "Материал не найден"
                });
            }
            catch (Exception e)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, new {message = e.Message});
            }
        }
        
        [HttpPost]
        [Route("api/folder")]
        public ActionResult<AddFolderResponse> AddFolder([FromBody] AddFolderRequest request)
        {
            try
            {
                var userId = Int32.Parse(User.Identity.Name);
                _userManagementService.CheckUserExists(userId);

                int folderId = _contentManagementService.AddFolder(request.FolderName, request.ParentFolderId, userId);

                return Ok(new AddFolderResponse()
                {
                    FolderId = folderId,
                });
            }
            catch (UserNotExistError)
            {
                return StatusCode(StatusCodes.Status404NotFound, new
                {
                    message = "Пользователь не найден"
                });
            }
            catch (ContentNotExistError)
            {
                return StatusCode(StatusCodes.Status404NotFound, new
                {
                    message = "Родительская папка не существует"
                });
            }
            catch (Exception e)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, new {message = e.Message});
            }
        }

        [HttpPost]
        [Route("api/image/starred")]
        public IActionResult ChangeImageStarred([FromBody] ChangeImageStarredRequest request)
        {
            try
            {
                var userId = Int32.Parse(User.Identity.Name);
                _userManagementService.CheckUserExists(userId);
                
                _contentManagementService.SetImageStarred(request.ImageId, request.Starred);

                return Ok();
            }
            catch (UserNotExistError)
            {
                return StatusCode(StatusCodes.Status404NotFound, new
                {
                    message = "Пользователь не найден"
                });
            }
            catch (ContentNotExistError)
            {
                return StatusCode(StatusCodes.Status404NotFound, new
                {
                    message = "Материал не найден"
                });
            }
            catch (Exception e)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, new {message = e.Message});
            }
        }

        [HttpGet]
        [Route("api/contents")]
        public ActionResult<GetContentsResponse> GetContents()
        {
            try
            {
                var userId = Int32.Parse(User.Identity.Name);
                _userManagementService.CheckUserExists(userId);

                var contents  = _contentManagementService.GetContents(null, userId);

                return Ok(new GetContentsResponse()
                {
                    Contents = ApiContentMapper.MapContentsData(contents.ToArray()),
                });
            }
            catch (UserNotExistError)
            {
                return StatusCode(StatusCodes.Status404NotFound, new
                {
                    message = "Пользователь не найден"
                });
            }
            catch (ContentNotExistError)
            {
                return StatusCode(StatusCodes.Status404NotFound, new
                {
                    message = "Папка не найдена"
                });
            }
            catch (Exception e)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, new {message = e.Message});
            }
        }
        
        [HttpGet]
        [Route("api/folder/list/{folderId}")]
        public ActionResult<ListFoldersTreeResponse> ListFoldersTree(int folderId)
        {
            try
            {
                var userId = Int32.Parse(User.Identity.Name);
                _userManagementService.CheckUserExists(userId);

                var folders = _contentManagementService.ListFoldersTree(folderId);

                return Ok(new ListFoldersTreeResponse()
                {
                    Folders = ApiListFoldersTreeMapper.MapListFolderTree(folders.ToArray()),
                });
            }
            catch (UserNotExistError)
            {
                return StatusCode(StatusCodes.Status404NotFound, new
                {
                    message = "Пользователь не найден"
                });
            }
            catch (ContentNotExistError)
            {
                return StatusCode(StatusCodes.Status404NotFound, new
                {
                    message = "Папка не найдена"
                });
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
                _userManagementService.CheckUserExists(userId);

                var contents  = _contentManagementService.GetContents(folderId, userId);

                return Ok(new GetContentsResponse()
                {
                    Contents = ApiContentMapper.MapContentsData(contents.ToArray()),
                });
            }
            catch (UserNotExistError)
            {
                return StatusCode(StatusCodes.Status404NotFound, new
                {
                    message = "Пользователь не найден"
                });
            }
            catch (ContentNotExistError)
            {
                return StatusCode(StatusCodes.Status404NotFound, new
                {
                    message = "Папка не найдена"
                });
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
            try
            {
                var userId = Int32.Parse(User.Identity.Name);
                _userManagementService.CheckUserExists(userId);

                var contents = _contentManagementService.GetStarredContents(userId);

                return Ok(new GetContentsResponse()
                {
                    Contents = ApiContentMapper.MapContentsData(contents.ToArray()),
                });
            }
            catch (UserNotExistError)
            {
                return StatusCode(StatusCodes.Status404NotFound, new
                {
                    message = "Пользователь не найден"
                });
            }
            catch (Exception e)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, new {message = e.Message});
            }
        }

        [HttpGet]
        [Route("api/image/preview/{imageId}")]
        public ActionResult<PreviewImageResponse> PreviewImage(int imageId)
        {
            try
            {
                var userId = Int32.Parse(User.Identity.Name);
                _userManagementService.CheckUserExists(userId);

                Image image = _contentManagementService.GetImage(imageId);

                return Ok(new PreviewImageResponse()
                {
                    PreviewUrl = image.Path
                });
            }
            catch (UserNotExistError)
            {
                return StatusCode(StatusCodes.Status404NotFound, new
                {
                    message = "Пользователь не найден"
                });
            }
            catch (ContentNotExistError)
            {
                return StatusCode(StatusCodes.Status404NotFound, new
                {
                    message = "Материал не найден"
                });
            }
            catch (Exception e)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, new {message = e.Message});
            }
        }

        [HttpGet]
        [Route("api/image/download/{imageId}")]
        public IActionResult DownloadImage(int imageId)
        {
            try
            {
                var userId = Int32.Parse(User.Identity.Name);
                _userManagementService.CheckUserExists(userId);

                Image image = _contentManagementService.GetImage(imageId);

                string downloadUrl = _contentManagementService.GetImageUploadUrl(image);
                string mimeType = MimeMapping.MimeUtility.GetMimeMapping(image.Name);

                return PhysicalFile(downloadUrl, mimeType, image.Name);
            }
            catch (UserNotExistError)
            {
                return StatusCode(StatusCodes.Status404NotFound, new
                {
                    message = "Пользователь не найден"
                });
            }
            catch (ContentNotExistError)
            {
                return StatusCode(StatusCodes.Status404NotFound, new
                {
                    message = "Материал не найден"
                });
            }
            catch (Exception e)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, new {message = e.Message});
            }
        }
    }
}