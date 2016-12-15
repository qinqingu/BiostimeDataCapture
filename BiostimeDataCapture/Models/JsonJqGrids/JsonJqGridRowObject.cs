using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace BiostimeDataCapture.Models.JsonJqGrids
{
    public class JsonJqGridRowObject
    {
        private readonly string[] _cell;
        private readonly string _id;

        public JsonJqGridRowObject(string id, string[] cell)
        {
            _id = id;
            _cell = cell;
        }

        public string Id
        {
            get { return _id; }
        }

        public string[] Cell
        {
            get { return _cell; }
        }
    }
}