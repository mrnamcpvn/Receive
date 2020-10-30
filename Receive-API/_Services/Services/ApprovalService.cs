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
    public class ApprovalService : IApprovalService
    {
        private readonly IReceiveRepository _repoReceive;
        private readonly IUserRepository _repoUse;
        private readonly IProductRepository _repoProduct;
        public ApprovalService( IReceiveRepository repoReceive,
                                IUserRepository repoUse,
                                IProductRepository repoProduct) {
            _repoReceive = repoReceive;
            _repoUse = repoUse;
            _repoProduct = repoProduct;
        }

        public async Task<bool> AcceptReceive(string receiveID, string userID)
        {
            var receive =  _repoReceive.FindSingle(x => x.ID.Trim() == receiveID.Trim());
            if(receive != null) {
                receive.Accept_Date = DateTime.Now;
                receive.Accept_ID = userID;
                receive.Status = "1";
                receive.Updated_Time = DateTime.Now;
                return await _repoReceive.SaveAll();
            } else {
                return false;
            }
        }

        public async Task<bool> DeclineReceive(string receiveID, string userID)
        {
            var receive =  _repoReceive.FindSingle(x => x.ID.Trim() == receiveID.Trim());
            if(receive != null) {
                receive.Accept_Date = DateTime.Now;
                receive.Accept_ID = userID;
                receive.Status = "-1";
                receive.Updated_Time = DateTime.Now;
                return await _repoReceive.SaveAll();
            } else {
                return false;
            }
        }

        public async Task<PagedList<ReceiveInformationModel>> GetWithPaginations(PaginationParams param, string userID)
        {
            var user =  _repoUse.FindSingle(x => x.ID.Trim() == userID.Trim());
            var products =  _repoProduct.FindAll();
            var receives =  _repoReceive.FindAll(x => x.DepID.Trim() == user.DepID && x.Status == "0");
            var data =  (from a in receives join b in products
                on a.ProductID equals b.ID 
                select new ReceiveInformationModel() {
                    ID = a.ID,
                    UserID = a.UserID,
                    Accept_ID = a.Accept_ID,
                    DepID = a.DepID,
                    ProductID = a.ProductID,
                    ProductName = b.Name,
                    Qty = a.Qty,
                    Register_Date = a.Register_Date,
                    Accept_Date = a.Accept_Date,
                    Status = a.Status,
                    Updated_By = a.Updated_By,
                    Updated_Time = a.Updated_Time
                }).OrderByDescending(x => x.Register_Date);
            return await PagedList<ReceiveInformationModel>.CreateAsync(data, param.PageNumber, param.PageSize);
        }

        public async Task<PagedList<ReceiveInformationModel>> SearchWithPaginations(PaginationParams param, string userReceive, string userAccept)
        {
            var user =  _repoUse.FindSingle(x => x.ID.Trim() == userAccept.Trim());
            var products =  _repoProduct.FindAll();
            var receives =  _repoReceive.FindAll(x => x.DepID.Trim() == user.DepID && 
                                                            x.Status == "0" &&
                                                            x.UserID.Trim() == userReceive.Trim());
            var data = (from a in receives join b in products
                on a.ProductID equals b.ID select new ReceiveInformationModel() {
                    ID = a.ID,
                    UserID = a.UserID,
                    Accept_ID = a.Accept_ID,
                    DepID = a.DepID,
                    ProductID = a.ProductID,
                    ProductName = b.Name,
                    Qty = a.Qty,
                    Register_Date = a.Register_Date,
                    Accept_Date = a.Accept_Date,
                    Status = a.Status,
                    Updated_By = a.Updated_By,
                    Updated_Time = a.Updated_Time
                }).OrderByDescending(x => x.Register_Date);
            return await PagedList<ReceiveInformationModel>.CreateAsync(data, param.PageNumber, param.PageSize);
        }
    }
}