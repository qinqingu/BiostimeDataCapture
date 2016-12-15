namespace BiostimeDataCapture.Dto._Common
{
    public class OrderingParameter
    {
        public OrderingParameter(string columnName, bool isAsc)
        {
            ColumnName = columnName;
            IsAsc = isAsc;
        }

        public string ColumnName { get; set; }
        public bool IsAsc { get; set; }
    }
}