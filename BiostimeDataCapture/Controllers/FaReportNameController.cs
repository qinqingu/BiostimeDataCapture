using System;
using System.Collections.Generic;
using System.Web.Mvc;
using BiostimeDataCapture.AppService;
using BiostimeDataCapture.Domain;
using BiostimeDataCapture.Dto._Common;
using BiostimeDataCapture.Models.Jsons;
using BiostimeDataCapture.Models.Utility;

namespace BiostimeDataCapture.Controllers
{
    public class FaReportNameController : ControllerBase
    {
        private readonly FaDocService _faDocService = new FaDocService();
        //
        // GET: /FaReportName/

        public ActionResult FaReportNameList()
        {
            return View();
        }

        /// <summary>
        ///     获取报告名称信息列表
        /// </summary>
        /// <param name="rows">jqGrid每页行数</param>
        /// <param name="page">jqGrid当前页</param>
        /// <param name="query">查询条件(名称/备注)</param>
        /// <param name="enable">状态条件</param>
        /// <returns></returns>
        [HttpGet]
        public string GetFaReportNames(int rows, int page, string query, bool? enable)
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
            IList<FaReportName> list = _faDocService.GetReportNames(paging, query, enable, out count);

            var faReportNameJsonService = new FaReportNameJsonService();
            string json = faReportNameJsonService.GetFaReportNameJqGridJson(list, count, paging);

            return json;
        }

        public ActionResult FaReportNameMgmt(string id)
        {
            if (SessionUserId == 0)
            {
                return View("../Error/LoginError");
            }
            string reportNameDisabled = "false";
            string enable = "true";
            if (!string.IsNullOrEmpty(id))
            {
                FaReportName reportName = _faDocService.GetReportName(long.Parse(id));
                ViewData["reportNameId"] = reportName.Id;
                ViewData["reportName"] = reportName.Name;
                ViewData["remark"] = reportName.Remark;
                if (!reportName.Enable)
                {
                    enable = "false";
                }
                reportNameDisabled = "true";
            }
            ViewData["enable"] = enable;
            ViewData["reportNameDisabled"] = reportNameDisabled;
            return View();
        }

        /// <summary>
        ///     保存公司名称信息
        /// </summary>
        /// <param name="reportName"></param>
        /// <returns></returns>
        [HttpPost]
        public string SaveReportName(FaReportName reportName)
        {
            try
            {
                int currentUserId = SessionUserId;
                if (currentUserId == 0)
                {
                    return PesponseResult(false, "登录已失效,请重新登录在操作.");
                }
                var entity = new FaReportName();
                if (reportName.Id > 0)
                {
                    entity = _faDocService.GetReportName(reportName.Id);
                }
                else
                {
                    if (_faDocService.HasReportName(reportName.Name))
                    {
                        return PesponseResult(false, "该公司名称已存在！");
                    }
                }
                entity.Name = reportName.Name;
                entity.Enable = reportName.Enable;
                entity.Remark = reportName.Remark ?? string.Empty;

                _faDocService.SaveReportName(entity);
                if (entity.Id > 0)
                {
                    string saveMsg = string.Format("AdReportName数据保存成功，编号:{0},I操作人:{1},时间:{2}。",
                                                   entity.Id, currentUserId, DateTime.Now);
                    LogHelper.Info(saveMsg);
                    return PesponseResult("保存成功.");
                }
                return PesponseResult(false, "保存失败.");
            }
            catch (Exception ex)
            {
                LogHelper.ExceptionLog(SessionUserId, "FaReportName/SaveReportName", ex);
                return PesponseResult(false, "出现异常,ex.Message=" + ex.Message);
            }
        }
    }
}
