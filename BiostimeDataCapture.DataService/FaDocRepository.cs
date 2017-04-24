using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using BiostimeDataCapture.DataService._RepositoryCore;
using BiostimeDataCapture.Domain;
using BiostimeDataCapture.Domain.Enum;
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

        public IList<FaDocDto> Find(FaArchiveListParameter parameter)
        {
            IQueryable<FaArchive> queryable = FindFdDocs(parameter);
            IList<FaArchive> faDocs = queryable.ToList();
            return GetFaDocDtos(faDocs);
        }

        public IList<FaDocDto> Find(
           PagingParameter paging, FaArchiveListParameter parameter, out long count)
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

        private IQueryable<FaArchive> FindFdDocs(FaArchiveListParameter parameter)
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
            if (parameter.YearBegin != null)
            {
                queryable = queryable.Where(t => t.Year >= parameter.YearBegin);
            }
            if (parameter.YearEnd != null)
            {
                queryable = queryable.Where(t => t.Year <= parameter.YearEnd);
            }
            if (parameter.MonthBegin != null)
            {
                queryable = queryable.Where(t => t.Month >= parameter.MonthBegin);
            }
            if (parameter.MonthEnd != null)
            {
                queryable = queryable.Where(t => t.Month <= parameter.MonthEnd);
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
            if (!string.IsNullOrEmpty(parameter.BaogaoMingcheng))
            {
                queryable = queryable.Where(t => t.BaogaoMingcheng.Contains(parameter.BaogaoMingcheng));
            }
            if (!string.IsNullOrEmpty(parameter.Hetonghao))
            {
                queryable = queryable.Where(t => t.HetongHao.Contains(parameter.Hetonghao));
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
                BaogaoMingcheng = faArchive.BaogaoMingcheng,
                Hetonghao = faArchive.HetongHao,
                Path = faArchive.Path,
                CabinetNo = faArchive.CabinetNo,
                Beizhu =faArchive.Beizhu
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

        public IList<FaContent> FindContents()
        {
            return DataContext.FaContents.ToList().Select(faContent => new FaContent
            {
                Id = faContent.Id,
                Name = faContent.Name,
                Value = faContent.Value
            }).ToList();
        }

        public IList<FaCompany> FindAllCompanys()
        {
            return DataContext.FaCompanies.ToList();
        }

        public IList<FaCompany> FindEffectiveCompanys()
        {
            return DataContext.FaCompanies.Where(t=>t.Enable==true).Select(faCompany => new FaCompany
            {
                Id = faCompany.Id,
                Name = faCompany.Name
            }).ToList();
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
