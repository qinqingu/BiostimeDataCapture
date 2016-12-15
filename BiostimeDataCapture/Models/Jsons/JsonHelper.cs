using Newtonsoft.Json;

namespace BiostimeDataCapture.Models.Jsons
{
    public class JsonHelper
    {
        public static string Serialize(object value)
        {
            JsonSerializerSettings jsonSerializerSettings = NewJsonSerializerSettings();
            string json = JsonConvert.SerializeObject(value, jsonSerializerSettings);

            return json;
        }

        public static T Deserialize<T>(string json)
        {
            JsonSerializerSettings jsonSerializerSettings = NewJsonSerializerSettings();
            var value = JsonConvert.DeserializeObject<T>(json, jsonSerializerSettings);

            return value;
        }

        public static JsonSerializerSettings NewJsonSerializerSettings()
        {
            //return new JsonSerializerSettings
            //    {
            //        ContractResolver = new CamelCasePropertyNamesContractResolver()
            //    };
            return new JsonSerializerSettings();
        }
    }
}