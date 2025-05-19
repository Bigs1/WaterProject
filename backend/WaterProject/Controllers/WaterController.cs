using System.Runtime.InteropServices.Marshalling;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using WaterProject.API.Data;

namespace WaterProject.Controllers
{
    [Route("[controller]")] //path
    [ApiController]
    public class WaterController : ControllerBase
    {
        private WaterDbContext _waterContext; //this variable allows the waterContext to be seen between methods

        public WaterController(WaterDbContext temp) => _waterContext = temp; //constructor builds at startup and can set a waterContext variable to be used between methods.
                                                                             //This can be done in an inline statement like so
        [HttpGet("AllProjects")]//route, is routing
        public IActionResult GetProjects(int pageHowMany = 5, int pageNumber = 1, [FromQuery] List<string> ? projectTypes = null) //goes to the database,getting how many selected projects we want to display, default value of 5.
                                                                                                                                  //We also get our project type/category request with a default of null if we dont have anything
        {
            var query = _waterContext.Projects.AsQueryable(); //builds a query

            if(projectTypes != null && projectTypes.Any())
            {
                query = query.Where(p => projectTypes.Contains(p.ProjectType));
            }

            //var list = _waterContext.Projects.ToList(); //gets all the projects and returns it to a list
            //var list = _waterContext.Projects.Take(5).ToList(); //gets the first 5 projects 
            //var list = _waterContext.Projects.Take(pageHowMany).ToList(); //display how many we want
            var totalNumProjects = query.Count();

            var list = query.
                Skip((pageNumber - 1) * pageHowMany) //display the correct ammount of pages given the page number
                .Take(pageHowMany) //given pagenumber=1, pageHowMany=5, so Skip((1-1)*5) = 0*5 = Skip(0) and take 5 from the database
                .ToList();

            //var totalNumProjects = _waterContext.Projects.Count(); //get the number of projects in the database

            /* Can do this inline return too
             * return Ok(new  
             * {
             *   Projects = list,
             *   TotalNumProjects = totalNumProjects
             *});
             * 
             * or you can lastly create a new class constructor in the data folder which will build the model to pass back rather than a generic object:
             * 
             * ProjectListData projData = new ProjectListData
             * {
             *      Projects = list,
             *      TotalNumProjects = totalNumProjects
             * };
             * return Ok(projData);
             */

            var someObject = new //creating a new object to return via this constructor to build a new model
            {
                Projects = list,
                TotalNumProjects = totalNumProjects
            };

            return Ok(someObject); //the Ok is a 200 status saying that the object was returned ok which allows us to pass 2 objects of different types to whatever is calling the API
        }

        [HttpGet("GetProjectTypes")]
        public IActionResult GetProjectTypes()
        {
           var projectTypes = _waterContext.Projects
                .Select(p => p.ProjectType)
                .Distinct()
                .ToList();
           return Ok(projectTypes);
        }
    }
}
