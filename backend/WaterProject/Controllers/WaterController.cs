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
        public IActionResult GetProjects(int pageHowMany = 5, int pageNumber = 1, [FromQuery] List<string>? projectTypes = null) //goes to the database,getting how many selected projects we want to display, default value of 5.
                                                                                                                                 //We also get our project type/category request with a default of null if we dont have anything
        {
            var query = _waterContext.Projects.AsQueryable(); //builds a query

            if (projectTypes != null && projectTypes.Any())
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

        [HttpPost("AddProject")]
        public IActionResult AddProject([FromBody] Project newProject) //[Frombody] tag specifies that a parameter or property should be bound using the request body. So it makes it using the Project Constructor layout
        {
            _waterContext.Projects.Add(newProject); //adds the new project
            _waterContext.SaveChanges(); //saves the changes in the water context file to the database
            return Ok(newProject); //return ok with the new project in case we need to to be used on  the other side
        }

        [HttpPut("UpdateProject/{projectId}")]
        public IActionResult UpdateProject(int projectId, [FromBody] Project updatedProject)
        {
            var existingProject = _waterContext.Projects.Find(projectId); //find the existing project first

            //go through and update the existing project with the new project data
            existingProject.ProjectName = updatedProject.ProjectName;
            existingProject.ProjectType = updatedProject.ProjectType;
            existingProject.ProjectRegionalProgram = updatedProject.ProjectRegionalProgram;
            existingProject.ProjectImpact = updatedProject.ProjectImpact;
            existingProject.ProjectPhase = updatedProject.ProjectPhase;
            existingProject.ProjectFunctionalityStatus = updatedProject.ProjectFunctionalityStatus;

            _waterContext.Projects.Update(existingProject); //update the entry in the database
            _waterContext.SaveChanges(); //save the changes

            return Ok(existingProject); //return ok with the project in case we need it later
        }

        [HttpDelete("DeleteProject/{projectId}")]
        public IActionResult DeleteProject(int projectId)
        {
            var project = _waterContext.Projects.Find(projectId); //find the project

            if (project == null) //if its not found
            {
                return NotFound(new { message = "Project Not Found" }); //return that we didnt find the object
            }

            _waterContext.Projects.Remove(project); //if its there remove it
            _waterContext.SaveChanges(); //save the changes in the database

            return NoContent(); // return nothing (empty object)
        }
    }
}
