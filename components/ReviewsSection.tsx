import { ExternalLink, MessageSquareText, Star } from "lucide-react";
import MotionPressable from "./MotionPressable";
import RevealOnScroll from "./RevealOnScroll";
import type { Locale } from "@/lib/locales";

const googleReviewsUrl =
  "https://www.google.com/search?q=MASALA+INDIAN+RESTAURANT+Guardamar+del+Segura+Reviews#lrd=0xd63ad9dbd503d21:0x3820215ac1d5a726,1,,,,";
const googleWriteReviewUrl =
  "https://search.google.com/local/writereview?placeid=ChIJIT1QvZ2tYw0RJqfVwVohIDg";

const copy = {
  en: {
    eyebrow: "Google Reviews",
    title: "Guests Keep",
    accent: "Coming Back",
    body:
      "Visitors regularly mention the butter chicken, biryani, garlic naan, friendly service and relaxed Guardamar atmosphere.",
    ratingLabel: "Google rating",
    countLabel: "public reviews",
    read: "Read Google Reviews",
    write: "Write a Review",
    note: "Had a good meal? A short Google review helps the next hungry person find us.",
    reviews: [
      {
        name: "Leon L.",
        meta: "Google review",
        text: "Called out the biryani, butter chicken and naan as standout dishes, with warm service to match.",
      },
      {
        name: "Anne M.",
        meta: "Google review",
        text: "Praised the daily special for good value and a chicken tikka that landed exactly right.",
      },
      {
        name: "Natalia Z.",
        meta: "Google review",
        text: "Highlighted accommodating staff, quick timing and rich Indian flavour after a night out in Guardamar.",
      },
    ],
  },
  nl: {
    eyebrow: "Google Reviews",
    title: "Gasten Komen",
    accent: "Terug",
    body:
      "Bezoekers noemen vaak de butter chicken, biryani, garlic naan, vriendelijke service en ontspannen sfeer in Guardamar.",
    ratingLabel: "Google-score",
    countLabel: "openbare reviews",
    read: "Lees Google Reviews",
    write: "Schrijf een Review",
    note: "Lekker gegeten? Een korte Google review helpt de volgende hongerige gast ons te vinden.",
    reviews: [
      {
        name: "Leon L.",
        meta: "Google review",
        text: "Noemde de biryani, butter chicken en naan als toppers, met warme service erbij.",
      },
      {
        name: "Anne M.",
        meta: "Google review",
        text: "Prees de dagschotel om de goede waarde en een chicken tikka die precies goed was.",
      },
      {
        name: "Natalia Z.",
        meta: "Google review",
        text: "Benadrukte behulpzaam personeel, vlotte timing en rijke Indiase smaak in Guardamar.",
      },
    ],
  },
  es: {
    eyebrow: "Resenas de Google",
    title: "Los Clientes",
    accent: "Vuelven",
    body:
      "Los visitantes suelen mencionar el butter chicken, biryani, garlic naan, el trato amable y el ambiente relajado de Guardamar.",
    ratingLabel: "Valoracion Google",
    countLabel: "resenas publicas",
    read: "Leer Resenas",
    write: "Escribir Resena",
    note: "Si has comido bien, una breve resena en Google ayuda al proximo cliente con hambre a encontrarnos.",
    reviews: [
      {
        name: "Leon L.",
        meta: "Resena de Google",
        text: "Destaco el biryani, butter chicken y naan, junto con un servicio cercano.",
      },
      {
        name: "Anne M.",
        meta: "Resena de Google",
        text: "Valoro el menu diario por su buena relacion calidad-precio y un chicken tikka muy logrado.",
      },
      {
        name: "Natalia Z.",
        meta: "Resena de Google",
        text: "Menciono personal amable, tiempos agiles y sabores indios intensos en Guardamar.",
      },
    ],
  },
  fr: {
    eyebrow: "Avis Google",
    title: "Les Clients",
    accent: "Reviennent",
    body:
      "Les visiteurs citent souvent le butter chicken, le biryani, le garlic naan, le service aimable et l'ambiance detendue de Guardamar.",
    ratingLabel: "Note Google",
    countLabel: "avis publics",
    read: "Lire les Avis",
    write: "Ecrire un Avis",
    note: "Vous avez bien mange? Un court avis Google aide le prochain client affame a nous trouver.",
    reviews: [
      {
        name: "Leon L.",
        meta: "Avis Google",
        text: "A remarque le biryani, le butter chicken et le naan, avec un service chaleureux.",
      },
      {
        name: "Anne M.",
        meta: "Avis Google",
        text: "A apprecie le menu du jour pour son bon rapport qualite-prix et un chicken tikka reussi.",
      },
      {
        name: "Natalia Z.",
        meta: "Avis Google",
        text: "A souligne l'equipe accueillante, le service rapide et les saveurs indiennes riches a Guardamar.",
      },
    ],
  },
  no: {
    eyebrow: "Google-anmeldelser",
    title: "Gjestene Kommer",
    accent: "Tilbake",
    body:
      "Besokende nevner ofte butter chicken, biryani, garlic naan, vennlig service og den avslappede Guardamar-stemningen.",
    ratingLabel: "Google-rating",
    countLabel: "offentlige anmeldelser",
    read: "Les Google-anmeldelser",
    write: "Skriv en Anmeldelse",
    note: "Har du spist godt? En kort Google-anmeldelse hjelper neste sultne gjest med a finne oss.",
    reviews: [
      {
        name: "Leon L.",
        meta: "Google-anmeldelse",
        text: "Trakk fram biryani, butter chicken og naan som favoritter, sammen med varm service.",
      },
      {
        name: "Anne M.",
        meta: "Google-anmeldelse",
        text: "Likete dagens meny for god verdi og en chicken tikka som traff akkurat riktig.",
      },
      {
        name: "Natalia Z.",
        meta: "Google-anmeldelse",
        text: "Fremhevet hjelpsomt personale, rask servering og rike indiske smaker i Guardamar.",
      },
    ],
  },
} satisfies Record<
  Locale,
  {
    eyebrow: string;
    title: string;
    accent: string;
    body: string;
    ratingLabel: string;
    countLabel: string;
    read: string;
    write: string;
    note: string;
    reviews: Array<{ name: string; meta: string; text: string }>;
  }
>;

type Props = {
  locale: Locale;
};

function Stars() {
  return (
    <div className="flex items-center gap-1 text-saffron" aria-label="5 star review highlights">
      {Array.from({ length: 5 }).map((_, index) => (
        <Star key={index} className="h-4 w-4 fill-current" aria-hidden="true" />
      ))}
    </div>
  );
}

export default function ReviewsSection({ locale }: Props) {
  const sectionCopy = copy[locale];

  return (
    <section id="reviews" className="bg-surface py-24 lg:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-12">
        <div className="grid gap-12 lg:grid-cols-[0.9fr_1.4fr] lg:items-end">
          <RevealOnScroll>
            <p className="section-label mb-4">{sectionCopy.eyebrow}</p>
            <h2
              className="font-heading leading-tight text-ink"
              style={{ fontSize: "clamp(2rem, 4vw, 3.35rem)" }}
            >
              {sectionCopy.title}{" "}
              <em className="not-italic text-maroon">{sectionCopy.accent}</em>
            </h2>
            <p className="mt-5 max-w-xl text-base leading-relaxed text-ink-muted">
              {sectionCopy.body}
            </p>

            <div className="mt-8 grid max-w-md grid-cols-2 gap-3">
              <div className="border border-line bg-page px-5 py-4">
                <div className="font-heading text-3xl text-ink">4.6/5</div>
                <p className="mt-1 text-xs font-semibold uppercase tracking-[0.16em] text-ink-muted">
                  {sectionCopy.ratingLabel}
                </p>
              </div>
              <div className="border border-line bg-page px-5 py-4">
                <div className="font-heading text-3xl text-ink">120+</div>
                <p className="mt-1 text-xs font-semibold uppercase tracking-[0.16em] text-ink-muted">
                  {sectionCopy.countLabel}
                </p>
              </div>
            </div>
          </RevealOnScroll>

          <div className="grid gap-4 md:grid-cols-3">
            {sectionCopy.reviews.map((review, index) => (
              <RevealOnScroll
                key={review.name}
                delay={(index + 1) as 1 | 2 | 3}
                className="border border-line bg-page p-6 shadow-[0_18px_45px_rgba(26,15,5,0.08)]"
              >
                <Stars />
                <p className="mt-5 text-sm leading-relaxed text-ink-muted">{review.text}</p>
                <div className="mt-6 border-t border-line pt-4">
                  <p className="font-heading text-lg text-ink">{review.name}</p>
                  <p className="mt-1 text-xs font-semibold uppercase tracking-[0.14em] text-saffron">
                    {review.meta}
                  </p>
                </div>
              </RevealOnScroll>
            ))}
          </div>
        </div>

        <RevealOnScroll delay={2} className="mt-12 border border-gold/35 bg-dark px-6 py-6 text-cream lg:px-8">
          <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
            <div className="flex max-w-2xl items-start gap-4">
              <span className="mt-1 grid h-11 w-11 shrink-0 place-items-center border border-gold/40 bg-saffron/15 text-saffron-light">
                <MessageSquareText className="h-5 w-5" aria-hidden="true" />
              </span>
              <div>
                <p className="font-heading text-2xl text-cream">{sectionCopy.write}</p>
                <p className="mt-2 text-sm leading-relaxed text-cream/62">{sectionCopy.note}</p>
              </div>
            </div>

            <div className="flex flex-col gap-3 sm:flex-row">
              <MotionPressable>
                <a
                  href={googleWriteReviewUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="masala-btn masala-btn-outline flex items-center justify-center gap-2 px-6 py-3 text-sm font-semibold text-cream"
                >
                  {sectionCopy.read}
                  <ExternalLink className="h-4 w-4" aria-hidden="true" />
                </a>
              </MotionPressable>
              <MotionPressable>
                <a
                  href={googleReviewsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="masala-btn masala-btn-filled flex items-center justify-center gap-2 px-6 py-3 text-sm font-semibold text-cream"
                >
                  {sectionCopy.write}
                  <ExternalLink className="h-4 w-4" aria-hidden="true" />
                </a>
              </MotionPressable>
            </div>
          </div>
        </RevealOnScroll>
      </div>
    </section>
  );
}
