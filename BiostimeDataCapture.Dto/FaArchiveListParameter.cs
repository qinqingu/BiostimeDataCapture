using System;

namespace BiostimeDataCapture.Dto
{
    public class FaArchiveListParameter
    {
        /// <summary>
        ///     模糊条件
        /// </summary>
        public string Query { get; set; }

        /// <summary>
        ///     存储内容
        /// </summary>
        public string Content { get; set; }

        /// <summary>
        ///     公司
        /// </summary>
        public string Company { get; set; }

        /// <summary>
        ///     年份（开始）
        /// </summary>
        public int? YearBegin { get; set; }

        /// <summary>
        ///     年份（结束）
        /// </summary>
        public int? YearEnd { get; set; }

        /// <summary>
        ///     月份（开始）
        /// </summary>
        public int? MonthBegin { get; set; }

        /// <summary>
        ///     月份（结束）
        /// </summary>
        public int? MonthEnd { get; set; }

        /// <summary>
        ///     凭证字
        /// </summary>
        public string VoucherWord { get; set; }

        /// <summary>
        ///     凭证号
        /// </summary>
        public int? VoucherNumber { get; set; }

        /// <summary>
        ///     凭证劵号
        /// </summary>
        public string VoucherNo { get; set; }

        /// <summary>
        ///     本月总劵数
        /// </summary>
        public string VoucherNos { get; set; }

        /// <summary>
        ///     报告名称
        /// </summary>
        public string BaogaoMingcheng { get; set; }

        /// <summary>
        ///     合同号
        /// </summary>
        public string Hetonghao { get; set; }

        /// <summary>
        ///     存储位置
        /// </summary>
        public string Path { get; set; }

        /// <summary>
        ///     存储柜号
        /// </summary>
        public string CabinetNo { get; set; }

        /// <summary>
        ///     借阅时间(开始)
        /// </summary>
        public DateTime? JieyueShijianStart { set; get; }

        /// <summary>
        ///     借阅时间(结束)
        /// </summary>
        public DateTime? JieyueShijianEnd { set; get; }
    }
}