using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using BiostimeDataCapture.AppService;
using BiostimeDataCapture.Domain;
using BiostimeDataCapture.Dto;
using BiostimeDataCapture.Dto._Common;
using BiostimeDataCapture.Models.Jsons;
using BiostimeDataCapture.Models.Utility;

namespace BiostimeDataCapture.Controllers
{
    public class FaArchiveController : ControllerBase
    {
        private readonly  FaDocService _faDocService = new FaDocService();
        //
        // GET: /FaArchive/
        
        public ActionResult Index()
        {
            return FaDocList();
        }

        public ActionResult FaDocList()
        {
            if (!IsValidAccount())
            {
                return View("../Error/LoginError");
            }
            LogHelper.LoginLog(SessionUserId, "FaArchive/Index");
            return View("FaDocList");
        }

        [HttpGet]
        public ActionResult FaDocMgmt(long? id)
        {
            if (!IsValidAccount())
            {
                return View("../Error/LoginError");
            }
            LogHelper.LoginLog(SessionUserId, "FaArchive/FaDocMgmt");
            if (id != null)
            {
                FaArchive entity = _faDocService.GetFdDocById(id.Value);
                ViewData["faDocId"] = id;
                ViewData["content"] = entity.Content;
                ViewData["company"] = entity.Company;
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

        /// <summary>
        ///     获取财务档案信息列表(报表)
        /// </summary>
        /// <param name="rows">jqGrid每页行数</param>
        /// <param name="page">jqGrid当前页</param>
        /// <param name="query">查询条件(AdDocListParameter)</param>
        /// <returns></returns>
        [HttpGet]
        public string GetFaDocs(int rows, int page, string query)
        {
            if (!IsValidAccount())
            {
                Redirect("../Error/LoginError");
                return string.Empty;
            }
            int pageIndex = page;
            int pageSize = rows;
            var paging = new PagingParameter(pageIndex, pageSize);

            long count;
            var parameter = new FaDocListParameter();
            if (!string.IsNullOrEmpty(query))
            {
                parameter = JsonHelper.Deserialize<FaDocListParameter>(query);
            }
            IList<FaDocDto> list = _faDocService.GetPageFaDocs(paging, parameter, out count);

            var faDocJsonService = new FaDocJsonService();
            string json = faDocJsonService.GetJqGridJson(list, count, paging);

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
            if (!IsValidAccount())
            {
                return PesponseResult(false, "登录已失效,请重新登录在操作.");
            }
            try
            {
                int currentUserId = SessionUserId;
                if (currentUserId == 0)
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
                entity.Path = faDoc.Path;
                entity.CabinetNo = faDoc.CabinetNo;
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
                LogHelper.ExceptionLog(SessionUserId, "FinanceDept/SaveFdDoc", ex);
                return PesponseResult(false, "出现异常,ex.Message=" + ex.Message);
            }
        }

    }
}
