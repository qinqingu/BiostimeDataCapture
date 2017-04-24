using System;
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
    public class FaArchiveReturnController : ControllerBase
    {
        private readonly FaDocService _faDocService = new FaDocService();
        //
        // GET: /FaArchiveReturn/

        public ActionResult FaReturnDocList()
        {
            if (!IsValidAccount(SessionToken))
            {
                return View("../Error/LoginError");
            }
            IList<FaContent> list = _faDocService.GetAllContents();
            ViewData["contentsDto"] = JsonHelper.Serialize(list);
            IList<FaCompany> companys = _faDocService.GetAllCompanys();
            ViewData["companyDto"] = JsonHelper.Serialize(companys);
            return View();
        }

        /// <summary>
        ///     获取财务档案归还列表(报表)
        /// </summary>
        /// <param name="rows">jqGrid每页行数</param>
        /// <param name="page">jqGrid当前页</param>
        /// <param name="query">查询条件(AdDocListParameter)</param>
        /// <param name="content">存储内容</param>
        /// <returns></returns>
        [HttpGet]
        public string GetFaEgReturnDoc(int rows, int page, string query,string content)
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
            parameter.Content = content;
            if (!string.IsNullOrEmpty(query))
            {
                parameter = JsonHelper.Deserialize<FaArchiveListParameter>(query);
            }
            IList<JieYueDocDto> list = _faDocService.GetPageFaReturnDocs(paging, parameter, out count);

            var faReturnDocJsonService = new FaReturnDocJsonService();
            string json = faReturnDocJsonService.GetEgJqGridJson(list, count, paging, userId);

            return json;
        }

        /// <summary>
        ///     获取财务档案归还列表(报表)
        /// </summary>
        /// <param name="rows">jqGrid每页行数</param>
        /// <param name="page">jqGrid当前页</param>
        /// <param name="query">查询条件(AdDocListParameter)</param>
        /// <param name="content">存储内容</param>
        /// <returns></returns>
        [HttpGet]
        public string GetFaHgReturnDoc(int rows, int page, string query, string content)
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
            parameter.Content = content;
            if (!string.IsNullOrEmpty(query))
            {
                parameter = JsonHelper.Deserialize<FaArchiveListParameter>(query);
            }
            IList<JieYueDocDto> list = _faDocService.GetPageFaReturnDocs(paging, parameter, out count);

            var faReturnDocJsonService = new FaReturnDocJsonService();
            string json = faReturnDocJsonService.GetHgJqGridJson(list, count, paging, userId);

            return json;
        }

        /// <summary>
        ///     获取财务档案归还列表(报表)
        /// </summary>
        /// <param name="rows">jqGrid每页行数</param>
        /// <param name="page">jqGrid当前页</param>
        /// <param name="query">查询条件(AdDocListParameter)</param>
        /// <param name="content">存储内容</param>
        /// <returns></returns>
        [HttpGet]
        public string GetFaBgReturnDoc(int rows, int page, string query, string content)
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
            parameter.Content = content;
            if (!string.IsNullOrEmpty(query))
            {
                parameter = JsonHelper.Deserialize<FaArchiveListParameter>(query);
            }
            IList<JieYueDocDto> list = _faDocService.GetPageFaReturnDocs(paging, parameter, out count);

            var faReturnDocJsonService = new FaReturnDocJsonService();
            string json = faReturnDocJsonService.GetBgJqGridJson(list, count, paging, userId);

            return json;
        }

        [HttpGet]
        public ActionResult FaReturnDocMgmt(long? id)
        {
            if (!IsValidAccount(SessionToken))
            {
                return View("../Error/LoginError");
            }
            LogHelper.LoginLog(SessionUserId, "FaArchive/FaLendDocMgmt");
            if (id != null)
            {
                SetJieyueDetials(id.Value);
            }
            return View();
        }

        public string Guihuan(long id)
        {
            try
            {
                if (!IsValidAccount(SessionToken))
                {
                    Redirect("../Error/LoginError");
                }
                _faDocService.UpdateGuihuanZhuangtai(id, JieyueZhuangtaiEnum.WeiJieyue, GuihuanZhuangtaiEnum.YiGuihuan);
                return PesponseResult("归还成功");
            }
            catch (Exception ex)
            {
                LogHelper.ExceptionLog(SessionUserId, "FaArchive/Guihuan", ex);
                return PesponseResult(false, "出现异常,ex.Message=" + ex.Message);
            }
        }
    }
}