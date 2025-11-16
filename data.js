// Dashboard Data
const dashboardData = {
    temperature: 24,
    aqi: 65,
    traffic: 45
};

// Alerts Data
const alertsData = [
    {
        id: 1,
        title: "Heavy Traffic on Main Street",
        category: "traffic",
        description: "Congestion reported on Main Street due to road construction. Expected delay: 20-30 minutes. Consider alternate routes via Oak Avenue.",
        timestamp: new Date("2024-11-15T08:30:00"),
        priority: "high"
    },
    {
        id: 2,
        title: "Air Quality Warning",
        category: "health",
        description: "Air quality index has reached moderate levels. Sensitive groups should limit prolonged outdoor activities. Monitor conditions throughout the day.",
        timestamp: new Date("2024-11-15T07:15:00"),
        priority: "medium"
    },
    {
        id: 3,
        title: "Thunderstorm Alert",
        category: "weather",
        description: "Thunderstorms expected in the evening between 6 PM - 9 PM. Stay indoors and avoid unnecessary travel during this period.",
        timestamp: new Date("2024-11-15T06:00:00"),
        priority: "high"
    },
    {
        id: 4,
        title: "Community Park Maintenance",
        category: "public",
        description: "Central Park will be closed for maintenance on November 16-17. Thank you for your understanding. Alternative parks: Riverside Park, Oak Gardens.",
        timestamp: new Date("2024-11-14T14:20:00"),
        priority: "low"
    },
    {
        id: 5,
        title: "Road Closure - Highway 42",
        category: "traffic",
        description: "Highway 42 South will be closed from 10 PM - 6 AM for repairs. Detour signs posted. Use Highway 15 as alternate route.",
        timestamp: new Date("2024-11-14T12:00:00"),
        priority: "medium"
    },
    {
        id: 6,
        title: "High Temperature Advisory",
        category: "weather",
        description: "Temperatures expected to reach 35°C tomorrow. Stay hydrated, avoid direct sunlight during peak hours (12 PM - 4 PM).",
        timestamp: new Date("2024-11-14T09:30:00"),
        priority: "medium"
    },
    {
        id: 7,
        title: "Public Health Screening",
        category: "health",
        description: "Free health screening camp at City Hospital on November 18. Timings: 9 AM - 5 PM. No appointment necessary. Services: BP, Sugar, BMI checks.",
        timestamp: new Date("2024-11-13T16:45:00"),
        priority: "low"
    },
    {
        id: 8,
        title: "Water Supply Interruption",
        category: "public",
        description: "Water supply will be interrupted in Zone A on November 17 from 8 AM - 2 PM for pipeline maintenance. Please store water accordingly.",
        timestamp: new Date("2024-11-13T11:00:00"),
        priority: "high"
    },
    {
        id: 9,
        title: "Traffic Signal Maintenance",
        category: "traffic",
        description: "Traffic signals at 5th Avenue intersection will be under maintenance. Traffic police deployed. Exercise caution and follow manual directions.",
        timestamp: new Date("2024-11-13T08:00:00"),
        priority: "medium"
    },
    {
        id: 10,
        title: "City Marathon Event",
        category: "public",
        description: "Annual City Marathon on November 20. Road closures on Marathon Route from 6 AM - 12 PM. Plan your travel accordingly. Route map available on website.",
        timestamp: new Date("2024-11-12T15:30:00"),
        priority: "medium"
    }
];

// Map Zones Data
const mapZones = [
    {
        id: 1,
        name: "Downtown District",
        description: "The heart of the city with commercial centers, business offices, and entertainment venues. High-density urban area with excellent public transport connectivity.",
        contact: "+1-555-0101",
        color: "#4A70A9",
        image: "https://images.unsplash.com/photo-1480714378408-67cf0d13bc1b?w=800&q=80"
    },
    {
        id: 2,
        name: "Residential North",
        description: "Peaceful residential area with parks, schools, and family-friendly amenities. Low traffic density and green spaces throughout the neighborhood.",
        contact: "+1-555-0102",
        color: "#5B81BA",
        image: "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=800&q=80"
    },
    {
        id: 3,
        name: "Industrial Zone",
        description: "Manufacturing and warehouse district with major logistics operations. Heavy vehicle traffic during business hours. Multiple industrial parks located here.",
        contact: "+1-555-0103",
        color: "#6C92CB",
        image: "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?w=800&q=80"
    },
    {
        id: 4,
        name: "Tech Park",
        description: "Modern technology hub hosting IT companies and startups. State-of-the-art infrastructure with co-working spaces and innovation centers.",
        contact: "+1-555-0104",
        color: "#7DA3DC",
        image: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=800&q=80"
    },
    {
        id: 5,
        name: "Waterfront District",
        description: "Scenic area along the river with recreational facilities, restaurants, and shopping. Popular tourist destination with beautiful promenades.",
        contact: "+1-555-0105",
        color: "#8FABD4",
        image: "https://images.unsplash.com/photo-1519501025264-65ba15a82390?w=800&q=80"
    },
    {
        id: 6,
        name: "University Campus",
        description: "Educational hub with multiple colleges and research facilities. Vibrant student community with libraries, laboratories, and sports complexes.",
        contact: "+1-555-0106",
        color: "#A0BCE5",
        image: "https://images.unsplash.com/photo-1562774053-701939374585?w=800&q=80"
    },
    {
        id: 7,
        name: "Medical District",
        description: "Healthcare center with hospitals, clinics, and medical research institutes. Emergency services available 24/7. Multiple specialty hospitals located here.",
        contact: "+1-555-0107",
        color: "#4A70A9",
        image: "https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?w=800&q=80"
    },
    {
        id: 8,
        name: "Suburban East",
        description: "Expanding suburban area with new housing developments and shopping centers. Growing community with modern infrastructure and amenities.",
        contact: "+1-555-0108",
        color: "#5B81BA",
        image: "https://images.unsplash.com/photo-1464082354059-27db6ce50048?w=800&q=80"
    },
    {
        id: 9,
        name: "Airport Zone",
        description: "Area surrounding the international airport with hotels, cargo facilities, and transport hubs. Major connectivity point for domestic and international travel.",
        contact: "+1-555-0109",
        color: "#6C92CB",
        image: "https://images.unsplash.com/photo-1436491865332-7a61a109cc05?w=800&q=80"
    }
];