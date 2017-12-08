using System.Collections.Generic;
using ValeSportsCrm.Core;
using ValeSportsCrm.Core.Model;
using Microsoft.AspNetCore.Mvc;

namespace ValeSportsCrm.Web.Controllers
{
    [Route("customer")]
    public class CustomerController : Controller
    {
        private readonly IDataAccessProvider _dataAccessProvider;

        public CustomerController(IDataAccessProvider dataAccessProvider)
        {
            _dataAccessProvider = dataAccessProvider;
        }

        [HttpGet("list")]
        public IEnumerable<Customer> Get()
        {
            return _dataAccessProvider.GetCustomers();
        }

        [HttpGet("{id}")]
        public Customer Get(long id)
        {
            return _dataAccessProvider.GetCustomer(id);
        }

        [HttpPost]
        public void Post([FromBody]Customer value)
        {
            _dataAccessProvider.AddCustomer(value);
        }

        [HttpPut("{id}")]
        public void Put(long id, [FromBody]Customer value)
        {
            _dataAccessProvider.UpdateCustomer(id, value);
        }

        [HttpDelete("{id}")]
        public void Delete(long id)
        {
            _dataAccessProvider.DeleteCustomer(id);
        }
    }
}
