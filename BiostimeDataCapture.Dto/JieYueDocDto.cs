using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace BiostimeDataCapture.Dto
{
    public class JieYueDocDto
    {
        public long Id { get; set; }
        public string Content { get; set; }
        public string Company { get; set; }
        public int Year { get; set; }
        public int? Month { get; set; }
        public string VoucherWord { get; set; }
        public int? VoucherNumber { get; set; }
        public string VoucherNo { get; set; }
        public string VoucherNos { get; set; }
        public string BaogaoMingcheng { get; set; }
        public string HetongHao { get; set; }
        public string CabinetNo { get; set; }
        public string Path { get; set; }
        public string Beizhu { get; set; }
        public string ShenQingrenName { get; set; }
        public string ShenQingrenAccount { get; set; }
        public DateTime JieyueShijian { get; set; }
        public DateTime GuihuanShijian { get; set; }
        public DateTime? ZidingyiGuihuanShijian { get; set; }
        public int JieyueTianshu { get; set; }
        
    }
}
