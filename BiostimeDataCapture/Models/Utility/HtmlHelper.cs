using System.Web;

namespace BiostimeDataCapture.Models.Utility
{
    public class HtmlHelper
    {
        public static string Encode(string value)
        {
            if (string.IsNullOrEmpty(value))
            {
                return string.Empty;
            }
            return HttpUtility.HtmlEncode(value);
        }
    }
}