using System.Threading.Tasks;
using Receive_API.Dto;
using Receive_API.Helpers;
using Receive_API.Models;

namespace Receive_API._Services.Interfaces
{
    public interface IProductService
    {
        Task<PagedList<Product_Dto>> GetWithPaginations(PaginationParams param);
        Task<bool> Delete(string id);
        Task<bool> Add(Product model);
        Task<bool> Update(Product model);
    }
}