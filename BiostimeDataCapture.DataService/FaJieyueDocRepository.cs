using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using BiostimeDataCapture.DataService._RepositoryCore;
using BiostimeDataCapture.Domain;
using BiostimeDataCapture.Domain.Enum;

namespace BiostimeDataCapture.DataService
{
    public class FaJieyueDocRepository : AbstractRepository
    {

        public Jieyue FindById(long id)
        {
            return DataContext.Jieyues.First(t => t.Id == id);
        }

        public void UpdateJieyueZhuangtai(long id, JieyueZhuangtaiEnum zhuangtai)
        {
            Jieyue jieyue = FindById(id);
            jieyue.Jieyuezhuangtai = (int) zhuangtai;
            DataContext.SubmitChanges();
        }

        public void UpdateGuihuanZhuangtai(long id, JieyueZhuangtaiEnum zhuangtai,GuihuanZhuangtaiEnum guihuanZhuangtai)
        {
            Jieyue jieyue = FindById(id);
            jieyue.Jieyuezhuangtai = (int)zhuangtai;
            jieyue.Guihuanzhuangtai = (int) guihuanZhuangtai;
            jieyue.GuihuanShijian = DateTime.Now;
            DataContext.SubmitChanges();
        }

        public void Save(Jieyue entity)
        {
            if (entity.Id == 0)
            {
                DataContext.Jieyues.InsertOnSubmit(entity);
            }
            DataContext.SubmitChanges();
        }
    }
}
