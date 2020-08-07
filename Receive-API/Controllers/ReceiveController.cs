using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Receive_API._Services.Interfaces;

namespace Receive_API.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class ReceiveController : ControllerBase
    {
        private readonly IReceiveService _service;
        public ReceiveController(IReceiveService service) {
            _service = service;
        }

        [HttpGet("getUsers")]
        public async Task<IActionResult> GetUsers() {
            var data = await _service.GetListUser();
            return Ok(data);
        }
    }
}