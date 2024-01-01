export default function RegSuccessRoute() {
  return (
    <main className="successpage">
      <section className="success-message">
        <h3 className="">Oleme teid lisanud reservnimekirja</h3>
        <p>
          Saatsime teie meilile teate registreerimise lisainfo ja
          reservnimekirja kandmise kohta.
        </p>
        <p className="disclaimer">
          Kui te pole kümne minuti jooksul meilile teadet saanud, siis palun
          helistage / kirjutage vahetuse juhatajale. Soovitame vaadata ka
          rämpsposti.
        </p>
        <a href="/" className="c-btn c-btn--white">
          Tagasi kodulehele
        </a>
      </section>
    </main>
  );
}
