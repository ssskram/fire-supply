using System;
using System.Globalization;
using System.Collections.Generic;
using System.Linq;
using System.Net.Http;
using System.Net.Http.Headers;
using System.Security.Authentication;
using System.Security.Claims;
using System.Threading.Tasks;
using firesupply.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using MongoDB.Bson;
using MongoDB.Bson.Serialization;
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
            var filter =
                Builders<OrderEntity>.Filter.Eq ("submitted", "false") &
                Builders<OrderEntity>.Filter.Eq ("user", user);
            var cart = collection.Find (filter).FirstOrDefault ();
            if (cart != null) {
                return cart;
            } else {
                var emptyCart = newCart ();
                return emptyCart;
            }
        }

        private object newCart () {
            var collection = getCollection ();
            var user = _userManager.GetUserName (HttpContext.User);
            string[] splitEmail = user.Split('@');
            string lowerCase = splitEmail[0].Replace(".", " ");
            string fullName = new CultureInfo("en-US").TextInfo.ToTitleCase(lowerCase);
            Guid uuid = Guid.NewGuid ();
            OrderEntity itm = new OrderEntity () {
                id = uuid.ToString (),
                submitted = "false",
                user = user,
                userFullName = fullName,
                cartGenerated = DateTime.Now.ToString (),
                items = new List<cartItem> ()
            };
            collection.InsertOne (itm);
            return itm;
        }

        [HttpPost ("[action]")]
        public async Task addItem ([FromBody] cartItem model) {
            var collection = getCollection ();
            var user = _userManager.GetUserName (HttpContext.User);
            var filter =
                Builders<OrderEntity>.Filter.Eq ("user", user) &
                Builders<OrderEntity>.Filter.Eq ("id", model.cartID);

            // add item to list
            var update = Builders<OrderEntity>.Update.AddToSet ("items", model);
            await collection.FindOneAndUpdateAsync (filter, update);

            // if itemType not already present in orderType, add and reset value
            var itemType = model.family;
            var cart = collection.Find (filter).FirstOrDefault ();
            if (cart.orderType == null) {
                var add = Builders<OrderEntity>.Update
                    .Set ("orderType", itemType);
                await collection.FindOneAndUpdateAsync (filter, add);
            } else if (cart.orderType != null) {
                if (!cart.orderType.Contains (itemType)) {
                    var updatedType = cart.orderType + ", " + itemType;
                    var concat = Builders<OrderEntity>.Update
                        .Set ("orderType", updatedType);
                    await collection.FindOneAndUpdateAsync (filter, concat);
                }
            }
        }

        [HttpPost ("[action]")]
        public async Task deleteItem ([FromBody] cartItem model) {
            var collection = getCollection ();
            var user = _userManager.GetUserName (HttpContext.User);
            var filter =
                Builders<OrderEntity>.Filter.Eq ("user", user) &
                Builders<OrderEntity>.Filter.Eq ("id", model.cartID);
            var update = Builders<OrderEntity>.Update.PullFilter ("items",
                Builders<cartItem>.Filter.Eq ("obj", model.obj));
            await collection.FindOneAndUpdateAsync (filter, update);
        }

        [HttpPost ("[action]")]
        public async Task changeQuantity ([FromBody] cartItem model) {
            await deleteItem (model);
            await addItem (model);
        }

        [HttpPost ("[action]")]
        public async Task submitOrder ([FromBody] OrderEntity model) {
            var collection = getCollection ();
            var user = _userManager.GetUserName (HttpContext.User);
            var filter =
                Builders<OrderEntity>.Filter.Eq ("user", user) &
                Builders<OrderEntity>.Filter.Eq ("id", model.id);
            var update = Builders<OrderEntity>.Update
                .Set ("submitted", "true")
                .Set ("status", "Order Submitted")
                .Set ("orderSubmitted", DateTime.Now.ToString ())
                .Set ("house", model.house)
                .Set ("comments", model.comments)
                .Set ("emergency", model.emergency)
                .Set ("emergencyJustification", model.emergencyJustification)
                .Set ("narcanCases", model.narcanCases)
                .Set ("narcanExplanation", model.narcanExplanation);
            await collection.FindOneAndUpdateAsync (filter, update);
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
    }
}