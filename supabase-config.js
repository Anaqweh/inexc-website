/**

 * INEXC — إعداد Supabase الموحّد

 * anon public key فقط — لا تستخدم service_role في ملفات HTML

 */

(function () {

  if (!window.supabase) {

    console.error('يجب تحميل @supabase/supabase-js قبل supabase-config.js');

    return;

  }



  const SUPABASE_URL = 'https://mhrrktcrbpvaxqltdtgo.supabase.co';

  const SUPABASE_ANON_KEY =

    'sb_publishable_6Xi7kG2uOpH3O3VttZ0jaA_92cYjkaJ';



  window.SUPABASE_URL = SUPABASE_URL;

  window.SUPABASE_ANON_KEY = SUPABASE_ANON_KEY;

  window.TRACK_EMAIL_OPEN_URL = SUPABASE_URL + '/functions/v1/track-email-open';



  try {

    window.supabaseClient = window.supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

  } catch (initErr) {

    console.error('Supabase client init failed:', initErr);

  }



  window.EMAILJS_PUBLIC_KEY = 'gc0MqAK4Mwebs_GOg';

  window.EMAILJS_SERVICE_ID = 'service_58hjcoc';

  window.EMAILJS_TEMPLATE_ID = 'template_fq8l9x8';

  window.EMAILJS_TEMPLATE_ID_FALLBACK = 'template_o9jfkzn';

})();


