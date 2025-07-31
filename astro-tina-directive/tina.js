/**
 * Hydrate TinaCMS components
 * @type {import('astro').ClientDirective}
 */
export default async (load, options, el) => {
  try {
    const isInIframe = window.self !== window.top;
    
    // Always hydrate the component, but with different behavior for iframe vs regular site
    const hydrate = await load();
    await hydrate();
    
    // Log for debugging
    if (isInIframe) {
      console.log("TinaCMS component hydrated in iframe (edit mode)");
    } else {
      console.log("TinaCMS component hydrated on live site");
    }
  } catch (error) {
    console.error("An error occurred in the Tina client directive:", error);
  }
};
