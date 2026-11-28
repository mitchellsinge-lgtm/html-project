/* MIH — sends website enquiries straight to the CRM as leads (Formspree no longer used).
   Load on every page with a quote form:  <script src="crm-lead.js" defer></script>
   Each page's form handler calls window.mihSubmitLead(form). It returns a fetch Response,
   so the page shows "Thanks" and fires the Google Ads / Meta / GA4 lead events only when the
   CRM accepted the lead. Bots and bad phone numbers are stopped earlier by the page's spam guard.
   The anon key is public by design; it can only call the submit_lead function. */
(function () {
  var URL_ = 'https://bshgncnxqmdanwtcgase.supabase.co';
  var KEY  = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImJzaGduY254cW1kYW53dGNnYXNlIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODI3MDkxNTYsImV4cCI6MjA5ODI4NTE1Nn0.fRPPqBe8kg0CpXg7-AASalXCE_c1qZ_kwMIKqWAig6c';

  window.mihSubmitLead = function (form) {
    function v(n) { var el = form.elements[n]; return el ? String(el.value || '').trim() : ''; }
    var body = {
      p_name: v('name'), p_phone: v('phone'), p_email: v('email'),
      p_suburb: v('suburb'), p_service: v('service'), p_message: v('message'),
      p_source: v('_source') || v('_source_page') || location.pathname
    };
    return fetch(URL_ + '/rest/v1/rpc/submit_lead', {
      method: 'POST', keepalive: true,
      headers: { 'Content-Type': 'application/json', 'apikey': KEY, 'Authorization': 'Bearer ' + KEY },
      body: JSON.stringify(body)
    });
  };
})();
