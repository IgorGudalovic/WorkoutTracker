using GymTrackerAPI.Data;
using GymTrackerAPI.Models;
using System;
using System.Collections.Generic;
using System.Globalization;
using System.Linq;

namespace GymTrackerAPI.Models
{
    public class WorkoutService
    {
        private readonly AppDbContext _context;

        public WorkoutService(AppDbContext context)
        {
            _context = context;
        }

        public List<AggregatedWeeklyData> GetWeeklyAggregatedDataByUsername(string username, int month, int year)
        {
            var records = _context.WorkoutRecords
                .Where(r => r.Username == username && r.WorkoutDate.Month == month && r.WorkoutDate.Year == year).ToList();

            var result = records
                .GroupBy(r => CultureInfo.CurrentCulture.Calendar.GetWeekOfYear(r.WorkoutDate, CalendarWeekRule.FirstDay, DayOfWeek.Monday))
                .Select(g => new AggregatedWeeklyData
                {
                    WeekNumber = g.Key,
                    TotalDuration = g.Sum(r => r.Duration),
                    WorkoutCount = g.Count(),
                    AverageIntensity = g.Average(r => r.Intensity),
                    AverageFatigue = g.Average(r => r.Fatigue)
                }).ToList();

            return result;
        }
    }
}
