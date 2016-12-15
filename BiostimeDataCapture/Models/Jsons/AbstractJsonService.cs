using Newtonsoft.Json;
using Newtonsoft.Json.Serialization;

namespace BiostimeDataCapture.Models.Jsons
{
    public class AbstractJsonService
    {
        private readonly JsonSerializerSettings _jsonSerializerSettings;

        public AbstractJsonService()
        {
            _jsonSerializerSettings = new JsonSerializerSettings
                {
                    ContractResolver = new CamelCasePropertyNamesContractResolver()
                };
        }

        protected string Serialize(object value)
        {
            string json = JsonConvert.SerializeObject(value, _jsonSerializerSettings);
            return json;
        }

        protected T Deserialize<T>(string json)
        {
            var value = JsonConvert.DeserializeObject<T>(json, _jsonSerializerSettings);

            return value;
        }
    }
}