using GymTrackerAPI.Models;
using Microsoft.EntityFrameworkCore;

namespace GymTrackerAPI.Data
{
    public class AppDbContext : DbContext
    {        
        public AppDbContext(DbContextOptions<AppDbContext> options) : base(options) { }

        public DbSet<User> Users { get; set; }
        public DbSet<WorkoutRecord> WorkoutRecords { get; set; }

        /*commands for database:
         
          Add-Migration
          Update-Database

        */

    }
}
