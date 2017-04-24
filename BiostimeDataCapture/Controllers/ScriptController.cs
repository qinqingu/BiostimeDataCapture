using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using BiostimeDataCapture.AppService;
using BiostimeDataCapture.Domain;

namespace BiostimeDataCapture.Controllers
{
    public class ScriptController : ControllerBase
    {
        //
        // GET: /Script/
        private readonly FaDocService _faDocService = new FaDocService();

        public ActionResult CompanyNames(string term)
        {
            IList<FaCompany> companies = _faDocService.GetCompanines(term).Take(20).ToList();
            List<string> models = companies.Select(u => u.Name).ToList();
            return Json(models, JsonRequestBehavior.AllowGet);
        }

        public ActionResult ReportNames(string term)
        {
            IList<FaReportName> companies = _faDocService.GetReportNames(term).Take(20).ToList();
            List<string> models = companies.Select(u => u.Name).ToList();
            return Json(models, JsonRequestBehavior.AllowGet);
        }

    }
}
