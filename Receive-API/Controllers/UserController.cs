using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Receive_API._Services.Interfaces;
using Receive_API.Dto;
using Receive_API.Helpers;

namespace Receive_API.Controllers
{

    [ApiController]
    [Route("api/[controller]")]
    public class UserController : ControllerBase
    {
        private readonly IUserService _serviceUser;
        public UserController(IUserService serviceUser) {
            _serviceUser = serviceUser;
        }

        [HttpGet("getUsers")]
        public async Task<IActionResult> GetUsers([FromQuery]PaginationParams param) {
            var users = await _serviceUser.GetWithPaginations(param);
            Response.AddPagination(users.CurrentPage, users.PageSize, users.TotalCount, users.TotalPages);
            return Ok(users);
        }


        [HttpPost("create")]
        public async Task<IActionResult> AddUser(User_Dto model) {
            var result = await _serviceUser.Add(model);
            return Ok(result);
        }

        [HttpPost("delete/{id}")]
        public async Task<IActionResult> DeleteUser(string id) {
            var result = await _serviceUser.Delete(id);
            return Ok(result);
        }

        [HttpPost("edit")]
        public async Task<IActionResult> EditUser(User_Dto model) {
            var result = await _serviceUser.Update(model);
            return Ok(result);
        }
    }
}