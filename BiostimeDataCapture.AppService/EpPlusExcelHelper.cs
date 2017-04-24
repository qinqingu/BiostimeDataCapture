using System;
using OfficeOpenXml;

namespace BiostimeDataCapture.AppService
{
    public class EpPlusExcelHelper
    {
        public static decimal? GetDecimalValue(ExcelWorksheet sheet, string cell)
        {
            string value = CellValue(sheet, cell);
            if (string.IsNullOrEmpty(value))
            {
                return null;
            }
            return decimal.Parse(value);
        }

        public static decimal GetNotNullDecimalValue(ExcelWorksheet sheet, string cell)
        {
            try
            {
                string value = CellValue(sheet, cell);
                return decimal.Parse(value);
            }
            catch (Exception ex)
            {
                string cellInfo = string.Format("{0}单元格数据出错: {1}", cell, ex.Message);
                throw new Exception(cellInfo);
            }
        }

        public static int? GetIntValue(ExcelWorksheet sheet, string cell)
        {
            string value = CellValue(sheet, cell);
            if (string.IsNullOrEmpty(value))
            {
                return null;
            }
            return int.Parse(value);
        }

        public static DateTime? GetDateTimeValue(ExcelWorksheet sheet, string cell)
        {
            string value = CellText(sheet, cell);
            if (string.IsNullOrEmpty(value))
            {
                return null;
            }
            return DateTime.Parse(value);
        }

        public static string CellValue(ExcelWorksheet sheet, string cell)
        {
            try
            {
                string cellValue = sheet.Cells[cell].Value.ToString().Trim();
                return cellValue;
            }
            catch
            {
                return string.Empty;
            }
        }

        public static string CellText(ExcelWorksheet sheet, string cell)
        {
            try
            {
                string cellText = sheet.Cells[cell].Text.Trim();
                return cellText;
            }
            catch
            {
                return string.Empty;
            }
        }

        public static string CellText(ExcelWorksheet sheet, int row, int column)
        {
            try
            {
                string cellText = sheet.Cells[row, column].Text.Trim();
                return cellText;
            }
            catch
            {
                return string.Empty;
            }
        }

        public static string Cell(string column, int row)
        {
            return string.Format("{0}{1}", column, row);
        }
    }
}