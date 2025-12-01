CREATE TABLE public.profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  full_name VARCHAR(255),
  phone VARCHAR(20),
  profile_picture_url VARCHAR(500),
  address TEXT,
  city VARCHAR(100),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE TABLE public.hotels (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name VARCHAR(255) NOT NULL,
  location VARCHAR(500) NOT NULL,
  city VARCHAR(100),
  description TEXT,
  rating DECIMAL(2,1),
  total_rooms INTEGER DEFAULT 0,
  available_rooms INTEGER DEFAULT 0,
  price_per_night DECIMAL(10,2) NOT NULL,
  amenities JSONB DEFAULT '[]'::jsonb,
  images JSONB DEFAULT '[]'::jsonb,
  phone VARCHAR(20),
  email VARCHAR(255),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE TABLE public.cabs (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name VARCHAR(255) NOT NULL,
  vehicle_type VARCHAR(100),
  total_vehicles INTEGER DEFAULT 0,
  available_vehicles INTEGER DEFAULT 0,
  price_per_km DECIMAL(10,2) NOT NULL,
  rating DECIMAL(2,1),
  description TEXT,
  image_url VARCHAR(500),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE TABLE public.events (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name VARCHAR(255) NOT NULL,
  category VARCHAR(100),
  venue VARCHAR(500),
  city VARCHAR(100),
  event_date DATE NOT NULL,
  event_time TIME,
  description TEXT,
  total_tickets INTEGER DEFAULT 0,
  available_tickets INTEGER DEFAULT 0,
  price_per_ticket DECIMAL(10,2) NOT NULL,
  rating DECIMAL(2,1),
  images JSONB DEFAULT '[]'::jsonb,
  organizer_name VARCHAR(255),
  organizer_phone VARCHAR(20),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE TABLE public.bookings (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  booking_type VARCHAR(50) NOT NULL,
  hotel_id UUID REFERENCES public.hotels(id) ON DELETE SET NULL,
  cab_id UUID REFERENCES public.cabs(id) ON DELETE SET NULL,
  event_id UUID REFERENCES public.events(id) ON DELETE SET NULL,
  check_in_date DATE,
  check_out_date DATE,
  number_of_rooms INTEGER,
  number_of_guests INTEGER,
  pickup_location VARCHAR(500),
  dropoff_location VARCHAR(500),
  pickup_date DATE,
  pickup_time TIME,
  quantity INTEGER DEFAULT 1,
  total_price DECIMAL(10,2) NOT NULL,
  booking_status VARCHAR(50) DEFAULT 'pending',
  payment_status VARCHAR(50) DEFAULT 'pending',
  confirmation_number VARCHAR(100) UNIQUE,
  special_requests TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE TABLE public.payments (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  booking_id UUID NOT NULL REFERENCES public.bookings(id) ON DELETE CASCADE,
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  amount DECIMAL(10,2) NOT NULL,
  currency VARCHAR(10) DEFAULT 'INR',
  payment_method VARCHAR(50),
  stripe_payment_id VARCHAR(255),
  transaction_status VARCHAR(50) DEFAULT 'pending',
  payment_date TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  receipt_url VARCHAR(500),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.hotels ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.cabs ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.events ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.bookings ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.payments ENABLE ROW LEVEL SECURITY;