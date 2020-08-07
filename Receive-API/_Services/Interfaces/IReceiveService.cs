using System.Collections.Generic;
using System.Threading.Tasks;
using Receive_API.Models;

namespace Receive_API._Services.Interfaces
{
    public interface IReceiveService
    {
        Task<List<User>> GetListUser();
    }
}