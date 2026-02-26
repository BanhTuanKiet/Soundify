using AutoMapper;
using server.Models;
using Microsoft.EntityFrameworkCore;

namespace server.Services.Artist
{
    public class ArtistService : IArtist
    {
        private readonly AppDbContext _context;
        private readonly IMapper _mapper;

        public ArtistService(AppDbContext context, IMapper mapper)
        {
            _context = context;
            _mapper = mapper;
        }
    }
}