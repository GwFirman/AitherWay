import { useState } from "react";
import { MapPin } from "lucide-react";
import { FaCircle, FaRegCircle, FaAdjust } from "react-icons/fa";

const travelData = [
  {
    id: 1,
    title: "Bali",
    location: "Indonesia",
    rating: 4.8,
    description:
      "Bali is a living postcard, an Indonesian paradise that feels like a fantasy. With its lush rice terraces, majestic volcanoes, and pristine beaches, Bali attracts travelers from all over the world seeking relaxation, adventure, and cultural immersion. The island is known for its vibrant spiritual life, traditional dance performances, and world-class surf spots. Ubud’s tranquil environment and art markets contrast beautifully with the lively beach scenes of Kuta and Seminyak. Whether you're exploring ancient temples, participating in a yoga retreat, or enjoying local Balinese cuisine, Bali offers an unforgettable experience for every type of traveler.",
  },
  {
    id: 2,
    title: "Raja Ampat",
    location: "Indonesia",
    rating: 4.9,
    description:
      "Raja Ampat offers one of the most spectacular marine biodiversities on earth, making it a diver’s dream destination. Located in West Papua, this remote archipelago consists of over 1,500 small islands, cays, and shoals. The waters around Raja Ampat boast over 1,400 species of fish and 600 species of coral, making snorkeling and diving here an awe-inspiring experience. Above water, visitors are treated to breathtaking limestone cliffs, hidden lagoons, and serene beaches with powdery white sand. Because of its remoteness, the islands remain relatively untouched, preserving their pristine beauty and natural wonders.",
  },
  {
    id: 3,
    title: "Yogyakarta",
    location: "Indonesia",
    rating: 4.7,
    description:
      "Yogyakarta is the cultural heartbeat of Java and a city where tradition and modernity coexist harmoniously. It is a center of classical Javanese fine art and culture, including batik, ballet, drama, music, poetry, and puppet shows. The city is home to the UNESCO World Heritage sites of Borobudur and Prambanan temples, both offering deep historical significance and architectural grandeur. Yogyakarta is also famous for its street food, vibrant markets, and warm, welcoming locals. Visitors can explore royal palaces, watch shadow puppet performances, and take part in traditional craft-making workshops that reflect the city's deep-rooted heritage.",
  },
  {
    id: 4,
    title: "Lombok",
    location: "Indonesia",
    rating: 4.6,
    description:
      "Lombok, the neighbor of Bali, offers a more laid-back and serene island experience, ideal for travelers looking to escape the crowds. Known for its sweeping beaches, world-class surfing spots, and the towering Mount Rinjani volcano, Lombok is a paradise for nature lovers and adventure seekers. The island’s Sasak culture provides a unique identity, and local markets brim with traditional textiles and crafts. Waterfalls hidden in the hills and quiet fishing villages along the coast add to the charm. Gili Islands, located just off the northwest coast, offer vibrant nightlife and clear turquoise waters perfect for diving and snorkeling.",
  },
  {
    id: 5,
    title: "Komodo Island",
    location: "Indonesia",
    rating: 4.8,
    description:
      "Komodo Island is a land of mythical beasts and raw natural beauty, home to the world’s largest lizard — the Komodo dragon. Located in the Lesser Sunda chain of islands, this UNESCO World Heritage site is part of Komodo National Park. Beyond its famous reptiles, the island boasts dramatic hills, pink-sand beaches, and some of the best diving spots in the world, teeming with manta rays and vibrant coral reefs. The rugged landscapes and crystal-clear waters create an adventure-laden atmosphere perfect for trekking, island-hopping, and immersing oneself in untamed wilderness. A visit to Komodo promises thrilling encounters and scenic tranquility.",
  },
];

function renderCircles(rating: number) {
  const circles = [];
  for (let i = 1; i <= 5; i++) {
    if (rating >= i) {
      circles.push(<FaCircle key={i} className="text-rose-500 size-4" />);
    } else if (rating > i - 1 && rating < i) {
      circles.push(
        <FaAdjust
          key={i}
          className="text-rose-500 size-4"
        />
      );
    } else {
      circles.push(<FaRegCircle key={i} className="text-rose-500" size={18} />);
    }
  }
  return circles;
}

const TravelCard = () => {
  return (
    <div className="flex flex-col gap-6 px-4 py-6">
      {travelData.map(({ id, title, rating, location, description }) => (
        <div
          key={id}
          className="max-w-4xl mx-auto bg-white/95 backdrop-blur-md rounded-2xl shadow-sm flex flex-col xl:flex-row overflow-hidden"
        >
          <div className="w-full xl:w-[320px] flex-shrink-0 relative h-48 xl:h-auto bg-gradient-to-br from-green-500 via-teal-400 to-sky-300 overflow-hidden group">
            <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent z-10"></div>
            <div className="absolute inset-0 bg-pattern opacity-10 z-0"></div>
          </div>

          {/* Content Section - Improved spacing and typography */}
          <div className="flex-1 p-6 xl:p-8 flex flex-col justify-between bg-gradient-to-br from-white to-slate-50/50">
            <div>
              {/* Header section */}
              <div className="flex flex-col">
                <div className="text-rose-400/80 text-md font-medium tracking-wider">
                  {id.toString().padStart(2, "0")}
                </div>
                <h1 className="text-2xl sm:text-3xl font-bold text-slate-800 tracking-tight">
                  <a href="">{title}</a>
                </h1>

                {/* Rating - Improved alignment */}
                <div className="flex items-center gap-2 mt-1">
                  <div className="flex items-center gap-0.5">
                    {renderCircles(rating)}
                  </div>
                  <span className="text-slate-600 text-sm">({rating})</span>
                </div>

                {/* Location - More subtle styling */}
                <div className="flex items-center gap-1.5 text-slate-500 text-sm hover:text-rose-500 transition-colors duration-200 group mt-1">
                  <MapPin
                    size={14}
                    className="group-hover:scale-110 transition-transform duration-200"
                  />
                  <span className="underline decoration-1 underline-offset-4 decoration-slate-200 group-hover:decoration-rose-200">
                    <a href="">{location}</a>
                  </span>
                </div>
              </div>

              {/* Description - Improved typography */}
              <div className="mt-6">
                <p
                  className="text-slate-600 text-base leading-relaxed overflow-hidden"
                  style={{
                    display: "-webkit-box",
                    WebkitLineClamp: 3,
                    WebkitBoxOrient: "vertical",
                  }}
                >
                  {description}
                </p>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default TravelCard;
