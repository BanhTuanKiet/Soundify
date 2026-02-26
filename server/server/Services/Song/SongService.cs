using AutoMapper;
using server.Models;
using Microsoft.EntityFrameworkCore;
using server.Services.Song;

namespace server.Services.Album
{
    public class SongService : ISong
    {
        private readonly AppDbContext _context;
        private readonly IMapper _mapper;

        public SongService(AppDbContext context, IMapper mapper)
        {
            _context = context;
            _mapper = mapper;
        }
    }
}