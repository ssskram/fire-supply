using Microsoft.AspNetCore.Mvc;

namespace firesupply.Controllers {
    [Route ("api/[controller]")]
    public class orders : Controller {
        [HttpGet ("[action]")]
        public IActionResult get () {
            bool isAuthenticated = User.Identity.IsAuthenticated;
            return Ok (isAuthenticated);
        }
    }
}