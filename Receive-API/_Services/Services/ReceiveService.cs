using System.Collections.Generic;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using Receive_API._Repositorys.Interfaces;
using Receive_API._Services.Interfaces;
using Receive_API.Models;

namespace Receive_API._Services.Services
{
    public class ReceiveService : IReceiveService
    {
        private readonly IUserRepository _repoUser;
        public ReceiveService(IUserRepository repoUser) {
            _repoUser = repoUser;
        }
        public async Task<List<User>> GetListUser()
        {
            var users = await _repoUser.GetAll().ToListAsync();
            return users;
        }
    }
}