using System.Security.Claims;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Receive_API._Services.Interfaces;
using Receive_API.Helpers;

namespace Receive_API.Controllers
{

    [ApiController]
    [Route("api/[controller]")]
    public class ApprovalController : ControllerBase
    {
        private readonly IApprovalService _serviceApproval;
        public ApprovalController(IApprovalService serviceApproval) {
            _serviceApproval = serviceApproval;
        }

        [HttpGet("getReceives")]
        public async Task<IActionResult> GetReceivePagination([FromQuery]PaginationParams param) {
            var userCurrent = User.FindFirst(ClaimTypes.NameIdentifier).Value;
            var receives = await _serviceApproval.GetWithPaginations(param, userCurrent);
            Response.AddPagination(receives.CurrentPage, receives.PageSize, receives.TotalCount, receives.TotalPages);
            return Ok(receives);
        }

        [HttpGet("search/{userReceive}")]
        public async Task<IActionResult> GetReceivePagination([FromQuery]PaginationParams param, string userReceive) {
            var userCurrent = User.FindFirst(ClaimTypes.NameIdentifier).Value;
            var receives = await _serviceApproval.SearchWithPaginations(param,userReceive, userCurrent);
            Response.AddPagination(receives.CurrentPage, receives.PageSize, receives.TotalCount, receives.TotalPages);
            return Ok(receives);
        }
        [HttpGet("acceptReceive/{receiveID}")]
        public async Task<IActionResult> AcceptReceive(string receiveID) {
            var user = User.FindFirst(ClaimTypes.NameIdentifier).Value;
            var result = await _serviceApproval.AcceptReceive(receiveID, user);
            return Ok(new {result = result});
        }

        [HttpGet("declineReceive/{receiveID}")]
        public async Task<IActionResult> DeclineReceive(string receiveID) {
            var user = User.FindFirst(ClaimTypes.NameIdentifier).Value;
            var result = await _serviceApproval.DeclineReceive(receiveID, user);
            return Ok(new {result = result});
        }

    }
}