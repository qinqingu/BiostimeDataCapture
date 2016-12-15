using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Text;
using BiostimeDataCapture.DataService._RepositoryCore;
using BiostimeDataCapture.Domain;
using BiostimeDataCapture.Domain.Enum;
using BiostimeDataCapture.Dto;
using BiostimeDataCapture.Dto._Common;

namespace BiostimeDataCapture.DataService
{
    public class FaLendDocRepository : AbstractRepository
    {
        public IList<FaDocDto> Find(
           PagingParameter paging, FaDocListParameter parameter, out long count)
        {
            //IList<FaDocDto> result = (from t in DataContext.Jieyues
            //                          join t2 in DataContext.FaArchives on t.ArchiveId equals t2.Id into tTemp
            //                          from t3 in tTemp.DefaultIfEmpty()
            //                          where 
            //                          select new FaDocDto
            //                              {
                                              

            //                              }).ToList();
            IQueryable<Jieyue> queryable = FindFdDocs(parameter);

            count = queryable.Count();
            if (count == 0)
            {
                return new List<FaDocDto>();
            }
            int pageSize = paging.PageSize;
            int pageIndex = paging.PageIndex;
            pageIndex = pageIndex - 1;
            queryable = queryable.OrderBy(t => t.Id).Skip(pageSize * pageIndex).Take(pageSize);
            IList<Jieyue> faDocs = queryable.ToList();
            return GetFaLendDocs(faDocs);
        }

        private IQueryable<Jieyue> FindFdDocs(FaDocListParameter parameter)
        {
            IQueryable<Jieyue> queryable = !string.IsNullOrEmpty(parameter.Query)
                                               ? DataContext.Jieyues.Where(t => t.Jieyuezhuangtai == (int)JieyueZhuangtaiEnum.WeiJieyue && t.Guihuanzhuangtai==(int)GuihuanZhuangtaiEnum.WeiGuihuan)
                                               .Where(GetPredicate(parameter.Query))
                                               : DataContext.Jieyues.Where(t => t.Jieyuezhuangtai == (int)JieyueZhuangtaiEnum.WeiJieyue && t.Guihuanzhuangtai==(int)GuihuanZhuangtaiEnum.WeiGuihuan);
            if (!string.IsNullOrEmpty(parameter.Content))
            {
                queryable = queryable.Where(t => t.FaArchive.Content.Contains(parameter.Content));
            }
            if (!string.IsNullOrEmpty(parameter.Company))
            {
                queryable = queryable.Where(t => t.FaArchive.Company.Contains(parameter.Company));
            }
            if (parameter.Year != null)
            {
                queryable = queryable.Where(t => t.FaArchive.Year == parameter.Year);
            }
            if (parameter.Month != null)
            {
                queryable = queryable.Where(t => t.FaArchive.Month == parameter.Month);
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
            if (!string.IsNullOrEmpty(parameter.Path))
            {
                queryable = queryable.Where(t => t.FaArchive.Path.Contains(parameter.Path));
            }
            if (!string.IsNullOrEmpty(parameter.CabinetNo))
            {
                queryable = queryable.Where(t => t.FaArchive.CabinetNo.Contains(parameter.CabinetNo));
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
        private IList<FaDocDto> GetFaLendDocs(IList<Jieyue> entities)
        {
            IList<FaDocDto> list = new List<FaDocDto>();
            foreach (Jieyue entity in entities)
            {
                FaDocDto item = ConvertFaDocDto(entity);
                list.Add(item);
            }
            return list;
        }

        private FaDocDto ConvertFaDocDto(Jieyue entity)
        {
            var item = new FaDocDto
            {
                Id = entity.FaArchive.Id,
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
                JieyueTianshu = entity.JieyueTianshu,
                JieyueShijian = entity.JieyueShijian
            };
            return item;
        }
    }
}
