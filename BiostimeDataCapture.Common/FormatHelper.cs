using System;
using System.Collections.Generic;
using System.Globalization;
using System.IO;
using System.Linq;
using System.Text;

namespace BiostimeDataCapture.Common
{
    public static class FormatHelper
    {
        /// <summary>
        ///     格式化文件名(去除win文件\文件夹不允许的字符)
        /// </summary>
        /// <param name="fileName"></param>
        /// <returns></returns>
        public static string FormatFileName(string fileName)
        {
            fileName = fileName.Trim();
            char[] charArray = Path.GetInvalidFileNameChars();
            foreach (char charVal in charArray)
            {
                string c = charVal.ToString(CultureInfo.InvariantCulture);
                if (fileName.Contains(c))
                {
                    fileName = fileName.Replace(c, "");
                }
            }
            return fileName;
        }

        public static string GetString(string value)
        {
            return value ?? string.Empty;
        }

        public static string GetIsoDateString(DateTime? value)
        {
            if (value == DateTime.MinValue)
            {
                return String.Empty;
            }
            if (value == null)
            {
                return String.Empty;
            }

            return value.Value.ToString("yyyy-MM-dd");
        }

        public static string GetLongString(long? value)
        {
            if (value == null)
            {
                return String.Empty;
            }

            return value.Value.ToString(CultureInfo.InvariantCulture);
        }

        public static string GetIntString(int? value)
        {
            if (value == null)
            {
                return String.Empty;
            }

            return value.Value.ToString(CultureInfo.InvariantCulture);
        }

        public static string GetNonNullIntString(int value)
        {
            return value.ToString(CultureInfo.InvariantCulture);
        }

        public static string GetDecimalString(decimal? value)
        {
            if (value == null)
            {
                return String.Empty;
            }

            return value.Value.ToString(CultureInfo.InvariantCulture);
        }

        public static string GetBooleanString(bool value)
        {
            return value ? "是" : "否";
        }

        public static string GetBooleanString(bool? value)
        {
            if (value == null)
            {
                return "否";
            }
            return value.Value ? "是" : "否";
        }

        public static decimal GetDecimalValue(decimal? value)
        {
            if (value == null)
            {
                return 0;
            }
            return value.Value;
        }
    }
}
