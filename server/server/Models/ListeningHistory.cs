using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore;

namespace server.Models;

[Index("SongId", Name = "IX_ListeningHistories_SongId")]
[Index("UserId", Name = "IX_ListeningHistories_UserId")]
public partial class ListeningHistory
{
    [Key]
    public Guid Id { get; set; }

    public Guid? UserId { get; set; }

    public Guid? SongId { get; set; }

    public DateTime? PlayedAt { get; set; }

    [ForeignKey("SongId")]
    [InverseProperty("ListeningHistories")]
    public virtual Song? Song { get; set; }

    [ForeignKey("UserId")]
    [InverseProperty("ListeningHistories")]
    public virtual AspNetUser? User { get; set; }
}
