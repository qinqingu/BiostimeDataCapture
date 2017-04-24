using System;
using System.Collections;
using System.Collections.Generic;
using System.Web.Mvc;
using BiostimeDataCapture.AppService;
using BiostimeDataCapture.Domain;
using BiostimeDataCapture.Domain.Enum;
using BiostimeDataCapture.Dto;
using BiostimeDataCapture.Dto._Common;
using BiostimeDataCapture.Models.Jsons;
using BiostimeDataCapture.Models.Utility;

namespace BiostimeDataCapture.Controllers
{
    public class FaArchiveController : ControllerBase
    {
        private readonly  FaDocService _faDocService = new FaDocService();
        private readonly FaDocExcelService _faDocExcelService = new FaDocExcelService();
        //
        // GET: /FaArchive/
        
        public ActionResult Index()
        {
            return FaDocList();
        }

        public ActionResult FaDocList()
        {
            if (!IsValidAccount(SessionToken))
            {
                if (!IsValidAccount())
                {
                    return View("../Error/LoginError");
                }
            }
            IList<FaContent> list = _faDocService.GetAllContents();
            ViewData["contentDto"] = JsonHelper.Serialize(list);
            IList<FaCompany> companys = _faDocService.GetAllCompanys();
            ViewData["companyDto"] = JsonHelper.Serialize(companys);
            LogHelper.LoginLog(SessionUserId, "FaArchive/Index");
            return View("FaArchiveList");
        }

        [HttpGet]
        public ActionResult FaEgMgmt(long? id)
        {
            if (!IsValidAccount(SessionToken))
            {
                return View("../Error/LoginError");
            }
            LogHelper.LoginLog(SessionUserId, "FaArchive/FaEgDocMgmt");
            IList<FaCompany> companys = _faDocService.GetAllCompanys();
            ViewData["companyDto"] = JsonHelper.Serialize(companys);
            if (id != null)
            {
                FaArchive entity = _faDocService.GetFdDocById(id.Value);
                ViewData["faArchiveId"] = id;
                ViewData["content"] = entity.Content;
                ViewData["companyName"] = entity.Company;
                ViewData["year"] = entity.Year;
                ViewData["month"] = entity.Month;
                ViewData["voucherWord"] = entity.VoucherWord;
                ViewData["voucherNumber"] = entity.VoucherNumber;
                ViewData["voucherNo"] = entity.VoucherNo;
                ViewData["path"] = entity.Path;
                ViewData["cabinetNo"] = entity.CabinetNo;
                
            }
            return View();
        }

        [HttpGet]
        public ActionResult FaBgMgmt(long? id)
        {
            if (!IsValidAccount(SessionToken))
            {
                return View("../Error/LoginError");
            }
            IList<FaCompany> companys = _faDocService.GetAllCompanys();
            ViewData["companyDto"] = JsonHelper.Serialize(companys);
            LogHelper.LoginLog(SessionUserId, "FaArchive/FaBgMgmt");
            if (id != null)
            {
                FaArchive entity = _faDocService.GetFdDocById(id.Value);
                ViewData["faArchiveId"] = id;
                ViewData["content"] = entity.Content;
                ViewData["companyName"] = entity.Company;
                ViewData["year"] = entity.Year;
                ViewData["baogaoMingcheng"] = entity.BaogaoMingcheng;
                ViewData["path"] = entity.Path;
                ViewData["cabinetNo"] = entity.CabinetNo;

            }
            return View();
        }

        [HttpGet]
        public ActionResult FaHgMgmt(long? id)
        {
            if (!IsValidAccount(SessionToken))
            {
                return View("../Error/LoginError");
            }
            IList<FaCompany> companys = _faDocService.GetAllCompanys();
            ViewData["companyDto"] = JsonHelper.Serialize(companys);
            LogHelper.LoginLog(SessionUserId, "FaArchive/FaHgDocMgmt");
            if (id != null)
            {
                FaArchive entity = _faDocService.GetFdDocById(id.Value);
                ViewData["faArchiveId"] = id;
                ViewData["content"] = entity.Content;
                ViewData["companyName"] = entity.Company;
                ViewData["year"] = entity.Year;
                ViewData["month"] = entity.Month;
                ViewData["hetongHao"] = entity.HetongHao;
                ViewData["path"] = entity.Path;
                ViewData["cabinetNo"] = entity.CabinetNo;

            }
            return View();
        }

        /// <summary>
        ///     获取凭证档案信息列表(报表)
        /// </summary>
        /// <param name="rows">jqGrid每页行数</param>
        /// <param name="page">jqGrid当前页</param>
        /// <param name="query">查询条件(AdDocListParameter)</param>
        /// <returns></returns>
        [HttpGet]
        public string GetEgFaDocs(int rows, int page, string query)
        {
            if (!IsValidAccount(SessionToken))
            {
                Redirect("../Error/LoginError");
                return string.Empty;
            }
            int userId = SessionUserId;
            int pageIndex = page;
            int pageSize = rows;
            var paging = new PagingParameter(pageIndex, pageSize);

            long count;
            var parameter = new FaArchiveListParameter();
            parameter.Content = "凭证";
            if (!string.IsNullOrEmpty(query))
            {
                parameter = JsonHelper.Deserialize<FaArchiveListParameter>(query);
            }
            IList<FaDocDto> list = _faDocService.GetPageFaDocs(paging, parameter, out count);

            var faDocJsonService = new FaDocJsonService();
            string json = faDocJsonService.GetEgJqGridJson(list, count, paging, userId);

            return json;
        }

        /// <summary>
        ///     获取海关缴款书档案信息列表(报表)
        /// </summary>
        /// <param name="rows">jqGrid每页行数</param>
        /// <param name="page">jqGrid当前页</param>
        /// <param name="query">查询条件(AdDocListParameter)</param>
        /// <returns></returns>
        [HttpGet]
        public string GetHgFaDocs(int rows, int page, string query)
        {
            if (!IsValidAccount(SessionToken))
            {
                Redirect("../Error/LoginError");
                return string.Empty;
            }
            int userId = SessionUserId;
            int pageIndex = page;
            int pageSize = rows;
            var paging = new PagingParameter(pageIndex, pageSize);

            long count;
            var parameter = new FaArchiveListParameter();
            parameter.Content = "海关缴款书";
            if (!string.IsNullOrEmpty(query))
            {
                parameter = JsonHelper.Deserialize<FaArchiveListParameter>(query);
            }
            IList<FaDocDto> list = _faDocService.GetPageFaDocs(paging, parameter, out count);

            var faDocJsonService = new FaDocJsonService();
            string json = faDocJsonService.GetHgJqGridJson(list, count, paging, userId);

            return json;
        }

        /// <summary>
        ///     获取报告档案信息列表(报表)
        /// </summary>
        /// <param name="rows">jqGrid每页行数</param>
        /// <param name="page">jqGrid当前页</param>
        /// <param name="query">查询条件(AdDocListParameter)</param>
        /// <param name="content">存储内容</param>
        /// <returns></returns>
        [HttpGet]
        public string GetBgFaDocs(int rows, int page, string query)
        {
            if (!IsValidAccount(SessionToken))
            {
                Redirect("../Error/LoginError");
                return string.Empty;
            }
            int userId = SessionUserId;
            int pageIndex = page;
            int pageSize = rows;
            var paging = new PagingParameter(pageIndex, pageSize);

            long count;
            var parameter = new FaArchiveListParameter();
            parameter.Content = "审计报告";
            if (!string.IsNullOrEmpty(query))
            {
                parameter = JsonHelper.Deserialize<FaArchiveListParameter>(query);
            }
            IList<FaDocDto> list = _faDocService.GetPageFaDocs(paging, parameter, out count);

            var faDocJsonService = new FaDocJsonService();
            string json = faDocJsonService.GetBgJqGridJson(list, count, paging, userId);

            return json;
        }

        /// <summary>
        ///     保存财务档案信息
        /// </summary>
        /// <param name="faDoc"></param>
        /// <returns></returns>
        [HttpPost]
        public string SaveFaDoc(FaArchive faDoc)
        {
            if (!IsValidAccount(SessionToken))
            {
                return PesponseResult(false, "登录已失效,请重新登录在操作.");
            }
            try
            {
                int currentUserId = SessionUserId;
                if (!IsValidAccount(SessionToken))
                {
                    return PesponseResult(false, "登录已失效,请重新登录在操作.");
                }
                var entity = new FaArchive();
                entity = _faDocService.GetFdDocById(faDoc.Id);
                entity.Content = faDoc.Content;
                entity.Company = faDoc.Company;
                entity.Year = faDoc.Year;
                entity.Month = faDoc.Month;
                entity.VoucherWord = faDoc.VoucherWord;
                entity.VoucherNumber = faDoc.VoucherNumber;
                entity.VoucherNo = faDoc.VoucherNo;
                entity.BaogaoMingcheng = faDoc.BaogaoMingcheng;
                entity.HetongHao = faDoc.HetongHao;
                entity.Path = faDoc.Path;
                entity.CabinetNo = faDoc.CabinetNo;
                if (faDoc.Content == "凭证")
                {
                    entity.Remark = faDoc.Company + "\\" + faDoc.Year + "\\" + faDoc.Month + "\\" + faDoc.VoucherWord +
                                    "\\" + faDoc.VoucherNumber;
                }else if (faDoc.Content == "海关缴款书")
                {
                    entity.Remark = faDoc.Company + "\\" + faDoc.Year + "\\" + faDoc.Month + "\\" + faDoc.HetongHao;
                }
                else if (faDoc.Content == "审计报告")
                {
                    entity.Remark = faDoc.Company + "\\" + faDoc.Year + "\\" + faDoc.BaogaoMingcheng;
                }
                _faDocService.Save(entity);

                if (entity.Id > 0)
                {
                    string saveMsg = string.Format("FdDoc数据保存成功，编号:{0},操作人:{1},时间:{2}。",
                                                   entity.Id, currentUserId, DateTime.Now);
                    LogHelper.Info(saveMsg);
                    return PesponseResult("保存成功.");
                }
                return PesponseResult(false, "保存失败.");
            }
            catch (Exception ex)
            {
                LogHelper.ExceptionLog(SessionUserId, "FaArchive/SaveFaDoc", ex);
                return PesponseResult(false, "出现异常,ex.Message=" + ex.Message);
            }
        }

        /// <summary>
        ///     导出凭证档案信息到Excel
        /// </summary>
        /// <param name="query"></param>
        /// <returns></returns>
        public FileContentResult ExportEgToExcel(string query)
        {
            if (!IsValidAccount(SessionToken))
            {
                return null;
            }
            LogHelper.LoginLog(SessionUserId, "FaArchive/ExportEgToExcel,执行凭证档案信息导出操作.");
            try
            {
                var parameter = new FaArchiveListParameter();
                if (!string.IsNullOrEmpty(query))
                {
                    parameter = JsonHelper.Deserialize<FaArchiveListParameter>(query);
                }
                IList<FaDocDto> list = _faDocService.GetFaDocs(parameter);
                byte[] faDocsExcel = _faDocExcelService.GetEgFaDocsExcel(list);
                return File(faDocsExcel, "application/ms-excel", Server.UrlEncode("凭证档案信息.xlsx"));
            }
            catch (Exception ex)
            {
                LogHelper.ExceptionLog(SessionUserId, "FaArchive/ExportEgToExcel", ex);
                return null;
            }
        }

        /// <summary>
        ///     导出海关缴款书档案信息到Excel
        /// </summary>
        /// <param name="content"></param>
        /// <param name="query"></param>
        /// <returns></returns>
        public FileContentResult ExportHgToExcel(string content,string query)
        {
            if (!IsValidAccount(SessionToken))
            {
                return null;
            }
            LogHelper.LoginLog(SessionUserId, "FaArchive/ExportHgToExcel,执行海关缴款书档案信息导出操作.");
            try
            {
                var parameter = new FaArchiveListParameter();
                parameter.Content = content;
                if (!string.IsNullOrEmpty(query))
                {
                    parameter = JsonHelper.Deserialize<FaArchiveListParameter>(query);
                }
                IList<FaDocDto> list = _faDocService.GetFaDocs(parameter);
                byte[] faDocsExcel = _faDocExcelService.GetHgFaDocsExcel(list);
                return File(faDocsExcel, "application/ms-excel", Server.UrlEncode("海关缴款档案信息.xlsx"));
            }
            catch (Exception ex)
            {
                LogHelper.ExceptionLog(SessionUserId, "FaArchive/ExportHgToExcel", ex);
                return null;
            }
        }

        /// <summary>
        ///     导出报告档案信息到Excel
        /// </summary>
        /// <param name="query"></param>
        /// <returns></returns>
        public FileContentResult ExportBgToExcel(string query)
        {
            if (!IsValidAccount(SessionToken))
            {
                return null;
            }
            LogHelper.LoginLog(SessionUserId, "FaArchive/ExportBgToExcel,执行报告档案信息导出操作.");
            try
            {
                var parameter = new FaArchiveListParameter();
                if (!string.IsNullOrEmpty(query))
                {
                    parameter = JsonHelper.Deserialize<FaArchiveListParameter>(query);
                }
                IList<FaDocDto> list = _faDocService.GetFaDocs(parameter);
                byte[] faDocsExcel = _faDocExcelService.GetBgFaDocsExcel(list);
                return File(faDocsExcel, "application/ms-excel", Server.UrlEncode("报告档案信息.xlsx"));
            }
            catch (Exception ex)
            {
                LogHelper.ExceptionLog(SessionUserId, "FaArchive/ExportBgToExcel", ex);
                return null;
            }
        }

    }
}
