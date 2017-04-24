using System;
using System.Collections.Generic;
using System.Linq;
using System.Text.RegularExpressions;
using System.Web;
using BiostimeDataCapture.Dto;

namespace BiostimeDataCapture.Common
{
    public class RegexHelper
    {
        private static Regex regexTokenRegex = new Regex(@"([\.(){}+*?$^])");

        private static List<string> GetKeywords(string keyword)
        {
            List<string> keywords = null;
            if (!string.IsNullOrEmpty(keyword))
            {
                Regex regex = new Regex("\\s+");
                keyword = regex.Replace(keyword, " ");
                keywords = keyword.Split(' ').ToList();
            }
            return keywords;
        }

        public static RegexList GetRegexList(string keyword)
        {
            keyword = regexTokenRegex.Replace(keyword, @"\$1");
            List<string> keywords = GetKeywords(keyword);
            List<Regex> regexList = null;
            if (keywords == null)
            {
                regexList = new List<Regex>();
            }
            else
            {
                regexList = keywords.Select(x => new Regex(x, RegexOptions.IgnoreCase)).ToList();
            }
            return new RegexList(regexList);
        }

        public static Regex GetRegex(string keyword)
        {
            keyword = regexTokenRegex.Replace(keyword, @"\$1");
            return new Regex(keyword, RegexOptions.IgnoreCase);
        }
    }
}