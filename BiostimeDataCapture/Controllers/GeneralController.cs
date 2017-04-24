using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace BiostimeDataCapture.Controllers
{
    public class GeneralController : ControllerBase
    {
        //
        // GET: /Layout/
        [HttpGet]
        public string GetUserRealName()
        {
            if (SessionUserId == 0)
            {
                return PesponseResult("未知帐号");
            }

            return PesponseResult(SessionUserRealName);
        }

    }
}
