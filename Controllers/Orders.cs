using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.Http;
using System.Net.Http.Headers;
using System.Security.Authentication;
using System.Threading.Tasks;
using firesupply.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using MongoDB.Bson;
using MongoDB.Bson.Serialization;
using MongoDB.Bson.Serialization.Attributes;
using MongoDB.Bson.Serialization.IdGenerators;
using MongoDB.Driver;
using Newtonsoft.Json;
using Newtonsoft.Json.Linq;

namespace firesupply.Controllers {

    [Authorize]
    [Route ("api/[controller]")]
    public class orders : Controller {
        HttpClient client = new HttpClient ();

        // initialize enmpty list of orders
        List<OrderEntity> AllOrders = new List<OrderEntity> ();

        [HttpGet ("[action]")]
        public async Task<object> all () {
            // get orders from mongo and add to list
            var collection = getCollection ();
            var list = collection.Find (new BsonDocument ()).ToList<OrderEntity> ();
            var onlySubmitted = list.Where (order => order.submitted == "true");
            AllOrders.AddRange (onlySubmitted);

            // get orders from sharepoint and add to list
            await getSPOrders ();

            // return full list of sorted orders
            AllOrders.ForEach (item => DateTime.Parse (item.orderSubmitted));
            return (AllOrders);
        }
        private IMongoCollection<OrderEntity> getCollection () {
            var connectionString = Environment.GetEnvironmentVariable ("mongoURI");
            MongoClientSettings settings = MongoClientSettings.FromUrl (
                new MongoUrl (connectionString)
            );
            settings.SslSettings =
                new SslSettings () { EnabledSslProtocols = SslProtocols.Tls12 };
            var mongoClient = new MongoClient (settings);
            var database = mongoClient.GetDatabase ("firesupply");
            var collection = database.GetCollection<OrderEntity> ("supplyOrders");
            return collection;
        }

        public async Task getSPOrders () {
            await refreshtoken ();
            var token = refreshtoken ().Result;
            string url = "https://cityofpittsburgh.sharepoint.com/sites/Fire/_api/web/lists/GetByTitle('Supply Requests')/items?$top=5000";
            client.DefaultRequestHeaders.Clear ();
            client.DefaultRequestHeaders.Add ("Accept", "application/json");
            client.DefaultRequestHeaders.Authorization =
                new AuthenticationHeaderValue ("Bearer", token);
            string items = await client.GetStringAsync (url);
            dynamic parsedItems = JObject.Parse (items) ["value"];
            foreach (var item in parsedItems) {
                var link = "https://cityofpittsburgh.sharepoint.com/sites/Fire/Lists/Asset%20Request/Item/editifs.aspx?List=1467ff73-fda0-4f99-8705-6242222e5f43&ID=" + item.ID;

                // handle houses
                var modifiedHouse = string.Empty;
                var house = item.House.ToString ();
                if (house.Contains ("House")) {
                    house = house.Replace ("House", "Firehouse");
                    modifiedHouse = house;
                } else {
                    modifiedHouse = house;
                }
                if (modifiedHouse == "Firehouse 3") {
                    modifiedHouse = modifiedHouse.Replace ("3", "03");
                }
                if (modifiedHouse == "Firehouse 4") {
                    modifiedHouse = modifiedHouse.Replace ("4", "04");
                }
                if (modifiedHouse == "Firehouse 6") {
                    modifiedHouse = modifiedHouse.Replace ("6", "06");
                }
                if (modifiedHouse == "Firehouse 7") {
                    modifiedHouse = modifiedHouse.Replace ("7", "07");
                }
                if (modifiedHouse == "Firehouse 8") {
                    modifiedHouse = modifiedHouse.Replace ("8", "08");
                }
                if (modifiedHouse == "Firehouse 10") {
                    modifiedHouse = modifiedHouse.Replace ("10", "10 Medic 5");
                }
                if (modifiedHouse == "Firehouse 12") {
                    modifiedHouse = modifiedHouse.Replace ("12", "12 Medic 7");
                }
                if (modifiedHouse == "Firehouse 20") {
                    modifiedHouse = modifiedHouse.Replace ("20", "20 Medic 12");
                }
                if (modifiedHouse == "Firehouse 33") {
                    modifiedHouse = modifiedHouse.Replace ("33", "33 Truck");
                }
                var email = item.SubmittedBy.ToString ().Replace (" ", ".") + "@pittsburghpa.gov";

                // handle dates
                DateTime createdDate = item.Created;
                DateTime createdConverted = createdDate.AddHours (-4);
                string finalCreatedDate = createdConverted.ToString ();

                DateTime modifiedDate = item.Modified;
                DateTime modifiedConverted = modifiedDate.AddHours (-4);
                string finalModifiedDate = modifiedConverted.ToString ();

                OrderEntity itm = new OrderEntity () {
                    id = item.ID,
                    submitted = "true",
                    orderSubmitted = finalCreatedDate,
                    user = email.ToLower (),
                    userFullName = item.SubmittedBy,
                    isOld = true,
                    house = modifiedHouse,
                    status = item.Status,
                    orderType = item.RequestType,
                    link = link,
                    emergency = item.Emergency,
                    emergencyJustification = item.EmergencyExplanation,
                    lastModified = finalModifiedDate,
                    supplyComments = item.SupplyNotes,
                    comments = item.AdditionalComments
                };
                AllOrders.Add (itm);
            }
        }

        private async Task<string> refreshtoken () {
            var MSurl = "https://accounts.accesscontrol.windows.net/f5f47917-c904-4368-9120-d327cf175591/tokens/OAuth/2";
            var clientid = Environment.GetEnvironmentVariable ("SPClientID");
            var clientsecret = Environment.GetEnvironmentVariable ("SPClientSecret");
            var refreshtoken = Environment.GetEnvironmentVariable ("refreshtoken");
            var redirecturi = Environment.GetEnvironmentVariable ("redirecturi");
            var SPresource = Environment.GetEnvironmentVariable ("spresourceid");
            client.DefaultRequestHeaders.Clear ();
            client.DefaultRequestHeaders.Add ("Accept", "application/x-www-form-urlencoded");
            client.DefaultRequestHeaders.Add ("X-HTTP-Method", "POST");

            var json =
                String.Format ("grant_type=refresh_token&client_id={0}&client_secret={1}&refresh_token={2}&redirect_uri={3}&resource={4}",
                    clientid, // 0
                    clientsecret, // 1
                    refreshtoken, // 2
                    redirecturi, // 3
                    SPresource); // 4

            client.DefaultRequestHeaders.Add ("ContentLength", json.Length.ToString ());
            StringContent strContent = new StringContent (json);
            strContent.Headers.ContentType = MediaTypeHeaderValue.Parse ("application/x-www-form-urlencoded");
            HttpResponseMessage response = client.PostAsync (MSurl, strContent).Result;
            response.EnsureSuccessStatusCode ();
            var content = await response.Content.ReadAsStringAsync ();
            dynamic results = JsonConvert.DeserializeObject<dynamic> (content);
            string token = results.access_token.ToString ();
            return token;
        }
    }
}