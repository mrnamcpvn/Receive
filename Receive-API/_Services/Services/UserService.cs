using System;
using System.Linq;
using System.Threading.Tasks;
using AutoMapper;
using AutoMapper.QueryableExtensions;
using Microsoft.EntityFrameworkCore;
using Receive_API._Repositorys.Interfaces;
using Receive_API._Services.Interfaces;
using Receive_API.Dto;
using Receive_API.Helpers;
using Receive_API.Models;

namespace Receive_API._Services.Services
{
    
    public class UserService : IUserService
    {
        
        private readonly IMapper _mapper;
        private readonly MapperConfiguration _configMapper;
        private readonly IUserRepository _repoUser;
        private readonly IRoleRepository _repoRole;
        public UserService( IMapper mapper,
                            MapperConfiguration configMapper,
                            IUserRepository repoUser,
                            IRoleRepository repoRole) {
            _mapper = mapper;
            _configMapper = configMapper;
            _repoUser = repoUser;
            _repoRole = repoRole;
        }
        public async Task<bool> Add(User_Dto model)
        {
            var user = _mapper.Map<User>(model);
            _repoUser.Add(user);
            return await _repoUser.SaveAll();
        }

        public async Task<bool> Delete(string UserId)
        {
            var user = await _repoUser.FindAll()
                .Where(x => x.ID == UserId).FirstOrDefaultAsync();
            if(user != null) {
                _repoUser.Remove(user);
                return await _repoUser.SaveAll();
            } else {
                return false;
            }
        }

        public async Task<PagedList<UserViewModel>> GetWithPaginations(PaginationParams param)
        {
            var lists =  _repoUser.GetAll().ProjectTo<User_Dto>(_configMapper)
                .OrderByDescending(x => x.DepID);
            var roles =  _repoRole.GetAll();
            var users = (from a in lists join b in roles
                on a.RoleID equals b.ID
                select new UserViewModel{
                    ID = a.ID,
                    Password = a.Password,
                    Name = a.Name,
                    RoleID = a.RoleID,
                    RoleName = b.Name,
                    DepID = a.DepID,
                    Update_By = a.Update_By,
                    Update_Time = a.Update_Time
                });
            return await PagedList<UserViewModel>.CreateAsync(users, param.PageNumber, param.PageSize);
        }

        public async Task<bool> Update(User_Dto model)
        {
            var user = _mapper.Map<User>(model);
            user.Update_Time = DateTime.Now;
            _repoUser.Update(user);
            return await _repoUser.SaveAll();
        }
    }
}