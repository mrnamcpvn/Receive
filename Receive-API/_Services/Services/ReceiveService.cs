using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using AutoMapper;
using Microsoft.EntityFrameworkCore;
using Receive_API._Repositorys.Interfaces;
using Receive_API._Services.Interfaces;
using Receive_API.Dto;
using Receive_API.Helpers;
using Receive_API.Models;

namespace Receive_API._Services.Services
{
    public class ReceiveService : IReceiveService
    {
        private readonly ICategoryRepository _repoCategory;
        private readonly IProductRepository _repoProduct;
        private readonly IReceiveRepository _repoReceive;
        private readonly IWarehouseRepository _repoWarehouse;
        private readonly IMapper _mapper;
        private readonly MapperConfiguration _configMapper;
        public ReceiveService(  ICategoryRepository repoCategory,
                                IProductRepository repoProduct,
                                IReceiveRepository repoReceive,
                                IWarehouseRepository repoWarehouse,
                                IMapper mapper,
                                MapperConfiguration configMapper) {
            _repoCategory = repoCategory;
            _repoProduct = repoProduct;
            _repoReceive = repoReceive;
            _repoWarehouse = repoWarehouse;
            _mapper = mapper;
            _configMapper = configMapper;
        }

        public async Task<List<Warehouse>> GetAllWarehouse() {
            var warehouses = await _repoWarehouse.GetAll().ToListAsync();
            return warehouses;
        }
        
        public async Task<List<Category>> GetAllCategory(string id)
        {
            var categorys = await _repoCategory.FindAll(x => x.WarehouseID.ToString() == id.Trim()).ToListAsync();
            return categorys;
        }
        
        public async Task<List<Product>> GetProductByCatID(int categoryID)
        {
            var products = await _repoProduct.FindAll(x => x.CatID == categoryID).ToListAsync();
            return products;
        }

        public async Task<bool> ReceiveRegister(Receive_Dto model)
        {
            model.ID = this.RandomString();
            model.Register_Date = DateTime.Now;
            model.Updated_Time = DateTime.Now;
            model.Status = "0";
            var receive = _mapper.Map<Receive>(model);
            _repoReceive.Add(receive);
            try {
                return await _repoReceive.SaveAll();
            } catch(Exception) {
                return false;
            }
        }
        public string RandomString() {
            var chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
            var stringChars = new char[10];
            var random = new Random();
            for (int i = 0; i < 10; i++)
            {
                stringChars[i] = chars[random.Next(chars.Length)];
            }
            var finalString = new String(stringChars);
            return finalString;
        }

        public async Task<PagedList<ReceiveInformationModel>> GetWithPaginations(PaginationParams param, string userID)
        {
            var products =  _repoProduct.FindAll();
            var receives =  _repoReceive.FindAll(x => x.UserID.Trim() == userID && x.Status != "-1" 
                                                        && x.Status != "2");
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