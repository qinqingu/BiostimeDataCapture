using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using NLog;

namespace BiostimeDataCapture.Models.Utility
{
    public class LogHelper
    {
        private static readonly Logger Log = LogManager.GetCurrentClassLogger();

        public static void Info(string msg)
        {
            Log.Info(msg);
        }

        public static void Error(string msg)
        {
            Log.Error(msg);
        }

        public static void LoginLog(int userId, string viewUrl)
        {
            string loginLog = string.Format("用户{0}进入{1}", userId, viewUrl);
            Info(loginLog);
        }

        public static void ExceptionLog(int userId, string method, Exception ex)
        {
            string exLog = string.Format("{0}出现异常,ex.Message={1},ex.StackTrace={2},执行人:{3}",
                                         method, ex.Message, ex.StackTrace, userId);
            Error(exLog);
        }

        /// <summary>
        ///     多个错误写入日志(分隔符为:|)
        /// </summary>
        /// <param name="value">错误信息</param>
        public static void Errors(string value)
        {
            if (!value.Contains("|"))
            {
                string exceptionMessage = string.Format("错误:{0}", value);
                Log.Error(exceptionMessage);
                return;
            }
            string[] items = value.Split('|');
            foreach (string item in items)
            {
                if (string.IsNullOrEmpty(item))
                {
                    continue;
                }
                Log.Error("错误:{0}", item);
            }
        }
    }
}