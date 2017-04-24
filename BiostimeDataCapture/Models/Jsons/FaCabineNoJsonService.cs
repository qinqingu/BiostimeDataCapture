using System.Collections.Generic;
using System.Linq;
using BiostimeDataCapture.Common;
using BiostimeDataCapture.Domain;
using BiostimeDataCapture.Dto._Common;
using BiostimeDataCapture.Models.JsonJqGrids;
using BiostimeDataCapture.Models.Utility;

namespace BiostimeDataCapture.Models.Jsons
{
    public class FaCabineNoJsonService :AbstractJsonService
    {
        public string GetFaCabineNosJqGridJson(IList<FaCabinetNo> list, long totalRecords, PagingParameter paging)
        {
            IList<JsonJqGridRowObject> rows =
                list.Select(item => new JsonJqGridRowObject(FormatHelper.GetLongString(item.Id), new[]
                    {
                        HtmlHelper.Encode(item.CabinetNo),
                        item.Path,
                        GetCabineNoEnable(item.Enable),
                        FormatHelper.GetIsoDateString(item.LastUpdated),
                        GetOperating(item.Enable,item.Id)
                    })).ToList();

            var jsonJqGridObject = new JsonJqGridObject(rows, totalRecords, paging.PageIndex, paging.PageSize);
            return Serialize(jsonJqGridObject);
        }

        private string GetOperating(bool enable,long itemId)
        {
            string editButtonTmp = "";
            if (!enable)
            {
                editButtonTmp =
                     "<a name='editButton' itemId='{itemId}' class='button02' style='cursor:pointer'>" +
                     "<span class='l'></span>" +
                     "<span class='m'>编辑</span>" +
                     "<span class='r'></span></a>" +
                     "<a name='delButton' itemId='{itemId}' class='button02' style='cursor:pointer'>" +
                     "<span class='l'></span>" +
                     "<span class='m'>删除</span>" +
                     "<span class='r'></span></a>";
            }
            string editButton = editButtonTmp.Replace("{itemId}", FormatHelper.GetLongString(itemId));

            return editButton;
        }

        private string GetCabineNoEnable(bool enable)
        {
            if (enable)
            {
                return "是";
            }
            return "否";
        }
    }
}