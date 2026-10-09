import {
  AutomationIcon,
  Blocks,
  Download,
  FileIcon,
  MessageIcon,
  ReliabilityIcon,
} from "./Icons";
import {
  processClusters,
  processLoop,
  type ProcessIcon,
  type ProcessStep,
} from "@/content/process";

const iconMap: Record<ProcessIcon, typeof MessageIcon> = {
  call: MessageIcon,
  scope: FileIcon,
  build: Blocks,
  health: ReliabilityIcon,
  handover: Download,
  runs: AutomationIcon,
};

const steps: ProcessStep[] = processClusters.flatMap((c) => c.steps);
const planeLabel = { you: "With you", me: "On me" } as const;

/**
 * The process band under the hero: a live, inspectable canvas rather than one
 * more static WebP.
 *
 * ☠️ There is no "use client" here, and there must not be one. Every moving
 * part — the travelling sparks, the hover lift, the dimming, and the readout,
 * detail panel and tick row that reveal together — is a CSS rule in
 * globals.css. The band therefore ships complete in the static HTML with
 * nothing to hydrate. The known cost is that touch devices have no hover, so
 * phones get the diagram without the inspect panel; the detail text is clipped
 * rather than removed, so screen readers still reach it.
 *
 * Colours come from the --diagram-* tokens: true neutrals that follow the
 * theme, a white sheet in light mode and near-black in dark. The spark is ink, never --live — that green means "running right
 * now", and a process diagram is not running.
 */
export function BuildFlow() {
  return (
    <section className="px-6 pt-10 pb-10 md:pt-14 md:pb-12">
      <div className="mx-auto max-w-6xl">
        <div className="mb-8 flex flex-wrap items-end justify-between gap-x-8 gap-y-3">
          <div>
            <p className="mb-3 font-mono text-xs uppercase tracking-[0.2em] text-muted">
              How a build goes
            </p>
            <h2 className="font-sans text-2xl font-semibold tracking-tight sm:text-3xl">
              One system,{" "}
              <span className="font-serif font-normal italic text-accent">
                start to finish.
              </span>
            </h2>
          </div>
          <p className="max-w-md text-sm leading-relaxed text-muted">
            Every engagement runs the same six steps. You know the scope and the
            price before anything is built, and you own what comes out of it.
          </p>
        </div>

        {/* `relative` makes this the containing block every stage's readout,
            detail and ticks paint into. */}
        <div className="flow-canvas relative overflow-hidden rounded-3xl border border-diagram-line/70 bg-diagram-bg p-6 md:p-7">
          <div className="flex items-start justify-between gap-6">
            <div>
              <p className="font-sans text-xl font-medium tracking-tight text-diagram-fg sm:text-2xl">
                Call to{" "}
                <span className="text-diagram-muted">handover</span>
              </p>
              <p className="mt-2.5 flex flex-wrap gap-x-5 gap-y-1 font-mono text-[10px] uppercase tracking-[0.16em] text-diagram-muted">
                <Key plane="you" />
                <Key plane="me" />
              </p>
            </div>

            {/* Idle label, swapped for the hovered stage's name. */}
            <p
              aria-hidden
              className="flow-idle shrink-0 font-mono text-[10px] uppercase tracking-[0.2em] text-diagram-muted"
            >
              Six steps
            </p>
          </div>

          <div className="mt-7 flex flex-col gap-4 lg:flex-row lg:items-stretch">
            {processClusters.map((cluster) => (
              <div
                key={cluster.label}
                className="flex-1 rounded-2xl border border-dashed border-diagram-line/70 p-3.5"
              >
                <p className="mb-3 font-mono text-[10px] uppercase tracking-[0.18em] text-diagram-muted/80">
                  {cluster.label}
                </p>

                <div className="flex items-stretch">
                  {cluster.steps.map((step, si) => {
                    const Icon = iconMap[step.icon];
                    const n = steps.findIndex((x) => x.index === step.index);
                    return (
                      <div key={step.index} className="flow-pair contents">
                        {si > 0 ? <Connector /> : null}
                        <div className="flow-stage flex-1">
                          <div
                            className={`flow-stage-box flex h-full cursor-default flex-col rounded-xl border bg-diagram-node p-3 ${
                              step.focal
                                ? "border-diagram-fg/60"
                                : "border-diagram-line"
                            }`}
                          >
                            <div className="flex items-center gap-2">
                              <Mark plane={step.plane} />
                              <span className="font-mono text-[10px] tracking-[0.14em] text-diagram-muted">
                                {step.index}
                              </span>
                            </div>

                            <p className="mt-2 text-[13px] font-semibold leading-tight text-diagram-fg">
                              {step.label}
                            </p>

                            <span className="flow-stage-icon flex flex-1 items-center justify-center py-5 text-diagram-muted">
                              <Icon className="h-7 w-7" />
                            </span>

                            <span className="flow-stage-chip block truncate rounded-md border border-diagram-line bg-diagram-bg/60 px-2 py-1 text-center font-mono text-[9px] uppercase tracking-[0.1em] text-diagram-muted">
                              {step.tag}
                            </span>
                          </div>

                          {/* These three paint in the canvas corners. */}
                          <span className="flow-stage-readout font-mono text-[10px] uppercase tracking-[0.2em] text-diagram-fg">
                            {step.label}
                          </span>

                          <span className="flow-stage-detail block">
                            <span className="flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.16em] text-diagram-muted">
                              <Mark plane={step.plane} />
                              {planeLabel[step.plane]}
                              <span className="text-diagram-line">|</span>
                              {step.tag}
                            </span>
                            <span className="mt-1.5 block text-[15px] font-medium text-diagram-fg">
                              {step.label}
                            </span>
                            <span className="mt-1 block text-[12.5px] leading-relaxed text-diagram-muted">
                              {step.detail}
                            </span>
                          </span>

                          <span className="flow-stage-ticks flex items-center gap-1.5">
                            {steps.map((_, i) => (
                              <span
                                key={i}
                                className={`block h-px w-3 ${
                                  i === n ? "bg-diagram-fg" : "bg-diagram-line"
                                }`}
                              />
                            ))}
                          </span>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>

          {/* The return path: a live failure caught by the checks rather than
              reported by a user. The offsets track the centres of stage 04 and
              stage 06; they are decorative, so small drift is fine, but
              re-measure if a stage is ever added or removed. Hidden below lg,
              where the clusters stack and a horizontal loop points at nothing. */}
          <div className="mt-4 hidden lg:block">
            <div className="relative ml-[58%] mr-[8%] h-6 rounded-b-xl border-x border-b border-dashed border-diagram-line">
              <span
                aria-hidden
                className="absolute -left-[4px] -top-[5px] h-0 w-0 border-x-[4px] border-b-[5px] border-x-transparent border-b-diagram-line"
              />
              <span className="absolute left-1/2 top-full -translate-x-1/2 -translate-y-1/2 whitespace-nowrap bg-diagram-bg px-3 font-mono text-[10px] uppercase tracking-[0.18em] text-diagram-muted">
                {processLoop}
              </span>
            </div>
          </div>

          {/* Reserved footer so revealing a detail never shifts the layout. */}
          <div className="mt-6 hidden h-[72px] lg:block">
            <p
              aria-hidden
              className="flow-idle font-mono text-[10px] uppercase tracking-[0.18em] text-diagram-muted/70"
            >
              Hover a stage to inspect
            </p>
          </div>
        </div>

        <div className="mt-5 flex flex-wrap items-baseline justify-between gap-x-8 gap-y-2">
          <p className="text-sm font-medium">
            A failure reaches me as an alert, not as your customer complaining.
          </p>
          <p className="font-serif text-sm italic text-muted">
            You own the system and the documentation either way.
          </p>
        </div>
      </div>
    </section>
  );
}

/** Filled for the client's time, outlined for mine — the legend's whole point. */
function Mark({ plane }: { plane: ProcessStep["plane"] }) {
  return (
    <span
      aria-hidden
      className={`inline-block h-[6px] w-[6px] shrink-0 border border-diagram-muted ${
        plane === "you" ? "bg-diagram-muted" : "bg-transparent"
      }`}
    />
  );
}

function Key({ plane }: { plane: ProcessStep["plane"] }) {
  return (
    <span className="inline-flex items-center gap-2">
      <Mark plane={plane} />
      {planeLabel[plane]}
    </span>
  );
}

/**
 * The run between two stages. `--run` is how far the spark travels before it
 * fades, kept just short of the next card's edge.
 */
function Connector() {
  return (
    <div
      aria-hidden
      className="relative mx-1.5 w-5 shrink-0 self-center sm:w-7"
      style={{ ["--run" as string]: "calc(100% - 6px)" }}
    >
      <span className="flow-connector-line block h-px w-full bg-diagram-line" />
      <span className="flow-connector-arrow absolute right-0 top-1/2 h-0 w-0 -translate-y-1/2 border-y-[3px] border-l-[5px] border-y-transparent border-l-diagram-line" />
      <span className="flow-spark" />
    </div>
  );
}
