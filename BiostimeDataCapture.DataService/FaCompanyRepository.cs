using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using BiostimeDataCapture.Common;
using BiostimeDataCapture.DataService._RepositoryCore;
using BiostimeDataCapture.Domain;
using BiostimeDataCapture.Dto;
using BiostimeDataCapture.Dto._Common;

namespace BiostimeDataCapture.DataService
{
    public class FaCompanyRepository : AbstractRepository
    {
        public FaCompany Find(long id)
        {
            return DataContext.FaCompanies.First(t => t.Id == id);
        }

        public IList<FaCompany> FindByName(string name)
        {
            if (!string.IsNullOrEmpty(name))
            {
                return DataContext.FaCompanies.Where(t => t.Name.Contains(name)).ToList();
            }
            return DataContext.FaCompanies.ToList();
        }

        public IList<FaCompany> Find(PagingParameter paging, string query, bool? enable, out long count)
        {
            IQueryable<FaCompany> queryable = !string.IsNullOrEmpty(query)
                                                    ? DataContext.FaCompanies.Where(t => t.Name.Contains(query) || t.Remark.Contains(query))
                                                    : DataContext.FaCompanies;

            if (enable != null)
            {
                queryable = queryable.Where(t => t.Enable == enable);
            }
            count = queryable.Count();
            if (count == 0)
            {
                return new List<FaCompany>();
            }
            int pageSize = paging.PageSize;
            int pageIndex = paging.PageIndex;
            pageIndex = pageIndex - 1;
            queryable = queryable.OrderByDescending(t => t.Name).ThenByDescending(t => t.LastUpdated)
                                 .Skip(pageSize * pageIndex).Take(pageSize);
            return queryable.ToList();
        }

        public bool HasCompanyName(string name)
        {
            return DataContext.FaCompanies.Any(t => t.Name == name);
        }

        public void Save(FaCompany entity)
        {
            entity.LastUpdated = DateTime.Now;
            if (entity.Id == 0)
            {
                entity.CreateTime = DateTime.Now;
                DataContext.FaCompanies.InsertOnSubmit(entity);
            }
            DataContext.SubmitChanges();
        }
    }
}
