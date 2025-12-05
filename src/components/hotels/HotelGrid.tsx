import { Hotel } from "@/services/hotelsService";
import { HotelCard } from "./HotelCard";
import { Skeleton } from "@/components/ui/skeleton";
import { Button } from "@/components/ui/button";
import { AlertCircle, SearchX } from "lucide-react";

interface HotelGridProps {
  hotels: Hotel[];
  loading: boolean;
  error: string | null;
  message: string | null;
  checkInDate: string;
  checkOutDate: string;
  rooms: number;
  onClearFilters: () => void;
  onRetry: () => void;
}

function HotelSkeleton() {
  return (
    <div className="rounded-lg border bg-card overflow-hidden">
      <Skeleton className="aspect-[4/3] w-full" />
      <div className="p-4 space-y-3">
        <Skeleton className="h-6 w-3/4" />
        <Skeleton className="h-4 w-1/2" />
        <Skeleton className="h-4 w-1/3" />
        <div className="flex gap-2">
          <Skeleton className="h-8 w-8 rounded-md" />
          <Skeleton className="h-8 w-8 rounded-md" />
          <Skeleton className="h-8 w-8 rounded-md" />
        </div>
        <Skeleton className="h-8 w-1/2" />
        <div className="grid grid-cols-2 gap-2 pt-2">
          <Skeleton className="h-10 w-full" />
          <Skeleton className="h-10 w-full" />
        </div>
      </div>
    </div>
  );
}

export function HotelGrid({
  hotels,
  loading,
  error,
  message,
  checkInDate,
  checkOutDate,
  rooms,
  onClearFilters,
  onRetry,
}: HotelGridProps) {
  // Loading state
  if (loading) {
    return (
      <div className="space-y-4">
        <p className="text-muted-foreground">Searching hotels...</p>
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">
          {Array(6)
            .fill(0)
            .map((_, i) => (
              <HotelSkeleton key={i} />
            ))}
        </div>
      </div>
    );
  }

  // Error state
  if (error) {
    return (
      <div className="flex flex-col items-center justify-center py-16 text-center">
        <AlertCircle className="h-12 w-12 text-destructive mb-4" />
        <h3 className="text-lg font-semibold mb-2">Something went wrong</h3>
        <p className="text-muted-foreground mb-4">{error}</p>
        <Button onClick={onRetry}>Try Again</Button>
      </div>
    );
  }

  // Empty state with message (no city selected)
  if (message && hotels.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-16 text-center">
        <SearchX className="h-12 w-12 text-muted-foreground mb-4" />
        <h3 className="text-lg font-semibold mb-2">Select a City</h3>
        <p className="text-muted-foreground">{message}</p>
      </div>
    );
  }

  // Empty state (no results)
  if (hotels.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-16 text-center">
        <SearchX className="h-12 w-12 text-muted-foreground mb-4" />
        <h3 className="text-lg font-semibold mb-2">No hotels found</h3>
        <p className="text-muted-foreground mb-4">
          No hotels found matching your criteria. Try adjusting filters.
        </p>
        <Button variant="outline" onClick={onClearFilters}>
          Clear Filters
        </Button>
      </div>
    );
  }

  // Results grid
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">
      {hotels.map((hotel) => (
        <HotelCard
          key={hotel.id}
          hotel={hotel}
          checkInDate={checkInDate}
          checkOutDate={checkOutDate}
          rooms={rooms}
        />
      ))}
    </div>
  );
}
