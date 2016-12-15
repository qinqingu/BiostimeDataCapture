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
                            .Include("~/AppFrontend/Js/faArchive/fa.doc.list.js"));
            bundles.Add(new ScriptBundle("~/bundles/fadocmgmtjs")
                            .Include("~/AppFrontend/Js/faArchive/fa.doc.mgmt.js"));
            bundles.Add(new ScriptBundle("~/bundles/falenddocjs")
                            .Include("~/AppFrontend/Js/faArchive/fa.lenddoc.list.js"));
        }

        private static void RegisterLayoutBundles(BundleCollection bundles)
        {
            //带图片css会导致样式错误，改成在模板页link href='@Url.Content("~/AppFrontend/css/css.css")'方式添加
            //bundles.Add(new StyleBundle("~/bundles/jqueryui/css")
            //                .Include("~/AppFrontend/bower_components/jquery-ui/redmond/jquery-ui.custom.css"));
            //bundles.Add(new StyleBundle("~/bundles/ambercss/css")
            //                .Include("~/AppFrontend/css/css.css",
            //                         "~/AppFrontend/css/amber.css.css"));

            bundles.Add(new ScriptBundle("~/bundles/jquery").Include(
                "~/AppFrontend/bower_components/jquery/jquery.js",
                "~/AppFrontend/bower_components/jquery-ui/redmond/jquery-ui.custom.js",
                "~/AppFrontend/bower_components/jquery/jquery.custom.js",
                "~/AppFrontend/bower_components/jquery/jquery.numeric.js",
                "~/AppFrontend/bower_components/jquery/jquery.validate.js",
                "~/AppFrontend/bower_components/jquery/jquery.validate.custom.js"));

            bundles.Add(new ScriptBundle("~/bundles/jqueryfileupload").Include(
                "~/AppFrontend/bower_components/jquery-fileupload/jquery.fileupload.js",
                "~/AppFrontend/bower_components/jquery-fileupload/jquery.iframe-transport.js"));

            bundles.Add(new ScriptBundle("~/bundles/webuijs").Include(
                "~/AppFrontend/Js/webui/webui.js",
                "~/AppFrontend/Js/webui/webui.validator.js",
                "~/AppFrontend/Js/webui/webui.ajax.js",
                "~/AppFrontend/Js/webui-popup-box/confirmation.js",
                "~/AppFrontend/Js/webui-popup-box/prompt.js",
                "~/AppFrontend/Js/edoc2/edoc2.common.js",
                "~/AppFrontend/Js/webui/webui.masterpage.js"));

            bundles.Add(new StyleBundle("~/bundles/gridcss")
                            .Include("~/AppFrontend/bower_components/jquery-ui/jquery.jqgrid/ui.jqgrid.css"));
            bundles.Add(new ScriptBundle("~/bundles/gridjs").Include(
                "~/AppFrontend/bower_components/jquery-ui/jquery.jqgrid/grid.locale-cn.js",
                "~/AppFrontend/bower_components/jquery-ui/jquery.jqgrid/jquery.jqgrid.js",
                "~/AppFrontend/Js/webui/webui.grid.js"));
        }
    }
}