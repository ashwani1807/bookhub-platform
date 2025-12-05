import { useNavigate } from "react-router-dom";
import { MapPin, Wifi, Waves, Dumbbell, Car, Utensils, Wind, Heart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import { Hotel } from "@/services/hotelsService";
import { cn } from "@/lib/utils";

interface HotelCardProps {
  hotel: Hotel;
  checkInDate: string;
  checkOutDate: string;
  rooms: number;
}

const amenityIcons: Record<string, React.ComponentType<{ className?: string }>> = {
  WiFi: Wifi,
  "Swimming Pool": Waves,
  Gym: Dumbbell,
  Parking: Car,
  Restaurant: Utensils,
  "Air Conditioning": Wind,
};

export function HotelCard({ hotel, checkInDate, checkOutDate, rooms }: HotelCardProps) {
  const navigate = useNavigate();

  const renderStars = (rating: number) => {
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 >= 0.5;
    return (
      <div className="flex items-center gap-0.5">
        {Array(5)
          .fill(0)
          .map((_, i) => (
            <span
              key={i}
              className={cn(
                "text-sm",
                i < fullStars
                  ? "text-yellow-400"
                  : i === fullStars && hasHalfStar
                  ? "text-yellow-400"
                  : "text-muted-foreground/30"
              )}
            >
              ★
            </span>
          ))}
      </div>
    );
  };

  const handleViewDetails = () => {
    navigate(`/hotels/${hotel.id}`);
  };

  const handleBookNow = () => {
    navigate(`/checkout?hotelId=${hotel.id}&checkIn=${checkInDate}&checkOut=${checkOutDate}&rooms=${rooms}`);
  };

  // Get first 3 amenities that have icons
  const displayAmenities = hotel.amenities
    .filter((a) => amenityIcons[a])
    .slice(0, 3);

  return (
    <Card className="overflow-hidden transition-all hover:shadow-lg group">
      {/* Image Section */}
      <div className="relative aspect-[4/3] overflow-hidden">
        <img
          src={hotel.image}
          alt={hotel.name}
          className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
        />
        <button
          className="absolute top-3 right-3 p-2 rounded-full bg-background/80 hover:bg-background transition-colors"
          aria-label="Add to favorites"
        >
          <Heart className="h-4 w-4" />
        </button>
        {/* Availability Badge */}
        <Badge
          className={cn(
            "absolute bottom-3 left-3",
            hotel.availableRooms > 0
              ? "bg-green-500 hover:bg-green-600"
              : "bg-destructive hover:bg-destructive"
          )}
        >
          {hotel.availableRooms > 0
            ? `${hotel.availableRooms} rooms available`
            : "No availability"}
        </Badge>
      </div>

      <CardContent className="p-4 space-y-3">
        {/* Hotel Name */}
        <h3 className="font-semibold text-lg text-primary line-clamp-1">{hotel.name}</h3>

        {/* Location */}
        <div className="flex items-center gap-1 text-sm text-muted-foreground">
          <MapPin className="h-4 w-4" />
          <span>
            {hotel.location}, {hotel.city}
          </span>
        </div>

        {/* Rating */}
        <div className="flex items-center gap-2">
          {renderStars(hotel.rating)}
          <span className="text-sm font-medium">{hotel.rating}</span>
          <span className="text-sm text-muted-foreground">({hotel.reviewCount} reviews)</span>
        </div>

        {/* Amenities */}
        <div className="flex items-center gap-2">
          {displayAmenities.map((amenity) => {
            const Icon = amenityIcons[amenity];
            return (
              <Tooltip key={amenity}>
                <TooltipTrigger asChild>
                  <div className="p-1.5 rounded-md bg-muted">
                    <Icon className="h-4 w-4 text-muted-foreground" />
                  </div>
                </TooltipTrigger>
                <TooltipContent>{amenity}</TooltipContent>
              </Tooltip>
            );
          })}
          {hotel.amenities.length > 3 && (
            <span className="text-xs text-muted-foreground">
              +{hotel.amenities.length - 3} more
            </span>
          )}
        </div>

        {/* Price */}
        <div className="pt-2 border-t">
          <div className="flex items-baseline gap-1">
            <span className="text-2xl font-bold text-secondary">
              ${hotel.pricePerNight}
            </span>
            <span className="text-sm text-muted-foreground">/night</span>
          </div>
          <p className="text-xs text-muted-foreground">
            per night for {rooms} room{rooms > 1 ? "s" : ""}
          </p>
        </div>

        {/* Action Buttons */}
        <div className="grid grid-cols-2 gap-2 pt-2">
          <Button variant="outline" onClick={handleViewDetails}>
            View Details
          </Button>
          <Button onClick={handleBookNow} disabled={hotel.availableRooms === 0}>
            Book Now
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
