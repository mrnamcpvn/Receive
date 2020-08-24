using System;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using Receive_API._Repositorys.Interfaces;
using Receive_API._Services.Interfaces;
using Receive_API.Dto;
using Receive_API.Helpers;

namespace Receive_API._Services.Services
{
    public class ManagerService : IManagerService
    {
        private readonly IReceiveRepository _repoReceive;
        private readonly IProductRepository _repoProduct;
        private readonly IDepartmentRepository _repoDepartment;
        public ManagerService(  IReceiveRepository repoReceive,
                                IProductRepository repoProduct,
                                IDepartmentRepository repoDepartment) {
            _repoReceive = repoReceive;
            _repoProduct = repoProduct;
            _repoDepartment = repoDepartment;
        }

        public async Task<bool> AcceptReceive(string receiveID)
        {
            var receiveModel = await _repoReceive.GetAll().Where(x => x.ID.Trim() == receiveID.Trim()).FirstOrDefaultAsync();
            if(receiveModel != null) {
                receiveModel.Status = "2";
                receiveModel.Updated_Time = DateTime.Now;
                return await _repoReceive.SaveAll();
            } else {
                return false;
            }
        }

        public async Task<bool> DecliceReceive(string receiveID)
        {
            var receiveModel = await _repoReceive.GetAll().Where(x => x.ID.Trim() == receiveID.Trim()).FirstOrDefaultAsync();
            if(receiveModel != null) {
                _repoReceive.Remove(receiveModel);
                return await _repoReceive.SaveAll();
            } else {
                return false;
            }
        }

        public async Task<ReceiveInformationModel> GetReceive(string receiveID)
        {
            var receiveModel = await _repoReceive.GetAll()
                    .Where(x => x.ID.Trim() == receiveID.Trim()).FirstOrDefaultAsync();
            if(receiveModel == null) {
                return null;
            } else {
                var product = await _repoProduct.GetAll().Where(x => x.ID.Trim() == receiveModel.ProductID.Trim()).FirstOrDefaultAsync();
                var department = await _repoDepartment.GetAll().Where(x => x.ID.Trim() == receiveModel.DepID.Trim()).FirstOrDefaultAsync();
                var receiveResult = new ReceiveInformationModel();
                receiveResult.ID = receiveModel.ID;
                receiveResult.UserID = receiveModel.UserID;
                receiveResult.Accept_ID = receiveModel.Accept_ID;
                receiveResult.DepID = receiveModel.DepID;
                receiveResult.DepName = department.Name;
                receiveResult.ProductID = receiveModel.ProductID;
                receiveResult.ProductName = product.Name;
                receiveResult.Qty = receiveModel.Qty;
                receiveResult.Register_Date = receiveModel.Register_Date;
                receiveResult.Accept_Date = receiveModel.Accept_Date;
                return receiveResult;
            }
        }

        public async Task<PagedList<ReceiveInformationModel>> GetWithPaginations(PaginationParams param)
        {
            var products = await _repoProduct.GetAll().ToListAsync();
            var receives = await _repoReceive.GetAll().Where(x => x.Status == "1").ToListAsync();
            var departments = await _repoDepartment.GetAll().ToListAsync();
            var data = (from r in receives join p in products
                on r.ProductID.Trim() equals p.ID.Trim()
                join d in departments on r.DepID.Trim() equals d.ID.Trim()
                select new ReceiveInformationModel() {
                    ID = r.ID,
                    UserID = r.UserID,
                    Accept_ID = r.Accept_ID,
                    DepID = r.DepID,
                    DepName = d.Name,
                    ProductID = r.ProductID,
                    ProductName = p.Name,
                    Qty = r.Qty,
                    Register_Date = r.Register_Date,
                    Accept_Date = r.Accept_Date,
                    Updated_Time = r.Updated_Time,
                    Updated_By = r.Updated_By
                }).OrderByDescending(x => x.Register_Date).ToList();
            return PagedList<ReceiveInformationModel>.Create(data, param.PageNumber, param.PageSize);
        }
    }
}