import type { Artist } from "../model/Artist";
import type { NextSong, Song } from "../model/Song";

export const artistsData = [
    {
        id: "son-tung-mtp",
        name: "Son Tung M-TP",
        bio: "Top V-Pop superstar...",
        avatar: "https://ui-avatars.com/api/?name=Son+Tung&background=random",
    },
    {
        id: "den-vau",
        name: "Den Vau",
        bio: "Rapper with a simple, thoughtful style...",
        avatar: "https://ui-avatars.com/api/?name=Den+Vau&background=000&color=fff",
    },
    {
        id: "low-g",
        name: "Low G",
        bio: "A standout rapper from Rap Nha Lam...",
        avatar: "https://ui-avatars.com/api/?name=Low+G&background=ff0000&color=fff",
    },
    {
        id: "tlinh",
        name: "tlinh",
        bio: "Talented Gen Z female rapper/singer...",
        avatar: "https://ui-avatars.com/api/?name=tlinh&background=pink&color=fff",
    },
    {
        id: "wren-evans",
        name: "Wren Evans",
        bio: "Versatile Gen Z artist...",
        avatar: "https://ui-avatars.com/api/?name=Wren+Evans&background=random",
    },
    {
        id: "da-lab",
        name: "Da LAB",
        bio: "Popular Vietnamese music group...",
        avatar: "https://ui-avatars.com/api/?name=Da+LAB&background=random",
    },
    {
        id: "bui-truong-linh",
        name: "Bui Truong Linh",
        bio: "Young singer-songwriter...",
        avatar: "https://ui-avatars.com/api/?name=Bui+Truong+Linh&background=random",
    },
    {
        id: "dat-g",
        name: "Dat G",
        bio: "Singer-songwriter with many hit songs...",
        avatar: "https://ui-avatars.com/api/?name=Dat+G&background=random",
    },
    {
        id: "amee",
        name: "AMEE",
        bio: "Female singer with a princess-like image...",
        avatar: "https://ui-avatars.com/api/?name=AMEE&background=pink&color=fff",
    },
    {
        id: "b-ray",
        name: "B Ray",
        bio: "Rapper known for strong technical skills...",
        avatar: "https://ui-avatars.com/api/?name=B+Ray&background=random",
    },
    {
        id: "wxrdie",
        name: "Wxrdie",
        bio: "Talented young rapper...",
        avatar: "https://ui-avatars.com/api/?name=Wxrdie&background=random",
    },
    {
        id: "obito",
        name: "Obito",
        bio: "Member of the OTĐ crew...",
        avatar: "https://ui-avatars.com/api/?name=Obito&background=random",
    },
    {
        id: "vu",
        name: "Vu.",
        bio: "Indie pop prince...",
        avatar: "https://ui-avatars.com/api/?name=Vu&background=random",
    },
];

export const followingArtists = [
    {
        id: "son-tung-mtp",
        name: "Son Tung M-TP",
        avatarUrl: "https://ui-avatars.com/api/?name=Son+Tung&background=random",
    },
    {
        id: "den-vau",
        name: "Den Vau",
        avatarUrl: "https://ui-avatars.com/api/?name=Den+Vau&background=000&color=fff",
    },
    {
        id: "low-g",
        name: "Low G",
        avatarUrl: "https://ui-avatars.com/api/?name=Low+G&background=ff0000&color=fff",
    },
    {
        id: "tlinh",
        name: "tlinh",
        avatarUrl: "https://ui-avatars.com/api/?name=tlinh&background=pink&color=fff",
    },
    {
        id: "wren-evans",
        name: "Wren Evans",
        avatarUrl: "https://ui-avatars.com/api/?name=Wren+Evans&background=random",
    },
    {
        id: "da-lab",
        name: "Da LAB",
        avatarUrl: "https://ui-avatars.com/api/?name=Da+LAB&background=random",
    },
    {
        id: "bui-truong-linh",
        name: "Bui Truong Linh",
        avatarUrl: "https://ui-avatars.com/api/?name=Bui+Truong+Linh&background=random",
    },
    {
        id: "dat-g",
        name: "Dat G",
        avatarUrl: "https://ui-avatars.com/api/?name=Dat+G&background=random",
    },
    {
        id: "amee",
        name: "AMEE",
        avatarUrl: "https://ui-avatars.com/api/?name=AMEE&background=pink&color=fff",
    },
    {
        id: "b-ray",
        name: "B Ray",
        avatarUrl: "https://ui-avatars.com/api/?name=B+Ray&background=random",
    },
    {
        id: "wxrdie",
        name: "Wxrdie",
        avatarUrl: "https://ui-avatars.com/api/?name=Wxrdie&background=random",
    },
    {
        id: "obito",
        name: "Obito",
        avatarUrl: "https://ui-avatars.com/api/?name=Obito&background=random",
    },
    {
        id: "vu",
        name: "Vu.",
        avatarUrl: "https://ui-avatars.com/api/?name=Vu&background=random",
    },
];

export const MOCK_ARTISTS: Artist[] = [
    {
        id: 'a1',
        name: 'Anh Bằng',
        bio: 'Nghệ sĩ trẻ tài năng...',
        avatarUrl: 'https://i.scdn.co/image/ab6761610000e5ebed32008453489e223048a60f',
        createdAt: new Date().toISOString(),
    },
    {
        id: 'a2',
        name: '24k.Right',
        bio: 'Rapper nổi tiếng từ sân chơi Rap Việt.',
        avatarUrl: 'https://i.scdn.co/image/ab6761610000e5eb473062886c5f7e7f722c1533',
        createdAt: new Date().toISOString(),
    },
    {
        id: 'a3',
        name: 'Nhism',
        bio: 'Streamer kiêm nghệ sĩ giải trí.',
        avatarUrl: 'https://i.scdn.co/image/ab6761610000e5eb797441584b423f790c50d180',
        createdAt: new Date().toISOString(),
    }
];

export const CURRENT_SONG: Song & { coverUrl: string } = {
    id: 's1',
    title: 'Anh Tên Là',
    albumId: 'alb1',
    genreId: 1,
    fileUrl: 'https://example.com/song.mp3',
    durationSeconds: 180,
    fileSizeMb: 5.5,
    playCount: 1500000,
    isExplicit: false,
    createdAt: new Date().toISOString(),
    coverUrl: 'https://photo-resize-zmp3.zmdcdn.me/w600_r1x1_jpeg/cover/3/2/e/e/32ee8fd0248316140536c4b92b618841.jpg',
};

export const NEXT_SONG: NextSong = {
    id: 's2',
    title: 'Hai Thằng Bịp',
    artists: [
        { id: 'a1', name: 'Anh Bằng', avatarUrl: "" },
        { id: 'a2', name: 'Mason Nguyen', avatarUrl: "" }
    ],
    coverUrl: 'https://i.scdn.co/image/ab67616d0000b2734a706599b5032904033b006c',
    isExplicit: true,
};