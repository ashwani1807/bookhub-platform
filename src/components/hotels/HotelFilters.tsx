import { useState } from "react";
import { format } from "date-fns";
import { CalendarIcon, MapPin, Users, Minus, Plus, X, Filter } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Slider } from "@/components/ui/slider";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "@/components/ui/command";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { HotelSearchParams } from "@/services/hotelsService";
import { CITIES, AMENITIES } from "@/services/hotelsService";

interface HotelFiltersProps {
  filters: HotelSearchParams;
  onFiltersChange: (filters: Partial<HotelSearchParams>) => void;
  onClearFilters: () => void;
  loading: boolean;
}

const RATING_OPTIONS = [
  { label: "All Ratings", value: 0 },
  { label: "1 star & up", value: 1 },
  { label: "2 stars & up", value: 2 },
  { label: "3 stars & up", value: 3 },
  { label: "4 stars & up", value: 4 },
  { label: "5 stars only", value: 5 },
];

function FiltersContent({
  filters,
  onFiltersChange,
  onClearFilters,
  loading,
}: HotelFiltersProps) {
  const [cityOpen, setCityOpen] = useState(false);
  const [checkInOpen, setCheckInOpen] = useState(false);
  const [checkOutOpen, setCheckOutOpen] = useState(false);
  const [localPriceRange, setLocalPriceRange] = useState<[number, number]>([
    filters.minPrice,
    filters.maxPrice,
  ]);

  const handleCitySelect = (city: string) => {
    onFiltersChange({ city });
    setCityOpen(false);
  };

  const handleCheckInSelect = (date: Date | undefined) => {
    if (date) {
      onFiltersChange({ checkInDate: format(date, "yyyy-MM-dd") });
      setCheckInOpen(false);
    }
  };

  const handleCheckOutSelect = (date: Date | undefined) => {
    if (date) {
      onFiltersChange({ checkOutDate: format(date, "yyyy-MM-dd") });
      setCheckOutOpen(false);
    }
  };

  const handleGuestsChange = (delta: number) => {
    const newGuests = Math.max(1, Math.min(10, filters.guests + delta));
    onFiltersChange({ guests: newGuests });
  };

  const handleRoomsChange = (delta: number) => {
    const newRooms = Math.max(1, Math.min(5, filters.rooms + delta));
    onFiltersChange({ rooms: newRooms });
  };

  const handlePriceChange = (value: number[]) => {
    setLocalPriceRange([value[0], value[1]]);
  };

  const handlePriceCommit = () => {
    onFiltersChange({ minPrice: localPriceRange[0], maxPrice: localPriceRange[1] });
  };

  const handleRatingChange = (rating: number) => {
    onFiltersChange({ minRating: rating });
  };

  const handleAmenityToggle = (amenity: string) => {
    const newAmenities = filters.amenities.includes(amenity)
      ? filters.amenities.filter((a) => a !== amenity)
      : [...filters.amenities, amenity];
    onFiltersChange({ amenities: newAmenities });
  };

  const renderStars = (count: number) => {
    return Array(5)
      .fill(0)
      .map((_, i) => (
        <span key={i} className={i < count ? "text-yellow-400" : "text-muted-foreground/30"}>
          ★
        </span>
      ));
  };

  return (
    <div className="space-y-6">
      {/* City / Location */}
      <div className="space-y-2">
        <Label className="text-sm font-medium">City / Location</Label>
        <Popover open={cityOpen} onOpenChange={setCityOpen}>
          <PopoverTrigger asChild>
            <Button
              variant="outline"
              role="combobox"
              className="w-full justify-start text-left font-normal"
            >
              <MapPin className="mr-2 h-4 w-4 text-muted-foreground" />
              {filters.city || "Select a city..."}
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-full p-0" align="start">
            <Command>
              <CommandInput placeholder="Search cities..." />
              <CommandList>
                <CommandEmpty>No city found.</CommandEmpty>
                <CommandGroup>
                  {CITIES.map((city) => (
                    <CommandItem key={city} value={city} onSelect={() => handleCitySelect(city)}>
                      {city}
                    </CommandItem>
                  ))}
                </CommandGroup>
              </CommandList>
            </Command>
          </PopoverContent>
        </Popover>
      </div>

      {/* Travel Dates */}
      <div className="space-y-2">
        <Label className="text-sm font-medium">Travel Dates</Label>
        <div className="grid grid-cols-2 gap-2">
          <Popover open={checkInOpen} onOpenChange={setCheckInOpen}>
            <PopoverTrigger asChild>
              <Button variant="outline" className="w-full justify-start text-left font-normal text-sm">
                <CalendarIcon className="mr-2 h-4 w-4" />
                {filters.checkInDate ? format(new Date(filters.checkInDate), "MMM d") : "Check-in"}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0" align="start">
              <Calendar
                mode="single"
                selected={new Date(filters.checkInDate)}
                onSelect={handleCheckInSelect}
                disabled={(date) => date < new Date()}
                initialFocus
                className="pointer-events-auto"
              />
            </PopoverContent>
          </Popover>
          <Popover open={checkOutOpen} onOpenChange={setCheckOutOpen}>
            <PopoverTrigger asChild>
              <Button variant="outline" className="w-full justify-start text-left font-normal text-sm">
                <CalendarIcon className="mr-2 h-4 w-4" />
                {filters.checkOutDate ? format(new Date(filters.checkOutDate), "MMM d") : "Check-out"}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0" align="start">
              <Calendar
                mode="single"
                selected={new Date(filters.checkOutDate)}
                onSelect={handleCheckOutSelect}
                disabled={(date) => date <= new Date(filters.checkInDate)}
                initialFocus
                className="pointer-events-auto"
              />
            </PopoverContent>
          </Popover>
        </div>
      </div>

      {/* Guests & Rooms */}
      <div className="space-y-2">
        <Label className="text-sm font-medium">Guests & Rooms</Label>
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Users className="h-4 w-4 text-muted-foreground" />
              <span className="text-sm">Guests</span>
            </div>
            <div className="flex items-center gap-2">
              <Button
                variant="outline"
                size="icon"
                className="h-8 w-8"
                onClick={() => handleGuestsChange(-1)}
                disabled={filters.guests <= 1}
              >
                <Minus className="h-4 w-4" />
              </Button>
              <span className="w-8 text-center text-sm font-medium">{filters.guests}</span>
              <Button
                variant="outline"
                size="icon"
                className="h-8 w-8"
                onClick={() => handleGuestsChange(1)}
                disabled={filters.guests >= 10}
              >
                <Plus className="h-4 w-4" />
              </Button>
            </div>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-sm">Rooms</span>
            <div className="flex items-center gap-2">
              <Button
                variant="outline"
                size="icon"
                className="h-8 w-8"
                onClick={() => handleRoomsChange(-1)}
                disabled={filters.rooms <= 1}
              >
                <Minus className="h-4 w-4" />
              </Button>
              <span className="w-8 text-center text-sm font-medium">{filters.rooms}</span>
              <Button
                variant="outline"
                size="icon"
                className="h-8 w-8"
                onClick={() => handleRoomsChange(1)}
                disabled={filters.rooms >= 5}
              >
                <Plus className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Price Range */}
      <div className="space-y-3">
        <Label className="text-sm font-medium">Price per night ($)</Label>
        <Slider
          value={localPriceRange}
          onValueChange={handlePriceChange}
          onValueCommit={handlePriceCommit}
          min={0}
          max={500}
          step={10}
          className="mt-2"
        />
        <div className="flex justify-between text-xs text-muted-foreground">
          <span>${localPriceRange[0]}</span>
          <span>${localPriceRange[1]}+</span>
        </div>
      </div>

      {/* Rating Filter */}
      <div className="space-y-2">
        <Label className="text-sm font-medium">Hotel Rating</Label>
        <div className="space-y-2">
          {RATING_OPTIONS.map((option) => (
            <div key={option.value} className="flex items-center space-x-2">
              <Checkbox
                id={`rating-${option.value}`}
                checked={filters.minRating === option.value}
                onCheckedChange={() => handleRatingChange(option.value)}
              />
              <label
                htmlFor={`rating-${option.value}`}
                className="flex items-center gap-2 text-sm cursor-pointer"
              >
                {option.value > 0 ? renderStars(option.value) : null}
                <span className="text-muted-foreground">{option.label}</span>
              </label>
            </div>
          ))}
        </div>
      </div>

      {/* Amenities Filter */}
      <div className="space-y-2">
        <Label className="text-sm font-medium">Amenities</Label>
        <div className="space-y-2">
          {AMENITIES.map((amenity) => (
            <div key={amenity} className="flex items-center space-x-2">
              <Checkbox
                id={`amenity-${amenity}`}
                checked={filters.amenities.includes(amenity)}
                onCheckedChange={() => handleAmenityToggle(amenity)}
              />
              <label htmlFor={`amenity-${amenity}`} className="text-sm cursor-pointer">
                {amenity}
              </label>
            </div>
          ))}
        </div>
      </div>

      {/* Action Buttons */}
      <div className="space-y-2 pt-4 border-t">
        <Button className="w-full" disabled={loading}>
          {loading ? "Searching..." : "Apply Filters"}
        </Button>
        <Button variant="outline" className="w-full" onClick={onClearFilters}>
          <X className="mr-2 h-4 w-4" />
          Clear All
        </Button>
      </div>
    </div>
  );
}

export function HotelFilters(props: HotelFiltersProps) {
  return (
    <>
      {/* Desktop Sidebar */}
      <aside className="hidden lg:block w-72 shrink-0">
        <div className="sticky top-4 rounded-lg border bg-card p-6">
          <h2 className="text-lg font-semibold mb-4">Refine Your Search</h2>
          <FiltersContent {...props} />
        </div>
      </aside>

      {/* Mobile Filter Sheet */}
      <div className="lg:hidden fixed bottom-4 left-4 right-4 z-50">
        <Sheet>
          <SheetTrigger asChild>
            <Button className="w-full shadow-lg">
              <Filter className="mr-2 h-4 w-4" />
              Filters
            </Button>
          </SheetTrigger>
          <SheetContent side="bottom" className="h-[85vh] overflow-y-auto">
            <SheetHeader>
              <SheetTitle>Refine Your Search</SheetTitle>
            </SheetHeader>
            <div className="mt-4 pb-20">
              <FiltersContent {...props} />
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </>
  );
}
