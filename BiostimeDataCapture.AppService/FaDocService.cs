using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using BiostimeDataCapture.DataService;
using BiostimeDataCapture.Domain;
using BiostimeDataCapture.Dto;
using BiostimeDataCapture.Dto._Common;

namespace BiostimeDataCapture.AppService
{
    public class FaDocService
    {
        private readonly FaDocRepository _faDocRepository;
        private readonly FaLendDocRepository _faLendDocRepository;

        public FaDocService()
        {
            _faDocRepository = new FaDocRepository();
            _faLendDocRepository = new FaLendDocRepository();
        }

        public IList<FaDocDto> GetPageFaDocs(
           PagingParameter paging, FaDocListParameter parameter, out long count)
        {
            return _faDocRepository.Find(paging, parameter, out count);
        }

        public IList<FaDocDto> GetPageFaLendDocs(
           PagingParameter paging, FaDocListParameter parameter, out long count)
        {
            return _faLendDocRepository.Find(paging, parameter, out count);
        }

        public FaArchive GetFdDocById(long id)
        {
            return _faDocRepository.FindById(id);
        }

        public void Save(FaArchive entity)
        {
            _faDocRepository.Save(entity);
        }
    }
}
