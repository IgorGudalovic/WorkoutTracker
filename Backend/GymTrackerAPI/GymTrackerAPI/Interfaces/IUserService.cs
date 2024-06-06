using GymTrackerAPI.Models;

namespace GymTrackerAPI.Interfaces
{
    public interface IUserService
    {
        User Authenticate(string username, string password);
    }
}
