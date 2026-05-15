import { readFileSync, writeFileSync } from "node:fs";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));

const REGIONS = [
  // --- NORTHEAST ---
  { slug: "new-york", name: "New York", state: "NY", lat: 40.7128, lng: -74.006, zoom: 11 },
  { slug: "boston", name: "Boston", state: "MA", lat: 42.3601, lng: -71.0589, zoom: 11 },
  { slug: "philadelphia", name: "Philadelphia", state: "PA", lat: 39.9526, lng: -75.1652, zoom: 11 },
  { slug: "washington-dc", name: "Washington", state: "DC", lat: 38.9072, lng: -77.0369, zoom: 11 },
  { slug: "baltimore", name: "Baltimore", state: "MD", lat: 39.2904, lng: -76.6122, zoom: 11 },
  { slug: "pittsburgh", name: "Pittsburgh", state: "PA", lat: 40.4406, lng: -79.9959, zoom: 11 },
  { slug: "newark", name: "Newark", state: "NJ", lat: 40.7357, lng: -74.1724, zoom: 11 },
  { slug: "jersey-city", name: "Jersey City", state: "NJ", lat: 40.7178, lng: -74.0431, zoom: 11 },
  { slug: "buffalo", name: "Buffalo", state: "NY", lat: 42.8864, lng: -78.8784, zoom: 11 },
  { slug: "rochester", name: "Rochester", state: "NY", lat: 43.1566, lng: -77.6088, zoom: 11 },
  { slug: "albany", name: "Albany", state: "NY", lat: 42.6526, lng: -73.7562, zoom: 11 },
  { slug: "hartford", name: "Hartford", state: "CT", lat: 41.7658, lng: -72.6734, zoom: 11 },
  { slug: "new-haven", name: "New Haven", state: "CT", lat: 41.3083, lng: -72.9279, zoom: 11 },
  { slug: "providence", name: "Providence", state: "RI", lat: 41.824, lng: -71.4128, zoom: 11 },
  { slug: "portland-me", name: "Portland", state: "ME", lat: 43.6591, lng: -70.2568, zoom: 11 },
  { slug: "burlington", name: "Burlington", state: "VT", lat: 44.4759, lng: -73.2121, zoom: 11 },
  { slug: "manchester-nh", name: "Manchester", state: "NH", lat: 42.9956, lng: -71.4548, zoom: 11 },
  { slug: "syracuse", name: "Syracuse", state: "NY", lat: 43.0481, lng: -76.1474, zoom: 11 },

  // --- MIDWEST ---
  { slug: "chicago", name: "Chicago", state: "IL", lat: 41.8781, lng: -87.6298, zoom: 11 },
  { slug: "detroit", name: "Detroit", state: "MI", lat: 42.3314, lng: -83.0458, zoom: 11 },
  { slug: "indianapolis", name: "Indianapolis", state: "IN", lat: 39.7684, lng: -86.1581, zoom: 10 },
  { slug: "columbus", name: "Columbus", state: "OH", lat: 39.9612, lng: -82.9988, zoom: 11 },
  { slug: "cleveland", name: "Cleveland", state: "OH", lat: 41.4993, lng: -81.6944, zoom: 11 },
  { slug: "cincinnati", name: "Cincinnati", state: "OH", lat: 39.1031, lng: -84.512, zoom: 11 },
  { slug: "milwaukee", name: "Milwaukee", state: "WI", lat: 43.0389, lng: -87.9065, zoom: 11 },
  { slug: "madison", name: "Madison", state: "WI", lat: 43.0731, lng: -89.4012, zoom: 11 },
  { slug: "grand-rapids", name: "Grand Rapids", state: "MI", lat: 42.9634, lng: -85.6681, zoom: 11 },
  { slug: "st-louis", name: "St. Louis", state: "MO", lat: 38.627, lng: -90.1994, zoom: 11 },
  { slug: "kansas-city", name: "Kansas City", state: "MO", lat: 39.0997, lng: -94.5786, zoom: 11 },
  { slug: "minneapolis", name: "Minneapolis", state: "MN", lat: 44.9778, lng: -93.265, zoom: 11 },
  { slug: "st-paul", name: "St. Paul", state: "MN", lat: 44.9537, lng: -93.09, zoom: 11 },
  { slug: "des-moines", name: "Des Moines", state: "IA", lat: 41.5868, lng: -93.625, zoom: 11 },
  { slug: "omaha", name: "Omaha", state: "NE", lat: 41.2565, lng: -95.9345, zoom: 11 },
  { slug: "wichita", name: "Wichita", state: "KS", lat: 37.6872, lng: -97.3301, zoom: 11 },
  { slug: "topeka", name: "Topeka", state: "KS", lat: 39.0473, lng: -95.6752, zoom: 11 },
  { slug: "akron", name: "Akron", state: "OH", lat: 41.0814, lng: -81.519, zoom: 11 },
  { slug: "toledo", name: "Toledo", state: "OH", lat: 41.6528, lng: -83.5379, zoom: 11 },
  { slug: "dayton", name: "Dayton", state: "OH", lat: 39.7589, lng: -84.1916, zoom: 11 },
  { slug: "fort-wayne", name: "Fort Wayne", state: "IN", lat: 41.0793, lng: -85.1394, zoom: 11 },
  { slug: "south-bend", name: "South Bend", state: "IN", lat: 41.6764, lng: -86.2519, zoom: 11 },
  { slug: "lansing", name: "Lansing", state: "MI", lat: 42.7325, lng: -84.5555, zoom: 11 },
  { slug: "ann-arbor", name: "Ann Arbor", state: "MI", lat: 42.2808, lng: -83.743, zoom: 11 },
  { slug: "springfield-il", name: "Springfield", state: "IL", lat: 39.7817, lng: -89.6501, zoom: 11 },
  { slug: "peoria", name: "Peoria", state: "IL", lat: 40.6936, lng: -89.589, zoom: 11 },
  { slug: "rockford", name: "Rockford", state: "IL", lat: 42.2711, lng: -89.094, zoom: 11 },

  // --- SOUTH ---
  { slug: "atlanta", name: "Atlanta", state: "GA", lat: 33.749, lng: -84.388, zoom: 11 },
  { slug: "miami", name: "Miami", state: "FL", lat: 25.7617, lng: -80.1918, zoom: 10 },
  { slug: "dallas", name: "Dallas", state: "TX", lat: 32.7767, lng: -96.797, zoom: 10 },
  { slug: "houston", name: "Houston", state: "TX", lat: 29.7604, lng: -95.3698, zoom: 11 },
  { slug: "san-antonio", name: "San Antonio", state: "TX", lat: 29.4241, lng: -98.4936, zoom: 10 },
  { slug: "austin", name: "Austin", state: "TX", lat: 30.2672, lng: -97.7431, zoom: 11 },
  { slug: "fort-worth", name: "Fort Worth", state: "TX", lat: 32.7555, lng: -97.3308, zoom: 11 },
  { slug: "el-paso", name: "El Paso", state: "TX", lat: 31.7619, lng: -106.485, zoom: 11 },
  { slug: "arlington-tx", name: "Arlington", state: "TX", lat: 32.7357, lng: -97.1081, zoom: 11 },
  { slug: "corpus-christi", name: "Corpus Christi", state: "TX", lat: 27.8006, lng: -97.3964, zoom: 11 },
  { slug: "plano", name: "Plano", state: "TX", lat: 33.0198, lng: -96.6989, zoom: 11 },
  { slug: "lubbock", name: "Lubbock", state: "TX", lat: 33.5779, lng: -101.8552, zoom: 11 },
  { slug: "charlotte", name: "Charlotte", state: "NC", lat: 35.2271, lng: -80.8431, zoom: 11 },
  { slug: "raleigh", name: "Raleigh", state: "NC", lat: 35.7796, lng: -78.6382, zoom: 11 },
  { slug: "durham", name: "Durham", state: "NC", lat: 35.994, lng: -78.8986, zoom: 11 },
  { slug: "greensboro", name: "Greensboro", state: "NC", lat: 36.0726, lng: -79.792, zoom: 11 },
  { slug: "winston-salem", name: "Winston-Salem", state: "NC", lat: 36.0999, lng: -80.2442, zoom: 11 },
  { slug: "nashville", name: "Nashville", state: "TN", lat: 36.1627, lng: -86.7816, zoom: 11 },
  { slug: "memphis", name: "Memphis", state: "TN", lat: 35.1495, lng: -90.049, zoom: 11 },
  { slug: "knoxville", name: "Knoxville", state: "TN", lat: 35.9606, lng: -83.9207, zoom: 11 },
  { slug: "chattanooga", name: "Chattanooga", state: "TN", lat: 35.0456, lng: -85.3097, zoom: 11 },
  { slug: "birmingham", name: "Birmingham", state: "AL", lat: 33.5186, lng: -86.8104, zoom: 11 },
  { slug: "montgomery", name: "Montgomery", state: "AL", lat: 32.3668, lng: -86.3, zoom: 11 },
  { slug: "mobile", name: "Mobile", state: "AL", lat: 30.6944, lng: -88.0431, zoom: 11 },
  { slug: "huntsville", name: "Huntsville", state: "AL", lat: 34.7304, lng: -86.5861, zoom: 11 },
  { slug: "jacksonville", name: "Jacksonville", state: "FL", lat: 30.3322, lng: -81.6557, zoom: 11 },
  { slug: "tampa", name: "Tampa", state: "FL", lat: 27.9506, lng: -82.4572, zoom: 11 },
  { slug: "orlando", name: "Orlando", state: "FL", lat: 28.5383, lng: -81.3792, zoom: 11 },
  { slug: "st-petersburg", name: "St. Petersburg", state: "FL", lat: 27.7676, lng: -82.6403, zoom: 11 },
  { slug: "fort-lauderdale", name: "Fort Lauderdale", state: "FL", lat: 26.1223, lng: -80.1434, zoom: 11 },
  { slug: "tallahassee", name: "Tallahassee", state: "FL", lat: 30.4383, lng: -84.2807, zoom: 11 },
  { slug: "new-orleans", name: "New Orleans", state: "LA", lat: 29.9511, lng: -90.0715, zoom: 11 },
  { slug: "baton-rouge", name: "Baton Rouge", state: "LA", lat: 30.4515, lng: -91.1871, zoom: 11 },
  { slug: "shreveport", name: "Shreveport", state: "LA", lat: 32.5252, lng: -93.7502, zoom: 11 },
  { slug: "louisville", name: "Louisville", state: "KY", lat: 38.2527, lng: -85.7585, zoom: 11 },
  { slug: "lexington", name: "Lexington", state: "KY", lat: 38.0406, lng: -84.5037, zoom: 11 },
  { slug: "frankfort-ky", name: "Frankfort", state: "KY", lat: 38.2009, lng: -84.8733, zoom: 11 },
  { slug: "richmond", name: "Richmond", state: "VA", lat: 37.5407, lng: -77.436, zoom: 11 },
  { slug: "norfolk", name: "Norfolk", state: "VA", lat: 36.8508, lng: -76.2859, zoom: 11 },
  { slug: "virginia-beach", name: "Virginia Beach", state: "VA", lat: 36.8529, lng: -75.978, zoom: 11 },
  { slug: "arlington-va", name: "Arlington", state: "VA", lat: 38.879, lng: -77.1068, zoom: 11 },
  { slug: "charleston-wv", name: "Charleston", state: "WV", lat: 38.3498, lng: -81.6326, zoom: 11 },
  { slug: "columbia-sc", name: "Columbia", state: "SC", lat: 34.0007, lng: -81.0348, zoom: 11 },
  { slug: "charleston-sc", name: "Charleston", state: "SC", lat: 32.7765, lng: -79.9311, zoom: 11 },
  { slug: "greenville-sc", name: "Greenville", state: "SC", lat: 34.8526, lng: -82.394, zoom: 11 },
  { slug: "jackson-ms", name: "Jackson", state: "MS", lat: 32.2988, lng: -90.1848, zoom: 11 },
  { slug: "gulfport", name: "Gulfport", state: "MS", lat: 30.3674, lng: -89.0928, zoom: 11 },
  { slug: "little-rock", name: "Little Rock", state: "AR", lat: 34.7465, lng: -92.2896, zoom: 11 },
  { slug: "fayetteville-ar", name: "Fayetteville", state: "AR", lat: 36.0626, lng: -94.1604, zoom: 11 },
  { slug: "oklahoma-city", name: "Oklahoma City", state: "OK", lat: 35.4676, lng: -97.5164, zoom: 10 },
  { slug: "tulsa", name: "Tulsa", state: "OK", lat: 36.154, lng: -95.9928, zoom: 11 },
  { slug: "amarillo", name: "Amarillo", state: "TX", lat: 35.2072, lng: -101.8313, zoom: 11 },

  // --- WEST ---
  { slug: "los-angeles", name: "Los Angeles", state: "CA", lat: 34.0522, lng: -118.2437, zoom: 10 },
  { slug: "san-diego", name: "San Diego", state: "CA", lat: 32.7157, lng: -117.1611, zoom: 11 },
  { slug: "san-jose", name: "San Jose", state: "CA", lat: 37.3382, lng: -121.8863, zoom: 11 },
  { slug: "san-francisco", name: "San Francisco", state: "CA", lat: 37.7749, lng: -122.4194, zoom: 11 },
  { slug: "fresno", name: "Fresno", state: "CA", lat: 36.7378, lng: -119.7871, zoom: 11 },
  { slug: "sacramento", name: "Sacramento", state: "CA", lat: 38.5816, lng: -121.4944, zoom: 11 },
  { slug: "long-beach", name: "Long Beach", state: "CA", lat: 33.77, lng: -118.1937, zoom: 11 },
  { slug: "oakland", name: "Oakland", state: "CA", lat: 37.8044, lng: -122.2712, zoom: 11 },
  { slug: "bakersfield", name: "Bakersfield", state: "CA", lat: 35.3733, lng: -119.0187, zoom: 11 },
  { slug: "anaheim", name: "Anaheim", state: "CA", lat: 33.8366, lng: -117.9143, zoom: 11 },
  { slug: "riverside", name: "Riverside", state: "CA", lat: 33.9533, lng: -117.3961, zoom: 11 },
  { slug: "stockton", name: "Stockton", state: "CA", lat: 37.9577, lng: -121.2908, zoom: 11 },
  { slug: "irvine", name: "Irvine", state: "CA", lat: 33.6846, lng: -117.8265, zoom: 11 },
  { slug: "santa-ana", name: "Santa Ana", state: "CA", lat: 33.7455, lng: -117.8677, zoom: 11 },
  { slug: "chula-vista", name: "Chula Vista", state: "CA", lat: 32.6401, lng: -117.0842, zoom: 11 },
  { slug: "modesto", name: "Modesto", state: "CA", lat: 37.6391, lng: -120.9969, zoom: 11 },
  { slug: "oxnard", name: "Oxnard", state: "CA", lat: 34.1975, lng: -119.1771, zoom: 11 },
  { slug: "seattle", name: "Seattle", state: "WA", lat: 47.6062, lng: -122.3321, zoom: 11 },
  { slug: "portland-or", name: "Portland", state: "OR", lat: 45.5152, lng: -122.6784, zoom: 11 },
  { slug: "spokane", name: "Spokane", state: "WA", lat: 47.6588, lng: -117.426, zoom: 11 },
  { slug: "tacoma", name: "Tacoma", state: "WA", lat: 47.2529, lng: -122.4443, zoom: 11 },
  { slug: "vancouver-wa", name: "Vancouver", state: "WA", lat: 45.6387, lng: -122.6615, zoom: 11 },
  { slug: "olympia", name: "Olympia", state: "WA", lat: 47.0379, lng: -122.9007, zoom: 11 },
  { slug: "salem-or", name: "Salem", state: "OR", lat: 44.9429, lng: -123.0351, zoom: 11 },
  { slug: "eugene", name: "Eugene", state: "OR", lat: 44.0521, lng: -123.0868, zoom: 11 },
  { slug: "denver", name: "Denver", state: "CO", lat: 39.7392, lng: -104.9903, zoom: 11 },
  { slug: "colorado-springs", name: "Colorado Springs", state: "CO", lat: 38.8339, lng: -104.8214, zoom: 11 },
  { slug: "aurora-co", name: "Aurora", state: "CO", lat: 39.7294, lng: -104.8319, zoom: 11 },
  { slug: "phoenix", name: "Phoenix", state: "AZ", lat: 33.4484, lng: -112.074, zoom: 10 },
  { slug: "tucson", name: "Tucson", state: "AZ", lat: 32.2226, lng: -110.9747, zoom: 11 },
  { slug: "mesa", name: "Mesa", state: "AZ", lat: 33.4152, lng: -111.8315, zoom: 11 },
  { slug: "chandler", name: "Chandler", state: "AZ", lat: 33.3062, lng: -111.8413, zoom: 11 },
  { slug: "las-vegas", name: "Las Vegas", state: "NV", lat: 36.1699, lng: -115.1398, zoom: 11 },
  { slug: "reno", name: "Reno", state: "NV", lat: 39.5296, lng: -119.8138, zoom: 11 },
  { slug: "carson-city", name: "Carson City", state: "NV", lat: 39.1638, lng: -119.7674, zoom: 11 },
  { slug: "salt-lake-city", name: "Salt Lake City", state: "UT", lat: 40.7608, lng: -111.891, zoom: 11 },
  { slug: "west-valley-city", name: "West Valley City", state: "UT", lat: 40.6916, lng: -111.9373, zoom: 11 },
  { slug: "provo", name: "Provo", state: "UT", lat: 40.2338, lng: -111.6585, zoom: 11 },
  { slug: "albuquerque", name: "Albuquerque", state: "NM", lat: 35.0853, lng: -106.6056, zoom: 11 },
  { slug: "santa-fe", name: "Santa Fe", state: "NM", lat: 35.687, lng: -105.9378, zoom: 11 },
  { slug: "las-cruces", name: "Las Cruces", state: "NM", lat: 32.3199, lng: -106.7637, zoom: 11 },

  // --- MOUNTAIN / PLAINS ---
  { slug: "boise", name: "Boise", state: "ID", lat: 43.615, lng: -116.2023, zoom: 11 },
  { slug: "billings", name: "Billings", state: "MT", lat: 45.7833, lng: -108.5007, zoom: 11 },
  { slug: "helena", name: "Helena", state: "MT", lat: 46.5891, lng: -112.0391, zoom: 11 },
  { slug: "sioux-falls", name: "Sioux Falls", state: "SD", lat: 43.5446, lng: -96.7311, zoom: 11 },
  { slug: "rapid-city", name: "Rapid City", state: "SD", lat: 44.0805, lng: -103.231, zoom: 11 },
  { slug: "fargo", name: "Fargo", state: "ND", lat: 46.8772, lng: -96.7898, zoom: 11 },
  { slug: "bismarck", name: "Bismarck", state: "ND", lat: 46.8083, lng: -100.7837, zoom: 11 },
  { slug: "lincoln", name: "Lincoln", state: "NE", lat: 40.8136, lng: -96.7026, zoom: 11 },
  { slug: "cheyenne", name: "Cheyenne", state: "WY", lat: 41.14, lng: -104.8202, zoom: 11 },
  { slug: "casper", name: "Casper", state: "WY", lat: 42.8666, lng: -106.3131, zoom: 11 },
  { slug: "idaho-falls", name: "Idaho Falls", state: "ID", lat: 43.4916, lng: -112.0331, zoom: 11 },

  // --- TERRITORIES ---
  { slug: "san-juan", name: "San Juan", state: "PR", lat: 18.4663, lng: -66.1057, zoom: 11 },
  { slug: "honolulu", name: "Honolulu", state: "HI", lat: 21.3069, lng: -157.8583, zoom: 11 },
  { slug: "anchorage", name: "Anchorage", state: "AK", lat: 61.2181, lng: -149.9003, zoom: 10 },
];

const ALL_CATS = ["Food", "Shelter", "Hygiene", "Public Resources", "Clothing & Supplies"];

const CATEGORY_MAP = {
  food_pantry: "Food", food_bank: "Food", soup_kitchen: "Food",
  mobile_pantry: "Food", community_fridge: "Food", emergency: "Food",
  school_meal: "Food", summer_meal: "Food", free: "Food",
};

function tagId(s) {
  return s.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
}

function sleep(ms) {
  return new Promise((r) => setTimeout(r, ms));
}

async function fetchFeedAmerica(lat, lng) {
  const url = `https://feedam.org/api/resources/nearby?lat=${lat}&lng=${lng}&mode=free&per_page=50&radius=5`;
  try {
    const res = await fetch(url, { headers: { "User-Agent": "HomelessAidFinder/1.0" } });
    if (!res.ok) return [];
    const data = await res.json();
    if (!data.success || !data.resources) return [];
    return data.resources.map((r) => {
      const typeLabel = (r.resource_type || "").replace(/_/g, " ");
      const desc = r.requirements_text
        ? r.requirements_text
        : `Free ${typeLabel} providing food assistance. Open to all.`;
      return {
        id: `fa-${r.id}`,
        name: r.name,
        category: CATEGORY_MAP[r.resource_type] || "Food",
        description: desc,
        address: r.address || "",
        city: r.city || "",
        state: r.state || "",
        zip: r.zip || "",
        phone: r.phone ? formatPhone(r.phone) : "",
        hours: "",
        lat: r.lat,
        lng: r.lng,
        tags: extractTags(r),
        lastUpdated: r.last_verified_date || "2026-05-14",
      };
    });
  } catch (e) {
    return [];
  }
}

async function fetchOverpass(lat, lng, regionName, state) {
  const box = bbox(lat, lng, 0.2);
  const queries = [
    `node["social_facility"="shelter"](${box});` + `way["social_facility"="shelter"](${box});` + `node["amenity"="shelter"](${box});` + `way["amenity"="shelter"](${box});`,
    `node["social_facility"="soup_kitchen"](${box});` + `way["social_facility"="soup_kitchen"](${box});`,
    `node["social_facility"="food_bank"](${box});` + `way["social_facility"="food_bank"](${box});`,
    `node["social_facility"="clothing_bank"](${box});` + `way["social_facility"="clothing_bank"](${box});`,
    `node["amenity"="library"](${box});` + `way["amenity"="library"](${box});`,
    `node["amenity"="public_bath"](${box});` + `way["amenity"="public_bath"](${box});` + `node["amenity"="public_bathroom"](${box});` + `way["amenity"="public_bathroom"](${box});`,
    `node["shop"="charity"](${box});` + `way["shop"="charity"](${box});`,
  ];

  const all = [];
  for (const q of queries) {
    const body = `[out:json];(${q});out center 10;`;
    let res;
    for (let attempt = 0; attempt < 2; attempt++) {
      try {
        res = await fetch("https://overpass-api.de/api/interpreter", {
          method: "POST",
          headers: { "Content-Type": "application/x-www-form-urlencoded", "User-Agent": "HomelessAidFinder/1.0" },
          body: `data=${encodeURIComponent(body)}`,
        });
        if (res.ok) break;
      } catch (e) { /* retry */ }
      await sleep(1000);
    }
    if (!res || !res.ok) continue;
    try {
      const data = await res.json();
      if (data.elements) {
        for (const el of data.elements) {
          const t = el.tags || {};
          if (!t.name && !t.operator) continue;
          const name = t.name || t.operator;
          if (name === "Unknown") continue;
          const elLat = el.lat ?? el.center?.lat ?? lat;
          const elLng = el.lon ?? el.center?.lon ?? lng;
          let category = "Public Resources";
          let tags = [];
          if (t.amenity === "shelter" || t.social_facility === "shelter") {
            category = "Shelter"; tags = ["shelter", "beds"];
          } else if (t.social_facility === "soup_kitchen") {
            category = "Food"; tags = ["soup kitchen", "meal"];
          } else if (t.social_facility === "food_bank") {
            category = "Food"; tags = ["food bank", "pantry"];
          } else if (t.social_facility === "clothing_bank") {
            category = "Clothing & Supplies"; tags = ["clothing", "free"];
          } else if (t.shop === "charity") {
            category = "Clothing & Supplies"; tags = ["thrift", "charity"];
          } else if (t.amenity === "public_bath" || t.amenity === "public_bathroom") {
            category = "Hygiene"; tags = ["showers", "bath"];
          } else if (t.amenity === "library") {
            category = "Public Resources"; tags = ["library", "wifi", "computers"];
          }
          const addr = [t["addr:street"], t["addr:housenumber"]].filter(Boolean).join(" ");
          if (category !== "Public Resources" && !addr && !t.phone && !t.name?.match(/(shelter|mission|salvation|rescue|center|clinic|library|hope|home)/i)) {
            continue;
          }
          const osmId = `${el.type}-${el.id}`;
          all.push({
            id: `osm-${tagId(osmId)}`, name, category,
            description: t.description || t.amenity || t.social_facility || "",
            address: addr,
            city: t["addr:city"] || regionName,
            state: t["addr:state"] || state,
            zip: t["addr:postcode"] || "",
            phone: t.phone ? formatPhone(t.phone) : "",
            hours: t.opening_hours || "",
            lat: elLat, lng: elLng,
            tags: [...new Set(tags)],
            lastUpdated: "2026-05-14",
          });
        }
      }
    } catch (e) { /* ignore */ }
    await sleep(300);
  }
  return all;
}

async function fetchCity(region) {
  console.log(`  ${region.name}, ${region.state}...`);
  const [food, osm] = await Promise.all([
    fetchFeedAmerica(region.lat, region.lng),
    fetchOverpass(region.lat, region.lng, region.name, region.state),
  ]);
  const seen = new Set();
  const merged = [];
  for (const r of [...food, ...osm]) {
    const key = `${tagId(r.name)}|${r.lat.toFixed(4)}|${r.lng.toFixed(4)}`;
    if (seen.has(key)) continue;
    seen.add(key);
    merged.push(r);
  }
  const catCount = {};
  for (const r of merged) catCount[r.category] = (catCount[r.category] || 0) + 1;
  console.log(`    ${merged.length} total`);
  for (const [cat, count] of Object.entries(catCount)) {
    console.log(`      ${cat}: ${count}`);
  }
  return merged;
}

function bbox(lat, lng, deg) {
  return `${(lat - deg).toFixed(4)},${(lng - deg).toFixed(4)},${(lat + deg).toFixed(4)},${(lng + deg).toFixed(4)}`;
}

function formatPhone(p) {
  const d = p.replace(/\D/g, "");
  if (d.length === 10) return `(${d.slice(0,3)}) ${d.slice(3,6)}-${d.slice(6)}`;
  if (d.length === 11 && d[0] === "1") return `(${d.slice(1,4)}) ${d.slice(4,7)}-${d.slice(7)}`;
  return p;
}

function extractTags(r) {
  const tags = [r.resource_type?.replace(/_/g, " ") || ""].filter(Boolean);
  if (r.accepts_walkins) tags.push("walk-in");
  if (r.requires_appointment) tags.push("appointment");
  return tags;
}

function makeFallback(region, cat, existing) {
  const r = region;
  const now = "2026-05-14";
  const libs = (existing["Public Resources"] || []).filter((x) => x.tags.includes("library"));
  switch (cat) {
    case "Shelter":
      return {
        id: `fallback-${r.slug}-shelter`,
        name: `${r.name} Homeless Services Hotline`,
        category: "Shelter",
        description: "Call 211 for emergency shelter placement and homeless services. Free, confidential, available 24/7.",
        address: "",
        city: r.name, state: r.state, zip: "",
        phone: "(800) 273-8255",
        hours: "24 hours, 7 days a week",
        lat: r.lat, lng: r.lng,
        tags: ["shelter", "hotline", "211"],
        lastUpdated: now,
      };
    case "Hygiene":
      if (libs.length > 0) {
        const l = libs[0];
        return {
          id: `fallback-${r.slug}-hygiene`,
          name: `${l.name} - Restroom Access`,
          category: "Hygiene",
          description: "Free public restrooms, hand washing, and water fountain access. No purchase or library card required.",
          address: l.address, city: l.city, state: l.state, zip: l.zip,
          phone: "",
          hours: l.hours || "During library hours",
          lat: l.lat, lng: l.lng,
          tags: ["restroom", "hygiene", "public", "library"],
          lastUpdated: now,
        };
      }
      return {
        id: `fallback-${r.slug}-hygiene`,
        name: `${r.name} Public Restroom Information`,
        category: "Hygiene",
        description: "Free public restrooms available at libraries, transit stations, and city buildings. Call 311 for locations.",
        address: "", city: r.name, state: r.state, zip: "",
        phone: "", hours: "Varies",
        lat: r.lat, lng: r.lng,
        tags: ["restroom", "hygiene"],
        lastUpdated: now,
      };
    case "Public Resources":
      return {
        id: `fallback-${r.slug}-library`,
        name: `${r.name} Public Library System`,
        category: "Public Resources",
        description: "Public library offering free WiFi, computers, printing, restrooms, and safe indoor space.",
        address: "", city: r.name, state: r.state, zip: "",
        phone: "",
        hours: "Hours vary by branch",
        lat: r.lat, lng: r.lng,
        tags: ["library", "wifi", "computers"],
        lastUpdated: now,
      };
    default:
      return null;
  }
}

let successes = 0, failures = 0;

async function processOne(region) {
  const resources = await fetchCity(region);
  const cats = {};
  for (const r of resources) {
    if (!cats[r.category]) cats[r.category] = [];
    cats[r.category].push(r);
  }
  for (const [cat, items] of Object.entries(cats)) {
    if (items.length > 12) cats[cat] = items.slice(0, 12);
  }
  for (const cat of ALL_CATS) {
    if (!cats[cat] || cats[cat].length === 0) {
      const f = makeFallback(region, cat, cats);
      if (f) cats[cat] = [f];
    }
  }
  try {
    const supps = JSON.parse(readFileSync(join(__dirname, "..", "lib", "data", "supplements.json"), "utf-8"));
    const regionSupps = supps[region.slug];
    if (regionSupps) {
      const existingIds = new Set(Object.values(cats).flat().map((r) => r.id));
      for (const s of regionSupps) {
        if (!existingIds.has(s.id)) {
          if (!cats[s.category]) cats[s.category] = [];
          cats[s.category].push(s);
          existingIds.add(s.id);
        }
      }
    }
  } catch {}
  const pruned = Object.values(cats).flat();
  const filePath = join(__dirname, "..", "lib", "data", `${region.slug}.json`);
  writeFileSync(filePath, JSON.stringify(pruned, null, 2) + "\n");
  successes++;
  const pct = ((successes / REGIONS.length) * 100).toFixed(1);
  process.stdout.write(`  [${pct}%] ${region.name.padEnd(20)} ${pruned.length} resources\n`);
}

async function main() {
  console.log(`Fetching data for ${REGIONS.length} regions in batches of 6...\n`);

  const batchSize = 6;
  for (let i = 0; i < REGIONS.length; i += batchSize) {
    const batch = REGIONS.slice(i, i + batchSize);
    const results = await Promise.allSettled(batch.map((r) => processOne(r)));
    for (const result of results) {
      if (result.status === "rejected") {
        failures++;
        console.error(`  FAILED: ${result.reason?.message || result.reason}`);
      }
    }
  }

  console.log(`\nDone! ${successes} succeeded, ${failures} failed out of ${REGIONS.length} regions.`);
}

main().catch(console.error);
