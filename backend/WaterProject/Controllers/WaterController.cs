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
        public IEnumerable<Project> GetProjects(int pageHowMany) //goes to the database,getting how many selected projects we want to display
        {
            //var list = _waterContext.Projects.ToList(); //gets all the projects and returns it to a list
            //var list = _waterContext.Projects.Take(5).ToList(); //gets the first 5 projects 
            var list = _waterContext.Projects.Take(pageHowMany).ToList(); //display how many we want
            return list;
        }

        [HttpGet("FunctionalProjects")]
        public IEnumerable<Project> GetFunctionalProjects()
        {
            var something = _waterContext.Projects.Where(p => p.ProjectFunctionalityStatus == "Functional").ToList(); //Gets all projects that are listed as Functional
            return something;
        }
    }
}
