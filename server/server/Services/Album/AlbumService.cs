using AutoMapper;
using server.Models;
using Microsoft.EntityFrameworkCore;

namespace server.Services.Album
{
    public class AlbumService : IAlbum
    {
        private readonly AppDbContext _context;
        private readonly IMapper _mapper;

        public AlbumService(AppDbContext context, IMapper mapper)
        {
            _context = context;
            _mapper = mapper;
        }
    }
}