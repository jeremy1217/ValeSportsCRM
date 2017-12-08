using System;
using System.Collections.Generic;
using System.Linq;
using ValeSportsCrm.Core;
using ValeSportsCrm.Core.Model;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;

namespace ValeSportsCrm.Data
{
    public class DataAccessMySqlProvider : IDataAccessProvider
    {
        private readonly DomainModelContext _context;
        private readonly ILogger _logger;

        public DataAccessMySqlProvider(DomainModelContext context, ILoggerFactory loggerFactory)
        {
            _context = context;
            _logger = loggerFactory.CreateLogger("DataAccessMySqlProvider");
        }

        public void AddCustomer(Customer customer)
        {
            _context.Customers.Add(customer);
            _context.SaveChanges();
        }
        public void UpdateCustomer(long id, Customer customer)
        {
            _context.Customers.Update(customer);
            _context.SaveChanges();
        }

        public void DeleteCustomer(long id)
        {
            var entity = _context.Customers.First(t => t.Id == id);
            _context.Customers.Remove(entity);
            _context.SaveChanges();
        }

        public Customer GetCustomer(long id)
        {
            return _context.Customers.First(t => t.Id == id);
        }

        public List<Customer> GetCustomers()
        {
            return _context.Customers.ToList();
        }
    }
}
