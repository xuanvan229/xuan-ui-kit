import "@testing-library/jest-dom/vitest"
import { cleanup } from "@testing-library/react"
import { afterEach } from "vitest"

class ResizeObserverStub {
  observe() {}
  unobserve() {}
  disconnect() {}
}

// note: jsdom lacks ResizeObserver and scrollIntoView, which Base UI popups call.
globalThis.ResizeObserver = ResizeObserverStub as unknown as typeof ResizeObserver
Element.prototype.scrollIntoView = () => {}
// note: jsdom lacks pointer capture, which Sonner uses for swipe-to-dismiss.
Element.prototype.setPointerCapture = () => {}
Element.prototype.releasePointerCapture = () => {}

afterEach(() => cleanup())
