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
        public IEnumerable<Project> GetProjects() //goes to the database
        {
            return _waterContext.Projects.ToList(); //gets all the projects and returns it to a list
        }

        [HttpGet("FunctionalProjects")]
        public IEnumerable<Project> GetFunctionalProjects()
        {
            var something = _waterContext.Projects.Where(p => p.ProjectFunctionalityStatus == "Functional").ToList(); //Gets all projects that are listed as Functional
            return something;
        }
    }
}
