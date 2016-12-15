using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using BiostimeDataCapture.DataService._RepositoryCore;
using BiostimeDataCapture.Domain;
using BiostimeDataCapture.Dto;
using BiostimeDataCapture.Dto._Common;

namespace BiostimeDataCapture.DataService
{
    public class FaDocRepository : AbstractRepository
    {

        public FaArchive FindById(long id)
        {
            return DataContext.FaArchives.Single(t => t.Id == id);
        }

        public IList<FaDocDto> Find(
           PagingParameter paging, FaDocListParameter parameter, out long count)
        {
            IQueryable<FaArchive> queryable = FindFdDocs(parameter);

            count = queryable.Count();
            if (count == 0)
            {
                return new List<FaDocDto>();
            }
            int pageSize = paging.PageSize;
            int pageIndex = paging.PageIndex;
            pageIndex = pageIndex - 1;
            queryable = queryable.OrderBy(t => t.Id).Skip(pageSize * pageIndex).Take(pageSize);
            IList<FaArchive> faDocs = queryable.ToList();
            return GetFaDocDtos(faDocs);
        }

        private IQueryable<FaArchive> FindFdDocs(FaDocListParameter parameter)
        {
            IQueryable<FaArchive> queryable = !string.IsNullOrEmpty(parameter.Query)
                                              ? DataContext.FaArchives.Where(GetPredicate(parameter.Query))
                                              : DataContext.FaArchives;
            if (!string.IsNullOrEmpty(parameter.Content))
            {
                queryable = queryable.Where(t => t.Content.Contains(parameter.Content));
            }
            if (!string.IsNullOrEmpty(parameter.Company))
            {
                queryable = queryable.Where(t => t.Company.Contains(parameter.Company));
            }
            if (parameter.Year != null)
            {
                queryable = queryable.Where(t => t.Year == parameter.Year);
            }
            if (parameter.Month != null)
            {
                queryable = queryable.Where(t => t.Month == parameter.Month);
            }
            if (!string.IsNullOrEmpty(parameter.VoucherWord))
            {
                queryable = queryable.Where(t => t.VoucherWord.Contains(parameter.VoucherWord));
            }
            if (parameter.VoucherNumber != null)
            {
                queryable = queryable.Where(t => t.VoucherNumber == parameter.VoucherNumber);
            }
            if (!string.IsNullOrEmpty(parameter.VoucherNo))
            {
                queryable = queryable.Where(t => t.VoucherNo.Contains(parameter.VoucherNo));
            }
            if (parameter.VoucherNos != null)
            {
                queryable = queryable.Where(t => t.VoucherNos == parameter.VoucherNos);
            }
            if (!string.IsNullOrEmpty(parameter.Path))
            {
                queryable = queryable.Where(t => t.Path.Contains(parameter.Path));
            }
            if (!string.IsNullOrEmpty(parameter.CabinetNo))
            {
                queryable = queryable.Where(t => t.CabinetNo.Contains(parameter.CabinetNo));
            }
            return queryable;
        }

        private IList<FaDocDto> GetFaDocDtos(IList<FaArchive> faArchives)
        {
            IList<FaDocDto> list = new List<FaDocDto>();
            foreach (FaArchive faArchive in faArchives)
            {
                FaDocDto item = ConvertFaDocDto(faArchive);
                list.Add(item);
            }
            return list;
        }

        private FaDocDto ConvertFaDocDto(FaArchive faArchive)
        {
            var item = new FaDocDto
            {
                Id = faArchive.Id,
                Content = faArchive.Content,
                Company = faArchive.Company,
                Year = faArchive.Year,
                Month = faArchive.Month,
                VoucherWord = faArchive.VoucherWord,
                VoucherNumber = faArchive.VoucherNumber,
                VoucherNo = faArchive.VoucherNo,
                VoucherNos = faArchive.VoucherNos,
                Path = faArchive.Path,
                CabinetNo = faArchive.CabinetNo
            };
            return item;
        }

        private Expression<Func<FaArchive, bool>> GetPredicate(string query)
        {
            return t => t.Content.Contains(query)
                        || t.Company.Contains(query)
                        || t.VoucherWord.Contains(query)
                        || t.Path.Contains(query)
                        || t.CabinetNo.Contains(query);
        }

        public void Save(FaArchive entity)
        {
            entity.ModifiedTime = DateTime.Now;
            if (entity.Id == 0)
            {
                entity.CreateTime = DateTime.Now;
                DataContext.FaArchives.InsertOnSubmit(entity);
            }
            DataContext.SubmitChanges();
        }
    }
}
