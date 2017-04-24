using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
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
    public class FaArchiveLendController :  ControllerBase
    {
        private readonly FaDocService _faDocService = new FaDocService();
        //
        // GET: /FaArchiveLend/

        public ActionResult FaLendDocList()
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
        ///     获取财务档案借阅列表(报表)
        /// </summary>
        /// <param name="rows">jqGrid每页行数</param>
        /// <param name="page">jqGrid当前页</param>
        /// <param name="query">查询条件(AdDocListParameter)</param>
        /// <param name="content">存储内容</param>
        /// <returns></returns>
        [HttpGet]
        public string GetFaEgLendDoc(int rows, int page, string query,string content)
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
            IList<JieYueDocDto> list = _faDocService.GetPageFaLendDocs(paging, parameter, out count);

            var faLendDocJsonService = new FaLendDocJsonService();
            string json = faLendDocJsonService.GetJqGridJson(list, count, paging, userId);

            return json;
        }
        
        /// <summary>
        ///     获取财务档案借阅列表(报表)
        /// </summary>
        /// <param name="rows">jqGrid每页行数</param>
        /// <param name="page">jqGrid当前页</param>
        /// <param name="query">查询条件(AdDocListParameter)</param>
        /// <param name="content">查询条件(AdDocListParameter)</param>
        /// <returns></returns>
        [HttpGet]
        public string GetFaHgLendDoc(int rows, int page, string query,string content)
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
            IList<JieYueDocDto> list = _faDocService.GetPageFaLendDocs(paging, parameter, out count);

            var faLendDocJsonService = new FaLendDocJsonService();
            string json = faLendDocJsonService.GetHgJqGridJson(list, count, paging, userId);

            return json;
        }

        /// <summary>
        ///     获取财务档案借阅列表(报表)
        /// </summary>
        /// <param name="rows">jqGrid每页行数</param>
        /// <param name="page">jqGrid当前页</param>
        /// <param name="query">查询条件(AdDocListParameter)</param>
        /// <param name="content">存储内容</param>
        /// <returns></returns>
        [HttpGet]
        public string GetFaBgLendDoc(int rows, int page, string query, string content)
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
            IList<JieYueDocDto> list = _faDocService.GetPageFaLendDocs(paging, parameter, out count);

            var faLendDocJsonService = new FaLendDocJsonService();
            string json = faLendDocJsonService.GetBgJqGridJson(list, count, paging, userId);

            return json;
        }

        [HttpGet]
        public ActionResult FaLendDocMgmt(long? id)
        {
            if (!IsValidAccount(SessionToken))
            {
                return View("../Error/LoginError");
            }
            LogHelper.LoginLog(SessionUserId, "FaArchiveLend/FaLendDocMgmt");
            if (id != null)
            {
                SetJieyueDetials(id.Value);
            }
            return View();
        }

         /// <summary>
        ///     保存档案借阅信息
        /// </summary>
        /// <param name="jieyueInfo"></param>
        /// <returns></returns>
        [HttpPost]
        public string SaveJieyueInfo(Jieyue jieyueInfo)
        {
            try
            {
                int currentUserId = SessionUserId;
                if (currentUserId == 0)
                {
                    return PesponseResult(false, "登录已失效,请重新登录在操作.");
                }
                var entity = new Jieyue();
                entity = _faDocService.GetJieyueById(jieyueInfo.Id);
                entity.ZidingyiGuihuanShijian = jieyueInfo.GuihuanShijian;
                _faDocService.Save(entity);

                if (entity.Id > 0)
                {
                    string saveMsg = string.Format("FaLendDoc数据保存成功，编号:{0},操作人:{1},时间:{2}。",
                                                   entity.Id, currentUserId, DateTime.Now);
                    LogHelper.Info(saveMsg);
                    return PesponseResult("保存成功.");
                }
                return PesponseResult(false, "保存失败.");
            }
            catch (Exception ex)
            {
                LogHelper.ExceptionLog(SessionUserId, "FaArchiveLend/SaveFaLendDoc", ex);
                return PesponseResult(false, "出现异常,ex.Message=" + ex.Message);
            }
        }

        /// <summary>
        ///     同意借阅
        /// </summary>
        /// <param name="id">借阅Id</param>
        [HttpGet]
        public string ArgeeJieyue(long id)
        {
            try
            {
                if (!IsValidAccount(SessionToken))
                {
                    Redirect("../Error/LoginError");
                }
                _faDocService.UpdateJieyueZhuangtai(id, JieyueZhuangtaiEnum.YiJieyue);
                return PesponseResult("借阅成功");
            }
            catch (Exception ex)
            {
                LogHelper.ExceptionLog(SessionUserId, "FaArchiveLend/ArgeeJieyue", ex);
                return PesponseResult(false, "出现异常,ex.Message=" + ex.Message);
            }
        }
        
        /// <summary>
        ///     不同意借阅
        /// </summary>
        /// <param name="id">借阅Id</param>
        [HttpGet]
        public string DisagreeJieyue(long id)
        {
            try
            {
                if (!IsValidAccount(SessionToken))
                {
                    Redirect("../Error/LoginError");
                }
                _faDocService.UpdateJieyueZhuangtai(id, JieyueZhuangtaiEnum.WeiJieyue);
                return PesponseResult("取消借阅成功");
            }
            catch (Exception ex)
            {
                LogHelper.ExceptionLog(SessionUserId, "FaArchiveLend/DisagreeJieyue", ex);
                return PesponseResult(false, "出现异常,ex.Message=" + ex.Message);
            }
        }
    }
}
