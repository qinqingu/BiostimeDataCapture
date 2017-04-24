using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using BiostimeDataCapture.DataService._RepositoryCore;
using BiostimeDataCapture.Domain;
using BiostimeDataCapture.Dto._Common;

namespace BiostimeDataCapture.DataService
{
    public class FaReportNameRepository : AbstractRepository
    {
        public FaReportName Find(long id)
        {
            return DataContext.FaReportNames.First(t => t.Id == id);
        }

        public IList<FaReportName> FindByName(string name)
        {
            if (!string.IsNullOrEmpty(name))
            {
                return DataContext.FaReportNames.Where(t => t.Name.Contains(name)).ToList();
            }
            return DataContext.FaReportNames.ToList();
        }

        public IList<FaReportName> Find(PagingParameter paging, string query, bool? enable, out long count)
        {
            IQueryable<FaReportName> queryable = !string.IsNullOrEmpty(query)
                                                    ? DataContext.FaReportNames.Where(t => t.Name.Contains(query) || t.Remark.Contains(query))
                                                    : DataContext.FaReportNames;

            if (enable != null)
            {
                queryable = queryable.Where(t => t.Enable == enable);
            }
            count = queryable.Count();
            if (count == 0)
            {
                return new List<FaReportName>();
            }
            int pageSize = paging.PageSize;
            int pageIndex = paging.PageIndex;
            pageIndex = pageIndex - 1;
            queryable = queryable.OrderByDescending(t => t.Name).ThenByDescending(t => t.LastUpdated)
                                 .Skip(pageSize * pageIndex).Take(pageSize);
            return queryable.ToList();
        }

        public bool HasReportName(string name)
        {
            return DataContext.FaReportNames.Any(t => t.Name == name);
        }

        public void Save(FaReportName entity)
        {
            entity.LastUpdated = DateTime.Now;
            if (entity.Id == 0)
            {
                entity.CreateTime = DateTime.Now;
                DataContext.FaReportNames.InsertOnSubmit(entity);
            }
            DataContext.SubmitChanges();
        }
    }
}
