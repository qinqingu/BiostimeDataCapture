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
    public class FaCabinetNoController : ControllerBase
    {
        private readonly FaDocService _faDocService = new FaDocService();
        //
        // GET: /FaCabineNo/

        public ActionResult Index()
        {
            return FaCabinetNoList();
        }

        public ActionResult FaCabinetNoList()
        {
            if (SessionUserId == 0)
            {
                return View("../Error/LoginError");
            }
            return View("FaCabinetNoList");
        }

        /// <summary>
        ///     获取柜号信息列表
        /// </summary>
        /// <param name="rows">jqGrid每页行数</param>
        /// <param name="page">jqGrid当前页</param>
        /// <param name="query">查询条件(名称/简称/备注)</param>
        /// <param name="enable">状态条件</param>
        /// <returns></returns>
        [HttpGet]
        public string GetFaCabineNos(int rows, int page, string query, bool? enable)
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
            IList<FaCabinetNo> list = _faDocService.GetCabinetNos(paging, query, enable, out count);

            var faCabineNoJsonService = new FaCabineNoJsonService();
            string json = faCabineNoJsonService.GetFaCabineNosJqGridJson(list, count, paging);

            return json;
        }

        public ActionResult FaCabinetNoMgmt(string id)
        {
            if (SessionUserId == 0)
            {
                return View("../Error/LoginError");
            }
            string enable = "false";
            if (!string.IsNullOrEmpty(id))
            {
                FaCabinetNo cabinetNo = _faDocService.GetCabinetNo(long.Parse(id));
                ViewData["id"] = cabinetNo.Id;
                ViewData["cabinetNo"] = cabinetNo.CabinetNo;
                ViewData["path"] = cabinetNo.Path;
                if (cabinetNo.Enable)
                {
                    enable = "true";
                }
            }
            ViewData["enable"] = enable;
            return View();
        }

        /// <summary>
        ///     删除柜号
        /// </summary>
        /// <param name="id">柜号Id</param>
        [HttpGet]
        public string DelFaCabinetNo(long id)
        {
            try
            {
                if (SessionUserId == 0)
                {
                    Redirect("../Error/LoginError");
                }
                FaCabinetNo entity = _faDocService.GetCabinetNo(id);
                _faDocService.DelCabinetNo(entity);
                return PesponseResult("删除成功");
            }
            catch (Exception ex)
            {
                LogHelper.ExceptionLog(SessionUserId, "faCabinetNo/DelFaCabinetNo", ex);
                return PesponseResult(false, "出现异常,ex.Message=" + ex.Message);
            }
        }

        /// <summary>
        ///     保存柜号信息
        /// </summary>
        /// <param name="faCabinetNo"></param>
        /// <returns></returns>
        [HttpPost]
        public string SaveCabinetNo(FaCabinetNo faCabinetNo)
        {
            try
            {
                int currentUserId = SessionUserId;
                if (currentUserId == 0)
                {
                    return PesponseResult(false, "登录已失效,请重新登录在操作.");
                }
                var entity = new FaCabinetNo();
                if (faCabinetNo.Id > 0)
                {
                    entity = _faDocService.GetCabinetNo(faCabinetNo.Id);
                }
                else
                {
                    if (_faDocService.HasCabinetNo(faCabinetNo.CabinetNo))
                    {
                        return PesponseResult(false, "柜号已存在！");
                    }
                }
                entity.CabinetNo = faCabinetNo.CabinetNo;
                entity.Enable = faCabinetNo.Enable;
                entity.Path = faCabinetNo.Path;

                _faDocService.SaveCabinetNo(entity);
                if (entity.Id > 0)
                {
                    string saveMsg = string.Format("FaCabinetNo数据保存成功，编号:{0},I操作人:{1},时间:{2}。",
                                                   entity.Id, currentUserId, DateTime.Now);
                    LogHelper.Info(saveMsg);
                    return PesponseResult("保存成功.");
                }
                return PesponseResult(false, "保存失败.");
            }
            catch (Exception ex)
            {
                LogHelper.ExceptionLog(SessionUserId, "FaCabinetNo/SaveCabinetNo", ex);
                return PesponseResult(false, "出现异常,ex.Message=" + ex.Message);
            }
        }
    }
}
