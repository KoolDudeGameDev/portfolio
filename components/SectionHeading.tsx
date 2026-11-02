type Props = {
  /** The section marker. Left out on pages with a single section. */
  index?: string;
  eyebrow: string;
  title: string;
  titleItalic?: string;
  description?: string;
};

// Editorial section header: numbered marker, uppercase eyebrow, mixed
// sans + italic-serif title.
export function SectionHeading({
  index,
  eyebrow,
  title,
  titleItalic,
  description,
}: Props) {
  return (
    <div className="reveal mb-12 max-w-3xl md:mb-16 lg:mb-[clamp(1rem,2.6svh,3rem)]">
      <div className="mb-5 flex items-center gap-3 text-xs lg:mb-[clamp(0.5rem,1.6svh,1.25rem)] uppercase tracking-[0.2em] text-muted">
        {index ? (
          <>
            <span className="font-mono">{index}</span>
            <span className="h-px w-8 bg-border" />
          </>
        ) : null}
        <span>{eyebrow}</span>
      </div>
      <h2 className="font-sans text-3xl font-semibold leading-[1.1] tracking-tight sm:text-4xl md:text-5xl lg:text-[clamp(1.75rem,5.4svh,3rem)]">
        {title}
        {titleItalic ? (
          <>
            {" "}
            <span className="font-serif font-normal italic text-accent">
              {titleItalic}
            </span>
          </>
        ) : null}
      </h2>
      {description ? (
        <p className="fit-hide mt-5 text-base leading-relaxed text-muted lg:mt-[clamp(0.5rem,1.6svh,1.25rem)] lg:text-[clamp(0.9rem,2.1svh,1.125rem)]">
          {description}
        </p>
      ) : null}
    </div>
  );
}
