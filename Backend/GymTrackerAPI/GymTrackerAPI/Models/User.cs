using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;

namespace GymTrackerAPI.Models
{
    public class User
    {
        [Key]
        public int Id { get; set; }
        [Column(TypeName = "nvarchar(30)")]
        public string Username { get; set; }
        [Column(TypeName = "nvarchar(30)")]
        public string Password { get; set; }
    }

}
