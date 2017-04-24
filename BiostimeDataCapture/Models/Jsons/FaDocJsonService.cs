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
        public string GetEgJqGridJson(IList<FaDocDto> list, long totalRecords, PagingParameter paging, int userId)
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
                        item.CabinetNo,
                        item.Path,
                        item.Beizhu,
                        GetOperating(item.Id,item.Content)
                    })).ToList();

            var jsonJqGridObject = new JsonJqGridObject(rows, totalRecords, paging.PageIndex, paging.PageSize);
            return Serialize(jsonJqGridObject);
        }

        public string GetHgJqGridJson(IList<FaDocDto> list, long totalRecords, PagingParameter paging, int userId)
        {
            IList<JsonJqGridRowObject> rows =
                list.Select(item => new JsonJqGridRowObject(FormatHelper.GetLongString(item.Id), new[]
                    {
                        item.Content,
                        item.Company,
                        FormatHelper.GetIntString(item.Year),
                        FormatHelper.GetIntString(item.Month),
                        item.Hetonghao,
                        item.CabinetNo,
                        item.Path,
                        GetOperating(item.Id,item.Content)
                    })).ToList();

            var jsonJqGridObject = new JsonJqGridObject(rows, totalRecords, paging.PageIndex, paging.PageSize);
            return Serialize(jsonJqGridObject);
        }

        public string GetBgJqGridJson(IList<FaDocDto> list, long totalRecords, PagingParameter paging, int userId)
        {
            IList<JsonJqGridRowObject> rows =
                list.Select(item => new JsonJqGridRowObject(FormatHelper.GetLongString(item.Id), new[]
                    {
                        item.Content,
                        item.Company,
                        FormatHelper.GetIntString(item.Year),
                        item.BaogaoMingcheng,
                        item.CabinetNo,
                        item.Path,
                        GetOperating(item.Id,item.Content)
                    })).ToList();

            var jsonJqGridObject = new JsonJqGridObject(rows, totalRecords, paging.PageIndex, paging.PageSize);
            return Serialize(jsonJqGridObject);
        }

        private string GetOperating(long itemId, string content)
        {
            string editButtonTmp =
                "<a name='selectButton' itemId='{itemId}' con='{con}' class='button02' style='cursor:pointer'>" +
                "<span class='l'></span>" +
                "<span class='m'>编辑</span>" +
                "<span class='r'></span></a>";
            string editButton = editButtonTmp.Replace("{itemId}", FormatHelper.GetLongString(itemId)).Replace("{con}", content);
            return editButton;
        }

        //private string GetOperating(long itemId, string content, int userId)
        //{
        //    string editButtonTmp = "";
        //    if (EDoc2Helper.IsUserInUserGroup(userId, WebConfig.CaiwuDanganGuanliyuan))
        //    {
        //        editButtonTmp =
        //        "<a name='selectButton' itemId='{itemId}' con='{con}' class='button02' style='cursor:pointer'>" +
        //        "<span class='l'></span>" +
        //        "<span class='m'>编辑</span>" +
        //        "<span class='r'></span></a>";
        //    }
        //    string editButton = editButtonTmp.Replace("{itemId}", FormatHelper.GetLongString(itemId)).Replace("{con}",content);
        //    return editButton;
        //}
    }
}