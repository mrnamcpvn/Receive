using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Receive_API._Services.Interfaces;
using Receive_API.Helpers;

namespace Receive_API.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class ManagerController : ControllerBase
    {
        private readonly IManagerService _serviceManager;
        public ManagerController(IManagerService serviceManager) {
            _serviceManager = serviceManager;
        }

        [HttpGet("getReceive/{receiveID}")]
        public async Task<IActionResult> GetReceive(string receiveID) {
            var data = await _serviceManager.GetReceive(receiveID);
            return Ok(data);
        }

        
        [HttpGet("getReceives")]
        public async Task<IActionResult> GetReceivePagination([FromQuery]PaginationParams param) {
            var receives = await _serviceManager.GetWithPaginations(param);
            Response.AddPagination(receives.CurrentPage, receives.PageSize, receives.TotalCount, receives.TotalPages);
            return Ok(receives);
        }
    }
}