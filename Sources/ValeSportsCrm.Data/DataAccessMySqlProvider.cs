using System.Collections.Generic;
using System.Linq;
using Microsoft.EntityFrameworkCore;
using ValeSportsCrm.Core;
using ValeSportsCrm.Core.Model;

namespace ValeSportsCrm.Data
{
    public class DataAccessMySqlProvider : IDataAccessProvider
    {
        private readonly DomainModelContext _context;

        public DataAccessMySqlProvider(DomainModelContext context)
        {
            _context = context;
        }

        public void AddCustomer(Customer customer, List<long> sports)
        {
            customer.CustomerSports = new List<CustomerSport>();
            foreach (var sportId in sports)
            {
                customer.CustomerSports.Add(new CustomerSport
                {
                    SportId = sportId
                });
            }
            _context.Customers.Add(customer);
            _context.SaveChanges();
        }

        public void UpdateCustomer(long id, Customer customer, List<long> sports)
        {
            _context.Customers.Update(customer);

            var p = _context.Customers.Include(m => m.CustomerSports).First(m => m.Id == id);
            // remove deleted sports
            var toDelete = new List<CustomerSport>();
            foreach (var s in p.CustomerSports)
            {
                if (!sports.Exists(m => m == s.SportId))
                {
                    toDelete.Add(s);
                }
            }
            toDelete.ForEach(m => p.CustomerSports.Remove(m));

            // add new sports
            foreach (var s in sports)
            {
                if (p.CustomerSports.All(m => m.SportId != s))
                {
                    p.CustomerSports.Add(new CustomerSport
                    {
                        SportId = s
                    });
                }
            }
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
            return _context.Customers
                .Include(m => m.CustomerSports)
                .ThenInclude(e => e.Sport)
                .First(t => t.Id == id);
        }

        public List<Customer> GetCustomers()
        {
            return _context.Customers
                .Include(m => m.CustomerSports)
                .ThenInclude(e => e.Sport)
                .ToList();
        }

        public void AddProgram(Program program)
        {
            _context.Programs.Add(program);
            _context.SaveChanges();
        }

        public void UpdateProgram(Program program)
        {
            _context.Programs.Update(program);
            _context.SaveChanges();
        }

        public void DeleteProgram(long id)
        {
            var entity = _context.Customers.First(t => t.Id == id);
            _context.Customers.Remove(entity);
            _context.SaveChanges();
        }

        public Program GetProgram(long id)
        {
            return _context.Programs
                .Include(m => m.ProgramType)
                .First(t => t.Id == id);
        }

        public List<Program> GetPrograms()
        {
            return _context.Programs
                .Include(m => m.ProgramType)
                .ToList();
        }

        public List<Sport> GetSports()
        {
            return _context.Sports
                .ToList();
        }

        public List<ProgramType> GetProgramTypes()
        {
            return _context.ProgramTypes
                .ToList();
        }
    }
}
