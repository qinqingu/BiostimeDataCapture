using System;
using System.Collections.Generic;
using System.Linq;
using BiostimeDataCapture.DataService._RepositoryCore;
using BiostimeDataCapture.Domain;
using BiostimeDataCapture.Dto._Common;

namespace BiostimeDataCapture.DataService
{
    public class FaCabinetNoRepository : AbstractRepository
    {
        public FaCabinetNo Find(long id)
        {
            return DataContext.FaCabinetNos.First(t => t.Id == id);
        }

        public bool HasCabinetNo(string cabinetNo)
        {
            return DataContext.FaCabinetNos.Any(t => t.CabinetNo == cabinetNo);
        }

        public IList<FaCabinetNo> Find(PagingParameter paging, string query, bool? enable, out long count)
        {
            IQueryable<FaCabinetNo> queryable = !string.IsNullOrEmpty(query)
                                                    ? DataContext.FaCabinetNos.Where(t => t.CabinetNo.Contains(query) || t.Path.Contains(query))
                                                    : DataContext.FaCabinetNos;
            if (enable != null)
            {
                queryable = queryable.Where(t => t.Enable == enable);
            }
            count = queryable.Count();
            if (count == 0)
            {
                return new List<FaCabinetNo>();
            }
            int pageSize = paging.PageSize;
            int pageIndex = paging.PageIndex;
            pageIndex = pageIndex - 1;
            queryable = queryable.OrderByDescending(t => t.Enable).ThenByDescending(t => t.LastUpdated)
                                 .Skip(pageSize*pageIndex).Take(pageSize);
            return queryable.ToList();
        }

        public void Save(FaCabinetNo entity)
        {
            entity.LastUpdated = DateTime.Now;
            if (entity.Id == 0)
            {
                entity.CreateTime = DateTime.Now;
                DataContext.FaCabinetNos.InsertOnSubmit(entity);
            }
            DataContext.SubmitChanges();
        }

        public void Del(FaCabinetNo entity)
        {
            DataContext.FaCabinetNos.DeleteOnSubmit(entity);
            DataContext.SubmitChanges();
        }
    }
}