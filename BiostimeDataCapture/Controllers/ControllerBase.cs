using System;
using System.Collections.Generic;
using System.Web.Mvc;
using BiostimeDataCapture.AppService;
using BiostimeDataCapture.Common;
using BiostimeDataCapture.Domain;
using BiostimeDataCapture.Models.Jsons;
using EDoc2.ApiClientManage.Organization;

namespace BiostimeDataCapture.Controllers
{
    public class ControllerBase : Controller
    {
        private readonly FaDocService _faDocService = new FaDocService();
        protected int SessionUserId
        {
            get { return Session["UserId"] == null ? 0 : (int) Session["UserId"]; }
            set
            {
                if (Session["UserId"] != null)
                {
                    Session.Remove("UserId");
                }
                Session.Add("UserId", value);
            }
        }

        protected string SessionUserRealName
        {
            get { return Session["UserRealName"] == null ? string.Empty : Session["UserRealName"].ToString(); }
            set
            {
                if (Session["UserRealName"] != null)
                {
                    Session.Remove("UserRealName");
                }
                Session.Add("UserRealName", value);
            }
        }

        protected string SessionToken
        {
            get { return Session["Token"] == null ? string.Empty : Session["Token"].ToString(); }
            set
            {
                if (Session["Token"] != null)
                {
                    Session.Remove("Token");
                }
                Session.Add("Token", value);
            }
        }

        protected string PesponseResult(object resultValue)
        {
            return PesponseResult(true, resultValue);
        }

        protected string PesponseResult(bool result, object resultValue)
        {
            //1代表false,0代表true
            int resultInt = 0;
            if (!result)
            {
                resultInt = 1;
            }

            string objectMsg = JsonHelper.Serialize(new {result = resultInt, resultValue});
            return objectMsg;
        }

        protected bool IsValidAccount()
        {
            if (WebConfig.IsDebug)
            {
                SessionUserId = 2;
                SessionUserRealName = "Administrator";
                return true;
            }
            ViewData["edoc2LoginUrl"] = WebConfig.EdocUrl + "/ocm/Api/Auth/Login";
            if (Request["token"] == null)
            {
                ViewData["edoc2LoginErrorMsg"] = "token  is null";
                return false;
            }
            try
            {
                //string currentToken = Request.Cookies["token"].Value;
                string currentToken = Request["token"];
                if (!EDoc2Helper.IsLogin(currentToken))
                {
                    ViewData["edoc2LoginErrorMsg"] = "currentToken login has expired";
                    return false;
                }
                EDocUserInfo eDoc2UserInfo = EDoc2Helper.GetUserInfoByToken(currentToken);
                SessionUserId = eDoc2UserInfo.UserId;
                SessionUserRealName = eDoc2UserInfo.UserRealName;
                SessionToken = currentToken;
                return true;
            }
            catch (Exception ex)
            {
                ViewData["edoc2LoginErrorMsg"] = "ex.Message" + ex.Message;
                return false;
            }
        }

        protected bool IsValidAccount(string token)
        {
            if (WebConfig.IsDebug)
            {
                SessionUserId = 2;
                SessionUserRealName = "Administrator";
                return true;
            }
            ViewData["edoc2LoginUrl"] = WebConfig.EdocUrl + "/ocm/Api/Auth/Login";
            try
            {
                if (!EDoc2Helper.IsLogin(token))
                {
                    ViewData["edoc2LoginErrorMsg"] = "currentToken login has expired";
                    return false;
                }
                EDocUserInfo eDoc2UserInfo = EDoc2Helper.GetUserInfoByToken(token);
                SessionUserId = eDoc2UserInfo.UserId;
                SessionUserRealName = eDoc2UserInfo.UserRealName;
                return true;
            }
            catch (Exception ex)
            {
                ViewData["edoc2LoginErrorMsg"] = "ex.Message" + ex.Message;
                return false;
            }
        }

        public void SetJieyueDetials(long id)
        {
            Jieyue entity = _faDocService.GetJieyueById(id);
            ViewData["faJieyueId"] = id;
            ViewData["content"] = entity.FaArchive.Content;
            ViewData["company"] = entity.FaArchive.Company;
            ViewData["year"] = entity.FaArchive.Year;
            ViewData["month"] = entity.FaArchive.Month;
            ViewData["voucherWord"] = entity.FaArchive.VoucherWord;
            ViewData["voucherNumber"] = entity.FaArchive.VoucherNumber;
            ViewData["voucherNo"] = entity.FaArchive.VoucherNo;
            ViewData["hetongHao"] = entity.FaArchive.HetongHao;
            ViewData["baogaoMingcheng"] = entity.FaArchive.BaogaoMingcheng;
            ViewData["path"] = entity.FaArchive.Path;
            ViewData["cabinetNo"] = entity.FaArchive.CabinetNo;
            ViewData["cabinetNo"] = entity.FaArchive.CabinetNo;
            ViewData["jieyueTianshu"] = entity.JieyueTianshu;
            ViewData["jieyueshijian"] = FormatHelper.GetIsoDateString(entity.JieyueShijian);
            if (entity.ZidingyiGuihuanShijian != null)
            {
                ViewData["guihuanShijian"] = FormatHelper.GetIsoDateString(entity.ZidingyiGuihuanShijian);
            }
            else
            {
                ViewData["guihuanShijian"] = FormatHelper.GetIsoDateString(entity.JieyueShijian.AddDays(entity.JieyueTianshu));
            }
        }
    }
}