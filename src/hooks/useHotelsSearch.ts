import { useState, useEffect, useCallback } from "react";
import { useSearchParams } from "react-router-dom";
import { searchHotels, Hotel, HotelSearchParams } from "@/services/hotelsService";
import { format, addDays } from "date-fns";

const defaultFilters: HotelSearchParams = {
  city: "",
  checkInDate: format(new Date(), "yyyy-MM-dd"),
  checkOutDate: format(addDays(new Date(), 1), "yyyy-MM-dd"),
  guests: 1,
  rooms: 1,
  minPrice: 0,
  maxPrice: 500,
  minRating: 0,
  amenities: [],
  sortBy: "recommended",
  page: 1,
  limit: 20,
};

export function useHotelsSearch() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [filters, setFilters] = useState<HotelSearchParams>(() => {
    // Initialize from URL params if available
    const city = searchParams.get("city") || defaultFilters.city;
    const checkInDate = searchParams.get("checkIn") || defaultFilters.checkInDate;
    const checkOutDate = searchParams.get("checkOut") || defaultFilters.checkOutDate;
    const guests = parseInt(searchParams.get("guests") || String(defaultFilters.guests));
    const rooms = parseInt(searchParams.get("rooms") || String(defaultFilters.rooms));
    const minPrice = parseInt(searchParams.get("minPrice") || String(defaultFilters.minPrice));
    const maxPrice = parseInt(searchParams.get("maxPrice") || String(defaultFilters.maxPrice));
    const minRating = parseFloat(searchParams.get("minRating") || String(defaultFilters.minRating));
    const amenitiesParam = searchParams.get("amenities");
    const amenities = amenitiesParam ? amenitiesParam.split(",") : defaultFilters.amenities;
    const sortBy = searchParams.get("sortBy") || defaultFilters.sortBy;
    const page = parseInt(searchParams.get("page") || String(defaultFilters.page));

    return {
      city,
      checkInDate,
      checkOutDate,
      guests,
      rooms,
      minPrice,
      maxPrice,
      minRating,
      amenities,
      sortBy,
      page,
      limit: defaultFilters.limit,
    };
  });

  const [hotels, setHotels] = useState<Hotel[]>([]);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [message, setMessage] = useState<string | null>(null);

  const updateURLParams = useCallback((newFilters: HotelSearchParams) => {
    const params = new URLSearchParams();
    if (newFilters.city) params.set("city", newFilters.city);
    if (newFilters.checkInDate !== defaultFilters.checkInDate) params.set("checkIn", newFilters.checkInDate);
    if (newFilters.checkOutDate !== defaultFilters.checkOutDate) params.set("checkOut", newFilters.checkOutDate);
    if (newFilters.guests !== defaultFilters.guests) params.set("guests", String(newFilters.guests));
    if (newFilters.rooms !== defaultFilters.rooms) params.set("rooms", String(newFilters.rooms));
    if (newFilters.minPrice !== defaultFilters.minPrice) params.set("minPrice", String(newFilters.minPrice));
    if (newFilters.maxPrice !== defaultFilters.maxPrice) params.set("maxPrice", String(newFilters.maxPrice));
    if (newFilters.minRating !== defaultFilters.minRating) params.set("minRating", String(newFilters.minRating));
    if (newFilters.amenities.length > 0) params.set("amenities", newFilters.amenities.join(","));
    if (newFilters.sortBy !== defaultFilters.sortBy) params.set("sortBy", newFilters.sortBy);
    if (newFilters.page !== 1) params.set("page", String(newFilters.page));
    setSearchParams(params);
  }, [setSearchParams]);

  const fetchHotels = useCallback(async (searchFilters: HotelSearchParams) => {
    setLoading(true);
    setError(null);
    setMessage(null);

    try {
      const response = await searchHotels(searchFilters);
      if (response.success) {
        setHotels(response.data.hotels);
        setTotal(response.data.total);
        if (response.message) {
          setMessage(response.message);
        }
      }
    } catch (err) {
      setError("Failed to load hotels. Please try again.");
      setHotels([]);
      setTotal(0);
    } finally {
      setLoading(false);
    }
  }, []);

  // Fetch hotels on filter changes
  useEffect(() => {
    fetchHotels(filters);
    updateURLParams(filters);
  }, [filters, fetchHotels, updateURLParams]);

  const updateFilters = useCallback((newFilters: Partial<HotelSearchParams>) => {
    setFilters((prev) => ({
      ...prev,
      ...newFilters,
      page: newFilters.page ?? 1, // Reset page when filters change unless explicitly set
    }));
  }, []);

  const clearFilters = useCallback(() => {
    setFilters(defaultFilters);
  }, []);

  const setPage = useCallback((page: number) => {
    setFilters((prev) => ({ ...prev, page }));
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  const setSortBy = useCallback((sortBy: string) => {
    setFilters((prev) => ({ ...prev, sortBy, page: 1 }));
  }, []);

  const retry = useCallback(() => {
    fetchHotels(filters);
  }, [fetchHotels, filters]);

  return {
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
  };
}
