using System.Collections.Generic;
using WebApi.Core.Models;

namespace WebApi.Controllers.ResponseModels
{
    public class ApiContent
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public int? FolderId { get; set; }
        public ContentType Type { get; set; }
        public bool? Starred { get; set; }
    }

    public class ApiContentMapper
    {
        public static ApiContent MapContentData(Content content)
        {
            ApiContent item = new ApiContent()
            {
                Id = content.Id,
                Name = content.Name,
                FolderId = content.FolderId,
                Type = content.Type,
            };
            if (content is Image)
            {
                Image image = (Image) content;
                item.Starred = image.Starred;
            }
            else if (content is Folder)
            {
                item.Starred = null;
            }

            return item;
        }

        public static ApiContent[] MapContentsData(Content[] contents)
        {
            List<ApiContent> apiContents  = new List<ApiContent>();
            
            foreach (var content in contents)
            {
                ApiContent apiContent = MapContentData(content);
                apiContents.Add(apiContent);
            }

            return apiContents.ToArray();
        }
    }
}