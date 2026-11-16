import Footer from "@/components/layout/Footer"
import Header from "@/components/layout/Header"
import Container from "@/components/shared/Container"
import type { LegalContent, LegalSegment } from "@/content/types/legal"
import type { Locale } from "@/lib/i18n"

function Segment({ segment }: { segment: LegalSegment }) {
  if (typeof segment === "string") return <>{segment}</>
  return (
    <a
      href={segment.href}
      {...(segment.external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
      className="text-foreground underline underline-offset-4 hover:text-primary"
    >
      {segment.label}
    </a>
  )
}

export default function LegalView({ content, locale }: { content: LegalContent; locale: Locale }) {
  return (
    <>
      <Header locale={locale} />
      <main>
        <section className="bg-muted/50 py-12">
          <Container>
            <h1 className="font-heading text-4xl font-bold tracking-tight">{content.heading}</h1>
            <p className="mt-2 text-muted-foreground">{content.lastUpdated}</p>
          </Container>
        </section>

        <section className="py-16">
          <Container>
            <div className="mx-auto max-w-3xl">
              {content.sections.map((section) => (
                <div key={section.heading}>
                  <h2 className="font-heading text-xl font-bold mt-10 mb-3">{section.heading}</h2>
                  {section.paragraphs.map((paragraph, index) => (
                    <p key={index} className="text-muted-foreground leading-relaxed mb-4">
                      {paragraph.map((segment, segmentIndex) => (
                        <Segment key={segmentIndex} segment={segment} />
                      ))}
                    </p>
                  ))}
                </div>
              ))}
            </div>
          </Container>
        </section>
      </main>
      <Footer locale={locale} />
    </>
  )
}
