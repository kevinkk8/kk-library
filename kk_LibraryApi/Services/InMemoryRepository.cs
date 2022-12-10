using kk_LibraryApi.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace kk_LibraryApi.Services
{
    public class InMemoryRepository: IRepository
    {
        private List<Category> categories;
        public InMemoryRepository()
        {
            categories = new List<Category>()
            {
                new Category() {Id = 1, Name = "Comedy", Priority="new", CreatedAt = new DateTime(2012, 11, 23), CreatedBy="KK" },
                new Category() { Id = 1, Name = "Comedy", Priority = "new", CreatedAt = new DateTime(2012, 11, 23), CreatedBy = "KK" },
                new Category() { Id = 1, Name = "Comedy", Priority = "new", CreatedAt = new DateTime(2012, 11, 23), CreatedBy = "KK" }
            };
        }

        public List<Category> GetAllCategories()
        {
            return categories;
        }
    }
}
