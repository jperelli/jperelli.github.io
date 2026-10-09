---
layout: default
lang: ca
i18n_key: case_stock_tracker
title: "D'un full de càlcul a un sistema que diu quan demanar"
description: "Un cas real: una petita empresa que ven material mèdic per internet portava l'estoc en un full de càlcul. En dues setmanes li vam lliurar un sistema que ajunta les dades de la seva comptabilitat i d'Amazon i diu què demanar i quan, amb intel·ligència artificial on ajuda."
image: /public/images/2026-10-09-stock-tracker/after-dashboard.png
---

<article class="case" markdown="1">
<p class="case-kicker">Un cas real · 2026 · amb <a href="https://exentric.tech/">eXentric</a></p>

<h1 class="case-title">D'un full de càlcul a un sistema que diu quan demanar</h1>

<p class="hero-lead">Una petita empresa que ven material mèdic per internet portava l'estoc en un full de càlcul que el fundador havia muntat ell mateix. En dues setmanes li vam lliurar un sistema que ajunta les dades de la seva comptabilitat i d'Amazon, mostra tots els productes en una pantalla i diu què demanar i quan, amb intel·ligència artificial revisant cada producte cada dia. Avui el fundador el millora pel seu compte. L'empresa no hi apareix amb el seu nom a petició seva; les captures són reals, amb els noms de producte i els números tapats.</p>

<div class="case-facts">
  <div><span class="case-fact-num">2 dies</span><span>fins a un prototip funcionant amb les seves dades reals</span></div>
  <div><span class="case-fact-num">2 setmanes</span><span>des del primer missatge fins al sistema funcionant als seus propis comptes</span></div>
  <div><span class="case-fact-num">3 fonts</span><span>comptabilitat, magatzem d'Amazon i vendes d'Amazon, juntes en un lloc</span></div>
</div>

## El punt de partida

L'empresa compra material mèdic a fabricants de la Xina i el ven per internet a Austràlia i el Regne Unit, sobretot per Amazon. L'estoc és a tres llocs: el seu propi magatzem, els magatzems d'Amazon i els contenidors que ja venen de camí. Una comanda a la fàbrica triga setmanes o mesos a arribar, i les fàbriques paren per les festes xineses. Si es demana tard, el producte s'acaba; si es demana aviat, els diners es queden en caixes.

Per controlar-ho, el fundador havia muntat un full de càlcul de Google amb petits programes que treien els números del programa de comptabilitat i d'Amazon. Era un bon full de càlcul. També tenia els problemes que tenen tots els fulls de càlcul d'aquesta mena:

- Les connexions es trencaven cada cert temps i algú havia de tornar a entrar i arreglar-les.
- El mateix producte tenia un codi diferent a la comptabilitat i a Amazon, així que les xifres no quadraven.
- La columna de "setmanes d'estoc que queden" era una fórmula fixa que no sabia res de terminis d'entrega ni de festes.
- Només l'entenia qui l'havia fet, i l'equip havia de fer recomptes físics per corregir-lo.

<figure>
  <img src="/public/images/2026-10-09-stock-tracker/before-spreadsheet.png" alt="El full de càlcul original: una pestanya de resum amb una fila per producte i columnes d'estoc al magatzem, estoc a Amazon, estoc demanat i setmanes d'estoc que queden. Els noms de producte estan tapats." loading="lazy">
  <figcaption>Abans: el full de càlcul. Una fila per producte, columnes calculades a mà, i una columna sencera de "sense vendes els últims 30 dies" on la connexió havia deixat de funcionar.</figcaption>
</figure>

## Què vam fer

El fundador va conèixer els meus socis d'<a href="https://exentric.tech/">eXentric</a> en una trobada d'emprenedors i va preguntar si això es podia fer millor. Vam proposar una cosa senzilla: dos dies de feina per ensenyar què es podia fer amb les dades reals. Si servia, lliuràvem el codi i parlàvem dels passos següents.

**Dia u.** Ens vam connectar al programa de comptabilitat i a Amazon, la part difícil, i al final del dia hi havia una primera versió de la pantalla amb els seus números reals. Vam enviar un vídeo curt a l'equip a Austràlia.

**Dia dos.** El seu responsable d'operacions ens va explicar, en uns vídeos gravats, com decideix de debò què demanar: terminis d'entrega per fabricant, quantitats mínimes de comanda, les festes xineses, kits que es munten amb altres productes. Els vam veure diverses vegades i els vam convertir en les regles del sistema.

**Les dues setmanes següents.** L'empresa ens va demanar deixar-lo funcionant de debò i no en un portàtil: un usuari i contrasenya, una base de dades, l'actualització diària sola, tot en comptes que són seus. A l'última trucada el fundador va connectar els seus comptes ell mateix i el primer dia de dades va entrar mentre miràvem.

<figure>
  <img src="/public/images/2026-10-09-stock-tracker/after-dashboard.png" alt="El nou tauler: una fila per producte amb estoc per lloc, estoc demanat, vendes dels últims 30 i 90 dies amb un petit gràfic, mesos d'estoc que queden i un senyal de comanda que diu OK o Demana ara. Els noms de producte estan tapats." loading="lazy">
  <figcaption>Després: tots els productes en una pantalla. Estoc a cada lloc, vendes amb un gràfic petit, mesos de cobertura que queden i un senyal clar, OK, demana aviat o demana ara, revisat cada dia per la intel·ligència artificial.</figcaption>
</figure>

## Què fa el sistema

- **Ajunta les tres fonts cada dia, sol.** S'ha acabat tornar a entrar per arreglar una connexió.
- **Sap que dos codis són el mateix producte.** Una llista curta d'equivalències, que manté l'equip, i les xifres quadren.
- **Diu quan demanar, producte per producte.** Pren les vendes de les últimes setmanes, l'estoc als tres llocs, el termini d'entrega de cada fabricant i els mesos de cobertura que l'empresa vol tenir, i ho converteix en un semàfor: OK, aviat, ara. I una quantitat. Cada dia la intel·ligència artificial revisa aquest senyal amb tota la història del producte i hi afegeix al costat la seva pròpia recomanació i un estoc mínim.
- **Mostra la història de cada producte.** L'estoc baixant, les vendes pujant, les comandes arribant, en un gràfic.

<figure>
  <img src="/public/images/2026-10-09-stock-tracker/after-product.png" alt="La pàgina d'un producte: un gràfic de l'estoc total durant sis mesos amb les vendes diàries en barres, una taula d'estoc per dia i una taula de vendes recents. El nom del producte i els números de comanda estan tapats." loading="lazy">
  <figcaption>Un producte, sis mesos. La línia lila és l'estoc; les barres són les vendes de cada dia. Les barres grans són comandes a l'engròs, que el full de càlcul antic barrejava amb les vendes d'Amazon.</figcaption>
</figure>

## On és la intel·ligència artificial, i on no

Aquesta és la part que més m'importa explicar, perquè és on sol haver-hi el fum.

**No substitueix les regles principals.** Quan demanar comença sent aritmètica: vendes, estoc, termini d'entrega, mesos de cobertura. L'aritmètica no necessita intel·ligència artificial; necessita estar escrita un cop, bé, on tothom la vegi.

**És a dos llocs on ajuda.** Primer, en com es va construir el sistema: la major part del codi la van escriure assistents d'intel·ligència artificial, amb els meus socis i jo decidint què construir i revisant el resultat. Per això van bastar dos dies. Segon, a sobre de les regles: cada dia el sistema demana a un model de llenguatge que miri cada producte, amb la seva història i les regles, i escrigui una recomanació curta i un estoc mínim, més un resum de tot el catàleg. Aquest mínim alimenta el senyal de comanda quan un producte no té vendes recents, i la resta és una segona opinió, amb paraules normals, al costat del número.

**I l'empresa pot abaixar-li el volum.** Un mes després el fundador ens va explicar que les recomanacions de la IA eren més del que necessitaven de moment i les havia simplificat. A mi em sembla bé. El sistema és seu i les regles senzilles fan la major part de la feina. Prefereixo dir-ho que fer veure que no.

## Què va passar després

El fundador, que no és programador, va agafar el codi i va continuar amb un assistent d'intel·ligència artificial: va carregar tres mesos més d'història, va arreglar un error de temps d'espera, va canviar el que no li agradava. Un mes després del lliurament:

<blockquote class="case-quote">
  <p>«M'ho estic passant bé remenant el sistema d'estoc, hi he fet força canvis. Serà més útil com més informació acumuli amb el temps. En general l'organització i tot és molt millor per a l'equip.»</p>
  <footer>El fundador, un mes després del lliurament (traduït de l'anglès)</footer>
</blockquote>

<blockquote class="case-quote">
  <p>«Sembla que pot canviar-ho tot.»</p>
  <footer>El responsable d'operacions, en veure la demo del primer dia (traduït de l'anglès)</footer>
</blockquote>

Aquest és el resultat que busco: no un sistema que depengui de mi, sinó un que l'empresa fa anar i canvia pel seu compte.

<details class="case-tech">
  <summary>Per a qui vulgui els detalls tècnics</summary>
  <p>Aplicació Django; sincronització nocturna des de l'API de Xero (estoc, ordres de compra, factures) i la Selling Partner API d'Amazon (estoc FBA, enviaments entrants, comandes); instantànies d'estoc unificades per lot d'importació, historial de vendes complet desat com a capçaleres i línies de comanda amb finestres mòbils calculades en consultar; àlies de SKU per a la identitat entre fonts; senyal de comanda a partir de les setmanes de cobertura davant del termini d'entrega més la cobertura objectiu; recomanacions per SKU i globals a través de LiteLLM per poder canviar de proveïdor de model; desplegat a Vercel amb una base de dades Postgres a Neon i un endpoint de cron, tot als comptes del client.</p>
</details>

<section class="cta" id="contact">
  <h2>Parlem</h2>
  <p>La majoria de les empreses tenen un full de càlcul com aquest. Dues línies sobre a què es dedica l'empresa són suficients; la primera conversa (30 minuts) és gratuïta i sense compromís.</p>
  <p class="hero-actions">
    <a class="btn btn-primary" href="mailto:jperelli@gmail.com?subject=Intel%C2%B7lig%C3%A8ncia%20artificial%20a%20la%20meva%20empresa">Escriu-me un correu</a>
    <a class="btn btn-ghost" href="/ca/">Tornar a l'inici</a>
  </p>
</section>
</article>
