using System;
using System.Configuration;
using System.Globalization;

namespace BiostimeDataCapture.Common
{
    public class WebConfig
    {

        /// <summary>
        ///     BiostimeDataCapture数据库链接配置
        /// </summary>
        public static string BiostimeDataCaptureConnection = ConfigurationManager.AppSettings["BiostimeDataCaptureConnection"];

        /// <summary>
        ///     是否属于调式环境
        /// </summary>
        public static bool IsDebug
        {
            get
            {
                if (ConfigurationManager.AppSettings["IsDebug"] != null)
                {
                    return bool.Parse(ConfigurationManager.AppSettings["IsDebug"]);
                }
                return false;
            }
        }


        /// <summary>
        ///     基目录
        /// </summary>
        public static string SiteContentDir
        {
            get { return AppDomain.CurrentDomain.BaseDirectory; }
        }

        /// <summary>
        ///     EDoc2网址
        /// </summary>
        public static string EdocUrl
        {
            get { return ConfigurationManager.AppSettings["EDoc2BaseUrl"].ToString(CultureInfo.InvariantCulture); }
        }
    }
}