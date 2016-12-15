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
        public int? VoucherNos { get; set; }
        public string Path { get; set; }
        public string CabinetNo { get; set; }
        public string ContractExpirationTime { get; set; }
        //------------以下为导出Excel使用-----------//
        //public string ContractNo { get; set; }
        //public string DeptName { get; set; }
        //public string CompanyName { get; set; }
        //public string ContractOutline { get; set; }
        //public string HandlingPerson { get; set; }
        //public string HandlingDept { get; set; }
        //public string LegalCounsel { get; set; }
        //public string BoxNo { get; set; }
        //public string Remark { get; set; }
        //public int Edoc2FileId { get; set; }
    }
}