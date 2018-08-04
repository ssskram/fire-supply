namespace firesupply.Models {

    public class Orders {
        public string orderType { get; set; }
        public string orderID { get; set; }
        public string house { get; set; }
        public string orderDate { get; set; }
        public string orderedByName { get; set; }
        public string orderedByEmail { get; set; }
        public string status { get; set; }
        public bool emergency { get; set; }
        public bool cart { get; set; }
        public Item Items { get; set; }

        // sharepoint specific
        public bool isOld { get; set; }
        public string link { get; set; }
    }

    public class Item {
        public string name { get; set; }
        public int quantity { get; set; }
    }
}