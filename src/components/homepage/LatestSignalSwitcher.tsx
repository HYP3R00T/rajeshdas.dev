import { ArrowRight, ArrowUpRight, FileText, Play } from "lucide-react"

import { Button, buttonVariants } from "@/components/ui/button"
import { Dialog, DialogContent, DialogDescription, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

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
  return (
    <Tabs defaultValue="article" className="rounded-lg border border-border/80 bg-background-1 p-4">
      <div className="flex flex-col gap-5 border-border/80 px-1 pb-5 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <p className="font-mono text-xs tracking-widest text-foreground-2 uppercase">Public trail</p>
          <h3 className="mt-2 font-display text-2xl leading-tight text-foreground-0">Latest artifact</h3>
        </div>

        <TabsList aria-label="Latest content switcher" className="border border-border/80 bg-background-2">
          <TabsTrigger value="article" className="gap-2 px-4 font-mono text-xs tracking-widest uppercase">
            <FileText className="size-3.5" aria-hidden="true" />
            Article
          </TabsTrigger>
          <TabsTrigger value="video" className="gap-2 px-4 font-mono text-xs tracking-widest uppercase">
            <Play className="size-3.5" aria-hidden="true" />
            Video
          </TabsTrigger>
        </TabsList>
      </div>

      <TabsContent value="article" className="mt-3">
        <div className="group overflow-hidden rounded-md bg-background-1">
          <div className="aspect-og overflow-hidden rounded-md bg-background-1">
            <img
              src={articleImageSrc}
              srcSet={articleImageSrcSet}
              sizes="(max-width: 1024px) 100vw, 720px"
              alt={articleImageAlt}
              className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.02]"
            />
          </div>
          <div className="px-2 pt-6 pb-2">
            <p className="font-mono text-xs tracking-widest text-foreground-3 uppercase">Latest article</p>
            <h3 className="mt-3 max-w-3xl font-display text-2xl leading-tight text-foreground-0 md:text-3xl">
              {articleTitle}
            </h3>
            <p className="mt-3 max-w-2xl text-sm leading-relaxed text-foreground-2 md:text-base">
              {articleDescription}
            </p>
            <div className="mt-6 flex flex-col gap-3 sm:flex-row">
              <a href={articleHref} className={buttonVariants({ variant: "default", size: "lg" })}>
                Read Article
                <ArrowRight className="size-4" aria-hidden="true" />
              </a>
              <a href="/post" className={buttonVariants({ variant: "outline", size: "lg" })}>
                All Articles
                <ArrowUpRight className="size-4" aria-hidden="true" />
              </a>
            </div>
          </div>
        </div>
      </TabsContent>

      <TabsContent value="video" className="mt-3">
        <Dialog>
          <div className="overflow-hidden rounded-md bg-background-1">
            <DialogTrigger asChild>
              <button
                type="button"
                className="group relative isolate block aspect-og w-full overflow-hidden rounded-md bg-background-1 text-left"
                aria-label={`Open ${videoTitle}`}
              >
                <img
                  src={videoThumbnail}
                  alt={`${videoTitle} thumbnail`}
                  className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.02] group-focus-visible:scale-[1.02]"
                />
                <span className="absolute inset-0 grid place-items-center bg-background-0/15">
                  <span className="rounded-md border border-border/80 bg-background-1 px-5 py-3 font-mono text-xs tracking-widest text-foreground-0 uppercase">
                    Play video
                  </span>
                </span>
              </button>
            </DialogTrigger>

            <div className="px-2 pt-6 pb-2">
              <p className="font-mono text-xs tracking-widest text-foreground-3 uppercase">Latest video</p>
              <h3 className="mt-3 font-display text-2xl leading-tight text-foreground-0 md:text-3xl">{videoTitle}</h3>
              <div className="mt-6 flex flex-col gap-3 sm:flex-row">
                <DialogTrigger asChild>
                  <Button size="lg">Open Video</Button>
                </DialogTrigger>
                <a
                  href={channelUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={buttonVariants({ variant: "outline", size: "lg" })}
                >
                  Visit Channel
                </a>
              </div>
            </div>
          </div>

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
      </TabsContent>
    </Tabs>
  )
}
