using kk_LibraryApi.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace kk_LibraryApi.Services
{
    public interface IRepository
    {
        List<Category> GetAllCategories();
    }
}
