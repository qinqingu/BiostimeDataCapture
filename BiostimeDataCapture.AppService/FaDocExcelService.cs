using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Text;
using BiostimeDataCapture.Common;
using BiostimeDataCapture.Dto;
using OfficeOpenXml;

namespace BiostimeDataCapture.AppService
{
    public class FaDocExcelService
    {
        public byte[] GetEgFaDocsExcel(IList<FaDocDto> list)
        {
            string siteContentDir = WebConfig.SiteContentDir;
            string templateExcel = Path.Combine(siteContentDir, @"_Templates\EgFaDocTemplate.xlsx");
            var excelfile = new FileInfo(templateExcel);
            var excelPackage = new ExcelPackage(excelfile);
            ExcelWorksheet ws = excelPackage.Workbook.Worksheets[1];
            int index = 1;
            foreach (FaDocDto item in list)
            {
                index++;
                string i = FormatHelper.GetNonNullIntString(index);
                ws.Cells[string.Format("A{0}", i)].Value = item.Id;
                ws.Cells[string.Format("B{0}", i)].Value = item.Content;
                ws.Cells[string.Format("C{0}", i)].Value = item.Company;
                ws.Cells[string.Format("D{0}", i)].Value = item.Year;
                ws.Cells[string.Format("E{0}", i)].Value = item.Month;
                ws.Cells[string.Format("F{0}", i)].Value = item.VoucherWord;
                ws.Cells[string.Format("G{0}", i)].Value = item.VoucherNumber;
                ws.Cells[string.Format("H{0}", i)].Value = item.VoucherNo;
                ws.Cells[string.Format("I{0}", i)].Value = item.CabinetNo;
                ws.Cells[string.Format("J{0}", i)].Value = item.Path;
                ws.Cells[string.Format("K{0}", i)].Value = item.Beizhu;
            }
            return excelPackage.GetAsByteArray();
        }

        public byte[] GetHgFaDocsExcel(IList<FaDocDto> list)
        {
            string siteContentDir = WebConfig.SiteContentDir;
            string templateExcel = Path.Combine(siteContentDir, @"_Templates\HgFaDocTemplate.xlsx");
            var excelfile = new FileInfo(templateExcel);
            var excelPackage = new ExcelPackage(excelfile);
            ExcelWorksheet ws = excelPackage.Workbook.Worksheets[1];
            int index = 1;
            foreach (FaDocDto item in list)
            {
                index++;
                string i = FormatHelper.GetNonNullIntString(index);
                ws.Cells[string.Format("A{0}", i)].Value = item.Id;
                ws.Cells[string.Format("B{0}", i)].Value = item.Content;
                ws.Cells[string.Format("C{0}", i)].Value = item.Company;
                ws.Cells[string.Format("D{0}", i)].Value = item.Year;
                ws.Cells[string.Format("E{0}", i)].Value = item.Month;
                ws.Cells[string.Format("F{0}", i)].Value = item.Hetonghao;
                ws.Cells[string.Format("G{0}", i)].Value = item.CabinetNo;
                ws.Cells[string.Format("H{0}", i)].Value = item.Path;
            }
            return excelPackage.GetAsByteArray();
        }

        public byte[] GetBgFaDocsExcel(IList<FaDocDto> list)
        {
            string siteContentDir = WebConfig.SiteContentDir;
            string templateExcel = Path.Combine(siteContentDir, @"_Templates\BgFaDocTemplate.xlsx");
            var excelfile = new FileInfo(templateExcel);
            var excelPackage = new ExcelPackage(excelfile);
            ExcelWorksheet ws = excelPackage.Workbook.Worksheets[1];
            int index = 1;
            foreach (FaDocDto item in list)
            {
                index++;
                string i = FormatHelper.GetNonNullIntString(index);
                ws.Cells[string.Format("A{0}", i)].Value = item.Id;
                ws.Cells[string.Format("B{0}", i)].Value = item.Content;
                ws.Cells[string.Format("C{0}", i)].Value = item.Company;
                ws.Cells[string.Format("D{0}", i)].Value = item.Year;
                ws.Cells[string.Format("E{0}", i)].Value = item.BaogaoMingcheng;
                ws.Cells[string.Format("F{0}", i)].Value = item.CabinetNo;
                ws.Cells[string.Format("G{0}", i)].Value = item.Path;
            }
            return excelPackage.GetAsByteArray();
        }
    }
}
