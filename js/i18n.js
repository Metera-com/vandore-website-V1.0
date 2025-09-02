(function(){
  var STORAGE_KEY = 'siteLang';
  var DEFAULT_LANG = (localStorage.getItem(STORAGE_KEY) || 'lv') === 'lv' ? 'lv' : 'en';

  var translations = {
    titles: {
      'Vandore Heritage - Homepage': { lv: 'Vandore Heritage - Sākumlapa' },
      'Vandore Heritage - About Us': { lv: 'Vandore Heritage - Par mums' },
      'Vandore Heritage - Blog': { lv: 'Vandore Heritage - Blogs' },
      'Vandore Heritage - Contact Us': { lv: 'Vandore Heritage - Sazinieties ar mums' },
      'Vandore Heritage - FAQs': { lv: 'Vandore Heritage - Biežāk uzdotie jautājumi' },
      'Vandore Heritage - Pricing Plan': { lv: 'Vandore Heritage - Cenu plāns' },
      'Vandore Heritage - Properties': { lv: 'Vandore Heritage - Īpašumi' },
      'Vandore Heritage - Property Details': { lv: 'Vandore Heritage - Īpašuma detaļas' },
      'Vandore Heritage - Single Post': { lv: 'Vandore Heritage - Raksts' },
      'Vandore Heritage - Our Rentals': { lv: 'Vandore Heritage - Nomas piedāvājumi' },
      'Vandore Heritage - Our Team': { lv: 'Vandore Heritage - Komanda' },
      'Vandore Heritage - Services': { lv: 'Vandore Heritage - Pakalpojumi' },
      'Vandore Heritage - 404 Not Found': { lv: 'Vandore Heritage - 404 Lapa nav atrasta' }
    },
    aria: {
      'Close': { lv: 'Aizvērt' },
      'Switch to English': { lv: 'Pārslēgt uz angļu valodu' },
      'Pārslēgt uz latviešu valodu': { lv: 'Pārslēgt uz latviešu valodu' }
    },
    text: {
      // Global header/footer
      'Menu': { lv: 'Izvēlne' },
      'Home': { lv: 'Sākumlapa' },
      'About': { lv: 'Par mums' },
      'About Us': { lv: 'Par mums' },
      'Properties': { lv: 'Īpašumi' },
      'Rentals': { lv: 'Nomas' },
      'Service': { lv: 'Pakalpojumi' },
      'Services': { lv: 'Pakalpojumi' },
      'Contact': { lv: 'Kontakti' },
      'Contact Us': { lv: 'Sazinieties ar mums' },
      'News': { lv: 'Jaunumi' },
      'Terms & Conditions': { lv: 'Lietošanas noteikumi' },
      'Privacy Notice': { lv: 'Privātuma paziņojums' },

      // Offcanvas numbered items
      '01. Homepage': { lv: '01. Sākumlapa' },
      '02. Properties': { lv: '02. Īpašumi' },
      '03. Short Form Rentals': { lv: '03. Īstermiņa īres' },
      '04. About Us': { lv: '04. Par mums' },
      '05. Services': { lv: '05. Pakalpojumi' },
      '06. Contact': { lv: '06. Kontakti' },
      '07. News': { lv: '07. Jaunumi' },

      // Index hero
      "This isn’t just business. It’s an attitude.": { lv: 'Tas nav tikai bizness. Tā ir attieksme.' },
      'We represent properties that speak — and clients who value being heard. Vandore Heritage is our promise: to work with care, to stay present beyond the deal.': {
        lv: 'Mēs pārstāvam īpašumus, kas runā, — un klientus, kuri novērtē, ka viņus uzklausa. “Vandore Heritage” ir mūsu solījums: strādāt ar rūpību un būt klātesošiem arī pēc darījuma.'
      },
      'Explore More': { lv: 'Uzzināt vairāk' },

      // Index About
      'Our story': { lv: 'Mūsu stāsts' },
      'What is Vandore Heritage?': { lv: 'Kas ir Vandore Heritage?' },
      'We have 5 years of experience in the real estate market.': { lv: 'Mums ir 5 gadu pieredze nekustamo īpašumu tirgū.' },
      'Listings Curated': { lv: 'Atlasīti piedāvājumi' },
      'Closed Volume (12 mo)': { lv: 'Slēgtais apjoms (12 mēn)' },
      'Projects Delivered': { lv: 'Realizētie projekti' },
      'Trusted Partners': { lv: 'Uzticamie partneri' },

      // Services section (index)
      'Real estate services customized for you': { lv: 'Nekustamo īpašumu pakalpojumi tieši jums' },
      'Personalized solutions to help you buy, sell, or invest in real estate with ease.': { lv: 'Personalizēti risinājumi pirkšanai, pārdošanai vai ieguldījumiem nekustamajā īpašumā.' },
      'Property Buying Assistance': { lv: 'Palīdzība īpašuma iegādē' },
      'Helping you sell your property quickly and at the best price with expert marketing, negotiation, and closing support.': { lv: 'Palīdzam ātri un par labāko cenu pārdot īpašumu ar profesionālu mārketingu, pārrunām un noslēgšanas atbalstu.' },
      'Learn More': { lv: 'Uzzināt vairāk' },
      'Property Selling Assistance': { lv: 'Palīdzība īpašuma pārdošanā' },
      'Property Rental Services': { lv: 'Īres pakalpojumi' },
      'Assisting landlords and tenants in finding the perfect rental match with seamless leasing and management solutions.': { lv: 'Palīdzam īpašniekiem un īrniekiem atrast piemērotāko risinājumu ar ērtu nomas procesu un pārvaldību.' },
      'Uncover a Wide Range of Ways We Can Assist You.\n                            Browse Through All Our Services Now!': { lv: 'Atklājiet plašu iespēju klāstu, kā varam palīdzēt.\nApskatiet visus mūsu pakalpojumus!' },
      'More Service': { lv: 'Vairāk pakalpojumu' },

      // Featured properties CTA
      'Explore Your Perfect Home': { lv: 'Atrodiet savu ideālo mājokli' },

      // How it works
      'Explore Properties': { lv: 'Pārlūkojiet īpašumus' },
      'Browse a wide selection of properties to\n                                find the perfect home.': { lv: 'Pārlūkojiet plašu īpašumu klāstu, lai atrastu sev piemērotāko mājokli.' },
      'Connect with Experts': { lv: 'Sazinieties ar ekspertiem' },
      'Get professional guidance from real\n                                estate experts to make informed.': { lv: 'Saņemiet profesionālu nekustamo īpašumu ekspertu atbalstu, lai pieņemtu pārdomātus lēmumus.' },
      'Connect with Our Team': { lv: 'Sazinieties ar mūsu komandu' },
      'Receive clear, practical guidance from advisors who stay with you through the entire process.': { lv: 'Saņemiet skaidru, praktisku atbalstu no konsultantiem, kuri ir ar jums visā procesā.' },
      'Seal the Deal': { lv: 'Noslēdziet darījumu' },
      'Navigate negotiations and finalize\n                                    transactions smoothly': { lv: 'Pārliecinoši virziet pārrunas un noslēdziet darījumu.' },
      'Move through negotiations and closing with confidence and care.': { lv: 'Pārliecinoši virziet pārrunas un noslēdziet darījumu ar rūpību.' },
      'From exploring listings to expert advice and closing, Vandore Heritage guides you every step of the way.': { lv: 'No piedāvājumu izpētes līdz noslēgšanai — “Vandore Heritage” ir ar jums katrā solī.' },
      'Explore, connect, and close — guided by Vandore Heritage from first call to handover.': { lv: 'Iepazīstiet, sazinieties un noslēdziet darījumu — ar “Vandore Heritage” atbalstu no pirmā zvana līdz atslēgu nodošanai.' },

      // Testimonials / generic
      'Why they love us': { lv: 'Kāpēc mūs izvēlas' },
      'Discover the voices of our satisfied clients who have experienced firsthand the exceptional\n                        service and expertise we provide in helping them find their dream homes.': { lv: 'Uzziniet, ko saka mūsu klienti par piedzīvoto kvalitāti un atbalstu ceļā uz viņu sapņu mājām.' },
      'From start to finish, Royal Residence guided me through every step of the\n                                            process. Their advice was invaluable, and they helped me secure a beautiful\n                                            home. I couldn’t be happier!': { lv: 'No sākuma līdz beigām komanda mani atbalstīja ik solī. Viņu padomi bija nenovērtējami, un es iegādājos lielisku mājokli. Esmu ļoti apmierināts!' },
      'The team at Vandore Heritage was fantastic! They provided expert guidance,\n                                            answered all my questions, and made the process smooth. I’m very pleased\n                                            with my new home, thanks to their support!': { lv: '“Vandore Heritage” komanda bija lieliska! Saņēmu profesionālu atbalstu, atbildes uz jautājumiem un raitu procesu. Pateicoties viņiem, esmu ļoti apmierināta ar savu jauno mājokli!' },
      'Vandore Heritage made my home-buying experience smooth and\n                                            enjoyable. Their\n                                            team was professional, responsive, and dedicated to helping me\n                                            find the\n                                            perfect property that suited my needs. I highly recommend their services!': { lv: 'Ar “Vandore Heritage” mājokļa iegāde bija viegla un patīkama. Komanda ir profesionāla, atsaucīga un patiesi ieinteresēta palīdzēt atrast piemērotāko īpašumu. Iesaku!' },
      'I had a great experience with the Vandore Heritage team. They\n                                            listened to my\n                                            needs and provided excellent options. Great service and very knowledgeable!': { lv: 'Man bija lieliska pieredze ar “Vandore Heritage” komandu. Viņi uzklausīja manas vajadzības un piedāvāja izcilas izvēles. Teicams serviss un zinoša komanda!' },

      // FAQ / Buttons
      'Client Support Questions': { lv: 'Biežāk uzdotie jautājumi' },
      'Still Have Question?': { lv: 'Vēl jautājumi?' },

      // Blog list header common
      'Articles Related to Aestetic Home Design': { lv: 'Raksti par estētisku mājokļa dizainu' },
      'Browse All Post': { lv: 'Skatīt visus rakstus' },

      // Footer contact block
      'Get Contact': { lv: 'Kontakti' },
      'Back To Home': { lv: 'Atpakaļ uz sākumlapu' },

      // Properties page bits
      'Discover carefully selected homes and spaces across Riga, chosen for their quality, character, and individuality.': { lv: 'Atklājiet rūpīgi atlasītas mājas un telpas Rīgā — kvalitātes, rakstura un individualitātes dēļ.' },
      'Explore Featured Homes': { lv: 'Iepazīstiet īpašos piedāvājumus' },
      'Contact Our Agents': { lv: 'Sazinieties ar mūsu aģentiem' },
      'Filters': { lv: 'Filtri' },
      'Location': { lv: 'Atrašanās vieta' },
      'Price Range': { lv: 'Cenu diapazons' },
      'Bedrooms': { lv: 'Guļamistabas' },
      'All': { lv: 'Visi' },
      'Apply': { lv: 'Piemērot' },
      'Clear': { lv: 'Notīrīt' },
      'No properties found': { lv: 'Īpašumi netika atrasti' },
      'Try adjusting your filters or clear all filters': { lv: 'Pamēģiniet mainīt filtrus vai notīrīt tos visus' },

      // Rentals
      'Our Rentals': { lv: 'Nomas piedāvājumi' },
      'Curated stays in Riga—setup, management, and guest support handled with care.': { lv: 'Rūpīgi atlasītas uzturēšanās vietas Rīgā — sagatavošana, pārvaldība un atbalsts viesiem.' },
      'Browse stays': { lv: 'Skatīt piedāvājumus' }
    }
  };

  function setTitle(lang){
    var current = document.title.trim();
    var map = translations.titles[current];
    if(map && map[lang]) document.title = map[lang];
  }

  function setMetaOgLocale(lang){
    try{
      var m = document.querySelector('meta[property="og:locale"]');
      if(!m){ m = document.createElement('meta'); m.setAttribute('property','og:locale'); document.head.appendChild(m); }
      m.setAttribute('content', lang==='lv' ? 'lv_LV' : 'en_US');
    }catch(e){}
  }

  function replaceTextNodes(lang){
    var targets = Array.prototype.slice.call(document.querySelectorAll('h1,h2,h3,h4,h5,h6,p,span,a,button,li,th,td,div'));
    for(var i=0;i<targets.length;i++){
      var el = targets[i];
      if(el.children && el.children.length>0) continue; // avoid replacing wrappers with nested elements
      var txt = (el.textContent||'').trim();
      if(!txt) continue;
      var map = translations.text[txt];
      if(map && map[lang]){
        el.textContent = map[lang];
      }
    }

    // Attribute adjustments (close buttons etc.)
    var closeBtns = document.querySelectorAll('button[aria-label], .btn-close');
    for(var j=0;j<closeBtns.length;j++){
      var b = closeBtns[j];
      var label = b.getAttribute('aria-label');
      if(label && translations.aria[label] && translations.aria[label][lang]){
        b.setAttribute('aria-label', translations.aria[label][lang]);
      }
    }
  }

  function setToggleState(lang){
    var enBtn = document.getElementById('lang-en');
    var lvBtn = document.getElementById('lang-lv');
    if(enBtn && lvBtn){
      enBtn.setAttribute('aria-pressed', lang==='en' ? 'true' : 'false');
      lvBtn.setAttribute('aria-pressed', lang==='lv' ? 'true' : 'false');
    }
  }

  function applyLanguage(lang){
    lang = (lang==='lv') ? 'lv' : 'en';
    document.documentElement.setAttribute('lang', lang);
    setMetaOgLocale(lang);
    setTitle(lang);
    replaceTextNodes(lang);
    setToggleState(lang);
  }

  function onReady(fn){
    if(document.readyState === 'loading') document.addEventListener('DOMContentLoaded', fn, { once:true });
    else fn();
  }

  onReady(function(){
    // Initialize toggle
    var container = document.querySelector('.lang-switch');
    if(container && !container.__i18nBound){
      container.__i18nBound = true;
      container.addEventListener('click', function(e){
        var t = e.target;
        if(t && t.classList && t.classList.contains('lang-btn')){
          var lang = t.getAttribute('data-lang');
          localStorage.setItem(STORAGE_KEY, lang);
          applyLanguage(lang);
        }
      });
      // Keyboard activation is native for buttons
    }

    // Apply saved/default language
    var saved = localStorage.getItem(STORAGE_KEY) || DEFAULT_LANG;
    localStorage.setItem(STORAGE_KEY, saved);
    applyLanguage(saved);
  });
})();
