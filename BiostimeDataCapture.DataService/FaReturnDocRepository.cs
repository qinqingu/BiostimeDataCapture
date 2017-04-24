using System;
using System.Collections.Generic;
using System.Data.Linq;
using System.Linq;
using System.Linq.Expressions;
using BiostimeDataCapture.DataService._RepositoryCore;
using BiostimeDataCapture.Domain;
using BiostimeDataCapture.Domain.Enum;
using BiostimeDataCapture.Dto;
using BiostimeDataCapture.Dto._Common;

namespace BiostimeDataCapture.DataService
{
    public class FaReturnDocRepository: AbstractRepository
    {
        public IList<JieYueDocDto> Find(
           PagingParameter paging, FaArchiveListParameter parameter, out long count)
        { 
             IQueryable<Jieyue> queryable = FindFdDocs(parameter);

            count = queryable.Count();
            if (count == 0)
            {
                return new List<JieYueDocDto>();
            }
            int pageSize = paging.PageSize;
            int pageIndex = paging.PageIndex;
            pageIndex = pageIndex - 1;
            queryable = queryable.OrderBy(t => t.Id).Skip(pageSize * pageIndex).Take(pageSize);
            IList<Jieyue> faDocs = queryable.ToList();
            return GetFaLendDocs(faDocs);
        }

        private IQueryable<Jieyue> FindFdDocs(FaArchiveListParameter parameter)
        {
            IQueryable<Jieyue> queryable = !string.IsNullOrEmpty(parameter.Query)
                                               ? DataContext.Jieyues.Where(t => t.Jieyuezhuangtai == (int)JieyueZhuangtaiEnum.YiJieyue && t.Guihuanzhuangtai==(int)GuihuanZhuangtaiEnum.WeiGuihuan)
                                               .Where(GetPredicate(parameter.Query))
                                               : DataContext.Jieyues.Where(t => t.Jieyuezhuangtai == (int)JieyueZhuangtaiEnum.YiJieyue && t.Guihuanzhuangtai == (int)GuihuanZhuangtaiEnum.WeiGuihuan);
            if (!string.IsNullOrEmpty(parameter.Content))
            {
                queryable = queryable.Where(t => t.FaArchive.Content.Contains(parameter.Content));
            }
            if (!string.IsNullOrEmpty(parameter.Company))
            {
                queryable = queryable.Where(t => t.FaArchive.Company.Contains(parameter.Company));
            }
            if (parameter.YearBegin != null)
            {
                queryable = queryable.Where(t => t.FaArchive.Year >= parameter.YearBegin);
            }
            if (parameter.YearEnd != null)
            {
                queryable = queryable.Where(t => t.FaArchive.Year <= parameter.YearEnd);
            }
            if (parameter.MonthBegin != null)
            {
                queryable = queryable.Where(t => t.FaArchive.Month >= parameter.MonthBegin);
            }
            if (parameter.MonthEnd != null)
            {
                queryable = queryable.Where(t => t.FaArchive.Month <= parameter.MonthEnd);
            }
            if (!string.IsNullOrEmpty(parameter.VoucherWord))
            {
                queryable = queryable.Where(t => t.FaArchive.VoucherWord.Contains(parameter.VoucherWord));
            }
            if (parameter.VoucherNumber != null)
            {
                queryable = queryable.Where(t => t.FaArchive.VoucherNumber == parameter.VoucherNumber);
            }
            if (!string.IsNullOrEmpty(parameter.VoucherNo))
            {
                queryable = queryable.Where(t => t.FaArchive.VoucherNo.Contains(parameter.VoucherNo));
            }
            if (parameter.VoucherNos != null)
            {
                queryable = queryable.Where(t => t.FaArchive.VoucherNos == parameter.VoucherNos);
            }
            //if (!string.IsNullOrEmpty(parameter.Path))
            //{
            //    queryable = queryable.Where(t => t.FaArchive.Path.Contains(parameter.Path));
            //}
            //if (!string.IsNullOrEmpty(parameter.CabinetNo))
            //{
            //    queryable = queryable.Where(t => t.FaArchive.CabinetNo.Contains(parameter.CabinetNo));
            //}
            if (parameter.JieyueShijianStart != null)
            {
                queryable = queryable.Where(t => t.JieyueShijian >= parameter.JieyueShijianStart);
            }
            if (parameter.JieyueShijianEnd != null)
            {
                queryable = queryable.Where(t => t.JieyueShijian <= parameter.JieyueShijianEnd);
            }
            return queryable;
        }

        private Expression<Func<Jieyue, bool>> GetPredicate(string query)
        {
            return t => t.FaArchive.Content.Contains(query)
                        || t.FaArchive.Company.Contains(query)
                        || t.FaArchive.VoucherWord.Contains(query)
                        || t.FaArchive.Path.Contains(query)
                        || t.FaArchive.CabinetNo.Contains(query);
        }
        private IList<JieYueDocDto> GetFaLendDocs(IList<Jieyue> entities)
        {
            IList<JieYueDocDto> list = new List<JieYueDocDto>();
            foreach (Jieyue entity in entities)
            {
                JieYueDocDto item = ConvertJieYueDocDto(entity);
                list.Add(item);
            }
            return list;
        }

        private JieYueDocDto ConvertJieYueDocDto(Jieyue entity)
        {
            var item = new JieYueDocDto
            {
                Id = entity.Id,
                Content = entity.FaArchive.Content,
                Company = entity.FaArchive.Company,
                Year = entity.FaArchive.Year,
                Month = entity.FaArchive.Month,
                VoucherWord = entity.FaArchive.VoucherWord,
                VoucherNumber = entity.FaArchive.VoucherNumber,
                VoucherNo = entity.FaArchive.VoucherNo,
                VoucherNos = entity.FaArchive.VoucherNos,
                Path = entity.FaArchive.Path,
                CabinetNo = entity.FaArchive.CabinetNo,
                HetongHao = entity.FaArchive.HetongHao,
                BaogaoMingcheng = entity.FaArchive.BaogaoMingcheng,
                ShenQingrenAccount = entity.ShenQingRenAccount,
                ShenQingrenName = entity.ShenQingRenName,
                JieyueTianshu = entity.JieyueTianshu,
                JieyueShijian = entity.JieyueShijian,
                ZidingyiGuihuanShijian = entity.ZidingyiGuihuanShijian
            };
            return item;
        }
    }
}
