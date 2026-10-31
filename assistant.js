(function() {
  const host = document.createElement('div');
  host.id = 'baaeva-assistant-widget';
  document.body.appendChild(host);
  const root = host.attachShadow({ mode: 'open' });
  root.innerHTML = `
    <style>
:host { all: initial; font-family:'Karla', Arial, sans-serif; color:#1f2530; }
:host, * { box-sizing:border-box; }
#baaevaChatFab{
  position:fixed; right:22px; bottom:22px; width:68px; height:68px; border-radius:999px;
  border:0; cursor:pointer; z-index:2147483647; background:#13294b; color:#fff;
  display:flex; align-items:center; justify-content:center; box-shadow:0 14px 34px rgba(0,0,0,.28);
  transition:transform .16s ease, box-shadow .16s ease; overflow:hidden;
}
#baaevaChatFab:hover{transform:translateY(-2px) scale(1.03); box-shadow:0 18px 42px rgba(0,0,0,.34);}
#baaevaChatFab img{width:100%; height:100%; object-fit:cover; padding:8px; background:#fff;}
#baaevaChatFab .fab-icon{font-size:30px; line-height:1;}
#baaevaChatFab .fab-close{font-size:30px; font-weight:700; display:none;}
#baaevaChatWindow{
  position:fixed; right:22px; bottom:102px; width:480px; max-width:calc(100vw - 28px); height:760px;
  max-height:calc(100vh - 125px); z-index:2147483646; display:none;
  background:#f4f6f9 !important;
  border-radius:18px;
  overflow:hidden;
  box-shadow:0 20px 50px rgba(18,49,40,0.18);
  isolation:isolate;
}
#baaevaChatWindow.open{display:block; animation:baaevaPop .18s ease-out;}
@keyframes baaevaPop{from{opacity:0; transform:translateY(12px) scale(.98);}to{opacity:1; transform:translateY(0) scale(1);}}
#baaevaChatWindow .app{height:100%; max-height:none; width:100%; background:#f4f6f9 !important;}
@media (max-width:520px){
  #baaevaChatFab{right:16px; bottom:16px; width:64px; height:64px;}
  #baaevaChatWindow{right:0; bottom:0; width:100vw; max-width:100vw; height:100vh; max-height:100vh; background:#f4f6f9; border-radius:0;}
  #baaevaChatWindow .app{border-radius:0; border:none;}
}


  @import url('https://fonts.googleapis.com/css2?family=Fraunces:ital,wght@0,500;0,600;0,700;1,500&family=Karla:wght@400;500;600;700&display=swap');

  :root{
    --ink:#1f2530;
    --paper:#f4f6f9;
    --teal:#13294b;
    --teal-deep:#0b1a33;
    --gold:#c8202f;
    --gold-light:#e8616c;
    --line:#d7dde6;
    --bubble-bot:#ffffff;
    --bubble-user:#13294b;
  }
  *{box-sizing:border-box;}
.app{
    width:100%;
    max-width:480px;
    background:#f4f6f9 !important;
    border:1px solid var(--line);
    border-radius:18px;
    overflow:hidden;
    box-shadow:0 20px 50px rgba(18,49,40,0.18);
    display:flex;
    flex-direction:column;
    height:88vh;
    max-height:760px;
    isolation:isolate;
  }

  /* Header */
  .header{
    background:#13294b !important;
    color:var(--paper);
    padding:20px 22px 16px;
    position:relative;
    overflow:hidden;
  }
  .header::after{
    content:"";
    position:absolute;
    right:-30px; top:-30px;
    width:140px; height:140px;
    background:var(--gold);
    opacity:0.15;
    border-radius:50%;
  }
  .brand-row{
    display:flex;
    align-items:center;
    gap:12px;
    position:relative;
    z-index:1;
  }
  .stamp{
    width:42px;height:42px;
    border:2px solid var(--gold-light);
    border-radius:50%;
    overflow:hidden;
    display:flex;align-items:center;justify-content:center;
    font-family:'Fraunces',serif;
    font-weight:700;
    font-size:15px;
    color:var(--gold-light);
    flex-shrink:0;
    background:var(--teal-deep);
  }
  .stamp img{width:100%;height:100%;object-fit:cover;}
  .brand-name{
    font-family:'Fraunces',serif;
    font-weight:700;
    font-size:18px;
    line-height:1.15;
  }
  .brand-sub{
    font-size:11.5px;
    color:var(--gold-light);
    letter-spacing:.04em;
    margin-top:2px;
  }
  .status{
    margin-top:13px;
    font-size:12px;
    display:flex;
    align-items:center;
    gap:6px;
    color:rgba(246,241,231,0.85);
  }
  .dot{width:7px;height:7px;border-radius:50%;background:#7fd9a8;display:inline-block;}
  .wa-row{
    display:flex;
    gap:8px;
    margin-top:10px;
    position:relative;
    z-index:1;
  }
  .wa-btn{
    background:#25D366;
    color:#0b3b1f;
    font-weight:700;
    font-size:11.5px;
    text-decoration:none;
    padding:6px 11px;
    border-radius:999px;
    display:inline-flex;
    align-items:center;
    gap:4px;
    transition:filter .12s ease, transform .12s ease;
  }
  .wa-btn:hover{filter:brightness(1.08); transform:translateY(-1px);}

  /* Chat area */
  .chat{
    flex:1;
    overflow-y:auto;
    padding:20px 16px;
    display:flex;
    flex-direction:column;
    gap:12px;
    background:#f4f6f9 !important;
    background-image:linear-gradient(180deg, #f4f6f9 0%, #e9edf3 100%) !important;
    background-color:#f4f6f9 !important;
  }
  .row{display:flex;}
  .row.bot{justify-content:flex-start;}
  .row.user{justify-content:flex-end;}
  .bubble{
    max-width:84%;
    padding:11px 14px;
    border-radius:14px;
    font-size:14.5px;
    line-height:1.5;
  }
  .bot .bubble{
    background:#ffffff !important;
    border:1px solid var(--line);
    border-bottom-left-radius:4px;
    color:var(--ink);
  }
  .user .bubble{
    background:#13294b !important;
    color:#fff;
    border-bottom-right-radius:4px;
  }
  .bubble strong{color:var(--gold);}
  .bot .bubble strong{color:var(--teal);}
  .bubble ul{margin:6px 0 0; padding-left:18px;}
  .bubble li{margin-bottom:3px;}
  .bubble a.tel-link{
    color:var(--teal);
    font-weight:700;
    text-decoration:none;
    border-bottom:1px solid var(--gold);
  }
  .advisor-card{
    border:1px solid var(--line);
    border-radius:10px;
    padding:10px 12px;
    margin-top:8px;
    background:#f7f9fb;
  }
  .advisor-card .name{font-family:'Fraunces',serif; font-weight:600; font-size:14px; color:var(--teal);}
  .advisor-card .role{font-size:12px; color:#6b6354; margin:2px 0 6px;}

  .chips{
    display:flex;
    flex-wrap:wrap;
    gap:7px;
    margin-top:8px;
    padding-left:2px;
  }
  .chip{
    border:1px solid #13294b !important;
    color:#13294b !important;
    background:transparent !important;
    font-family:'Karla',sans-serif;
    font-size:12.5px;
    font-weight:600;
    padding:7px 12px;
    border-radius:999px;
    cursor:pointer;
    transition:background .15s ease, color .15s ease;
  }
  .chip:hover{background:#13294b !important; color:#fff !important;}
  .chip.gold{border-color:#c8202f !important; color:#8a1620 !important;}
  .chip.gold:hover{background:#c8202f !important; color:#fff !important;}

  .typing{
    display:flex; gap:4px; padding:13px 14px;
  }
  .typing span{
    width:6px;height:6px;border-radius:50%;
    background:var(--teal);
    opacity:.5;
    animation:bounce 1.1s infinite;
  }
  .typing span:nth-child(2){animation-delay:.15s;}
  .typing span:nth-child(3){animation-delay:.3s;}
  @keyframes bounce{
    0%,60%,100%{transform:translateY(0); opacity:.4;}
    30%{transform:translateY(-4px); opacity:1;}
  }

  /* Input */
  .input-bar{
    display:flex;
    gap:8px;
    padding:12px;
    border-top:1px solid #d7dde6;
    background:#f4f6f9 !important;
  }
  .input-bar input{
    flex:1;
    border:1px solid var(--line);
    background:#fff;
    border-radius:999px;
    padding:11px 16px;
    font-family:'Karla',sans-serif;
    font-size:14px;
    color:var(--ink);
    outline:none;
  }
  .input-bar input:focus{border-color:var(--teal);}
  .send-btn{
    background:#c8202f !important;
    color:var(--teal-deep);
    border:none;
    width:42px;height:42px;
    border-radius:50%;
    flex-shrink:0;
    cursor:pointer;
    display:flex;align-items:center;justify-content:center;
    transition:transform .12s ease, background .12s ease;
  }
  .send-btn:hover{background:var(--gold-light); transform:scale(1.05);}
  .send-btn:active{transform:scale(.95);}

  .footer-note{
    text-align:center;
    font-size:10.5px;
    color:#7c8494;
    padding:7px 16px 10px;
    background:#f4f6f9 !important;
    line-height:1.5;
  }
  .footer-note a{color:#7c8494;}

  @media (prefers-reduced-motion: reduce){
    .typing span{animation:none; opacity:.7;}
    .send-btn{transition:none;}
  }

  @media (max-width:520px){
.app{height:100vh; max-height:none; border-radius:0; border:none;}
  }

  .chat::-webkit-scrollbar{width:6px;}
  .chat::-webkit-scrollbar-thumb{background:var(--line); border-radius:3px;}
</style>
    <div id="baaevaChatWindow" aria-live="polite">
      <div class="app">
  <div class="header">
    <div class="brand-row">
      <div class="stamp"><img src="https://baaevahispanicfamilydocuments.com/logo.png" alt="BAAEVA" onerror="this.parentElement.textContent='BA'"></div>
      <div>
        <div class="brand-name">BAAEVA</div>
        <div class="brand-sub">HISPANIC FAMILY DOCUMENTS LLC</div>
      </div>
    </div>
    <div class="status"><span class="dot"></span> Asistente virtual · atención en español</div>
    <div class="wa-row">
      <a class="wa-btn" id="waYamile" href="https://wa.me/18138302874?text=Hola%2C%20quisiera%20informaci%C3%B3n%20sobre%20sus%20servicios" target="_blank" rel="noopener">💬 Yamile</a>
      <a class="wa-btn" id="waErnesto" href="https://wa.me/18138302858?text=Hola%2C%20quisiera%20informaci%C3%B3n%20sobre%20sus%20servicios" target="_blank" rel="noopener">💬 Ernesto</a>
    </div>
  </div>

  <div class="chat" id="chat"></div>

  <div class="input-bar">
    <input id="userInput" type="text" placeholder="Escribe tu pregunta aquí..." autocomplete="off">
    <button class="send-btn" id="sendBtn" aria-label="Enviar">➤</button>
  </div>
  <div class="footer-note">No somos abogados ni ofrecemos asesoría legal · Tampa, FL · BAAEVA23@GMAIL.COM</div>
</div>
    </div>
    <button id="baaevaChatFab" aria-label="Abrir asistente BAAEVA" title="Asistente BAAEVA">
      <span class="fab-icon">💬</span><span class="fab-close">×</span>
    </button>
  `;

  const fab = root.getElementById('baaevaChatFab');
  const win = root.getElementById('baaevaChatWindow');
  const fabIcon = fab.querySelector('.fab-icon');
  const fabClose = fab.querySelector('.fab-close');
  fab.addEventListener('click', () => {
    const isOpen = win.classList.toggle('open');
    fab.setAttribute('aria-label', isOpen ? 'Cerrar asistente BAAEVA' : 'Abrir asistente BAAEVA');
    fabIcon.style.display = isOpen ? 'none' : 'inline';
    fabClose.style.display = isOpen ? 'inline' : 'none';
  });


const chat = root.getElementById('chat');
const input = root.getElementById('userInput');
const sendBtn = root.getElementById('sendBtn');

const PHONES = { yamile: "18138302874", ernesto: "18138302858" };

const TOPIC_MSG = {
  intro: "Hola, quisiera información sobre sus servicios",
  inmigracion: "Hola, quisiera información sobre preparación de documentos de inmigración",
  taxes: "Hola, quisiera información sobre taxes y contabilidad",
  notaria: "Hola, quisiera información sobre servicios de notaría",
  negocios: "Hola, quisiera información sobre servicios para mi negocio",
  seguros: "Hola, quisiera información sobre seguros",
  itin: "Hola, quisiera información sobre el trámite de ITIN",
  legal: "Hola, tengo una consulta sobre sus servicios",
  precio: "Hola, quisiera saber el costo de un servicio",
  idioma: "Hola, quisiera más información",
  contacto: "Hola, quisiera agendar una cita",
  fallback: "Hola, quisiera más información sobre sus servicios"
};

function waLink(phoneKey, topic){
  const msg = encodeURIComponent(TOPIC_MSG[topic] || TOPIC_MSG.fallback);
  return `https://wa.me/${PHONES[phoneKey]}?text=${msg}`;
}

function advisorsHTML(topic){
  return `
  <div class="advisor-card">
    <div class="name">Yamile Pupo Proenza</div>
    <div class="role">Tax Preparer · Notary Public · Licensed Insurance Agent</div>
    <a class="tel-link" href="tel:8138302874">☎ 813-830-2874</a>
    &nbsp;·&nbsp;
    <a class="tel-link" href="${waLink('yamile', topic)}" target="_blank" rel="noopener">💬 WhatsApp</a>
  </div>
  <div class="advisor-card">
    <div class="name">Ernesto Ramos Viltres</div>
    <div class="role">Tax Preparer · Notary Public · Licensed Insurance Agent</div>
    <a class="tel-link" href="tel:8138302858">☎ 813-830-2858</a>
    &nbsp;·&nbsp;
    <a class="tel-link" href="${waLink('ernesto', topic)}" target="_blank" rel="noopener">💬 WhatsApp</a>
  </div>`;
}

const KB = {
  intro: {
    text: `¡Hola! Soy el asistente de <strong>BAAEVA Hispanic Family Documents LLC</strong>. Te ayudamos con documentos, taxes, ITIN, notaría, seguros, contabilidad y trámites de negocios, con trato claro y en español.<br><br>¿En qué te puedo ayudar hoy?`,
    chips: ["Inmigración y documentos", "Taxes y contabilidad", "ITIN", "Notaría y documentos", "Negocios", "Seguros"]
  },
  inmigracion: {
    text: `<strong>Inmigración y documentos</strong> — preparación de formas migratorias y asistencia documental (no asesoría legal):
    <ul>
      <li>Peticiones de residencia</li>
      <li>Peticiones familiares y de visa, incluyendo fiancé(e) o por matrimonio</li>
      <li>Solicitudes de permiso de trabajo</li>
      <li>Solicitudes de ciudadanía</li>
      <li>Asistencia en respuestas a comunicaciones de USCIS</li>
      <li>Asistencia en elaboración de mociones personales</li>
      <li>Traducciones certificadas de documentos</li>
      <li>Asistencia en configuración de cuenta de USCIS</li>
      <li>Notarización de declaraciones juradas (affidavits)</li>
    </ul>
    Si tu caso necesita asesoría legal o representación, te podemos contactar con un bufete de abogados de confianza.`,
    chips: ["¿Hacen asesoría legal?", "ITIN", "Cómo agendar una cita"]
  },
  taxes: {
    text: `<strong>Taxes y contabilidad</strong> — orientación completa para individuos y negocios:
    <ul>
      <li>Impuestos personales (1040) e impuestos corporativos (1065, 1120, 1120S)</li>
      <li>Declaraciones para LLC, S-Corp, C-Corp y trabajadores independientes (Schedule C)</li>
      <li>Bookkeeping mensual y contabilidad continua para tu negocio</li>
      <li>Payroll / nómina, con cálculo y presentación de impuestos laborales</li>
      <li>Formas W-4, W-9, W-2 y 1099 para empleados y contratistas</li>
      <li>Estimados trimestrales y planificación fiscal</li>
      <li>Preparadores de impuestos con PTIN activo ante el IRS</li>
    </ul>
    Sin importar si eres un individuo, un trabajador independiente o tienes una empresa, te orientamos en cada paso.`,
    chips: ["Negocios", "ITIN", "Cómo agendar una cita"]
  },
  notaria: {
    text: `<strong>Notaría y documentos</strong> — cubrimos todo lo que necesites notarizar:
    <ul>
      <li>Bodas — somos notarios comisionados y podemos oficiar tu ceremonia</li>
      <li>Apostillas para documentos que se usarán fuera de EE.UU.</li>
      <li>Notarizaciones generales y reconocimiento de firma (acknowledgment)</li>
      <li>Poderes notariales (power of attorney) — generales, médicos o financieros</li>
      <li>Testamentos y directivas anticipadas</li>
      <li>Permisos de viaje para menores</li>
      <li>Contratos, aplicaciones de empleo, renta y VPK</li>
    </ul>
    Nuestros notarios están comisionados en Florida y te orientamos sobre cuál documento necesitas según tu trámite.`,
    chips: ["Inmigración y documentos", "Cómo agendar una cita"]
  },
  negocios: {
    text: `<strong>Negocios</strong>:
    <ul>
      <li>Registro de compañías (LLC, Corp)</li>
      <li>BOI y reporte anual</li>
      <li>DOT, MC y licencias comerciales</li>
      <li>Fianzas y bonos comerciales (surety bonds) para contratistas y licencias</li>
      <li>Apoyo documental para pequeños negocios</li>
    </ul>`,
    chips: ["Taxes y contabilidad", "Seguros", "Cómo agendar una cita"]
  },
  seguros: {
    text: `<strong>Seguros</strong> — manejamos todo tipo de cobertura, personal y comercial:
    <ul>
      <li>Vida, salud y dental</li>
      <li>Auto personal y comercial</li>
      <li>Propiedades, inquilinos y hogar</li>
      <li>General Liability y Workers Compensation</li>
      <li>Fianzas / bonos comerciales para contratistas, negocios y licencias</li>
    </ul>
    Te orientamos para encontrar la cobertura adecuada según tu situación personal o tu negocio. Para cotizaciones también puedes visitar nuestra página especializada: <strong>BAAEVA Insurance Services</strong> (baaevainsuranceservices.com).`,
    chips: ["Cómo agendar una cita", "Negocios"]
  },
  itin: {
    text: `Tramitamos la <strong>solicitud de ITIN</strong>. Somos <strong>Acceptance Agents certificados por el IRS</strong>, así que revisamos tus documentos de soporte y te acompañamos durante todo el proceso, sin que tengas que enviar tus originales por correo al IRS.`,
    chips: ["Sí, contactar asesor", "Inmigración y documentos", "Cómo agendar una cita"]
  },
  legal: {
    text: `Para ser transparentes: <strong>no somos abogados y no ofrecemos asesoría legal</strong>. Nuestros servicios son de preparación, asistencia documental, taxes, notaría, seguros y gestión administrativa.<br><br>Si tu caso necesita asesoría legal o representación, te podemos contactar con un bufete de abogados de confianza para que tu caso quede en buenas manos.`,
    chips: ["Inmigración y documentos", "Cómo agendar una cita"]
  },
  precio: {
    text: `Los costos varían según el trámite. Para darte un precio exacto, Yamile o Ernesto necesitan conocer un poco más sobre tu caso. ¿Te gustaría que te contactemos?`,
    chips: ["Sí, contactar asesor", "Cómo agendar una cita"]
  },
  idioma: {
    text: `Atendemos en <strong>español</strong>, con trato claro y humano para familias, trabajadores independientes y pequeños negocios.`,
    chips: ["Inmigración y documentos", "Negocios"]
  },
  contacto: {
    text: (topic) => `Con gusto te conectamos con nuestro equipo. Puedes llamar o escribir directo por WhatsApp:${advisorsHTML(topic)}También puedes escribirnos a <strong>BAAEVA23@GMAIL.COM</strong>. Oficina postal en PO Box 11100, Tampa, FL 33680.`,
    chips: ["Inmigración y documentos", "Taxes y contabilidad", "Seguros"]
  },
  fallback: {
    text: `No estoy seguro de haber entendido bien esa pregunta. Puedo contarte sobre inmigración y documentos, taxes y contabilidad, ITIN, notaría, negocios o seguros. ¿Sobre cuál te gustaría saber más?`,
    chips: ["Inmigración y documentos", "Taxes y contabilidad", "ITIN", "Seguros"]
  }
};

const CHIP_MAP = {
  "Inmigración y documentos": "inmigracion",
  "Taxes y contabilidad": "taxes",
  "Notaría y documentos": "notaria",
  "Negocios": "negocios",
  "Seguros": "seguros",
  "ITIN": "itin",
  "¿Hacen asesoría legal?": "legal",
  "Cómo agendar una cita": "contacto",
  "Sí, contactar asesor": "contacto"
};

function matchTopic(text){
  const t = text.toLowerCase();
  if (/itin/.test(t)) return "itin";
  if (/(seguro|insurance|vida|dental|workers comp|liability|fianza|bono)/.test(t)) return "seguros";
  if (/(inmigrac|asilo|residencia|ciudadania|ciudadanía|visa|permiso de trabajo|parole|ar-11|foia|peticion)/.test(t)) return "inmigracion";
  if (/(impuesto|tax|1040|1120|1065|payroll|bookkeeping|contabilidad|w-2|w-4|1099|declaraci|corporativ)/.test(t)) return "taxes";
  if (/(notaria|notaría|traducc|apostilla|poder|testamento|boda|firma|matrimonio)/.test(t)) return "notaria";
  if (/(negocio|empresa|llc|corporaci|ein|boi|dot|mc|licencia)/.test(t)) return "negocios";
  if (/(legal|abogad|asesoria legal|asesoría legal)/.test(t)) return "legal";
  if (/(precio|costo|cuanto|cuánto|tarifa)/.test(t)) return "precio";
  if (/(ingles|inglés|idioma|espanol|español)/.test(t)) return "idioma";
  if (/(cita|contact|asesor|telefono|teléfono|llamar|agendar|hablar|correo|email)/.test(t)) return "contacto";
  if (/(hola|buenas|hi|hello)/.test(t)) return "intro";
  return "fallback";
}

function addBubble(role, html){
  const row = document.createElement('div');
  row.className = 'row ' + role;
  const b = document.createElement('div');
  b.className = 'bubble';
  b.innerHTML = html;
  row.appendChild(b);
  chat.appendChild(row);
  chat.scrollTop = chat.scrollHeight;
  return row;
}

function addChips(chips){
  const wrap = document.createElement('div');
  wrap.className = 'chips';
  chips.forEach(label=>{
    const btn = document.createElement('button');
    btn.className = 'chip' + (label.startsWith('Sí') ? ' gold' : '');
    btn.textContent = label;
    btn.onclick = () => handleUserMessage(label);
    wrap.appendChild(btn);
  });
  chat.appendChild(wrap);
  chat.scrollTop = chat.scrollHeight;
}

function showTyping(){
  const row = document.createElement('div');
  row.className = 'row bot';
  row.id = 'typingRow';
  row.innerHTML = `<div class="bubble typing"><span></span><span></span><span></span></div>`;
  chat.appendChild(row);
  chat.scrollTop = chat.scrollHeight;
}
function removeTyping(){
  const t = root.getElementById('typingRow');
  if (t) t.remove();
}

let lastTopic = 'intro';
const waYamileBtn = root.getElementById('waYamile');
const waErnestoBtn = root.getElementById('waErnesto');

function updateHeaderWA(topic){
  waYamileBtn.href = waLink('yamile', topic);
  waErnestoBtn.href = waLink('ernesto', topic);
}

function botReply(topicKey){
  showTyping();
  const contextTopic = (topicKey === 'contacto') ? lastTopic : topicKey;
  setTimeout(()=>{
    removeTyping();
    const entry = KB[topicKey] || KB.fallback;
    const html = (typeof entry.text === 'function') ? entry.text(contextTopic) : entry.text;
    addBubble('bot', html);
    if (entry.chips) addChips(entry.chips);
  }, 550 + Math.random()*350);
  if (topicKey !== 'contacto') lastTopic = topicKey;
  updateHeaderWA(contextTopic);
}

function handleUserMessage(text){
  if (!text.trim()) return;
  addBubble('user', text);
  input.value = '';
  const topic = CHIP_MAP[text] || matchTopic(text);
  botReply(topic);
}

sendBtn.addEventListener('click', ()=> handleUserMessage(input.value));
input.addEventListener('keydown', (e)=>{
  if (e.key === 'Enter') handleUserMessage(input.value);
});

botReply('intro');

})();
