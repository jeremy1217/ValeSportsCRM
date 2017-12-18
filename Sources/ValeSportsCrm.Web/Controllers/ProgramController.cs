using System.Collections.Generic;
using AutoMapper;
using ValeSportsCrm.Core;
using Microsoft.AspNetCore.Mvc;
using ValeSportsCrm.Web.DTO;

namespace ValeSportsCrm.Web.Controllers
{
    [Route("program")]
    public class ProgramController : Controller
    {
        private readonly IDataAccessProvider _dataAccessProvider;

        public ProgramController(IDataAccessProvider dataAccessProvider)
        {
            _dataAccessProvider = dataAccessProvider;
        }

        [HttpGet("list")]
        public List<Core.Model.Program> Get()
        {
            return _dataAccessProvider.GetPrograms();
        }

        [HttpGet("{id}")]
        public ProgramDTO Get(long id)
        {
            return Mapper.Map<ProgramDTO>(_dataAccessProvider.GetProgram(id));
        }

        [HttpPost]
        public void Post([FromBody]ProgramDTO request)
        {
            _dataAccessProvider.AddProgram(Mapper.Map<Core.Model.Program>(request));
        }

        [HttpPut("{id}")]
        public void Put(long id, [FromBody]ProgramDTO request)
        {
            _dataAccessProvider.UpdateProgram(Mapper.Map<Core.Model.Program>(request));
        }

        [HttpDelete("{id}")]
        public void Delete(long id)
        {
            _dataAccessProvider.DeleteProgram(id);
        }
    }
}
