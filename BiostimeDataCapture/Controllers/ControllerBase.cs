using System;
using System.Web.Mvc;
using BiostimeDataCapture.Common;
using BiostimeDataCapture.Models.Jsons;
using EDoc2.ApiClientManage.Organization;

namespace BiostimeDataCapture.Controllers
{
    public class ControllerBase : Controller
    {
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
            if (Request.Cookies["token"] == null)
            {
                ViewData["edoc2LoginErrorMsg"] = "token cookies is null";
                return false;
            }
            try
            {
                string currentToken = Request.Cookies["token"].Value;
                if (!EDoc2Helper.IsLogin(currentToken))
                {
                    ViewData["edoc2LoginErrorMsg"] = "currentToken login has expired";
                    return false;
                }
                EDocUserInfo eDoc2UserInfo = EDoc2Helper.GetUserInfoByToken(currentToken);
                //判断如果是管理员帐号就允许进入
                if (eDoc2UserInfo.UserId == 2)
                {
                    SessionUserId = eDoc2UserInfo.UserId;
                    SessionUserRealName = eDoc2UserInfo.UserRealName;
                    return true;
                }
                if (Request.Url == null)
                {
                    return false;
                }
                string url = Request.Url.AbsoluteUri;
                //if (WebConfig.FdRoleGroupId > 0 && url.Contains("JfzDataCapture/FinanceDept"))
                //{
                //    IList<int> userIds = EDoc2Helper.GetChildUserListInGroup(WebConfig.FdRoleGroupId);
                //    if (!userIds.Contains(eDoc2UserInfo.UserId))
                //    {
                //        ViewData["edoc2LoginErrorMsg"] = "current user without authorization";
                //        return false;
                //    }
                //}
                //if (WebConfig.AdRoleGroupId > 0 && url.Contains("JfzDataCapture/AdminDept"))
                //{
                //    IList<int> userIds = EDoc2Helper.GetChildUserListInGroup(WebConfig.AdRoleGroupId);
                //    if (!userIds.Contains(eDoc2UserInfo.UserId))
                //    {
                //        ViewData["edoc2LoginErrorMsg"] = "current user without authorization";
                //        return false;
                //    }
                //}
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
    }
}