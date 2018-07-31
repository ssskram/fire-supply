using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.Http;
using System.Net.Http.Headers;
using System.Security.Authentication;
using System.Threading.Tasks;
using firesupply.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;
using MongoDB.Bson.Serialization.IdGenerators;
using MongoDB.Driver;
using MongoDB.Driver.Core;
using Newtonsoft.Json;
using Newtonsoft.Json.Linq;

namespace firesupply.Controllers {

    [Authorize]
    [Route ("api/[controller]")]
    public class cart : Controller {

        private readonly UserManager<ApplicationUser> _userManager;
        public cart (UserManager<ApplicationUser> userManager) {
            _userManager = userManager;
        }

        HttpClient client = new HttpClient ();

        [HttpGet ("[action]")]
        public object load () {
            var collection = getCollection ();
            var user = _userManager.GetUserName (HttpContext.User);
            var filter = Builders<OrderEntity>.Filter.Eq ("submitted", "false") & Builders<OrderEntity>.Filter.Eq ("user", user);
            var cart = collection.Find (filter).FirstOrDefault ();
            if (cart != null) {
                return cart;
            } else {
                var id = newCart ();
                return id;
            }
        }

        private string newCart () {
            var collection = getCollection ();
            var user = _userManager.GetUserName (HttpContext.User);
            Guid uuid = Guid.NewGuid ();
            OrderEntity crt = new OrderEntity () {
                id = uuid.ToString (),
                user = user,
                submitted = "false"
            };
            collection.InsertOne (crt);
            return uuid.ToString ();
        }

        [HttpPost ("[action]")]
        public async Task put ([FromBody] OrderEntity model) {
            var collection = getCollection ();
            var filter = Builders<OrderEntity>.Filter.Eq ("Id", model.id);
            var update = Builders<OrderEntity>.Update.Set ("Items", model.items);
            var result = await collection.UpdateOneAsync (filter, update);
        }

        [HttpPost ("[action]")]
        public async Task submit ([FromBody] OrderEntity model) {
            var collection = getCollection ();
            var filter = Builders<OrderEntity>.Filter.Eq ("Id", model.id);
            var result = await collection.FindOneAndReplaceAsync (filter, model);
        }

        private IMongoCollection<OrderEntity> getCollection () {
            var user = _userManager.GetUserName (HttpContext.User);
            var connectionString = Environment.GetEnvironmentVariable ("mongoURI");
            MongoClientSettings settings = MongoClientSettings.FromUrl (
                new MongoUrl (connectionString)
            );
            settings.SslSettings =
                new SslSettings () { EnabledSslProtocols = SslProtocols.Tls12 };
            var mongoClient = new MongoClient (settings);
            var database = mongoClient.GetDatabase ("firesupply");
            var collection = database.GetCollection<OrderEntity> ("orders");
            return collection;
        }
    }
}