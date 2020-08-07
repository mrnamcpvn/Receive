using Receive_API._Repositorys.Interfaces;
using Receive_API.Data;
using Receive_API.Models;

namespace Receive_API._Repositorys.Repositories
{
    public class ReceiveRepository : ReceiveDBRepository<Receive>, IReceiveRepository
    {
        private readonly DataContext _context;
        public ReceiveRepository(DataContext context) : base(context)
        {
            _context = context;
        }
    }
}