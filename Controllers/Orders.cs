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
    public class orders : Controller {
        HttpClient client = new HttpClient ();

        [HttpGet ("[action]")]
        public async Task all () {
           await Task.Delay(1);
            // return all orders where cart == false and submitted == true
        }
    }
}