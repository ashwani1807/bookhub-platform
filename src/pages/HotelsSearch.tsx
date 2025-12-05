import { Link } from "react-router-dom";
import { ArrowLeft, Hotel } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { HotelFilters } from "@/components/hotels/HotelFilters";
import { HotelGrid } from "@/components/hotels/HotelGrid";
import { HotelPagination } from "@/components/hotels/HotelPagination";
import { useHotelsSearch } from "@/hooks/useHotelsSearch";

const SORT_OPTIONS = [
  { value: "recommended", label: "Recommended" },
  { value: "price_low", label: "Price: Low to High" },
  { value: "price_high", label: "Price: High to Low" },
  { value: "rating", label: "Rating: Highest First" },
  { value: "most_booked", label: "Most Booked" },
];

export default function HotelsSearch() {
  const {
    filters,
    hotels,
    total,
    loading,
    error,
    message,
    updateFilters,
    clearFilters,
    setPage,
    setSortBy,
    retry,
  } = useHotelsSearch();

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="sticky top-0 z-40 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-16 items-center justify-between">
          <div className="flex items-center gap-4">
            <Link to="/">
              <Button variant="ghost" size="icon">
                <ArrowLeft className="h-5 w-5" />
              </Button>
            </Link>
            <div className="flex items-center gap-2">
              <Hotel className="h-6 w-6 text-primary" />
              <span className="text-xl font-bold text-primary">BookHub</span>
            </div>
          </div>
          <Link to="/auth">
            <Button variant="outline">Sign In</Button>
          </Link>
        </div>
      </header>

      {/* Main Content */}
      <main className="container py-6 pb-24 lg:pb-6">
        <div className="flex gap-6">
          {/* Filters Sidebar */}
          <HotelFilters
            filters={filters}
            onFiltersChange={updateFilters}
            onClearFilters={clearFilters}
            loading={loading}
          />

          {/* Results Area */}
          <div className="flex-1 min-w-0">
            {/* Search Header */}
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
              <div>
                <h1 className="text-2xl font-bold">
                  {filters.city ? `Hotels in ${filters.city}` : "Search Hotels"}
                </h1>
                {!loading && !error && filters.city && (
                  <p className="text-muted-foreground">
                    Found {total} hotel{total !== 1 ? "s" : ""} matching your search
                  </p>
                )}
              </div>

              <div className="flex items-center gap-2">
                <span className="text-sm text-muted-foreground whitespace-nowrap">Sort by:</span>
                <Select value={filters.sortBy} onValueChange={setSortBy}>
                  <SelectTrigger className="w-[180px]">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {SORT_OPTIONS.map((option) => (
                      <SelectItem key={option.value} value={option.value}>
                        {option.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            {/* Hotels Grid */}
            <HotelGrid
              hotels={hotels}
              loading={loading}
              error={error}
              message={message}
              checkInDate={filters.checkInDate}
              checkOutDate={filters.checkOutDate}
              rooms={filters.rooms}
              onClearFilters={clearFilters}
              onRetry={retry}
            />

            {/* Pagination */}
            {!loading && !error && hotels.length > 0 && (
              <HotelPagination
                currentPage={filters.page}
                totalItems={total}
                itemsPerPage={filters.limit}
                onPageChange={setPage}
              />
            )}
          </div>
        </div>
      </main>
    </div>
  );
}
