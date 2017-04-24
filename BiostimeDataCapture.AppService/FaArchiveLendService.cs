using System.Collections.Generic;
using BiostimeDataCapture.DataService;
using BiostimeDataCapture.Dto;
using BiostimeDataCapture.Dto._Common;

namespace BiostimeDataCapture.AppService
{
    public class FaArchiveLendService
    {
        private readonly FaArchiveLendRepository _faArchiveLendRepository;

        public FaArchiveLendService()
        {
            _faArchiveLendRepository = new FaArchiveLendRepository();
        }

        public IList<JieYueDocDto> GetPageFaLendDocs(
            PagingParameter paging, FaArchiveListParameter parameter, out long count)
        {
            return _faArchiveLendRepository.Find(paging, parameter, out count);
        }
    }
}