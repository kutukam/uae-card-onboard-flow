/**
 * Guided assistance (co-browsing).
 *
 * This is the entire integration. The assistant sees the STRUCTURE of the page — which
 * controls exist, what they are called, whether a field is filled — and never what the
 * customer types. It stays dormant until the customer arrives on a link carrying ?cb=,
 * and any internal failure disables it without touching the app.
 */
import { CoBrowse } from "@creditnirvana/cobrowse";

export async function initCoBrowse() {
  await CoBrowse.init({
    tenant: "uae-card",
    endpoint: "https://cobrowse.unikernel.ai",
    privacy: {
      // The open-banking step asks for the customer's NET BANKING credentials. The
      // password input is masked automatically by type; naming the field explicitly
      // means even its label never leaves the browser.
      maskSelectors: ["#password", "[name='password']", "[type='password']"],
      maskInputTypes: ["password"],
    },
  });
}
