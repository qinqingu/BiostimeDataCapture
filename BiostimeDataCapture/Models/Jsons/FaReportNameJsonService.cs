using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using BiostimeDataCapture.Common;
using BiostimeDataCapture.Domain;
using BiostimeDataCapture.Dto._Common;
using BiostimeDataCapture.Models.JsonJqGrids;

namespace BiostimeDataCapture.Models.Jsons
{
    public class FaReportNameJsonService : AbstractJsonService
    {
        public string GetFaReportNameJqGridJson(IList<FaReportName> list, long totalRecords, PagingParameter paging)
        {
            IList<JsonJqGridRowObject> rows =
                list.Select(item => new JsonJqGridRowObject(FormatHelper.GetLongString(item.Id), new[]
                    {
                        item.Name,
                        GetCompanyEnable(item.Enable),
                        FormatHelper.GetIsoDateString(item.LastUpdated),
                        item.Remark,
                        GetOperating(item.Id)
                    })).ToList();

            var jsonJqGridObject = new JsonJqGridObject(rows, totalRecords, paging.PageIndex, paging.PageSize);
            return Serialize(jsonJqGridObject);
        }

        private string GetOperating(long itemId)
        {
            const string editButtonTmp =
                "<a name='editButton' itemId='{itemId}' class='button02' style='cursor:pointer'>" +
                "<span class='l'></span>" +
                "<span class='m'>编辑</span>" +
                "<span class='r'></span></a>";
            string editButton = editButtonTmp.Replace("{itemId}", FormatHelper.GetLongString(itemId));

            return editButton;
        }

        private string GetCompanyEnable(bool enable)
        {
            if (enable)
            {
                return "是";
            }
            return "否";
        }
    }
}