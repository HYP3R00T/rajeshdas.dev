type Point3D = {
  x: number
  y: number
  z: number
}

type ProjectedPoint = Point3D
type StoryShape = "sphere" | "cube" | "pyramid"

type ShapeGeometry = {
  points: Point3D[]
}

const TAU = Math.PI * 2
const GOLDEN_ANGLE = Math.PI * (3 - Math.sqrt(5))

const clamp = (value: number, minimum: number, maximum: number) => Math.min(maximum, Math.max(minimum, value))

const point = (x: number, y: number, z: number): Point3D => ({ x, y, z })

const randomAt = (seed: number) => {
  const value = Math.sin(seed * 12.9898) * 43758.5453
  return value - Math.floor(value)
}

const createSphere = (count: number): ShapeGeometry => {
  const radius = 0.72
  const points = Array.from({ length: count }, (_, index) => {
    const y = 1 - (2 * (index + 0.5)) / count
    const ringRadius = Math.sqrt(1 - y * y)
    const angle = index * GOLDEN_ANGLE
    return point(Math.cos(angle) * ringRadius * radius, y * radius, Math.sin(angle) * ringRadius * radius)
  })

  return { points }
}

const createCube = (count: number): ShapeGeometry => {
  const extent = 0.54
  const points = Array.from({ length: count }, (_, index) => {
    const face = index % 6
    const u = (randomAt(index * 3 + 11) * 2 - 1) * extent
    const v = (randomAt(index * 7 + 29) * 2 - 1) * extent
    if (face === 0) return point(extent, u, v)
    if (face === 1) return point(-extent, u, v)
    if (face === 2) return point(u, extent, v)
    if (face === 3) return point(u, -extent, v)
    if (face === 4) return point(u, v, extent)
    return point(u, v, -extent)
  })

  return { points }
}

const createPyramid = (count: number): ShapeGeometry => {
  const apex = point(0, -0.72, 0)
  const extent = 0.64
  const baseY = 0.58
  const corners = [
    point(-extent, baseY, -extent),
    point(extent, baseY, -extent),
    point(extent, baseY, extent),
    point(-extent, baseY, extent),
  ]
  const points = Array.from({ length: count }, (_, index) => {
    const face = index % 5
    const firstRandom = randomAt(index * 5 + 17)
    const secondRandom = randomAt(index * 11 + 41)
    if (face === 4) {
      return point((firstRandom * 2 - 1) * extent, baseY, (secondRandom * 2 - 1) * extent)
    }

    const firstCorner = corners[face]
    const secondCorner = corners[(face + 1) % 4]
    if (!firstCorner || !secondCorner) return apex
    const root = Math.sqrt(firstRandom)
    const apexWeight = 1 - root
    const firstWeight = root * (1 - secondRandom)
    const secondWeight = root * secondRandom
    return point(
      apex.x * apexWeight + firstCorner.x * firstWeight + secondCorner.x * secondWeight,
      apex.y * apexWeight + firstCorner.y * firstWeight + secondCorner.y * secondWeight,
      apex.z * apexWeight + firstCorner.z * firstWeight + secondCorner.z * secondWeight,
    )
  })
  return { points }
}

const easeInOutCubic = (value: number) => (value < 0.5 ? 4 * value ** 3 : 1 - (-2 * value + 2) ** 3 / 2)

const initStory = (story: HTMLElement) => {
  if (story.dataset.storyReady === "true") return

  const canvas = story.querySelector<HTMLCanvasElement>("[data-story-particles]")
  const field = story.querySelector<HTMLElement>("[data-story-field]")
  const counter = story.querySelector<HTMLElement>("[data-story-counter]")
  const label = story.querySelector<HTMLElement>("[data-story-label]")
  const steps = Array.from(story.querySelectorAll<HTMLElement>("[data-story-step]"))
  const context = canvas?.getContext("2d")
  if (!canvas || !field || !context || steps.length === 0) return

  story.dataset.storyReady = "true"

  const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)")
  const compactViewport = window.matchMedia("(max-width: 767px)")
  const particleCount = compactViewport.matches ? 720 : 1600
  const geometries: Record<StoryShape, ShapeGeometry> = {
    sphere: createSphere(particleCount),
    cube: createCube(particleCount),
    pyramid: createPyramid(particleCount),
  }

  let width = 0
  let height = 0
  let animationFrame: number | undefined
  let scrollFrame: number | undefined
  let activeIndex = 0
  let activeShape: StoryShape = "sphere"
  const renderedPoints = geometries.sphere.points.map((value) => ({ ...value }))
  let startPoints = geometries.sphere.points
  let targetPoints = geometries.sphere.points
  let morphStartedAt = 0
  let fieldVisible = false
  const baseRotationX = -0.28
  const baseRotationY = -0.42
  let rotationX = baseRotationX
  let rotationY = baseRotationY
  let targetRotationX = baseRotationX
  let targetRotationY = baseRotationY
  let restRotationX = baseRotationX
  let restRotationY = baseRotationY
  let dragPointerId: number | undefined
  let dragStartX = 0
  let dragStartY = 0
  let dragStartRotationX = baseRotationX
  let dragStartRotationY = baseRotationY
  let accentColor = ""
  let quietColor = ""
  let foregroundColor = ""

  const readColors = () => {
    const styles = getComputedStyle(canvas)
    accentColor = styles.getPropertyValue("--accent-1").trim()
    quietColor = styles.getPropertyValue("--foreground-3").trim()
    foregroundColor = styles.getPropertyValue("--foreground-1").trim()
  }

  const rotateAndProject = (value: Point3D, scale: number, time: number): ProjectedPoint => {
    const animatedYaw = rotationY + (reducedMotion.matches ? 0 : time * 0.000045)
    const yawCosine = Math.cos(animatedYaw)
    const yawSine = Math.sin(animatedYaw)
    const pitchCosine = Math.cos(rotationX)
    const pitchSine = Math.sin(rotationX)
    const yawX = value.x * yawCosine + value.z * yawSine
    const yawZ = -value.x * yawSine + value.z * yawCosine
    const rotatedY = value.y * pitchCosine - yawZ * pitchSine
    const rotatedZ = value.y * pitchSine + yawZ * pitchCosine
    const perspective = 1 + rotatedZ * 0.22
    return {
      x: width / 2 + yawX * scale * perspective,
      y: height / 2 + rotatedY * scale * perspective,
      z: rotatedZ,
    }
  }

  const draw = (progress = 1, time = performance.now()) => {
    context.clearRect(0, 0, width, height)
    const easedProgress = easeInOutCubic(clamp(progress, 0, 1))
    const visibleDimension = compactViewport.matches
      ? Math.min(width, height, field.clientHeight)
      : Math.min(width, height)
    const scale = visibleDimension * 0.4

    const projectedPoints: Array<{ index: number; value: ProjectedPoint }> = []
    for (let index = 0; index < particleCount; index += 1) {
      const origin = startPoints[index] ?? startPoints[0]
      const destination = targetPoints[index] ?? targetPoints[0]
      if (!origin || !destination) continue
      const value = point(
        origin.x + (destination.x - origin.x) * easedProgress,
        origin.y + (destination.y - origin.y) * easedProgress,
        origin.z + (destination.z - origin.z) * easedProgress,
      )
      renderedPoints[index] = value
      projectedPoints.push({ index, value: rotateAndProject(value, scale, time) })
    }

    projectedPoints.sort((first, second) => first.value.z - second.value.z)
    for (const { index, value } of projectedPoints) {
      const depth = clamp((value.z + 0.8) / 1.6, 0, 1)
      const highlighted = index % 47 === 0
      context.fillStyle = highlighted ? accentColor : depth > 0.54 ? foregroundColor : quietColor
      context.globalAlpha = highlighted ? 0.82 : 0.12 + depth * 0.5
      context.beginPath()
      context.arc(value.x, value.y, highlighted ? 1.55 : 0.6 + depth * 0.5, 0, TAU)
      context.fill()
    }
    context.globalAlpha = 1
  }

  const animate = (time: number) => {
    animationFrame = undefined
    const progress = reducedMotion.matches ? 1 : clamp((time - morphStartedAt) / 1050, 0, 1)
    rotationX += (targetRotationX - rotationX) * 0.08
    rotationY += (targetRotationY - rotationY) * 0.08
    draw(progress, time)

    const rotationIsMoving =
      Math.abs(targetRotationX - rotationX) > 0.001 || Math.abs(targetRotationY - rotationY) > 0.001
    if (progress < 1 || rotationIsMoving || (fieldVisible && !reducedMotion.matches)) {
      animationFrame = window.requestAnimationFrame(animate)
    }
  }

  const scheduleAnimation = () => {
    if (animationFrame !== undefined) return
    animationFrame = window.requestAnimationFrame(animate)
  }

  const activateStep = (index: number, immediate = false) => {
    const step = steps[index]
    if (!step) return
    const shapeName = (step.dataset.shape ?? "sphere") as StoryShape
    activeShape = geometries[shapeName] ? shapeName : "sphere"
    activeIndex = index
    steps.forEach((item, itemIndex) => {
      item.toggleAttribute("data-active", itemIndex === activeIndex)
    })
    if (counter) {
      counter.textContent = `${String(index + 1).padStart(2, "0")} / ${String(steps.length).padStart(2, "0")}`
    }
    if (label) label.textContent = step.dataset.visualLabel ?? ""

    if (animationFrame !== undefined) {
      window.cancelAnimationFrame(animationFrame)
      animationFrame = undefined
    }
    startPoints = renderedPoints.map((value) => ({ ...value }))
    targetPoints = geometries[activeShape].points
    morphStartedAt = performance.now()

    if (immediate || reducedMotion.matches) {
      draw(1)
      if (fieldVisible && !reducedMotion.matches) scheduleAnimation()
      return
    }
    scheduleAnimation()
  }

  const resize = () => {
    const bounds = canvas.getBoundingClientRect()
    const pixelRatio = Math.min(window.devicePixelRatio || 1, 1.75)
    width = Math.max(1, bounds.width)
    height = Math.max(1, bounds.height)
    canvas.width = Math.round(width * pixelRatio)
    canvas.height = Math.round(height * pixelRatio)
    context.setTransform(pixelRatio, 0, 0, pixelRatio, 0, 0)
    readColors()
    draw(1)
  }

  const updateActiveStep = () => {
    scrollFrame = undefined
    const activationY = window.innerHeight * (compactViewport.matches ? 0.72 : 0.5)
    let nextIndex = 0
    let closestDistance = Number.POSITIVE_INFINITY
    steps.forEach((step, index) => {
      const bounds = step.getBoundingClientRect()
      if (bounds.top <= activationY && bounds.bottom > activationY) {
        nextIndex = index
        closestDistance = 0
        return
      }
      const distance = Math.min(Math.abs(bounds.top - activationY), Math.abs(bounds.bottom - activationY))
      if (distance < closestDistance) {
        closestDistance = distance
        nextIndex = index
      }
    })
    if (nextIndex !== activeIndex) activateStep(nextIndex)
  }

  const scheduleActiveStep = () => {
    if (scrollFrame !== undefined) return
    scrollFrame = window.requestAnimationFrame(updateActiveStep)
  }

  const handlePointerDown = (event: PointerEvent) => {
    if (event.pointerType === "mouse" && event.button !== 0) return
    dragPointerId = event.pointerId
    dragStartX = event.clientX
    dragStartY = event.clientY
    dragStartRotationX = targetRotationX
    dragStartRotationY = targetRotationY
    field.dataset.dragging = "true"
    field.setPointerCapture(event.pointerId)
  }

  const handlePointerMove = (event: PointerEvent) => {
    const bounds = field.getBoundingClientRect()
    if (dragPointerId === event.pointerId) {
      const dragScale = Math.max(240, Math.min(bounds.width, bounds.height))
      targetRotationX = clamp(dragStartRotationX - ((event.clientY - dragStartY) / dragScale) * Math.PI, -1.45, 1.45)
      targetRotationY = dragStartRotationY + ((event.clientX - dragStartX) / dragScale) * Math.PI
      if (reducedMotion.matches) {
        rotationX = targetRotationX
        rotationY = targetRotationY
        draw(1)
      } else {
        scheduleAnimation()
      }
      event.preventDefault()
      return
    }
    if (reducedMotion.matches || event.pointerType === "touch") return
    const normalizedX = clamp((event.clientX - bounds.left) / bounds.width, 0, 1) * 2 - 1
    const normalizedY = clamp((event.clientY - bounds.top) / bounds.height, 0, 1) * 2 - 1
    targetRotationX = restRotationX - normalizedY * 0.16
    targetRotationY = restRotationY + normalizedX * 0.2
    scheduleAnimation()
  }

  const handlePointerEnd = (event: PointerEvent) => {
    if (dragPointerId !== event.pointerId) return
    restRotationX = targetRotationX
    restRotationY = targetRotationY
    dragPointerId = undefined
    delete field.dataset.dragging
    if (field.hasPointerCapture(event.pointerId)) field.releasePointerCapture(event.pointerId)
  }

  const handlePointerLeave = () => {
    if (dragPointerId !== undefined) return
    targetRotationX = restRotationX
    targetRotationY = restRotationY
    scheduleAnimation()
  }

  const resizeObserver = new ResizeObserver(() => {
    resize()
    scheduleActiveStep()
  })
  resizeObserver.observe(field)

  const visibilityObserver = new IntersectionObserver(([entry]) => {
    fieldVisible = entry?.isIntersecting ?? false
    if (fieldVisible) scheduleAnimation()
  })
  visibilityObserver.observe(field)

  field.addEventListener("pointerdown", handlePointerDown)
  field.addEventListener("pointermove", handlePointerMove)
  field.addEventListener("pointerup", handlePointerEnd)
  field.addEventListener("pointercancel", handlePointerEnd)
  field.addEventListener("pointerleave", handlePointerLeave)
  window.addEventListener("scroll", scheduleActiveStep, { passive: true })
  window.addEventListener("resize", scheduleActiveStep)

  const themeObserver = new MutationObserver(() => {
    readColors()
    draw(1)
  })
  themeObserver.observe(document.documentElement, { attributes: true, attributeFilter: ["class"] })

  const handleMotionChange = () => {
    rotationX = baseRotationX
    rotationY = baseRotationY
    targetRotationX = baseRotationX
    targetRotationY = baseRotationY
    restRotationX = baseRotationX
    restRotationY = baseRotationY
    activateStep(activeIndex, true)
  }
  reducedMotion.addEventListener("change", handleMotionChange)

  readColors()
  resize()
  activateStep(0, true)
  scheduleActiveStep()

  return () => {
    if (animationFrame !== undefined) window.cancelAnimationFrame(animationFrame)
    if (scrollFrame !== undefined) window.cancelAnimationFrame(scrollFrame)
    resizeObserver.disconnect()
    visibilityObserver.disconnect()
    themeObserver.disconnect()
    reducedMotion.removeEventListener("change", handleMotionChange)
    field.removeEventListener("pointerdown", handlePointerDown)
    field.removeEventListener("pointermove", handlePointerMove)
    field.removeEventListener("pointerup", handlePointerEnd)
    field.removeEventListener("pointercancel", handlePointerEnd)
    field.removeEventListener("pointerleave", handlePointerLeave)
    window.removeEventListener("scroll", scheduleActiveStep)
    window.removeEventListener("resize", scheduleActiveStep)
    delete story.dataset.storyReady
  }
}

const activeStories = new Map<HTMLElement, () => void>()
let lifecycleReady = false

const setupStories = () => {
  for (const story of document.querySelectorAll<HTMLElement>("[data-homepage-story]")) {
    if (activeStories.has(story)) continue
    const cleanup = initStory(story)
    if (cleanup) activeStories.set(story, cleanup)
  }
}

const cleanupStories = () => {
  for (const cleanup of activeStories.values()) cleanup()
  activeStories.clear()
}

export const initHomepageStory = () => {
  if (!lifecycleReady) {
    document.addEventListener("astro:page-load", setupStories)
    document.addEventListener("astro:before-swap", cleanupStories)
    lifecycleReady = true
  }
  setupStories()
}
