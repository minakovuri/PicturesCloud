using System.Collections.Generic;
using WebApi.Core.Models;

namespace WebApi.Controllers.ResponseModels
{
    public class ApiListFolder
    {
        public int Id { get; set; }
        public string Name { get; set; }
    }

    public class ListFoldersTreeResponse
    {
        public ApiListFolder[] Folders { get; set; }
    }

    public class ApiListFoldersTreeMapper
    {
        private static ApiListFolder MapListFolderTreeItem(Folder folder)
        {
            return new ApiListFolder()
            {
                Id = folder.Id,
                Name = folder.Name,
            };
        }

        public static ApiListFolder[] MapListFolderTree(Folder[] folders)
        {
            List<ApiListFolder> apiListFolders = new List<ApiListFolder>();

            foreach (var folder in folders)
            {
                apiListFolders.Add(MapListFolderTreeItem(folder));
            }

            return apiListFolders.ToArray();
        }
    }
}