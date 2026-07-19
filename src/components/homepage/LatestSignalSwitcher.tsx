import { ArrowRight, ArrowUpRight, Play } from "lucide-react"

import { Button, buttonVariants } from "@/components/ui/button"
import { Dialog, DialogContent, DialogDescription, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { cn } from "@/lib/utils"

interface LatestSignalSwitcherProps {
  articleTitle: string
  articleDescription: string
  articleHref: string
  articleImageSrc: string
  articleImageSrcSet: string
  articleImageAlt: string
  videoTitle: string
  videoThumbnail: string
  videoUrl: string
  channelUrl: string
}

export default function LatestSignalSwitcher({
  articleTitle,
  articleDescription,
  articleHref,
  articleImageSrc,
  articleImageSrcSet,
  articleImageAlt,
  videoTitle,
  videoThumbnail,
  videoUrl,
  channelUrl,
}: LatestSignalSwitcherProps) {
  const accentButton = cn(
    buttonVariants({ variant: "default", size: "lg" }),
    "bg-accent-1 px-5 text-accent-contrast hover:bg-accent-2",
  )

  return (
    <div className="grid lg:grid-cols-2">
      <article className="flex min-w-0 flex-col border-border lg:border-r">
        <a href={articleHref} className="group block aspect-og overflow-hidden bg-background-1">
          <img
            src={articleImageSrc}
            srcSet={articleImageSrcSet}
            sizes="(max-width: 1024px) 100vw, 42rem"
            alt={articleImageAlt}
            className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.02]"
          />
        </a>

        <div className="flex flex-1 flex-col px-5 py-8 md:px-10 md:py-10 lg:px-12">
          <p className="font-mono text-[0.6875rem] tracking-[0.14em] text-accent-1 uppercase">Latest article</p>
          <h3 className="mt-5 max-w-2xl font-display text-3xl leading-tight font-medium tracking-[-0.025em] text-foreground-0">
            {articleTitle}
          </h3>
          <p className="mt-4 max-w-xl text-base leading-7 text-foreground-2">{articleDescription}</p>
          <div className="mt-auto flex flex-col gap-3 pt-8 sm:flex-row">
            <a href={articleHref} className={accentButton}>
              Read article
              <ArrowRight className="size-4" aria-hidden="true" />
            </a>
            <a href="/post" className={cn(buttonVariants({ variant: "outline", size: "lg" }), "px-5")}>
              All articles
              <ArrowUpRight className="size-4" aria-hidden="true" />
            </a>
          </div>
        </div>
      </article>

      <Dialog>
        <article className="flex min-w-0 flex-col border-t border-border lg:border-t-0">
          <DialogTrigger asChild>
            <button
              type="button"
              className="group relative block aspect-og w-full overflow-hidden bg-background-1 text-left focus-visible:outline-2 focus-visible:outline-offset-[-2px] focus-visible:outline-ring"
              aria-label={`Open ${videoTitle}`}
            >
              <img
                src={videoThumbnail}
                alt={`${videoTitle} thumbnail`}
                className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.02] group-focus-visible:scale-[1.02]"
              />
              <span className="absolute inset-0 grid place-items-center bg-background-0/18">
                <span className="flex size-12 items-center justify-center rounded-md bg-accent-1 text-accent-contrast transition-transform group-hover:scale-105">
                  <Play className="size-5 fill-current" aria-hidden="true" />
                </span>
              </span>
            </button>
          </DialogTrigger>

          <div className="flex flex-1 flex-col px-5 py-8 md:px-10 md:py-10 lg:px-12">
            <p className="font-mono text-[0.6875rem] tracking-[0.14em] text-accent-1 uppercase">Latest video</p>
            <h3 className="mt-5 max-w-2xl font-display text-3xl leading-tight font-medium tracking-[-0.025em] text-foreground-0">
              {videoTitle}
            </h3>
            <p className="mt-4 max-w-xl text-base leading-7 text-foreground-2">
              Practical walkthroughs for the systems, tools, and decisions behind the work.
            </p>
            <div className="mt-auto flex flex-col gap-3 pt-8 sm:flex-row">
              <DialogTrigger asChild>
                <Button size="lg" className="bg-accent-1 px-5 text-accent-contrast hover:bg-accent-2">
                  Watch video
                  <Play className="size-4" aria-hidden="true" />
                </Button>
              </DialogTrigger>
              <a
                href={channelUrl}
                target="_blank"
                rel="noopener noreferrer"
                className={cn(buttonVariants({ variant: "outline", size: "lg" }), "px-5")}
              >
                Visit channel
                <ArrowUpRight className="size-4" aria-hidden="true" />
              </a>
            </div>
          </div>
        </article>

        <DialogContent className="max-w-5xl gap-0 overflow-hidden bg-background-0 p-0 sm:max-w-5xl">
          <DialogTitle className="sr-only">{videoTitle}</DialogTitle>
          <DialogDescription className="sr-only">Embedded video player for {videoTitle}</DialogDescription>
          <div className="aspect-video w-full">
            <iframe
              className="h-full w-full"
              title={videoTitle}
              src={videoUrl}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              referrerPolicy="strict-origin-when-cross-origin"
              allowFullScreen
            />
          </div>
        </DialogContent>
      </Dialog>
    </div>
  )
}
