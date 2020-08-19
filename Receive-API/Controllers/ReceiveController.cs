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

        [HttpGet("getCategorys")]
        public async Task<IActionResult> GetAllCategory() {
            var data = await _service.GetAllCategory();
            return Ok(data);
        }

        [HttpGet("getProducts/{id}")]
        public async Task<IActionResult> GetProductByCatID(int id) {
            var data = await _service.GetProductByCatID(id);
            return Ok(data);
        }
    }
}