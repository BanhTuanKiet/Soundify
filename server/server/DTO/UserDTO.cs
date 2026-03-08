namespace server.DTO
{
    public class UserDTO
    {
        public class EmailSignup
        {
            public string Email { get; set; } = string.Empty;
        }
        public class DateOfBirth
        {
            public string Day { get; set; } = string.Empty;
            public string Month { get; set; } = string.Empty;
            public string Year { get; set; } = string.Empty;
        }

        public class UserLogin
        {
            public string Email { get; set; } = string.Empty;
            public string Name { get; set; } = string.Empty;
            public DateOfBirth? DateOfBirth { get; set; }
            public bool Sex { get; set; }
            public bool MarketingOptOut { get; set; }
            public bool ShareData { get; set; }
        }
    }
}