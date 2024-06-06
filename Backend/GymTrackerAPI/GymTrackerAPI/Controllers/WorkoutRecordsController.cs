using GymTrackerAPI.Data;
using GymTrackerAPI.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace GymTrackerAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class WorkoutRecordsController : ControllerBase
    {
        private readonly AppDbContext _context;
        private readonly WorkoutService _workoutService;
        public WorkoutRecordsController(WorkoutService workoutService, AppDbContext context)
        {
            _context = context;
            _workoutService = workoutService;
        }

        [HttpGet("check-username")]
        public async Task<IActionResult> CheckUsernameExists(string username)
        {
            var exists = await _context.Users.AnyAsync(u => u.Username == username);
            if (exists)
            {
                return Conflict(new { message = "Username already exists" }); // 409 Conflict
            }
            return Ok(new { message = "Username is available" });
        }

        [HttpGet("weekly-data")]
        public ActionResult<List<AggregatedWeeklyData>> GetWeeklyDataByUsername (string username, int month, int year)
        {
            var data = _workoutService.GetWeeklyAggregatedDataByUsername(username, month, year);
            return Ok(data);
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<WorkoutRecord>> GetWorkoutRecord(int id)
        {
            var workoutRecord = await _context.WorkoutRecords.FindAsync(id);

            if (WorkoutRecordExists(id)==false)
            {
                return NotFound();
            }

            return workoutRecord;
        }

        // POST: api/WorkoutRecord
        [HttpPost]
        public async Task<ActionResult<WorkoutRecord>> PostWorkoutRecord(WorkoutRecord workoutRecord)
        {
            _context.WorkoutRecords.Add(workoutRecord);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetWorkoutRecord", new { id = workoutRecord.Id }, workoutRecord);
        }

        // DELETE: api/WorkoutRecord/5
        [HttpDelete("{id}")]
        public async Task<ActionResult<WorkoutRecord>> DeleteWorkoutRecord(int id)
        {
            var workoutRecord = await _context.WorkoutRecords.FindAsync(id);
            if (workoutRecord == null)
            {
                return NotFound();
            }

            _context.WorkoutRecords.Remove(workoutRecord);
            await _context.SaveChangesAsync();

            return workoutRecord;
        }

        private bool WorkoutRecordExists(int id)
        {
            return _context.WorkoutRecords.Any(e => e.Id == id);
        }
    }
}
