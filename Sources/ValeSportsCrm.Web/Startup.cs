using System.Linq;
using AutoMapper;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Logging;
using Newtonsoft.Json;
using ValeSportsCrm.Data;
using ValeSportsCrm.Core;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.EntityFrameworkCore;
using ValeSportsCrm.Core.Model;
using ValeSportsCrm.Web.DTO;

namespace ValeSportsCrm.Web
{
    public class Startup
    {
        public Startup(IHostingEnvironment env)
        {
            var builder = new ConfigurationBuilder()
                .SetBasePath(env.ContentRootPath)
                .AddJsonFile("appsettings.json", optional: true, reloadOnChange: true)
                .AddJsonFile("config.json", optional: true, reloadOnChange: true);

            Configuration = builder.Build();

            Mapper.Initialize(cfg =>
            {
                cfg.CreateMap<Customer, CustomerDTO>()
                    .ForMember(dest => dest.Sports, m => m.MapFrom(src => src.CustomerSports.Select(c => c.SportId)));
                cfg.CreateMap<CustomerDTO, Customer>()
                    .ForMember(dest => dest.CustomerSports, m => m.Ignore());
                cfg.CreateMap<Core.Model.Program, ProgramDTO>();
                cfg.CreateMap<ProgramDTO, Core.Model.Program>()
                    .ForMember(dest => dest.ProgramType, m => m.Ignore());
            });
            Mapper.AssertConfigurationIsValid();
        }

        public IConfigurationRoot Configuration { get; set; }

        public void ConfigureServices(IServiceCollection services)
        {
            //Use a MySQL database
            var sqlConnectionString = Configuration.GetConnectionString("DataAccessMySqlProvider");

            services.AddDbContext<DomainModelContext>(options =>
                options.UseMySql(
                    sqlConnectionString,
                    b => b.MigrationsAssembly("ValeSportsCrm.Data")
                )
            );

            services.AddScoped<IDataAccessProvider, ValeSportsCrm.Data.DataAccessMySqlProvider>();

            //var serializerSettings = new JsonSerializerSettings
            //{
            //    ReferenceLoopHandling = ReferenceLoopHandling.Ignore,
            //    ContractResolver = new CamelCasePropertyNamesContractResolver()
            //};

            //JsonOutputFormatter jsonOutputFormatter = new JsonOutputFormatter(serializerSettings, new System.Buffers.ArrayPool<object>());

            services.AddCors(options => options.AddPolicy("AllowAll", p => p.AllowAnyOrigin()
                .AllowAnyMethod()
                .AllowAnyHeader()));

            services.AddMvc().AddJsonOptions(options =>
            {
                options.SerializerSettings.ReferenceLoopHandling = ReferenceLoopHandling.Ignore;
            });

            //}
            //options =>
            //        {
            //            options.OutputFormatters.Clear();
            //            options.OutputFormatters.Insert(0, jsonOutputFormatter);
            //        }
            //    );
        }

        public void Configure(IApplicationBuilder app, IHostingEnvironment env, ILoggerFactory loggerFactory)
        {
            loggerFactory.AddConsole();
            loggerFactory.AddDebug();

            app.UseStaticFiles();
            app.UseCors("AllowAll");
            app.UseMvc();

            // Don't seed the database during EF Tooling, see Program.cs ln 16
            // https://wildermuth.com/2017/07/06/Program-cs-in-ASP-NET-Core-2-0
            if (Configuration["DesignTime"] != "true")
            {
                using (var serviceScope = app.ApplicationServices.GetRequiredService<IServiceScopeFactory>().CreateScope())
                {
                    // DB migrations
                    var context = serviceScope.ServiceProvider.GetService<DomainModelContext>();
                    context.Database.Migrate();

                    // Default data
                    if (!context.Sports.Any())
                    {
                        foreach (var m in new [] { "Soccer", "Baseball", "Basketball", "Softball", "Football", "Lacrosse" })
                        {
                            context.Sports.Add(new Sport {Name = m});
                        }
                        context.SaveChanges();
                    }

                    if (!context.ProgramTypes.Any())
                    {
                        foreach (var m in new [] { "Camps", "Clinics", "Leagues", "Open Play", "Primary Team" })
                        {
                            context.ProgramTypes.Add(new ProgramType {Name = m});
                        }
                        context.SaveChanges();
                    }
                }
            }
        }
    }
}
