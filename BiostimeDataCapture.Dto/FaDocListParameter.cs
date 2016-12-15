namespace BiostimeDataCapture.Dto
{
    public class FaDocListParameter
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
        ///     年份
        /// </summary>
        public int? Year { get; set; }

        /// <summary>
        ///     月份
        /// </summary>
        public int? Month { get; set; }

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
        public int? VoucherNos { get; set; }

        /// <summary>
        ///     存储位置
        /// </summary>
        public string Path { get; set; }

        /// <summary>
        ///     存储柜号
        /// </summary>
        public string CabinetNo { get; set; }
    }
}