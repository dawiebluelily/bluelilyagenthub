const toolSections = [
  {
    id: "agent-tools",
    kicker: "Section 01",
    heading: "Agent Tools",
    tools: [
      {
        name: "PropCTRL",
        description: "Access PropCTRL for property management, records and agent workflow support.",
        url: "https://online.propctrl.com/",
        initials: "PC"
      },
      {
        name: "TVA",
        description: "Open The Virtual Agent address search tool for quick property and area lookups.",
        url: "https://app.thevirtualagent.co.za/Search/Criteria#tab_address_search",
        initials: "TV"
      },
      {
        name: "Loom",
        description: "Open the Loom portal for property reports and area information.",
        url: "https://portal.loom.co.za/app/home",
        initials: "LO"
      },
      {
        name: "CMA Builder",
        description: "Build and access CMA reports for pricing, seller conversations and mandate support.",
        url: "https://cmagenerator.netlify.app/",
        initials: "CM"
      },
      {
        name: "Bond Calculator",
        description: "Estimate bond repayments, transfer costs and buyer affordability from one tool.",
        url: "https://bondpaymentcalculator.netlify.app/",
        initials: "BC"
      },
      {
        name: "Photo Edits",
        description: "Open the Blue Lily photo editor for cleaner, sharper property listing images.",
        url: "https://bluephotoeditor.netlify.app/",
        initials: "PE"
      }
    ]
  },
  {
    id: "coming-soon",
    kicker: "Next Build Phase",
    heading: "More Blue Lily Sections Loading",
    tools: [
      {
        name: "Documents",
        description: "Seller, buyer, rental, mandate and compliance documents can be added here next.",
        url: "#",
        initials: "DO",
        inactive: true
      },
      {
        name: "Marketing Apps",
        description: "Small apps, calculators and lead generation tools can be grouped here as they are built.",
        url: "#",
        initials: "MA",
        inactive: true
      },
      {
        name: "Training Library",
        description: "Agent onboarding, scripts, playbooks and training links can be added in a later version.",
        url: "#",
        initials: "TR",
        inactive: true
      }
    ]
  }
];

const sectionContainer = document.querySelector("#toolSections");
const sectionTemplate = document.querySelector("#sectionTemplate");
const toolTemplate = document.querySelector("#toolTemplate");
const searchInput = document.querySelector("#toolSearch");
const categoryFilters = document.querySelector("#categoryFilters");

let activeCategory = "Agent Tools";

function getAllCategories() {
  return ["All", ...toolSections.map((section) => section.heading)];
}

function createFilterButtons() {
  categoryFilters.innerHTML = "";
  getAllCategories().forEach((category) => {
    const button = document.createElement("button");
    button.type = "button";
    button.className = `filter-button${category === activeCategory ? " is-active" : ""}`;
    button.textContent = category;
    button.addEventListener("click", () => {
      activeCategory = category;
      createFilterButtons();
      renderSections();
    });
    categoryFilters.appendChild(button);
  });
}

function matchesSearch(tool, searchTerm) {
  const target = `${tool.name} ${tool.description}`.toLowerCase();
  return target.includes(searchTerm.toLowerCase());
}

function renderSections() {
  const searchTerm = searchInput.value.trim();
  sectionContainer.innerHTML = "";

  const filteredSections = toolSections
    .filter((section) => activeCategory === "All" || section.heading === activeCategory)
    .map((section) => ({
      ...section,
      tools: section.tools.filter((tool) => matchesSearch(tool, searchTerm))
    }))
    .filter((section) => section.tools.length > 0);

  if (!filteredSections.length) {
    const empty = document.createElement("div");
    empty.className = "empty-state";
    empty.textContent = "No tools found. Try a different search.";
    sectionContainer.appendChild(empty);
    return;
  }

  filteredSections.forEach((section) => {
    const sectionNode = sectionTemplate.content.cloneNode(true);
    const wrapper = sectionNode.querySelector(".tool-section");
    wrapper.id = section.id;
    sectionNode.querySelector(".section-kicker").textContent = section.kicker;
    sectionNode.querySelector(".section-heading").textContent = section.heading;
    sectionNode.querySelector(".section-count").textContent = `${section.tools.length} ${section.tools.length === 1 ? "item" : "items"}`;

    const grid = sectionNode.querySelector(".tool-grid");
    section.tools.forEach((tool) => {
      const toolNode = toolTemplate.content.cloneNode(true);
      const card = toolNode.querySelector(".tool-card");
      const title = toolNode.querySelector("h3");
      const description = toolNode.querySelector("p");
      const link = toolNode.querySelector(".tool-button");

      title.textContent = tool.name;
      description.textContent = tool.description;

      if (tool.inactive) {
        link.textContent = "Coming Soon";
        link.removeAttribute("href");
        link.setAttribute("aria-disabled", "true");
        link.style.pointerEvents = "none";
        link.style.opacity = "0.62";
      } else {
        link.textContent = "Open";
        link.href = tool.url;
        link.setAttribute("aria-label", `Open ${tool.name}`);
      }

      grid.appendChild(card);
    });

    sectionContainer.appendChild(sectionNode);
  });
}

function registerServiceWorker() {
  if ("serviceWorker" in navigator) {
    navigator.serviceWorker.register("service-worker.js").catch(() => {
      // The app still works online if the service worker fails.
    });
  }
}


searchInput.addEventListener("input", renderSections);

createFilterButtons();
renderSections();
registerServiceWorker();
