namespace GymTrackerAPI.Models
{
    public class AggregatedWeeklyData
    {
        public int WeekNumber { get; set; }
        public int TotalDuration { get; set; }
        public int WorkoutCount { get; set; }
        public double AverageIntensity { get; set; }
        public double AverageFatigue { get; set; }
    }
}
