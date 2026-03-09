-- Create role enum
CREATE TYPE public.app_role AS ENUM ('admin', 'user');

-- Create user_roles table
CREATE TABLE public.user_roles (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
    role public.app_role NOT NULL DEFAULT 'user',
    UNIQUE (user_id, role)
);

ALTER TABLE public.user_roles ENABLE ROW LEVEL SECURITY;

CREATE OR REPLACE FUNCTION public.has_role(_user_id uuid, _role app_role)
RETURNS boolean
LANGUAGE sql STABLE SECURITY DEFINER SET search_path = public
AS $$
  SELECT EXISTS (
    SELECT 1 FROM public.user_roles
    WHERE user_id = _user_id AND role = _role
  )
$$;

CREATE POLICY "Users can view their own roles" ON public.user_roles
    FOR SELECT USING (auth.uid() = user_id);

-- Trigger to create user_role automatically
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS trigger
LANGUAGE plpgsql SECURITY DEFINER SET search_path = public
AS $$
BEGIN
  IF NEW.email = 'lcarreola@hotmail.com' THEN
    INSERT INTO public.user_roles (user_id, role) VALUES (NEW.id, 'admin');
  ELSE
    INSERT INTO public.user_roles (user_id, role) VALUES (NEW.id, 'user');
  END IF;
  RETURN NEW;
END;
$$;

CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- Create products table
CREATE TABLE public.products (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    slug TEXT UNIQUE NOT NULL,
    sku TEXT,
    nombre TEXT NOT NULL,
    marca TEXT,
    modelo TEXT,
    categoria TEXT NOT NULL,
    subcategoria TEXT,
    descripcion_corta TEXT,
    descripcion_comercial TEXT,
    caracteristicas TEXT[],
    beneficios TEXT[],
    especificaciones JSONB,
    aplicaciones TEXT[],
    imagen_principal TEXT,
    galeria TEXT[],
    video_opcional TEXT,
    ficha_tecnica_pdf TEXT,
    garantia TEXT,
    instalacion TEXT,
    refacciones_relacionadas TEXT[],
    productos_relacionados TEXT[],
    destacado BOOLEAN DEFAULT false,
    activo BOOLEAN DEFAULT true,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

ALTER TABLE public.products ENABLE ROW LEVEL SECURITY;

-- Products are public to view
CREATE POLICY "Products are viewable by everyone" ON public.products
    FOR SELECT USING (true);

-- Only admins can modify products
CREATE POLICY "Admins can insert products" ON public.products
    FOR INSERT WITH CHECK (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins can update products" ON public.products
    FOR UPDATE USING (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins can delete products" ON public.products
    FOR DELETE USING (public.has_role(auth.uid(), 'admin'));

-- Storage buckets
INSERT INTO storage.buckets (id, name, public) VALUES ('product-media', 'product-media', true);

CREATE POLICY "Product media is publicly accessible" ON storage.objects
    FOR SELECT USING (bucket_id = 'product-media');

CREATE POLICY "Admins can upload product media" ON storage.objects
    FOR INSERT WITH CHECK (bucket_id = 'product-media' AND public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins can update product media" ON storage.objects
    FOR UPDATE USING (bucket_id = 'product-media' AND public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins can delete product media" ON storage.objects
    FOR DELETE USING (bucket_id = 'product-media' AND public.has_role(auth.uid(), 'admin'));