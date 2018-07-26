using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.Http;
using System.Net.Http.Headers;
using System.Threading.Tasks;
using firesupply.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Azure;
using Microsoft.WindowsAzure.Storage;
using Microsoft.WindowsAzure.Storage.Table;
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

        public class OrderEntity : TableEntity {
            public OrderEntity (string submitted, string id) {
                this.PartitionKey = submitted;
                this.RowKey = id;
            }
            public OrderEntity () { }

            public string submitted { get; set; }
            public string user { get; set; }
            public string house { get; set; }
            public string comments { get; set; }
            public string emergency { get; set; }
            public string emergencyJustification { get; set; }
            public string narcanCases { get; set; }
            public string narcanExplanation { get; set; }
            public string supplyComments { get; set; }
            public string status { get; set; }
            public string items { get; set; }
        }

        HttpClient client = new HttpClient ();

        [HttpGet ("[action]")]
        public async Task load () {
            await Task.Delay (1);
            var user = _userManager.GetUserName (HttpContext.User);
            var table = Environment.GetEnvironmentVariable ("azureTableName");
            var key = Environment.GetEnvironmentVariable ("azureTableKey");
            var credentials = new Microsoft.WindowsAzure.Storage.Auth.StorageCredentials (table, key);
            var storageAccount = new CloudStorageAccount (credentials, "core.usgovcloudapi.net", useHttps : true);
            CloudTableClient tableClient = storageAccount.CreateCloudTableClient ();
            CloudTable orders = tableClient.GetTableReference ("Orders");

            var query = new TableQuery<OrderEntity> () {
                SelectColumns = new List<string> { "RowKey", "Description" }
            };

            var cart = await orders.ExecuteQuerySegmentedAsync<OrderEntity>(query, null);

            if (cart != null) {

            } else {
                await newCart ();
            }
        }

        public async Task<string> newCart () {
            var user = _userManager.GetUserName (HttpContext.User);
            var table = Environment.GetEnvironmentVariable ("azureTableName");
            var key = Environment.GetEnvironmentVariable ("azureTableKey");
            Guid id = Guid.NewGuid ();
            OrderEntity order = new OrderEntity ("false", id.ToString ());
            order.user = user;
            var credentials = new Microsoft.WindowsAzure.Storage.Auth.StorageCredentials (table, key);
            var storageAccount = new CloudStorageAccount (credentials, "core.usgovcloudapi.net", useHttps : true);
            CloudTableClient tableClient = storageAccount.CreateCloudTableClient ();
            CloudTable orders = tableClient.GetTableReference ("Orders");
            TableOperation insertOperation = TableOperation.Insert (order);
            await orders.ExecuteAsync (insertOperation);
            return id.ToString ();
        }

        public async Task put (string id) {
            // handle full object here from client

            var user = _userManager.GetUserName (HttpContext.User);
            var table = Environment.GetEnvironmentVariable ("azureTableName");
            var key = Environment.GetEnvironmentVariable ("azureTableKey");
            string submitted = "false";
            var credentials = new Microsoft.WindowsAzure.Storage.Auth.StorageCredentials (table, key);
            var storageAccount = new CloudStorageAccount (credentials, "core.usgovcloudapi.net", useHttps : true);
            CloudTableClient tableClient = storageAccount.CreateCloudTableClient ();
            CloudTable orders = tableClient.GetTableReference ("Orders");

            // create a retrieve operation that takes an order entity.
            TableOperation retrieveOperation = TableOperation.Retrieve<OrderEntity> (submitted, id);

            // get it
            TableResult retrievedResult = await orders.ExecuteAsync (retrieveOperation);

            // handle result
            OrderEntity updateEntity = (OrderEntity) retrievedResult.Result;

            // modify the result
            updateEntity.items = "425-555-0105";

            // create the new order entity operation
            TableOperation updateOperation = TableOperation.Replace (updateEntity);

            // execute it
            await orders.ExecuteAsync (updateOperation);
        }

        public async Task submit (string id) {
            // handle full object here from client

            var user = _userManager.GetUserName (HttpContext.User);
            var table = Environment.GetEnvironmentVariable ("azureTableName");
            var key = Environment.GetEnvironmentVariable ("azureTableKey");
            string submitted = "true";
            var credentials = new Microsoft.WindowsAzure.Storage.Auth.StorageCredentials (table, key);
            var storageAccount = new CloudStorageAccount (credentials, "core.usgovcloudapi.net", useHttps : true);
            CloudTableClient tableClient = storageAccount.CreateCloudTableClient ();
            CloudTable orders = tableClient.GetTableReference ("Orders");

            // create a retrieve operation that takes an order entity.
            TableOperation retrieveOperation = TableOperation.Retrieve<OrderEntity> (submitted, id);

            // get it
            TableResult retrievedResult = await orders.ExecuteAsync (retrieveOperation);

            // handle result
            OrderEntity updateEntity = (OrderEntity) retrievedResult.Result;

            // modify the result
            updateEntity.items = "425-555-0105";

            // create the new order entity operation
            TableOperation updateOperation = TableOperation.Replace (updateEntity);

            // execute it
            await orders.ExecuteAsync (updateOperation);
        }
    }
}