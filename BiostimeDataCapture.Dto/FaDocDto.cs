using System;

namespace BiostimeDataCapture.Dto
{
    public class FaDocDto
    {
        public long Id { get; set; }
        public string Content { get; set; }
        public string Company { get; set; }
        public int Year { get; set; }
        public int Month { get; set; }
        public string VoucherWord { get; set; }
        public int VoucherNumber { get; set; }
        public string VoucherNo { get; set; }
        public string VoucherNos { get; set; }
        public string Path { get; set; }
        public string CabinetNo { get; set; }
        public DateTime JieyueShijian { get; set; }
        public int JieyueTianshu { get; set; }
        public string GuihuanShijian { get; set; }

    }
}