using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace BiostimeDataCapture.Models
{
    public class FaCabinet
    {
        public int Id { set; get; }

        public string CabinetNo { set; get; }

        public string Path { set; get; }

        public bool Enable { set; get; }

    }
}