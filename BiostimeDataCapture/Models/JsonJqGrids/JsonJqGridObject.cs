using System.Collections.Generic;

namespace BiostimeDataCapture.Models.JsonJqGrids
{
    public class JsonJqGridObject
    {
        private readonly int _pageIndex;
        private readonly int _pageSize;
        private readonly IList<JsonJqGridRowObject> _rows;
        private readonly long _totalRecords;

        public JsonJqGridObject(IList<JsonJqGridRowObject> rows, long totalRecords, int pageIndex, int pageSize)
        {
            _rows = rows;
            _totalRecords = totalRecords;
            _pageIndex = pageIndex;
            _pageSize = pageSize;
        }

        public IList<JsonJqGridRowObject> Rows
        {
            get { return _rows; }
        }

        public long Records
        {
            get { return _totalRecords; }
        }

        public int Page
        {
            get { return _pageIndex; }
        }

        public long Total
        {
            get { return (_totalRecords + _pageSize - 1)/_pageSize; }
        }
    }
}