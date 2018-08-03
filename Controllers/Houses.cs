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
using Newtonsoft.Json;
using Newtonsoft.Json.Linq;

namespace firesupply.Controllers {

    [Authorize]
    [Route ("api/[controller]")]
    public class houses : Controller {
        HttpClient client = new HttpClient ();

        [HttpGet ("[action]")]
        public async Task<object> get () {
            var key = Environment.GetEnvironmentVariable ("CartegraphAPIkey");
            var cartegraphUrl = "https://cgweb06.cartegraphoms.com/PittsburghPA/api/v1/Classes/cgFacilitiesClass?fields=FacilityTypeField,IDField&filter=(([Inactive] is equal to false))";
            client.DefaultRequestHeaders.Clear ();
            client.DefaultRequestHeaders.Authorization =
                new AuthenticationHeaderValue ("Basic", key);
            var content = await client.GetStringAsync (cartegraphUrl);
            dynamic houses = JObject.Parse (content) ["cgFacilitiesClass"];
            List<Houses> lh = new List<Houses> ();
            foreach (var item in houses) {
                if (item.FacilityTypeField == "Firehouse") {
                    Houses hs = new Houses () {
                        name = item.IDField,
                    };
                    lh.Add (hs);
                }
            }
            return (lh);
        }
    }
}