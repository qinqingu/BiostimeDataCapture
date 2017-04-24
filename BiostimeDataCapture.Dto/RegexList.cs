using System.Collections.Generic;
using System.Text.RegularExpressions;

namespace BiostimeDataCapture.Dto
{
    public class RegexList
    {
        private readonly List<Regex> _regexList;

        public RegexList(List<Regex> regexList)
        {
            _regexList = regexList;
        }

        public bool IsMatch(string input)
        {
            if (string.IsNullOrEmpty(input))
            {
                return false;
            }
            foreach (Regex regex in _regexList)
            {
                if (!regex.IsMatch(input))
                {
                    return false;
                }
            }
            return true;
        }
    }
}