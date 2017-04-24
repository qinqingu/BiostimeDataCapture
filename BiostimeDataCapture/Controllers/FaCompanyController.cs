using System;
using System.Collections.Generic;
using System.Linq;
using System.Web.Mvc;
using BiostimeDataCapture.AppService;
using BiostimeDataCapture.Domain;
using BiostimeDataCapture.Dto._Common;
using BiostimeDataCapture.Models.Jsons;
using BiostimeDataCapture.Models.Utility;

namespace BiostimeDataCapture.Controllers
{
    public class FaCompanyController : ControllerBase
    {
        private readonly FaDocService _faDocService = new FaDocService();
        //
        // GET: /FaCompany/

        public ActionResult FaCompanyList()
        {
            return View();
        }

        /// <summary>
        ///     获取公司名称信息列表
        /// </summary>
        /// <param name="rows">jqGrid每页行数</param>
        /// <param name="page">jqGrid当前页</param>
        /// <param name="query">查询条件(名称/备注)</param>
        /// <param name="enable">状态条件</param>
        /// <returns></returns>
        [HttpGet]
        public string GetFaCampanines(int rows, int page, string query, bool? enable)
        {
            if (SessionUserId == 0)
            {
                Redirect("../Error/LoginError");
                return string.Empty;
            }
            int pageIndex = page;
            int pageSize = rows;
            var paging = new PagingParameter(pageIndex, pageSize);
            long count;
            IList<FaCompany> list = _faDocService.GetCompanines(paging, query, enable, out count);

            var faCompanyJsonService = new FaCompanyJsonService();
            string json = faCompanyJsonService.GetFaCompaniesJqGridJson(list, count, paging);

            return json;
        }

        public ActionResult FaCompanyMgmt(string id)
        {
            if (SessionUserId == 0)
            {
                return View("../Error/LoginError");
            }
            string companyNameDisabled = "false";
            string enable = "true";
            if (!string.IsNullOrEmpty(id))
            {
                FaCompany company = _faDocService.GetCompany(long.Parse(id));
                ViewData["companyId"] = company.Id;
                ViewData["companyName"] = company.Name;
                ViewData["remark"] = company.Remark;
                if (!company.Enable)
                {
                    enable = "false";
                }
                companyNameDisabled = "true";
            }
            ViewData["enable"] = enable;
            ViewData["companyNameDisabled"] = companyNameDisabled;
            return View();
        }

        /// <summary>
        ///     保存公司名称信息
        /// </summary>
        /// <param name="company"></param>
        /// <returns></returns>
        [HttpPost]
        public string SaveCompany(FaCompany company)
        {
            try
            {
                int currentUserId = SessionUserId;
                if (currentUserId == 0)
                {
                    return PesponseResult(false, "登录已失效,请重新登录在操作.");
                }
                var entity = new FaCompany();
                if (company.Id > 0)
                {
                    entity = _faDocService.GetCompany(company.Id);
                }
                else
                {
                    if (_faDocService.HasCompanyName(company.Name))
                    {
                        return PesponseResult(false, "该公司名称已存在！");
                    }
                }
                entity.Name = company.Name;
                entity.Enable = company.Enable;
                entity.Remark = company.Remark ?? string.Empty;

                _faDocService.SaveCompany(entity);
                if (entity.Id > 0)
                {
                    string saveMsg = string.Format("AdCompany数据保存成功，编号:{0},I操作人:{1},时间:{2}。",
                                                   entity.Id, currentUserId, DateTime.Now);
                    LogHelper.Info(saveMsg);
                    return PesponseResult("保存成功.");
                }
                return PesponseResult(false, "保存失败.");
            }
            catch (Exception ex)
            {
                LogHelper.ExceptionLog(SessionUserId, "FaCompany/SaveCompany", ex);
                return PesponseResult(false, "出现异常,ex.Message=" + ex.Message);
            }
        }
    }
}