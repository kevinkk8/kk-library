using Microsoft.AspNetCore.MVC;
using kk_LibraryApi.Services;
using kk_LibraryApi.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace kk_LibraryApi.Controllers
{
    [Route("/categories")]
    public class CategoryConroller
    {
        private readonly IRepository repository;
        CategoryConroller(IRepository repository)
        {
            this.repository = repository;
        }

        [HttpGet]
        public List<Category> Get()
        {
            return repository.GetAllCategories();
        }
    }
}
