namespace WaterProject.API.Data
{
    public class ProjectListData //not currently being used by the project as it is using the constructor version, but this is viable to
    {
        public List<Project> Projects { get; set; }

        public int TotalNumProjects { get; set; }

    }
}
