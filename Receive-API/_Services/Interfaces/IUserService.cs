using System.Threading.Tasks;
using Receive_API.Dto;
using Receive_API.Helpers;

namespace Receive_API._Services.Interfaces
{
    public interface IUserService
    {
        Task<bool> Add(User_Dto model);
        Task<bool> Delete(string UserId);
        Task<bool> Update(User_Dto model);
        Task<PagedList<UserViewModel>> GetWithPaginations(PaginationParams param);
    }
}