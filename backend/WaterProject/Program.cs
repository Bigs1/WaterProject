using Microsoft.EntityFrameworkCore;
using WaterProject.API.Data;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.

builder.Services.AddControllers();
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

// Define a named CORS policy
var AllowedSpecificOrigins = "_AllowedSpecificOrigins"; // Create a variable to reference this CORS policy later

builder.Services.AddCors(options => // Add CORS service to allow cross-origin requests (needed for frontend-backend communication)
{
    options.AddPolicy(name: AllowedSpecificOrigins, // Register a named CORS policy
                      policy =>
                      {
                          policy.WithOrigins("http://localhost:3000")// Allow requests only from this frontend origin
                                .AllowAnyHeader()                    // Allow any custom headers (e.g., Content-Type, Authorization)
                                .AllowAnyMethod();                   // Allow any HTTP method (GET, POST, PUT, DELETE, etc.)
                      });
});

builder.Services.AddDbContext<WaterDbContext>(options => // Registers the EF Core database context
    options.UseSqlite(builder.Configuration.GetConnectionString("WaterConnection"))); // Uses SQLite with a connection string from appsettings.json

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment()) // In development, enable Swagger UI
{
    app.UseSwagger();    // Serve the generated Swagger JSON
    app.UseSwaggerUI();  // Serve the Swagger UI to test API endpoints
}

// Use the named CORS policy
app.UseCors(AllowedSpecificOrigins); // Enables the named CORS policy above so the frontend at port 3000 can access this backend

// Optional: comment this out only if you're running HTTP, not HTTPS
app.UseHttpsRedirection(); // Redirect HTTP requests to HTTPS (disabled here for simplicity in local dev)

app.UseAuthorization();

app.MapControllers();

app.Run();
