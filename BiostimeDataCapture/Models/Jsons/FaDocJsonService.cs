using System.Collections.Generic;
using System.Linq;
using BiostimeDataCapture.Common;
using BiostimeDataCapture.Dto;
using BiostimeDataCapture.Dto._Common;
using BiostimeDataCapture.Models.JsonJqGrids;

namespace BiostimeDataCapture.Models.Jsons
{
    public class FaDocJsonService :AbstractJsonService
    {
        public string GetJqGridJson(IList<FaDocDto> list, long totalRecords, PagingParameter paging)
        {
            IList<JsonJqGridRowObject> rows =
                list.Select(item => new JsonJqGridRowObject(FormatHelper.GetLongString(item.Id), new[]
                    {
                        item.Content,
                        item.Company,
                        FormatHelper.GetIntString(item.Year),
                        FormatHelper.GetIntString(item.Month),
                        item.VoucherWord,
                        FormatHelper.GetIntString(item.VoucherNumber),
                        item.VoucherNo,
                        item.Path,
                        item.CabinetNo,
                        GetOperating(item.Id)
                    })).ToList();

            var jsonJqGridObject = new JsonJqGridObject(rows, totalRecords, paging.PageIndex, paging.PageSize);
            return Serialize(jsonJqGridObject);
        }
       
        private string GetOperating(long itemId)
        {
            const string selectButtonTmp =
                "<a name='selectButton' itemId='{itemId}' class='button02' style='cursor:pointer'>" +
                "<span class='l'></span>" +
                "<span class='m'>选择</span>" +
                "<span class='r'></span></a>";
            string editButton = selectButtonTmp.Replace("{itemId}", FormatHelper.GetLongString(itemId));

            return editButton;
        }
    }
}