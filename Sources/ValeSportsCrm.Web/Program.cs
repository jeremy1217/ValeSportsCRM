using System.IO;
using Microsoft.AspNetCore;
using Microsoft.AspNetCore.Hosting;
using Microsoft.Extensions.Configuration;

namespace ValeSportsCrm.Web
{
    public class Program
    {
        public static void Main(string[] args)
        {
            WebHost.CreateDefaultBuilder()
                .UseStartup<Startup>()
                .Build()
                .Run();
        }

        // https://wildermuth.com/2017/07/06/Program-cs-in-ASP-NET-Core-2-0
        // Only used by EF Tooling
        public static IWebHost BuildWebHost(string[] args)
        {
            return WebHost.CreateDefaultBuilder()
                .ConfigureAppConfiguration((ctx, cfg) =>
                {
                    cfg.SetBasePath(Directory.GetCurrentDirectory())
                        .AddJsonFile("config.json", true) // require the json file!
                        .AddEnvironmentVariables();
                })
                .ConfigureLogging((ctx, logging) => { }) // No logging
                .UseStartup<Startup>()
                .UseSetting("DesignTime", "true")
                .Build();
        }
    }
}
