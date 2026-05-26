-- INEXC — تفعيل الحذف النهائي للمتدربين من لوحة الإدارة
-- Supabase → SQL Editor → Run

ALTER TABLE public.registrations DISABLE ROW LEVEL SECURITY;
ALTER TABLE public.payments DISABLE ROW LEVEL SECURITY;
ALTER TABLE public.trainee_messages DISABLE ROW LEVEL SECURITY;
ALTER TABLE public.certificates DISABLE ROW LEVEL SECURITY;
ALTER TABLE public.trainee_enrollments DISABLE ROW LEVEL SECURITY;
ALTER TABLE public.coupon_redemptions DISABLE ROW LEVEL SECURITY;

GRANT USAGE ON SCHEMA public TO anon, authenticated, service_role;
GRANT DELETE ON public.registrations TO anon, authenticated, service_role;
GRANT DELETE ON public.payments TO anon, authenticated, service_role;
GRANT DELETE ON public.trainee_messages TO anon, authenticated, service_role;
GRANT DELETE ON public.certificates TO anon, authenticated, service_role;
GRANT DELETE ON public.trainee_enrollments TO anon, authenticated, service_role;
GRANT DELETE ON public.coupon_redemptions TO anon, authenticated, service_role;

NOTIFY pgrst, 'reload schema';
