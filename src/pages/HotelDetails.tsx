import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { 
  ArrowLeft, 
  Star, 
  MapPin, 
  Wifi, 
  Car, 
  Dumbbell, 
  Utensils, 
  Waves, 
  Wind, 
  Phone, 
  Mail,
  Users,
  Check,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { getHotelById, HotelDetails as HotelDetailsType } from "@/services/hotelsService";
import { useToast } from "@/hooks/use-toast";

const amenityIcons: Record<string, React.ReactNode> = {
  WiFi: <Wifi className="h-5 w-5" />,
  "Swimming Pool": <Waves className="h-5 w-5" />,
  Gym: <Dumbbell className="h-5 w-5" />,
  Parking: <Car className="h-5 w-5" />,
  "Valet Parking": <Car className="h-5 w-5" />,
  Restaurant: <Utensils className="h-5 w-5" />,
  "Air Conditioning": <Wind className="h-5 w-5" />,
  "Room Service": <Utensils className="h-5 w-5" />,
  Spa: <Waves className="h-5 w-5" />,
};

export default function HotelDetails() {
  const { hotelId } = useParams<{ hotelId: string }>();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [hotel, setHotel] = useState<HotelDetailsType | null>(null);
  const [loading, setLoading] = useState(true);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    async function fetchHotel() {
      if (!hotelId) return;
      setLoading(true);
      const response = await getHotelById(hotelId);
      if (response.success && response.data) {
        setHotel(response.data);
      } else {
        toast({
          title: "Error",
          description: response.message || "Hotel not found",
          variant: "destructive",
        });
        navigate("/hotels/search");
      }
      setLoading(false);
    }
    fetchHotel();
  }, [hotelId, navigate, toast]);

  const handleBookNow = () => {
    navigate(`/checkout?hotelId=${hotelId}`);
  };

  const nextImage = () => {
    if (hotel) {
      setCurrentImageIndex((prev) => (prev + 1) % hotel.images.length);
    }
  };

  const prevImage = () => {
    if (hotel) {
      setCurrentImageIndex((prev) => (prev - 1 + hotel.images.length) % hotel.images.length);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-background">
        <div className="container mx-auto px-4 py-8">
          <Skeleton className="h-8 w-32 mb-6" />
          <Skeleton className="h-[400px] w-full rounded-xl mb-8" />
          <div className="grid lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 space-y-6">
              <Skeleton className="h-10 w-3/4" />
              <Skeleton className="h-32 w-full" />
              <Skeleton className="h-48 w-full" />
            </div>
            <Skeleton className="h-64 w-full" />
          </div>
        </div>
      </div>
    );
  }

  if (!hotel) return null;

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        className={`h-5 w-5 ${i < Math.floor(rating) ? "fill-yellow-400 text-yellow-400" : "text-muted-foreground"}`}
      />
    ));
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-background/95 backdrop-blur border-b">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <Button variant="ghost" onClick={() => navigate(-1)} className="gap-2">
            <ArrowLeft className="h-4 w-4" />
            Back
          </Button>
          <Button onClick={handleBookNow} size="lg">
            Book Now - ${hotel.pricePerNight}/night
          </Button>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        {/* Photo Gallery */}
        <section className="mb-8">
          <div className="relative rounded-xl overflow-hidden">
            <img
              src={hotel.images[currentImageIndex]}
              alt={`${hotel.name} - Image ${currentImageIndex + 1}`}
              className="w-full h-[300px] md:h-[400px] lg:h-[500px] object-cover"
            />
            <Button
              variant="secondary"
              size="icon"
              className="absolute left-4 top-1/2 -translate-y-1/2 bg-background/80 hover:bg-background"
              onClick={prevImage}
            >
              <ChevronLeft className="h-5 w-5" />
            </Button>
            <Button
              variant="secondary"
              size="icon"
              className="absolute right-4 top-1/2 -translate-y-1/2 bg-background/80 hover:bg-background"
              onClick={nextImage}
            >
              <ChevronRight className="h-5 w-5" />
            </Button>
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
              {hotel.images.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => setCurrentImageIndex(idx)}
                  className={`w-2 h-2 rounded-full transition-colors ${
                    idx === currentImageIndex ? "bg-primary" : "bg-background/60"
                  }`}
                />
              ))}
            </div>
          </div>
          {/* Thumbnail Strip */}
          <div className="flex gap-2 mt-4 overflow-x-auto pb-2">
            {hotel.images.map((img, idx) => (
              <button
                key={idx}
                onClick={() => setCurrentImageIndex(idx)}
                className={`flex-shrink-0 rounded-lg overflow-hidden border-2 transition-colors ${
                  idx === currentImageIndex ? "border-primary" : "border-transparent"
                }`}
              >
                <img src={img} alt={`Thumbnail ${idx + 1}`} className="w-20 h-14 object-cover" />
              </button>
            ))}
          </div>
        </section>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Hotel Title & Info */}
            <section>
              <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-2">{hotel.name}</h1>
              <div className="flex flex-wrap items-center gap-4 text-muted-foreground mb-4">
                <span className="flex items-center gap-1">
                  <MapPin className="h-4 w-4" />
                  {hotel.location}, {hotel.city}, {hotel.country}
                </span>
                <span className="flex items-center gap-1">
                  {renderStars(hotel.rating)}
                  <span className="ml-1 font-medium text-foreground">{hotel.rating}</span>
                  <span>({hotel.reviewCount} reviews)</span>
                </span>
              </div>
              <Badge variant={hotel.availableRooms > 0 ? "default" : "destructive"} className="text-sm">
                {hotel.availableRooms > 0 ? `${hotel.availableRooms} rooms available` : "No availability"}
              </Badge>
            </section>

            {/* Full Description */}
            <section>
              <h2 className="text-2xl font-semibold mb-4">About This Hotel</h2>
              <div className="prose prose-muted max-w-none">
                {hotel.fullDescription.split("\n\n").map((paragraph, idx) => (
                  <p key={idx} className="text-muted-foreground mb-4 leading-relaxed">
                    {paragraph}
                  </p>
                ))}
              </div>
            </section>

            {/* Amenities */}
            <section>
              <h2 className="text-2xl font-semibold mb-4">Amenities</h2>
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {hotel.amenities.map((amenity) => (
                  <div
                    key={amenity}
                    className="flex items-center gap-3 p-3 bg-muted/50 rounded-lg"
                  >
                    <div className="text-primary">
                      {amenityIcons[amenity] || <Check className="h-5 w-5" />}
                    </div>
                    <span className="text-sm font-medium">{amenity}</span>
                  </div>
                ))}
              </div>
            </section>

            {/* Room Types */}
            <section>
              <h2 className="text-2xl font-semibold mb-4">Room Types</h2>
              <div className="space-y-4">
                {hotel.roomTypes.map((room) => (
                  <Card key={room.type}>
                    <CardContent className="p-4 flex flex-col md:flex-row md:items-center justify-between gap-4">
                      <div className="flex-1">
                        <h3 className="font-semibold text-lg">{room.type}</h3>
                        <div className="flex items-center gap-2 text-muted-foreground text-sm">
                          <Users className="h-4 w-4" />
                          <span>Up to {room.capacity} guests</span>
                        </div>
                        <Badge variant="outline" className="mt-2">
                          {room.available > 0 ? `${room.available} available` : "Sold out"}
                        </Badge>
                      </div>
                      <div className="text-right">
                        <p className="text-2xl font-bold text-primary">${room.price}</p>
                        <p className="text-sm text-muted-foreground">per night</p>
                        <Button
                          className="mt-2"
                          disabled={room.available === 0}
                          onClick={() => navigate(`/checkout?hotelId=${hotelId}&roomType=${encodeURIComponent(room.type)}`)}
                        >
                          Select Room
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </section>

            {/* Reviews */}
            <section>
              <h2 className="text-2xl font-semibold mb-4">Guest Reviews</h2>
              <div className="space-y-4">
                {hotel.reviews.map((review) => (
                  <Card key={review.id}>
                    <CardContent className="p-4">
                      <div className="flex items-start gap-4">
                        <div className="w-10 h-10 rounded-full bg-muted overflow-hidden flex-shrink-0">
                          {review.avatar ? (
                            <img src={review.avatar} alt={review.userName} className="w-full h-full object-cover" />
                          ) : (
                            <div className="w-full h-full flex items-center justify-center text-muted-foreground font-medium">
                              {review.userName.charAt(0)}
                            </div>
                          )}
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center justify-between mb-1">
                            <h4 className="font-semibold">{review.userName}</h4>
                            <span className="text-sm text-muted-foreground">{review.date}</span>
                          </div>
                          <div className="flex items-center gap-1 mb-2">
                            {Array.from({ length: 5 }, (_, i) => (
                              <Star
                                key={i}
                                className={`h-4 w-4 ${
                                  i < review.rating ? "fill-yellow-400 text-yellow-400" : "text-muted"
                                }`}
                              />
                            ))}
                          </div>
                          <p className="text-muted-foreground">{review.comment}</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </section>

            {/* Hotel Policies */}
            <section>
              <h2 className="text-2xl font-semibold mb-4">Hotel Policies</h2>
              <ul className="space-y-2">
                {hotel.policies.map((policy, idx) => (
                  <li key={idx} className="flex items-center gap-2 text-muted-foreground">
                    <Check className="h-4 w-4 text-primary" />
                    {policy}
                  </li>
                ))}
              </ul>
            </section>
          </div>

          {/* Sidebar - Booking Card & Map */}
          <div className="space-y-6">
            {/* Booking Card */}
            <Card className="sticky top-24">
              <CardHeader>
                <CardTitle className="flex items-baseline gap-2">
                  <span className="text-3xl font-bold text-primary">${hotel.pricePerNight}</span>
                  <span className="text-muted-foreground font-normal">/ night</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center gap-1 text-sm">
                  {renderStars(hotel.rating)}
                  <span className="ml-1 font-medium">{hotel.rating}</span>
                  <span className="text-muted-foreground">({hotel.reviewCount} reviews)</span>
                </div>
                <Button className="w-full" size="lg" onClick={handleBookNow}>
                  Book Now
                </Button>
                <p className="text-xs text-center text-muted-foreground">
                  Free cancellation available
                </p>
                <hr className="border-border" />
                <div className="space-y-2">
                  <h4 className="font-semibold">Contact</h4>
                  <a
                    href={`tel:${hotel.contactPhone}`}
                    className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
                  >
                    <Phone className="h-4 w-4" />
                    {hotel.contactPhone}
                  </a>
                  <a
                    href={`mailto:${hotel.contactEmail}`}
                    className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
                  >
                    <Mail className="h-4 w-4" />
                    {hotel.contactEmail}
                  </a>
                </div>
              </CardContent>
            </Card>

            {/* Map */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg flex items-center gap-2">
                  <MapPin className="h-5 w-5 text-primary" />
                  Location
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="aspect-video rounded-lg overflow-hidden bg-muted">
                  <iframe
                    title="Hotel Location"
                    width="100%"
                    height="100%"
                    style={{ border: 0 }}
                    loading="lazy"
                    src={`https://www.google.com/maps/embed/v1/place?key=AIzaSyBFw0Qbyq9zTFTd-tUY6dZWTgaQzuU17R8&q=${encodeURIComponent(
                      `${hotel.name}, ${hotel.location}, ${hotel.city}`
                    )}&zoom=15`}
                  />
                </div>
                <p className="mt-3 text-sm text-muted-foreground">
                  {hotel.location}, {hotel.city}, {hotel.country}
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </div>
  );
}