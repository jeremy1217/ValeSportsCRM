using System.Collections.Generic;
using Microsoft.AspNetCore.Mvc;
using ValeSportsCrm.Core;
using ValeSportsCrm.Core.Model;

namespace ValeSportsCrm.Web.Controllers
{
    [Route("program-type")]
    public class ProgramTypeController: Controller
    {
        private readonly IDataAccessProvider _dataAccessProvider;

        public ProgramTypeController(IDataAccessProvider dataAccessProvider)
        {
            _dataAccessProvider = dataAccessProvider;
        }

        [HttpGet("list")]
        public List<ProgramType> Get()
        {
            return _dataAccessProvider.GetProgramTypes();
        }
    }
}
