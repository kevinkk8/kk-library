using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace kk_LibraryApi.Entities
{
    public class Category
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string Priority { get; set; }
        public DateTime CreatedAt { get; set; }

        public string CreatedBy { get; set; }


    }
}
