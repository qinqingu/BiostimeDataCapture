using System.Web;
using System.Web.Optimization;

namespace BiostimeDataCapture
{
    public class BundleConfig
    {
        // 有关 Bundling 的详细信息，请访问 http://go.microsoft.com/fwlink/?LinkId=254725
        public static void RegisterBundles(BundleCollection bundles)
        {
            RegisterViewsBundles(bundles);
            RegisterLayoutBundles(bundles);
        }

        private static void RegisterViewsBundles(BundleCollection bundles)
        {
            //财务档案信息采集界面js
            bundles.Add(new ScriptBundle("~/bundles/falayoutjs")
                            .Include("~/AppFrontend/Js/faArchive/fa.layout.js"));
            bundles.Add(new ScriptBundle("~/bundles/fadoclistjs")
                            .Include("~/AppFrontend/Js/faArchive/fa.archive.list.js"));
            bundles.Add(new ScriptBundle("~/bundles/faegmgmtjs")
                            .Include("~/AppFrontend/Js/faArchive/fa.eg.mgmt.js"));
            bundles.Add(new ScriptBundle("~/bundles/fabgmgmtjs")
                           .Include("~/AppFrontend/Js/faArchive/fa.bg.mgmt.js"));
            bundles.Add(new ScriptBundle("~/bundles/fahgmgmtjs")
                          .Include("~/AppFrontend/Js/faArchive/fa.hg.mgmt.js"));
            bundles.Add(new ScriptBundle("~/bundles/falenddocjs")
                            .Include("~/AppFrontend/Js/faArchiveLend/fa.lenddoc.list.js"));
            bundles.Add(new ScriptBundle("~/bundles/falenddocmgmtjs")
                            .Include("~/AppFrontend/Js/faArchiveLend/fa.lenddoc.mgmt.js"));
            bundles.Add(new ScriptBundle("~/bundles/fareturndocjs")
                            .Include("~/AppFrontend/Js/faArchiveReturn/fa.returndoc.list.js"));
            bundles.Add(new ScriptBundle("~/bundles/fareturndocmgmtjs")
                            .Include("~/AppFrontend/Js/faArchiveReturn/fa.returnDoc.mgmt.js"));
            bundles.Add(new ScriptBundle("~/bundles/facabinetNolistjs")
                            .Include("~/AppFrontend/Js/faCabinetNo/fa.cabinetNo.list.js"));
            bundles.Add(new ScriptBundle("~/bundles/facabinetNomgmtjs")
                            .Include("~/AppFrontend/Js/faCabinetNo/fa.cabinetNo.mgmt.js"));
            bundles.Add(new ScriptBundle("~/bundles/facompanylistjs")
                           .Include("~/AppFrontend/Js/faCompany/fa.company.list.js"));
            bundles.Add(new ScriptBundle("~/bundles/facompanymgmtjs")
                          .Include("~/AppFrontend/Js/faCompany/fa.company.mgmt.js"));
            bundles.Add(new ScriptBundle("~/bundles/fareportNamejs")
                          .Include("~/AppFrontend/Js/faReportName/fa.reportName.list.js"));
            bundles.Add(new ScriptBundle("~/bundles/fareportNamemgmtjs")
                          .Include("~/AppFrontend/Js/faReportName/fa.reportName.mgmt.js"));
        }

        private static void RegisterLayoutBundles(BundleCollection bundles)
        {
            bundles.Add(new ScriptBundle("~/bundles/jquery").Include(
                "~/AppFrontend/bower_components/jquery/jquery-1.8.0.min.js",
                "~/AppFrontend/bower_components/jquery-ui/redmond/jquery-ui-1.8.23.custom.min.js",
                "~/AppFrontend/bower_components/jquery/jquery.numeric.js",
                "~/AppFrontend/bower_components/jquery/jquery.validate.js",
                "~/AppFrontend/bower_components/jquery/jquery.validate.custom.js"));

            bundles.Add(new ScriptBundle("~/bundles/bootstrap").Include(
               "~/AppFrontend/bower_components/bootstrap/bootstrap.min.js"));

            bundles.Add(new ScriptBundle("~/bundles/jqueryfileupload").Include(
                "~/AppFrontend/bower_components/jquery-fileupload/jquery.fileupload.js",
                "~/AppFrontend/bower_components/jquery-fileupload/jquery.iframe-transport.js"));

            bundles.Add(new ScriptBundle("~/bundles/annajs").Include(
                "~/AppFrontend/Js/anna/anna.js",
                "~/AppFrontend/Js/anna/anna.validator.js",
                "~/AppFrontend/Js/anna/anna.ajax.js",
                "~/AppFrontend/Js/anna-popup-box/confirmation.js",
                "~/AppFrontend/Js/anna-popup-box/prompt.js",
                "~/AppFrontend/Js/anna/anna.masterpage.js"));

            bundles.Add(new StyleBundle("~/bundles/gridcss")
                            .Include("~/AppFrontend/bower_components/jquery-ui/jquery.jqgrid/ui.jqgrid.css"));
            bundles.Add(new ScriptBundle("~/bundles/gridjs").Include(
                "~/AppFrontend/bower_components/jquery-ui/jquery.jqgrid/grid.locale-cn.js",
                "~/AppFrontend/bower_components/jquery-ui/jquery.jqgrid/jquery.jqgrid.js",
                "~/AppFrontend/Js/anna/anna.grid.js"));
        }
    }
}