import { Hotel, Car, Calendar } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { useNavigate } from "react-router-dom";

const Index = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-cyan-50 to-white">
      <nav className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-border">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <h1 className="text-2xl font-bold text-primary">BookHub</h1>
          <div className="flex gap-3">
            <Button variant="outline" onClick={() => navigate("/auth")}>Login</Button>
            <Button onClick={() => navigate("/auth")}>Sign Up</Button>
          </div>
        </div>
      </nav>

      <section className="container mx-auto px-4 py-20 text-center">
        <h2 className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-primary via-secondary to-primary bg-clip-text text-transparent">
          Book Hotels, Cabs & Events
        </h2>
        <p className="text-xl text-muted-foreground mb-12 max-w-2xl mx-auto">
          Instant bookings, real-time updates, best prices - all in one place
        </p>

        <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
          <Card className="hover:shadow-xl transition-all duration-300 cursor-pointer hover:scale-105">
            <CardContent className="pt-8 pb-6">
              <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-primary/10 flex items-center justify-center">
                <Hotel className="w-8 h-8 text-primary" />
              </div>
              <h3 className="text-2xl font-semibold mb-2">Hotels</h3>
              <p className="text-muted-foreground mb-4">5000+ Hotels Worldwide</p>
              <Button className="w-full" onClick={() => navigate("/hotels")}>Browse Hotels</Button>
            </CardContent>
          </Card>

          <Card className="hover:shadow-xl transition-all duration-300 cursor-pointer hover:scale-105">
            <CardContent className="pt-8 pb-6">
              <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-secondary/10 flex items-center justify-center">
                <Car className="w-8 h-8 text-secondary" />
              </div>
              <h3 className="text-2xl font-semibold mb-2">Cabs</h3>
              <p className="text-muted-foreground mb-4">24/7 Available Rides</p>
              <Button className="w-full" onClick={() => navigate("/cabs")}>Book Cabs</Button>
            </CardContent>
          </Card>

          <Card className="hover:shadow-xl transition-all duration-300 cursor-pointer hover:scale-105">
            <CardContent className="pt-8 pb-6">
              <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-accent/10 flex items-center justify-center">
                <Calendar className="w-8 h-8 text-accent" />
              </div>
              <h3 className="text-2xl font-semibold mb-2">Events</h3>
              <p className="text-muted-foreground mb-4">Exclusive Event Tickets</p>
              <Button className="w-full" onClick={() => navigate("/events")}>Find Events</Button>
            </CardContent>
          </Card>
        </div>
      </section>
    </div>
  );
};

export default Index;
