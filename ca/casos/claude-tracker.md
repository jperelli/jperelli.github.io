---
layout: default
lang: ca
i18n_key: case_claude_tracker
title: "D'un full de compradors a un seguiment a Claude que recorda, i quan treure'l d'allà"
description: "Un exemple inventat: un full de seguiment de compradors refet com un artefacte de Claude amb dades desades, el prompt per copiar, què sobreviu en tancar la pestanya i què no, i les raons per les quals la gent acaba traient aquestes eines de Claude."
image: /public/images/2026-10-15-claude-crm/cover.png
---

<link rel="stylesheet" href="/public/css/claude-crm-demo.css">

<article class="case" markdown="1">
<p class="case-kicker"><span class="case-badge case-badge-example">Exemple</span> Dades inventades · 2026</p>

<h1 class="case-title">D'un full de compradors a un seguiment a Claude que recorda, i quan treure'l d'allà</h1>

<p class="hero-lead">Això no és un cas de client: és un exemple inventat, sobre una immobiliària que no existeix, d'una situació que em trobo una vegada i una altra en esdeveniments d'empresa locals. Una petita empresa té un full de càlcul de clients i un "petit CRM" que Claude li va construir al xat, i manté tots dos. L'exemple mostra el que l'eina de Claude pot fer avui de debò (desar dades, amb condicions), dona el prompt per arribar-hi en una tarda i marca el punt en què jo la trauria de Claude, i per què. Tot el que hi ha aquí es pot fer sense mi.</p>

El patró és sempre el mateix. El full es queda perquè és on sempre ha estat la informació; l'eina de Claude es queda perquè és més agradable de mirar. Cada pocs dies el propietari enganxa el full al xat i demana a Claude que "actualitzi el CRM". Els correus que escriu Claude surten massa llargs, així que es queden en esborranys i es reescriuen a mà.

## El full de càlcul

Una petita immobiliària de dues persones, amb uns trenta compradors actius en qualsevol moment. El full té una fila per comprador i aquestes columnes. Els noms són inventats.

<div class="crm-sheet">
<table>
<thead><tr><th class="corner"></th><th>Comprador</th><th>Busca</th><th>Pressupost</th><th>Origen</th><th>Estat</th><th>Últim contacte</th><th>Següent pas</th><th>Quan</th></tr></thead>
<tbody>
<tr><td class="corner">1</td><td>Marta R.</td><td>Pis de 3 habitacions, centre</td><td>fins a 420k</td><td>Idealista</td><td><span class="crm-status crm-status-visit">Visita programada</span></td><td>12 oct</td><td>Visita Carrer Major 14</td><td>17 oct</td></tr>
<tr><td class="corner">2</td><td>Família Puig</td><td>Casa amb jardí, a prop de la platja</td><td>650k a 750k</td><td>Va entrar a l'oficina</td><td><span class="crm-status crm-status-contacted">Contactat</span></td><td>9 oct</td><td>Enviar dues opcions</td><td>14 oct</td></tr>
<tr><td class="corner">3</td><td>Daniel K.</td><td>Pis a prop del tren, 2 habitacions</td><td>300k</td><td>Recomanació</td><td><span class="crm-status crm-status-new">Nou</span></td><td>13 oct</td><td>Primera trucada</td><td>15 oct</td></tr>
<tr><td class="corner">4</td><td>Núria i Pau</td><td>Planta baixa amb terrassa</td><td>350k</td><td>Formulari web</td><td><span class="crm-status crm-status-visit">Va visitar</span></td><td>11 oct</td><td>Preguntar com ha anat la visita</td><td>14 oct</td></tr>
<tr><td class="corner">5</td><td>Sr. Soler (inversor)</td><td>Dos o tres pisos petits per llogar</td><td>200k cadascun</td><td>Client que torna</td><td><span class="crm-status crm-status-offer">Oferta feta</span></td><td>10 oct</td><td>Esperar resposta del propietari</td><td>16 oct</td></tr>
<tr><td class="corner">6</td><td>Laia M.</td><td>Estudi per a una filla que estudia a Barcelona</td><td>180k</td><td>Instagram</td><td><span class="crm-status crm-status-lost">Perdut, va comprar en un altre lloc</span></td><td>2 oct</td><td></td><td></td></tr>
</tbody>
</table>
</div>
<p class="crm-caption">Tot el negoci de fer seguiment de compradors cap en nou columnes. Les dues que més importen són les últimes: què passa ara, i quan.</p>

El full no és el problema. El problema és la segona còpia. Tan bon punt les mateixes trenta files viuen també dins d'una eina de Claude, cada trucada o visita s'ha d'apuntar dues vegades, i el dia que una de les dues no s'actualitza ningú sap quina és la bona. "Demanar a Claude que les sincronitzi" és una tercera feina a sobre de les dues.

## El que Claude desa avui de debò

Les eines del panell lateral de Claude es diuen artefactes. Durant molt de temps un artefacte era una pàgina que ho oblidava tot en el moment en què es tancava el xat: el codi que escrivia Claude es desava amb la conversa, però qualsevol fila que s'escrivís a dins vivia només a la finestra oberta. Anthropic va afegir emmagatzematge persistent als artefactes l'octubre de 2025, i des del setembre de 2026 els artefactes nous desen dades sense cap pas extra. Així que l'eina pot recordar. Les condicions són a les pàgines d'ajuda de la mateixa Anthropic, i importen:

<table class="crm-truth">
<thead><tr><th>On és la informació</th><th>En tancar la pestanya</th><th>Font i condicions</th></tr></thead>
<tbody>
<tr><td>L'artefacte en si (el codi, la pàgina que va escriure Claude)</td><td class="crm-yes">Es conserva</td><td>Es desa amb la conversa i a la pestanya Artefactes.</td></tr>
<tr><td>Files escrites en un artefacte sense emmagatzematge, o en un artefacte antic que no es va publicar mai</td><td class="crm-no">Es perden</td><td>El centre d'ajuda és explícit: en els artefactes creats abans del 16 de setembre de 2026 "l'emmagatzematge només funciona després de publicar"; abans d'això, desar "no tindrà èxit". La pàgina continua semblant que ha desat.</td></tr>
<tr><td>Files escrites a l'emmagatzematge de l'artefacte</td><td class="crm-yes">Es conserven</td><td>Plans Pro, Max, Team i Enterprise. Només text, sense fotos ni fitxers. 20 MB per artefacte. Personal (cada persona veu les seves pròpies files) o compartit (tothom veu les mateixes files).</td></tr>
<tr><td>Files desades d'un artefacte antic després de prémer Despublicar</td><td class="crm-no">S'esborren</td><td>"Despublicar també esborra permanentment qualsevol dada d'emmagatzematge personal i compartit que fes servir l'artefacte", i no es pot tornar a publicar.</td></tr>
</tbody>
</table>

La demo de sota és la diferència en un clic. Les dues llistes són el mateix seguiment; una desa les files només mentre la finestra és oberta, l'altra les escriu a l'emmagatzematge.

<div id="crm-demo" class="crm-demo" data-lang="ca"><noscript>La demo interactiva necessita JavaScript.</noscript></div>

La columna esquerra és el que es troba la gent quan l'eina "oblida": l'artefacte torna exactament com el va escriure Claude, amb les files de mostra, i tot el que s'ha escrit des de llavors ha desaparegut. La columna dreta és el que fa un seguiment amb dades desades, i és el que demana el prompt de sota.

Fonts de la taula: les pàgines del centre d'ajuda d'Anthropic [What are artifacts and how do I use them?](https://support.claude.com/en/articles/17153992-what-are-artifacts-and-how-do-i-use-them) i [Share artifacts](https://support.claude.com/en/articles/9547008-share-artifacts), llegides l'octubre de 2026 (cites traduïdes de l'anglès); la cronologia d'octubre de 2025 està comprovada a [Can Claude Artifacts Save Data?](https://caipi.ai/blog/can-claude-artifacts-save-data). Aquestes regles ja han canviat una vegada; si llegeixes això mesos després, torna a mirar les pàgines d'ajuda.

## Com construir-ho en una tarda

Aquesta és la part que dona el valor. No hi ha codi per escriure; la feina és decidir què ha de fer l'eina abans de demanar-la.

<ol class="crm-path">
<li><strong>Primer, netejar el full.</strong> Una fila per comprador. Una llista fixa d'estats: Nou, Contactat, Visita programada, Va visitar, Oferta feta, Guanyat, Perdut. Dues columnes que no són mai buides per a un comprador actiu: <em>Següent pas</em> i <em>Quan</em>. Esborrar les columnes que ningú ha omplert en un any. Exportar-lo com a CSV (Fitxer, Baixa, CSV a Google Sheets).</li>
<li><strong>Demanar a Claude el seguiment amb el prompt de sota.</strong> Demana dades desades de manera explícita, una manera d'importar el CSV una vegada i exportar-lo en qualsevol moment, i esborranys de correu curts construïts a partir de la fila en comptes d'escrits de zero cada vegada.</li>
<li><strong>Comprovar que recorda abans de confiar-hi.</strong> Afegir un comprador, tancar la pestanya, tornar a obrir l'artefacte des de la pestanya Artefactes de la barra lateral. Si el comprador no hi és, enganxar la nota del centre d'ajuda al xat ("storage operations won't succeed until you publish") i demanar a Claude que ho arregli o publicar. No importar la llista real fins que aquesta prova passi.</li>
<li><strong>Importar el full una vegada i deixar d'actualitzar el full.</strong> Una sola còpia. El botó d'exportar CSV és la còpia de seguretat: prémer-lo el divendres a la tarda i guardar el fitxer. Això també protegeix de la trampa de Despublicar i de qualsevol canvi futur en com Claude desa les dades.</li>
<li><strong>Fer servir els esborranys de correu tal com són.</strong> L'eina omple un text curt i fix amb el nom del comprador, l'immoble i el següent pas. Sis línies, sempre les mateixes. La raó per la qual els correus de Claude sortien massa llargs és que cadascun s'escrivia des d'una pàgina en blanc; una plantilla no té pàgina en blanc.</li>
</ol>

<div class="crm-prompt">
<button type="button" class="crm-copy">Copiar el prompt</button>
<pre>Fes-me una eina interactiva (un artefacte) per fer seguiment de possibles compradors d'immobles. Substitueix un full de càlcul, així que ha de conservar les seves dades: fes servir l'emmagatzematge persistent de l'artefacte, en mode personal, i mai localStorage del navegador. Desa després de cada canvi i carrega-ho tot quan s'obre.

Una fila per comprador amb aquests camps: nom, telèfon, correu, busca (text lliure), pressupost, origen (Idealista, Fotocasa, formulari web, va entrar a l'oficina, recomanació, Instagram, client que torna, altre), estat (Nou, Contactat, Visita programada, Va visitar, Oferta feta, Guanyat, Perdut), data de l'últim contacte, següent pas (text lliure), data del següent pas, notes.

Pantalles:
1. "Avui": compradors la data de següent pas dels quals és avui o anterior, ordenats per data, el més antic primer. És la pantalla que s'obre per defecte.
2. "Tots els compradors": una taula que pugui ordenar per estat i per data de següent pas, amb un cercador i un botó per afegir un comprador. En fer clic en una fila s'obre per editar qualsevol camp. En canviar l'estat, pregunta el nou següent pas i la seva data.
3. "Importar / exportar": un quadre de text on enganxo el CSV del meu full de càlcul (primera línia = noms de columna), amb una vista prèvia abans d'importar, i un botó "Exportar CSV" que baixa tots els compradors.

Esborranys de correu: a cada comprador, un botó "Redactar correu" que omple UNA d'aquestes plantilles fixes amb els camps del comprador i la mostra amb un botó "Copiar". No generis text nou amb IA; només omple la plantilla. Màxim sis línies cadascuna.
- Després del primer contacte: donar les gràcies, repetir en una línia què busca i el pressupost, dir que enviaré opcions abans del [data del següent pas].
- Abans d'una visita: confirmar adreça, dia i hora, i què portar.
- Després d'una visita: preguntar en una línia què li ha semblat i si vol una segona visita.
- Oferta feta: dir que l'oferta s'ha passat al propietari i quan espero resposta.

Que sigui simple i llegible al mòbil. Idioma de la interfície: català. Fes servir les dades de mostra de sota fins que importi les meves.
Marta R., 600000000, marta@example.com, pis de 3 habitacions al centre, fins a 420000, Idealista, Visita programada, 2026-10-12, Visita Carrer Major 14, 2026-10-17
Família Puig, 600000001, puig@example.com, casa amb jardí a prop de la platja, 650000-750000, va entrar a l'oficina, Contactat, 2026-10-09, Enviar dues opcions, 2026-10-14</pre>
</div>

Dues notes sobre el prompt. "Mode personal" vol dir que les files només les veu el compte que obre el seguiment; si dues persones de la immobiliària necessiten la mateixa llista, cal demanar mode compartit, sabent que llavors tots els que hi tenen accés veuen i editen les mateixes files. I la part dels correus apaga la IA a propòsit: les plantilles fixes són l'arranjament per als esborranys que surten massa llargs.

Per a la immobiliària de l'exemple això és una millora real respecte al full més el xat: una sola còpia de les dades, una llista "Avui" que diu a qui trucar, correus en deu segons. Costa el pla de Claude que ja paguen. Per a moltes empreses petites aquí és on hauria de parar, i és un bon resultat.

## Quan el trauria de Claude

El seguiment dins de Claude és l'eina d'una persona que resulta ser compartible. El negoci se li farà petit en un conjunt predictible de punts, i la gent que ha construït eines reals sobre artefactes ha escrit sobre el moment d'arribar-hi (cites traduïdes de l'anglès):

<ul class="crm-stories">
<li><p>Un usuari de Reddit el maig de 2026: "Construeixo moltes apps HTML a Claude i m'encanta com n'és de ràpid, però fer-les servir de debò és frustrant. L'emmagatzematge dels artefactes es reinicia entre sessions, així que les dades no persisteixen mai." La resposta més votada: "Els artefactes són com previsualitzacions… no estan pensats per a ús real."</p><p><a href="https://www.reddit.com/comments/1t5mtge/">Is there an app launcher for artifacts?</a>, r/Anthropic</p></li>
<li><p>Una eina connectada a Slack i Trello, construïda i provada durant una setmana, va perdre tots els registres desats perquè l'equip no va prémer mai Publicar; en els artefactes antics, desar no feia res en silenci fins llavors.</p><p>Explicat a <a href="https://www.linkedin.com/posts/zebra-techies-solution_claudeartifacts-claudeai-anthropic-activity-7503391787538046976-UtCO">LinkedIn</a>, setembre de 2026</p></li>
<li><p>Un desenvolupador amb pla personal va trobar dos artefactes, un amb "mesos d'estat de planificació de llançament en viu", retornant "artifact not found" sense cap acció per part seva, sense ajust de retenció i sense camí de recuperació.</p><p><a href="https://github.com/anthropics/claude-code/issues/90395">anthropics/claude-code, issue #90395</a>, agost de 2026</p></li>
<li><p>Un consultor que guarda pressupostos de clients i fulls de preus com a artefactes: al cap d'un parell de setmanes "un pressupost de client era al costat d'un guió de vídeo", els xats d'on van sortir estaven tancats, i a vegades "simplement demanava a Claude que tornés a fer la cosa". Va acabar construint un catàleg fora de Claude per trobar-los.</p><p><a href="https://dev.to/amsyeung/i-kept-losing-my-claude-artifacts-so-i-made-a-mod-3bph">I kept losing my Claude artifacts, so I made a mod</a>, octubre de 2026</p></li>
<li><p>Dos proveïdors d'eines que van comparar artefactes amb aplicacions allotjades coincideixen en el mur estructural: un artefacte "no pot distingir dues persones", així que "qualsevol cosa amb noms, rols, files privades o fitxers topa amb un mur que cap prompt pot moure"; i el magatzem "és una caixa clau-valor, no una base de dades", sense domini propi i sense manera d'exportar el codi i marxar.</p><p><a href="https://homespun.dev/guides/claude-artifacts-alternative">Homespun</a> i <a href="https://www.totalum.app/blog/claude-artifacts-alternative-2026">Totalum</a>, 2026. Tots dos venen l'alternativa, així que cal llegir-los com a parts interessades; les seves afirmacions de fet coincideixen amb les pàgines d'Anthropic.</p></li>
</ul>

Traduït a la immobiliària, aquests són els moments:

- **Una segona persona ha de treballar a la llista** amb el seu propi accés, veient els mateixos compradors però sense poder esborrar-ho tot per error. L'emmagatzematge compartit és tot o res; no hi ha rols.
- **Un comprador que no fa servir Claude ha de veure alguna cosa.** Des del setembre de 2026 "tothom necessita un compte de Claude" per obrir un artefacte compartit. Un enllaç amb una selecció d'immobles per a un comprador no és possible des de dins.
- **Fotos i documents.** L'emmagatzematge és només text, 20 MB. Un immoble té fotos, un comprador té una carta de preaprovació, una operació té una oferta signada. Res d'això hi cap.
- **Ha de parlar amb la resta del negoci.** Consultes noves que arriben per correu o des d'un portal, visites que van al calendari, un missatge que s'envia quan el propietari respon. Els artefactes es poden connectar a algunes apps, però cada persona connecta els seus propis comptes, i res no s'executa quan ningú té la pestanya oberta.
- **Les dades han de sobreviure a l'eina.** Les files viuen sota l'URL de Claude, mentre Claude conservi l'artefacte. L'historial de compradors d'una immobiliària és el negoci; hauria de ser en una base de dades que la immobiliària posseeixi, amb còpies de seguretat que no hagi hagut de recordar de prémer.
- **Els canvis es fan tornant a demanar.** Cada edició vol dir demanar a Claude que reescrigui la pàgina, i l'única guia sobre què passa amb les files existents entre reescriptures és "exporta primer". Una eina de la qual la gent depèn necessita canvis que no puguin esborrar les dades.

Cap d'aquestes coses és un error que Anthropic arreglarà el mes que ve; es deriven del que és un artefacte, una pàgina al costat d'un xat. Són també exactament la llista de coses per a les quals la fase d'artefacte va ser útil: quan una immobiliària s'hi topa, ja sap quines columnes fa servir, quins estats són reals, què ha de mostrar la llista "Avui" i quins quatre correus envia. Això és l'especificació, i val més que el codi.

## Com és el pas de sortida

El camí que segueixo amb empreses en aquesta situació és curt, perquè el pensament ja està fet:

<ol class="crm-path">
<li><strong>Exportar el CSV</strong> des de l'artefacte mentre encara funciona. No cal res més de Claude.</li>
<li><strong>Construir el mateix seguiment com una petita aplicació web</strong> amb una base de dades de debò (una taula per cosa: compradors, immobles, visites, ofertes), un accés per persona, i la pantalla "Avui" i els quatre correus exactament com els tenia l'artefacte. La major part del codi s'escriu amb assistents d'IA, i per això triga dies i no mesos; les decisions són la part que pren una persona.</li>
<li><strong>Posar-ho als comptes de la mateixa empresa</strong>: la seva pròpia adreça, la seva pròpia base de dades amb còpies de seguretat automàtiques, el seu propi enviament de correu. L'empresa pot prescindir de mi i quedar-se amb tot.</li>
<li><strong>Després, connectar-ho</strong>: consultes dels portals i del web directes a la llista, visites al calendari, recordatoris de seguiment que salten tingui algú la pestanya oberta o no.</li>
<li><strong>Afegir IA només on es guanya el lloc</strong>: llegir una consulta entrant i omplir la fila, o suggerir a quins compradors aturats trucar aquesta setmana. El nucli, a qui trucar i quan, es queda com a regles que qualsevol pot llegir.</li>
</ol>

Això ho vaig fer de debò amb un venedor de material mèdic que portava l'estoc en un full de càlcul; el resultat i el que el fundador en va fer després és a [D'un full de càlcul a un sistema que diu quan demanar](/ca/casos/stock-tracker/). El patró és el mateix: el full va demostrar el que el negoci necessitava; el sistema ho va convertir en una cosa que l'equip no ha de mantenir a mà.

<section class="cta" id="contact">
<h2>Parlem</h2>
<p>Si a la teva empresa un full de càlcul i una eina de Claude descriuen els mateixos clients, ho miro amb gust. La primera conversa (30 minuts) és gratuïta i sense compromís; dues línies sobre a què es dedica l'empresa són suficients.</p>
<p class="hero-actions">
<a class="btn btn-primary" href="mailto:jperelli@gmail.com?subject=Full%20de%20c%C3%A0lcul%20i%20eina%20de%20Claude">Escriu-me un correu</a>
<a class="btn btn-ghost" href="/ca/">Tornar a l'inici</a>
</p>
</section>

</article>

<script src="/public/js/claude-crm-demo/demo.js" defer></script>
