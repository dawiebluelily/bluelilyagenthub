const tools = [
  {
    name: "PropCTRL",
    description: "Access PropCTRL for property management, records and agent workflow support.",
    url: "https://online.propctrl.com/"
  },
  {
    name: "TVA",
    description: "Open The Virtual Agent address search tool for quick property and area lookups.",
    url: "https://app.thevirtualagent.co.za/Search/Criteria#tab_address_search"
  },
  {
    name: "Loom",
    description: "Open the Loom portal for property reports and area information.",
    url: "https://portal.loom.co.za/app/home"
  },
  {
    name: "CMA Builder",
    description: "Build and access CMA reports for pricing, seller conversations and mandate support.",
    url: "https://cmagenerator.netlify.app/"
  },
  {
    name: "Bond Calculator",
    description: "Estimate bond repayments, transfer costs and buyer affordability from one tool.",
    url: "https://bondpaymentcalculator.netlify.app/"
  },
  {
    name: "Photo Edits",
    description: "Open the Blue Lily photo editor for cleaner, sharper property listing images.",
    url: "https://bluephotoeditor.netlify.app/"
  },
  {
    name: "Compliance",
    description: "Open the Blue Lily Compliance app for FICA, client documents and compliance support.",
    url: "https://bluelilycompliance.netlify.app/"
  }
];

const toolGrid = document.getElementById("toolGrid");
const searchInput = document.getElementById("searchInput");
const itemCount = document.getElementById("itemCount");

function escapeHtml(value) {
  return String(value || "")
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

function renderTools() {
  const query = searchInput.value.trim().toLowerCase();
  const filtered = tools.filter((tool) => {
    return `${tool.name} ${tool.description}`.toLowerCase().includes(query);
  });

  itemCount.textContent = `${filtered.length} ITEM${filtered.length === 1 ? "" : "S"}`;
  toolGrid.innerHTML = "";

  if (!filtered.length) {
    const empty = document.createElement("div");
    empty.className = "no-results";
    empty.textContent = "No matching tools found.";
    toolGrid.appendChild(empty);
    return;
  }

  filtered.forEach((tool) => {
    const card = document.createElement("article");
    card.className = "tool-card";
    card.innerHTML = `
      <div>
        <h2>${escapeHtml(tool.name)}</h2>
        <p>${escapeHtml(tool.description)}</p>
      </div>
      <a class="open-btn" href="${escapeHtml(tool.url)}" target="_blank" rel="noopener noreferrer">Open</a>
    `;
    toolGrid.appendChild(card);
  });
}

searchInput.addEventListener("input", renderTools);
renderTools();

if ("serviceWorker" in navigator) {
  window.addEventListener("load", () => {
    navigator.serviceWorker.register("service-worker.js").catch(() => {});
  });
}
