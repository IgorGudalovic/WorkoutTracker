using GymTrackerAPI.Interfaces;
using GymTrackerAPI.Data;

namespace GymTrackerAPI.Models
{
    public class UserService : IUserService
    {
        private readonly AppDbContext _context;

        public UserService(AppDbContext context)
        {
            _context = context;
        }

        public User Authenticate(string Username, string Password)
        {
            try
            {
                var user = _context.Users.SingleOrDefault(x => x.Username == Username && x.Password == Password);

                if (user == null)
                    return null;

                return user;
            }
            catch (Exception ex)
            {
                // Log exception (optional)
                throw new ApplicationException("Database error occurred while authenticating user.", ex);
            }

        }
    }
}
