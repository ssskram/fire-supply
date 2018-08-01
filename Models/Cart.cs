using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;

namespace firesupply.Models {

    public class OrderEntity {
        [BsonElement ("id")]
        public string id { get; set; }

        [BsonElement ("submitted")]
        public string submitted { get; set; }

        [BsonElement ("user")]
        public string user { get; set; }

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

        [BsonElement ("supplyComments")]
        public string supplyComments { get; set; }

        [BsonElement ("status")]
        public string status { get; set; }

        [BsonElement ("items")]
        public CartItem items { get; set; }
    }

    public class CartItem {
        public string obj { get; set; }
        public string id { get; set; }
        public int quantity { get; set; }
        public string family { get; set; }
        public string unit { get; set; }

    }

}