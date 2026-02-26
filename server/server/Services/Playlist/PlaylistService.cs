using AutoMapper;
using server.Models;
using Microsoft.EntityFrameworkCore;

namespace server.Services.Playlist
{
    public class PlaylistService : IPlaylist
    {
        private readonly AppDbContext _context;
        private readonly IMapper _mapper;

        public PlaylistService(AppDbContext context, IMapper mapper)
        {
            _context = context;
            _mapper = mapper;
        }
    }
}