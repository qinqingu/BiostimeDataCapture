namespace BiostimeDataCapture.Dto._Common
{
    public class SaveListResult
    {
        public SaveListResult(int insertCount, int changeCount)
        {
            InsertCount = insertCount;
            ChangeCount = changeCount;
        }

        public int InsertCount { get; set; }
        public int ChangeCount { get; set; }
    }
}