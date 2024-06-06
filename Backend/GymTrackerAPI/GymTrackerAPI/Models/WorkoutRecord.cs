using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace GymTrackerAPI.Models
{
    public class WorkoutRecord
    {
        [Key]
        public int Id { get; set; }
        [Column(TypeName = "nvarchar(30)")]
        public string WorkoutType { get; set; }
        public int Duration { get; set; }
        public int CaloriesBurned { get; set; }
        public int Intensity { get; set; }
        public int Fatigue { get; set; }
        public DateTime WorkoutDate { get; set; }

        // Foreign key to User
        public string Username{ get; set; }
    }
}
