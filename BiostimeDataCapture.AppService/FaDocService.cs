using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using BiostimeDataCapture.DataService;
using BiostimeDataCapture.Domain;
using BiostimeDataCapture.Domain.Enum;
using BiostimeDataCapture.Dto;
using BiostimeDataCapture.Dto._Common;

namespace BiostimeDataCapture.AppService
{
    public class FaDocService
    {
        private readonly FaDocRepository _faDocRepository;
        private readonly FaArchiveLendRepository _faLendDocRepository;
        private readonly FaJieyueDocRepository _faJieyueDocRepository;
        private readonly FaReturnDocRepository _faReturnDocRepository;
        private readonly FaCabinetNoRepository _faCabinetNoRepository;
        private readonly FaCompanyRepository _faCompanyRepository;
        private readonly FaReportNameRepository _faReportNameRepository;

        public FaDocService()
        {
            _faDocRepository = new FaDocRepository();
            _faLendDocRepository = new FaArchiveLendRepository();
            _faJieyueDocRepository = new FaJieyueDocRepository();
            _faReturnDocRepository = new FaReturnDocRepository();
            _faCabinetNoRepository = new FaCabinetNoRepository();
            _faCompanyRepository = new FaCompanyRepository();
            _faReportNameRepository = new FaReportNameRepository();
        }

        public IList<FaDocDto> GetFaDocs(FaArchiveListParameter parameter)
        {
            return _faDocRepository.Find(parameter);
        }

        public IList<FaDocDto> GetPageFaDocs(
           PagingParameter paging, FaArchiveListParameter parameter, out long count)
        {
            return _faDocRepository.Find(paging, parameter, out count);
        }

        public IList<JieYueDocDto> GetPageFaLendDocs(
           PagingParameter paging, FaArchiveListParameter parameter, out long count)
        {
            return _faLendDocRepository.Find(paging, parameter, out count);
        }

        public IList<JieYueDocDto> GetPageFaReturnDocs(
           PagingParameter paging, FaArchiveListParameter parameter, out long count)
        {
            return _faReturnDocRepository.Find(paging, parameter, out count);
        }

        public FaCabinetNo GetCabinetNo(long id)
        {
            return _faCabinetNoRepository.Find(id);
        }

        public void DelCabinetNo(FaCabinetNo entity)
        {
            _faCabinetNoRepository.Del(entity);
        }

        public IList<FaCabinetNo> GetCabinetNos(PagingParameter paging, string query, bool? enable, out long count)
        {
            return _faCabinetNoRepository.Find(paging, query,enable, out count);
        }

        public bool HasCabinetNo(string cabinetNo)
        {
            return _faCabinetNoRepository.HasCabinetNo(cabinetNo);
        }

        public void SaveCabinetNo(FaCabinetNo entity)
        {
            _faCabinetNoRepository.Save(entity);
        }

        public Jieyue GetJieyueById(long id)
        {
            return _faJieyueDocRepository.FindById(id);
        }

        public FaCompany GetCompany(long id)
        {
            return _faCompanyRepository.Find(id);
        }

        public IList<FaCompany> GetCompanines(string name)
        {
            return _faCompanyRepository.FindByName(name);
        }

        public IList<FaCompany> GetCompanines(PagingParameter paging, string query, bool? enable, out long count)
        {
            return _faCompanyRepository.Find(paging, query, enable, out count);
        }
        public bool HasCompanyName(string name)
        {
            return _faCompanyRepository.HasCompanyName(name);
        }

        public void SaveCompany(FaCompany entity)
        {
            _faCompanyRepository.Save(entity);
        }

        public FaReportName GetReportName(long id)
        {
            return _faReportNameRepository.Find(id);
        }

        public IList<FaReportName> GetReportNames(PagingParameter paging, string query, bool? enable, out long count)
        {
            return _faReportNameRepository.Find(paging, query, enable, out count);
        }

        public IList<FaReportName> GetReportNames(string name)
        {
            return _faReportNameRepository.FindByName(name);
        }

        public bool HasReportName(string name)
        {
            return _faReportNameRepository.HasReportName(name);
        }

        public void SaveReportName(FaReportName entity)
        {
            _faReportNameRepository.Save(entity);
        }
       
        public void UpdateJieyueZhuangtai(long id, JieyueZhuangtaiEnum zhuangtai)
        {
            _faJieyueDocRepository.UpdateJieyueZhuangtai(id,zhuangtai);
        }

        public void UpdateGuihuanZhuangtai(long id, JieyueZhuangtaiEnum zhuangtai,GuihuanZhuangtaiEnum guihuanZhuangtai)
        {
            _faJieyueDocRepository.UpdateGuihuanZhuangtai(id, zhuangtai,guihuanZhuangtai);
        }

        public void Save(Jieyue entity)
        {
            _faJieyueDocRepository.Save(entity);
        }

        public FaArchive GetFdDocById(long id)
        {
            return _faDocRepository.FindById(id);
        }

        public IList<FaContent> GetAllContents()
        {
            return _faDocRepository.FindContents();
        }

        public IList<FaCompany> GetAllCompanys()
        {
            return _faDocRepository.FindAllCompanys();
        }

        public IList<FaCompany> GetEffectiveCompanys()
        {
            return _faDocRepository.FindEffectiveCompanys();
        }

        public void Save(FaArchive entity)
        {
            _faDocRepository.Save(entity);
        }
    }
}
