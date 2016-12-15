namespace BiostimeDataCapture.Dto._Common
{
    public class PagingParameter
    {
        public PagingParameter(int pageIndex, int pageSize)
        {
            PageIndex = pageIndex;
            PageSize = pageSize;
        }

        public int PageIndex { get; set; }
        public int PageSize { get; set; }
    }
}