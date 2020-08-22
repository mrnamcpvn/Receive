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

        [HttpGet("getReceive/{id}")]
        public async Task<IActionResult> GetReceive(string id) {
            var data = await _serviceManager.GetReceive(id);
            return Ok(data);
        }

        
        [HttpGet("getReceives")]
        public async Task<IActionResult> GetReceivePagination([FromQuery]PaginationParams param) {
            var receives = await _serviceManager.GetWithPaginations(param);
            Response.AddPagination(receives.CurrentPage, receives.PageSize, receives.TotalCount, receives.TotalPages);
            return Ok(receives);
        }

        [HttpGet("accept/{id}")]
        public async Task<IActionResult> AcceptReceive(string id) {
            var result = await _serviceManager.AcceptReceive(id);
            return Ok(new {result = result});
        }

        [HttpGet("decline/{id}")]
        public async Task<IActionResult> DeclineReceive(string id) {
            var result = await _serviceManager.DecliceReceive(id);
            return Ok(new {result = result});
        }
    }
}