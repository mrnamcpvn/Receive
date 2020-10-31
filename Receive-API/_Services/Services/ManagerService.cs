using System;
using System.IO;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using OfficeOpenXml;
using Receive_API._Repositorys.Interfaces;
using Receive_API._Services.Interfaces;
using Receive_API.Dto;
using Receive_API.Helpers;
using Receive_API.Models;

namespace Receive_API._Services.Services
{
    public class ManagerService : IManagerService
    {
        private readonly IReceiveRepository _repoReceive;
        private readonly IProductRepository _repoProduct;
        private readonly IDepartmentRepository _repoDepartment;
        private readonly ICategoryRepository _repoCategory;
        public ManagerService(  IReceiveRepository repoReceive,
                                IProductRepository repoProduct,
                                IDepartmentRepository repoDepartment,
                                ICategoryRepository repoCategory) {
            _repoReceive = repoReceive;
            _repoProduct = repoProduct;
            _repoDepartment = repoDepartment;
            _repoCategory = repoCategory;
        }

        public async Task<bool> AcceptReceive(string receiveID)
        {
            var receiveModel =  _repoReceive.FindSingle(x => x.ID.Trim() == receiveID.Trim());
            if(receiveModel != null) {
                receiveModel.Status = "2";
                receiveModel.Updated_Time = DateTime.Now;
                try {
                    return await _repoReceive.SaveAll();
                } catch(Exception) {
                    return false;
                }
            } else {
                return false;
            }
        }

        public async Task<bool> DecliceReceive(string receiveID)
        {
            var receiveModel =  _repoReceive.FindSingle(x => x.ID.Trim() == receiveID.Trim());
            if(receiveModel != null) {
                _repoReceive.Remove(receiveModel);
                try {
                    return await _repoReceive.SaveAll();
                } catch(Exception) {
                    return false;
                }
            } else {
                return false;
            }
        }

        public async Task<ReceiveInformationModel> GetReceive(string receiveID)
        {
            var receiveModel =  _repoReceive.FindSingle(x => x.ID.Trim() == receiveID.Trim() && x.Status.Trim() == "1");
            if(receiveModel == null) {
                return null;
            } else {
                var product = await _repoProduct.FindAll(x => x.ID.Trim() == receiveModel.ProductID.Trim()).FirstOrDefaultAsync();
                var department = await _repoDepartment.FindAll(x => x.ID.Trim() == receiveModel.DepID.Trim()).FirstOrDefaultAsync();
                var receiveResult = new ReceiveInformationModel();
                receiveResult.ID = receiveModel.ID;
                receiveResult.UserID = receiveModel.UserID;
                receiveResult.Accept_ID = receiveModel.Accept_ID;
                receiveResult.DepID = receiveModel.DepID;
                receiveResult.DepName = department.Name_LL;
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
            var products =  _repoProduct.FindAll();
            var categorys =  _repoCategory.FindAll();
            var receives =  _repoReceive.FindAll(x => x.Status == "1");
            var departments =  _repoDepartment.FindAll();
            var data = (from r in receives join p in products
                on r.ProductID.Trim() equals p.ID.Trim()
                join c in categorys on p.CatID equals c.ID
                join d in departments on r.DepID.Trim() equals d.ID.Trim()
                select new ReceiveInformationModel() {
                    ID = r.ID,
                    UserID = r.UserID,
                    Accept_ID = r.Accept_ID,
                    DepID = r.DepID,
                    DepName = d.Name_LL,
                    CategoryID = c.ID,
                    ProductID = r.ProductID,
                    ProductName = p.Name,
                    Qty = r.Qty,
                    Register_Date = r.Register_Date,
                    Accept_Date = r.Accept_Date,
                    Updated_Time = r.Updated_Time,
                    Updated_By = r.Updated_By
                }).OrderByDescending(x => x.Register_Date);
            return await PagedList<ReceiveInformationModel>.CreateAsync(data, param.PageNumber, param.PageSize);
        }

        public async Task<bool> ImportExcel(string filePath, string user)
        {

            using(var package = new ExcelPackage(new FileInfo(filePath))) {
                ExcelWorksheet workSheet = package.Workbook.Worksheets[0];
                for(int i = workSheet.Dimension.Start.Row + 1; i <= workSheet.Dimension.End.Row; i ++) {
                    var id = workSheet.Cells[i,1].Value.ToString();
                    if(!(await this.CheckDept(id))) {
                        Department department = new Department();
                        department.Status = "1";
                        department.Updated_Time = DateTime.Now;
                        department.Updated_By = user;
                        department.ID = workSheet.Cells[i,1].Value.ToString();
                        department.Name_ZW =  workSheet.Cells[i,2].Value == null? "": workSheet.Cells[i,2].Value.ToString();
                        department.Name_LL =  workSheet.Cells[i,3].Value == null? "": workSheet.Cells[i,3].Value.ToString();
                        department.Name_EN =  workSheet.Cells[i,4].Value == null? "" : workSheet.Cells[i,4].Value.ToString();
                        _repoDepartment.Add(department);
                    }
                }
                try {
                    return await _repoDepartment.SaveAll();
                }
                catch(System.Exception) {
                    return false;
                    throw;
                }
            }
        }
        public async Task<bool> CheckDept(string id) {
            var dept = await _repoDepartment.GetAll().Where(x => x.ID.Trim() == id.Trim()).FirstOrDefaultAsync();
            if(dept != null) {
                return true;
            } else {
                return false;
            }
        }

        public async Task<bool> EditReceive(EditReceiveParam data)
        {
            var receiveModel =  _repoReceive.FindSingle(x => x.ID.Trim() == data.ID.Trim());
            receiveModel.ProductID = data.ProductID;
            receiveModel.Qty = data.Qty;
            try {
                return await _repoReceive.SaveAll();
            } catch(Exception) {
                return false;
            }
        }
    }
}