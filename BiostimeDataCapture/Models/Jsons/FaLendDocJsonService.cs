using System;
using System.Collections.Generic;
using System.Linq;
using BiostimeDataCapture.Common;
using BiostimeDataCapture.Dto;
using BiostimeDataCapture.Dto._Common;
using BiostimeDataCapture.Models.JsonJqGrids;

namespace BiostimeDataCapture.Models.Jsons
{
    public class FaLendDocJsonService : AbstractJsonService
    {
        public string GetJqGridJson(IList<JieYueDocDto> list, long totalRecords, PagingParameter paging,int userId)
        {
            IList<JsonJqGridRowObject> rows =
                list.Select(item => new JsonJqGridRowObject(FormatHelper.GetLongString(item.Id), new[]
                    {
                        item.ShenQingrenAccount,
                        item.ShenQingrenName,
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
                        FormatHelper.GetIntString(item.JieyueTianshu),
                        FormatHelper.GetIsoDateString(item.JieyueShijian),
                        FormatHelper.GetIsoDateString(GetGuihuanShijian(item.JieyueTianshu,item.JieyueShijian,item.ZidingyiGuihuanShijian)),
                        GetOperating(item.Id,userId)
                    })).ToList();

            var jsonJqGridObject = new JsonJqGridObject(rows, totalRecords, paging.PageIndex, paging.PageSize);
            return Serialize(jsonJqGridObject);
        }

        public string GetHgJqGridJson(IList<JieYueDocDto> list, long totalRecords, PagingParameter paging, int userId)
        {
            IList<JsonJqGridRowObject> rows =
                list.Select(item => new JsonJqGridRowObject(FormatHelper.GetLongString(item.Id), new[]
                    {
                        item.ShenQingrenName,
                        item.Content,
                        item.Company,
                        FormatHelper.GetIntString(item.Year),
                        FormatHelper.GetIntString(item.Month),
                        item.HetongHao,
                        item.CabinetNo,
                        item.Path,
                        FormatHelper.GetIntString(item.JieyueTianshu),
                        FormatHelper.GetIsoDateString(item.JieyueShijian),
                        FormatHelper.GetIsoDateString(GetGuihuanShijian(item.JieyueTianshu,item.JieyueShijian,item.ZidingyiGuihuanShijian)),
                        GetOperating(item.Id,userId)
                    })).ToList();

            var jsonJqGridObject = new JsonJqGridObject(rows, totalRecords, paging.PageIndex, paging.PageSize);
            return Serialize(jsonJqGridObject);
        }

        public string GetBgJqGridJson(IList<JieYueDocDto> list, long totalRecords, PagingParameter paging, int userId)
        {
            IList<JsonJqGridRowObject> rows =
                list.Select(item => new JsonJqGridRowObject(FormatHelper.GetLongString(item.Id), new[]
                    {
                        item.ShenQingrenName,
                        item.Content,
                        item.Company,
                        FormatHelper.GetIntString(item.Year),
                        item.BaogaoMingcheng,
                        item.CabinetNo,
                        item.Path,
                        FormatHelper.GetIntString(item.JieyueTianshu),
                        FormatHelper.GetIsoDateString(item.JieyueShijian),
                        FormatHelper.GetIsoDateString(GetGuihuanShijian(item.JieyueTianshu,item.JieyueShijian,item.ZidingyiGuihuanShijian)),
                        GetOperating(item.Id,userId)
                    })).ToList();

            var jsonJqGridObject = new JsonJqGridObject(rows, totalRecords, paging.PageIndex, paging.PageSize);
            return Serialize(jsonJqGridObject);
        }

        private DateTime? GetGuihuanShijian(int jieyueTianshu, DateTime jieyueShijian, DateTime? zidingyiGuihuanShijian)
        {
            if (zidingyiGuihuanShijian != null)
            {
                return zidingyiGuihuanShijian;
            }
            else
            {
                return (jieyueShijian.AddDays(jieyueTianshu));
            }
        }

        private string GetOperating(long itemId,int userId)
        {
            string editButtonTmp = "";
            if (EDoc2Helper.IsUserInUserGroup(userId, WebConfig.CaiwuDanganGuanliyuan))
            {
                editButtonTmp =
                "<a name='JieyueButton' itemId='{itemId}' class='button02' style='cursor:pointer'>" +
                "<span class='l'></span>" +
                "<span class='m'>借阅</span>" +
                "<span class='r'></span></a>" +
                "<a name='CancelButton' itemId='{itemId}' class='button02' style='cursor:pointer'>" +
                "<span class='l'></span>" +
                "<span class='m'>取消</span>" +
                "<span class='r'></span></a>" +
                "<a name='EditButton' itemId='{itemId}' class='button02' style='cursor:pointer'>" +
                "<span class='l'></span>" +
                "<span class='m'>编辑</span>" +
                "<span class='r'></span></a>" ;
            }
            string editButton = editButtonTmp.Replace("{itemId}", FormatHelper.GetLongString(itemId));

            return editButton;
        }
    }
}