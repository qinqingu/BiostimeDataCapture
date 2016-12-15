using BiostimeDataCapture.Domain;

namespace BiostimeDataCapture.DataService._RepositoryCore
{
    public abstract class AbstractRepository
    {
        protected AbstractRepository()
        {
            DataContext = DataContextFactory.CreateDataContext();
        }

        public BiostimeDataCaptureDataContext DataContext { get; set; }
    }
}
