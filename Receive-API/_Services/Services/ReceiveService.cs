using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using Receive_API._Repositorys.Interfaces;
using Receive_API._Services.Interfaces;
using Receive_API.Models;

namespace Receive_API._Services.Services
{
    public class ReceiveService : IReceiveService
    {
        private readonly ICategoryRepository _repoCategory;
        private readonly IProductRepository _repoProduct;
        public ReceiveService(  ICategoryRepository repoCategory,
                                IProductRepository repoProduct ) {
            _repoCategory = repoCategory;
            _repoProduct = repoProduct;
        }
        public async Task<List<Category>> GetAllCategory()
        {
            var categorys = await _repoCategory.GetAll().ToListAsync();
            return categorys;
        }

        public async Task<List<Product>> GetProductByCatID(int categoryID)
        {
            var products = await _repoProduct.GetAll().Where(x => x.CatID == categoryID).ToListAsync();
            return products;
        }
    }
}