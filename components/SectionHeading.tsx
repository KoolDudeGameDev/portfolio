type Props = {
  index: string;
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
    <div className="mb-12 max-w-2xl md:mb-16">
      <div className="mb-5 flex items-center gap-3 text-xs uppercase tracking-[0.2em] text-muted">
        <span className="font-mono">{index}</span>
        <span className="h-px w-8 bg-border" />
        <span>{eyebrow}</span>
      </div>
      <h2 className="font-sans text-3xl font-semibold leading-[1.1] tracking-tight sm:text-4xl md:text-5xl">
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
        <p className="mt-5 text-base leading-relaxed text-muted md:text-lg">
          {description}
        </p>
      ) : null}
    </div>
  );
}
