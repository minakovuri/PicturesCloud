using System.Collections.Generic;
using System.Linq;
using Microsoft.AspNetCore.Mvc;
using WebApi.Controllers.Models;
using WebApi.Core.Services;

namespace WebApi.Controllers
{
    [ApiController]
    [Route("api/contents")]
    public class ContentManagementController : ControllerBase
    {
        private readonly ContentManagementService _service;

        public ContentManagementController(ContentManagementService service)
        {
            _service = service;
        }

        [HttpGet]
        public IEnumerable<ContentModel> GetContents()
        {
            var contents = _service.GetContents(null, "");

            return contents.Select(content => new ContentModel
                {
                    id = content.Id,
                    title = content.Title,
                    type = content.Type,
                    size = content.Size
                })
                .ToArray();
        }
    }
}