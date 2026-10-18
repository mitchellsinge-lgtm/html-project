/* MIH — sends website enquiries to the CRM as leads (alongside Formspree).
   Add to the website repo root and load with:  <script src="crm-lead.js" defer></script>
   The anon key is public by design; it can only call the submit_lead function. */
(function () {
  var URL_ = 'https://bshgncnxqmdanwtcgase.supabase.co';
  var KEY  = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImJzaGduY254cW1kYW53dGNnYXNlIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODI3MDkxNTYsImV4cCI6MjA5ODI4NTE1Nn0.fRPPqBe8kg0CpXg7-AASalXCE_c1qZ_kwMIKqWAig6c';
  if (URL_.indexOf('YOUR-') === 0) return;

  // Runs in the bubble phase, AFTER the page's spam guard. Bots / bad phone numbers are
  // stopped there (stopImmediatePropagation), so they never reach this handler.
  document.addEventListener('submit', function (e) {
    var form = e.target;
    if (!form || !form.classList || !form.classList.contains('enquiry-form')) return;
    function v(n) { var el = form.elements[n]; return el ? String(el.value || '').trim() : ''; }
    var body = {
      p_name: v('name'), p_phone: v('phone'), p_email: v('email'),
      p_suburb: v('suburb'), p_service: v('service'), p_message: v('message'),
      p_source: v('_source') || location.pathname
    };
    if (!body.p_name) return;
    try {
      fetch(URL_ + '/rest/v1/rpc/submit_lead', {
        method: 'POST', keepalive: true,
        headers: { 'Content-Type': 'application/json', 'apikey': KEY, 'Authorization': 'Bearer ' + KEY },
        body: JSON.stringify(body)
      }).catch(function () {});
    } catch (err) {}
  });
})();
