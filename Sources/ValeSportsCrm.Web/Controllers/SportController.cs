using System.Collections.Generic;
using Microsoft.AspNetCore.Mvc;
using ValeSportsCrm.Core;
using ValeSportsCrm.Core.Model;

namespace ValeSportsCrm.Web.Controllers
{
    [Route("sport")]
    public class SportController: Controller
    {
        private readonly IDataAccessProvider _dataAccessProvider;

        public SportController(IDataAccessProvider dataAccessProvider)
        {
            _dataAccessProvider = dataAccessProvider;
        }

        [HttpGet("list")]
        public List<Sport> Get()
        {
            return _dataAccessProvider.GetSports();
        }
    }
}
