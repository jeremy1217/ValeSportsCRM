using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Threading.Tasks;
using AutoMapper;
using Microsoft.AspNetCore.Http;
using ValeSportsCrm.Core;
using ValeSportsCrm.Core.Model;
using Microsoft.AspNetCore.Mvc;
using ValeSportsCrm.Web.DTO;

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
        public List<Customer> Get()
        {
            return _dataAccessProvider.GetCustomers();
        }

        [HttpGet("{id}")]
        public CustomerDTO Get(long id)
        {
            return Mapper.Map<CustomerDTO>(_dataAccessProvider.GetCustomer(id));
        }

        [HttpPost]
        public void Post([FromBody]CustomerDTO request)
        {
            _dataAccessProvider.AddCustomer(Mapper.Map<Customer>(request), request.Sports);
        }

        [HttpPut("{id}")]
        public void Put(long id, [FromBody]CustomerDTO request)
        {
            _dataAccessProvider.UpdateCustomer(id, Mapper.Map<Customer>(request), request.Sports);
        }

        [HttpDelete("{id}")]
        public void Delete(long id)
        {
            _dataAccessProvider.DeleteCustomer(id);
        }

        [HttpPost("upload")]
        public async Task<IActionResult> Upload(List<IFormFile> files)
        {
            if (files.Count != 1)
            {
                return BadRequest("Upload of only one file is supported");
            }
            var file = files.First();
            if (file.Length > 0)
            {
                var sports = _dataAccessProvider.GetSports().ToDictionary(m => m.Name.ToLower(), m => m.Id);

                using (var stream = new MemoryStream())
                {
                    await file.CopyToAsync(stream);
                    stream.Position = 0;

                    var reader = new StreamReader(stream);
                    while (!reader.EndOfStream)
                    {
                        var line = reader.ReadLine();
                        var values = line.Split(';');
                        if (values.Length == 5)
                        {
                            try
                            {
                                var c = new Customer
                                {
                                    Name = values[0],
                                    Address = values[1],
                                    BirthDate = DateTime.Parse(values[2]),
                                    Email = values[3],
                                    FirstName = values[4],
                                    LastName = values[5],
                                    Phone = values[6]
                                };
                                // sports
                                var sportIds = new List<long>();
                                foreach (var s in values[7].Split(',').Select(m => m.ToLower()))
                                {
                                    long sportId;
                                    if (sports.TryGetValue(s, out sportId))
                                    {
                                        sportIds.Add(sportId);
                                    }
                                }
                                _dataAccessProvider.AddCustomer(c, sportIds);
                            }
                            catch (FormatException e)
                            {
                            }
                        }
                    }
                }
            }
            return Ok();
        }
    }
}
