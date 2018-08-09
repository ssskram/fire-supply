using System;
using System.Collections.Generic;
using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;

namespace firesupply.Models {

    public class OrderEntity {
        [BsonElement ("id")]
        public string id { get; set; }

        [BsonElement ("cartGenerated")]
        public string cartGenerated { get; set; }

        [BsonElement ("user")]
        public string user { get; set; }

        [BsonElement ("userFullName")]
        public string userFullName { get; set; }

        [BsonElement ("submitted")]
        public string submitted { get; set; }

        [BsonElement ("orderSubmitted")]
        public string orderSubmitted { get; set; }

        [BsonElement ("house")]
        public string house { get; set; }

        [BsonElement ("comments")]
        public string comments { get; set; }

        [BsonElement ("emergency")]
        public string emergency { get; set; }

        [BsonElement ("emergencyJustification")]
        public string emergencyJustification { get; set; }

        [BsonElement ("narcanCases")]
        public string narcanCases { get; set; }

        [BsonElement ("narcanExplanation")]
        public string narcanExplanation { get; set; }

        [BsonElement ("orderType")]
        public string orderType { get; set; }

        [BsonElement ("status")]
        public string status { get; set; }

        [BsonElement ("lastModified")]
        public string lastModified { get; set; }

        [BsonElement ("supplyComments")]
        public string supplyComments { get; set; }

        [BsonElement ("items")]
        public List<cartItem> items { get; set; }

        // sharepoint specific
        [BsonIgnore]
        public bool isOld { get; set; }

        [BsonIgnore]
        public string link { get; set; }
    }
    public class cartItem {
        [BsonIgnore]
        public string cartID { get; set; }

        [BsonElement ("obj")]
        public string obj { get; set; }

        [BsonElement ("family")]
        public string family { get; set; }

        [BsonElement ("unit")]
        public string unit { get; set; }

        [BsonElement ("quantityOrdered")]
        public string quantityOrdered { get; set; }

        [BsonElement ("quantityReceived")]
        public string quantityReceived { get; set; }

        [BsonElement ("receivedBy")]
        public string receivedBy { get; set; }
    }
}