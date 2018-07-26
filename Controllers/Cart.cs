using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.Http;
using System.Net.Http.Headers;
using System.Threading.Tasks;
using firesupply.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;
using Newtonsoft.Json.Linq;

namespace firesupply.Controllers {

    [Authorize]
    [Route ("api/[controller]")]
    public class cart : Controller {
        HttpClient client = new HttpClient ();

        [HttpGet ("[action]")]
        public async Task load () {
           await Task.Delay(1);
            // query azure for item for current user where cart == true
            // if existent, return object to client
            // if not existent, create new azure object and return object to client
        }
        public async Task put () {
           await Task.Delay(1);
            // put update cart to azure
        }
        
        public async Task submit () {
           await Task.Delay(1);
            // put update cart to azure
            // set cart == false
            // set submitted == true
        }
    }
}