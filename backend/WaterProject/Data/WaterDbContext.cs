using Microsoft.EntityFrameworkCore;

namespace WaterProject.API.Data
{
    public class WaterDbContext: DbContext
    {

        public WaterDbContext(DbContextOptions<WaterDbContext> options) : base(options) { //Db Constructor
        }

        public DbSet<Project> Projects { get; set; }//What tables are named in this particular database
    }
}
