const PORTAL_URL = "https://project-node.onrender.com";

const FAQ = [
  {
    q: "Do I need data to use NODE?",
    a: "No. Once you're connected to the campus network, NODE is reachable without a mobile data plan. A connection is only needed if you're accessing it from off-campus.",
  },
  {
    q: "Do I need to install anything?",
    a: "No installation. NODE runs in your browser, on any device connected to the campus network.",
  },
  {
    q: "What happens if the network drops mid-session?",
    a: "Anything already loaded or synced stays available. You may lose access to content that hasn't synced yet until the connection returns.",
  },
];

export default function CampusPage() {
  return (
    <>
      <section className="bg-paper">
        <div className="container-page py-16 md:py-20">
          <p className="font-body text-sm font-medium text-blue">For LASU students &amp; staff</p>
          <h1 className="mt-2 max-w-2xl font-display text-4xl font-semibold leading-tight text-navy md:text-5xl">
            NODE is live on campus.
          </h1>
          <p className="mt-5 max-w-xl font-body text-base leading-relaxed text-ink/75">
            Built with student leadership at Lagos State University, starting
            in the places connectivity is least reliable — hostels, lecture
            halls, and reading rooms.
          </p>
          <a
            href={PORTAL_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-8 inline-block rounded-md bg-navy px-5 py-3 font-body text-sm font-medium text-white hover:bg-blue"
          >
            Open the Portal
          </a>
        </div>
      </section>

      <section className="border-t border-line bg-white">
        <div className="container-page py-16 md:py-20">
          <h2 className="font-display text-2xl font-semibold text-navy md:text-3xl">
            Deployment status
          </h2>
          <div className="mt-6 rounded-lg border border-line bg-paper p-6 font-body text-sm text-ink/60">
            Add current rollout details here — coverage area, number of
            active users, hours of availability, and any planned expansion.
          </div>
        </div>
      </section>

      <section className="bg-paper">
        <div className="container-page py-16 md:py-20">
          <h2 className="font-display text-2xl font-semibold text-navy md:text-3xl">
            Common questions
          </h2>
          <div className="mt-8 divide-y divide-line border-t border-line">
            {FAQ.map((item) => (
              <div key={item.q} className="py-6">
                <h3 className="font-display text-base font-semibold text-navy">
                  {item.q}
                </h3>
                <p className="mt-2 max-w-2xl font-body text-sm leading-relaxed text-ink/70">
                  {item.a}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
