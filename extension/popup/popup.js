// Constants
const API_BASE_URL = "http://localhost:3000/api/v1";
let currentPage = 1;
let totalPages = 1;
let currentFilters = {};
let currentItemId = null;
let isLoading = false;
let domainList = [];

// DOM Elements
const elements = {
    searchInput: document.getElementById("searchInput"),
    filterBtn: document.getElementById("filterBtn"),
    filterPanel: document.getElementById("filterPanel"),
    applyFiltersBtn: document.getElementById("applyFiltersBtn"),
    resetFiltersBtn: document.getElementById("resetFiltersBtn"),
    clipboardItems: document.getElementById("clipboardItems"),
    emptyState: document.getElementById("emptyState"),
    errorState: document.getElementById("errorState"),
    retryBtn: document.getElementById("retryBtn"),
    settingsBtn: document.getElementById("settingsBtn"),
    toast: document.getElementById("toast"),
    dateRangeSelect: document.getElementById("dateRangeSelect"),
    customDateRange: document.getElementById("customDateRange"),
    startDate: document.getElementById("startDate"),
    endDate: document.getElementById("endDate"),
    domainSelect: document.getElementById("domainSelect"),
    favoritesOnly: document.getElementById("favoritesOnly"),

    // Modal elements
    itemDetailModal: document.getElementById("itemDetailModal"),
    closeModalBtn: document.getElementById("closeModalBtn"),
    modalFavicon: document.getElementById("modalFavicon"),
    modalSourceUrl: document.getElementById("modalSourceUrl"),
    modalCategory: document.getElementById("modalCategory"),
    modalTimestamp: document.getElementById("modalTimestamp"),
    modalContent: document.getElementById("modalContent"),
    modalCopyBtn: document.getElementById("modalCopyBtn"),
    modalFavoriteBtn: document.getElementById("modalFavoriteBtn"),
    modalDeleteBtn: document.getElementById("modalDeleteBtn"),

    // Delete confirmation modal
    deleteConfirmModal: document.getElementById("deleteConfirmModal"),
    closeDeleteConfirmBtn: document.getElementById("closeDeleteConfirmBtn"),
    cancelDeleteBtn: document.getElementById("cancelDeleteBtn"),
    confirmDeleteBtn: document.getElementById("confirmDeleteBtn"),
};

// Initialize popup
document.addEventListener("DOMContentLoaded", () => {
    setupEventListeners();
    loadClipboardItems();
});

// Setup event listeners
function setupEventListeners() {
    // Search input
    elements.searchInput.addEventListener(
        "input",
        debounce(() => {
            currentPage = 1;
            loadClipboardItems();
        }, 300)
    );

    // Filter panel toggle
    elements.filterBtn.addEventListener("click", () => {
        elements.filterPanel.classList.toggle("hidden");
    });

    // Apply filters
    elements.applyFiltersBtn.addEventListener("click", () => {
        applyFilters();
        elements.filterPanel.classList.add("hidden");
    });

    // Reset filters
    elements.resetFiltersBtn.addEventListener("click", resetFilters);

    // Retry button
    elements.retryBtn.addEventListener("click", loadClipboardItems);

    // Settings button
    elements.settingsBtn.addEventListener("click", () => {
        chrome.runtime.openOptionsPage();
    });

    // Date range select
    elements.dateRangeSelect.addEventListener("change", () => {
        if (elements.dateRangeSelect.value === "custom") {
            elements.customDateRange.classList.remove("hidden");
        } else {
            elements.customDateRange.classList.add("hidden");
        }
    });

    // Modal close button
    elements.closeModalBtn.addEventListener("click", () => {
        elements.itemDetailModal.classList.add("hidden");
    });

    // Modal copy button
    elements.modalCopyBtn.addEventListener("click", () => {
        copyItemToClipboard(currentItemId);
    });

    // Modal favorite button
    elements.modalFavoriteBtn.addEventListener("click", () => {
        toggleFavorite(currentItemId);
    });

    // Modal delete button
    elements.modalDeleteBtn.addEventListener("click", () => {
        elements.deleteConfirmModal.classList.remove("hidden");
    });

    // Delete confirmation modal
    elements.closeDeleteConfirmBtn.addEventListener("click", () => {
        elements.deleteConfirmModal.classList.add("hidden");
    });

    elements.cancelDeleteBtn.addEventListener("click", () => {
        elements.deleteConfirmModal.classList.add("hidden");
    });

    elements.confirmDeleteBtn.addEventListener("click", () => {
        deleteItem(currentItemId);
        elements.deleteConfirmModal.classList.add("hidden");
    });

    // Infinite scroll
    elements.clipboardItems.addEventListener("scroll", () => {
        const { scrollTop, scrollHeight, clientHeight } =
            elements.clipboardItems;
        if (
            scrollTop + clientHeight >= scrollHeight - 50 &&
            !isLoading &&
            currentPage < totalPages
        ) {
            currentPage++;
            loadClipboardItems(true);
        }
    });

    // Close modals when clicking outside
    window.addEventListener("click", (event) => {
        if (event.target === elements.itemDetailModal) {
            elements.itemDetailModal.classList.add("hidden");
        }
        if (event.target === elements.deleteConfirmModal) {
            elements.deleteConfirmModal.classList.add("hidden");
        }
    });
}

// Load clipboard items from API
async function loadClipboardItems(append = false) {
    try {
        isLoading = true;

        if (!append) {
            elements.clipboardItems.innerHTML = `
        <div class="loading-indicator">
          <div class="spinner"></div>
          <p>Loading clipboard history...</p>
        </div>
      `;
            elements.emptyState.classList.add("hidden");
            elements.errorState.classList.add("hidden");
        }

        const { userId } = await chrome.storage.local.get("userId");
        if (!userId) {
            throw new Error("User ID not found");
        }

        // Build query parameters
        const params = new URLSearchParams({
            page: currentPage,
            limit: 20,
        });

        // Add search query if present
        if (elements.searchInput.value.trim()) {
            params.append("search", elements.searchInput.value.trim());
        }

        // Add filters if present
        if (currentFilters.category) {
            params.append("category", currentFilters.category);
        }
        if (currentFilters.contentType) {
            params.append("contentType", currentFilters.contentType);
        }
        if (currentFilters.favorite) {
            params.append("favorite", "true");
        }
        if (currentFilters.startDate) {
            params.append("startDate", currentFilters.startDate);
        }
        if (currentFilters.endDate) {
            params.append("endDate", currentFilters.endDate);
        }
        if (currentFilters.domain) {
            params.append("domain", currentFilters.domain);
        }

        // Fetch items from API
        const response = await fetch(
            `${API_BASE_URL}/items?${params.toString()}`,
            {
                headers: {
                    "X-User-Id": userId,
                },
            }
        );

        if (!response.ok) {
            throw new Error(`API error: ${response.status}`);
        }

        const data = await response.json();

        // Update pagination info
        totalPages = data.pagination.pages;

        // If no items found
        if (data.items.length === 0 && !append) {
            elements.clipboardItems.innerHTML = "";
            elements.emptyState.classList.remove("hidden");
            isLoading = false;
            return;
        }

        // Clear container if not appending
        if (!append) {
            elements.clipboardItems.innerHTML = "";
        }

        // Render items
        data.items.forEach((item) => {
            renderClipboardItem(item);
        });

        // Extract unique domains for filter dropdown
        if (!append && data.items.length > 0) {
            updateDomainList(data.items);
        }

        isLoading = false;
    } catch (error) {
        console.error("Error loading clipboard items:", error);

        if (!append) {
            elements.clipboardItems.innerHTML = "";
            elements.errorState.classList.remove("hidden");
        }

        isLoading = false;
    }
}

// Render a single clipboard item
function renderClipboardItem(item) {
    const itemElement = document.createElement("div");
    itemElement.className = `clipboard-item ${
        item.isFavorite ? "favorite" : ""
    }`;
    itemElement.dataset.id = item._id;

    // Get favicon URL
    const faviconUrl = getFaviconUrl(item.sourceUrl);

    // Format timestamp
    const timestamp = formatTimestamp(item.createdAt);

    // Get category class
    const categoryClass = getCategoryClass(item.category);

    // Prepare content preview
    const contentPreview = getContentPreview(item);

    // Build HTML
    itemElement.innerHTML = `
    <div class="item-header">
      <div class="item-source">
        <img class="favicon" src="${faviconUrl}" alt="" onerror="this.src='../assets/icons/globe.svg'">
        <span title="${item.sourceUrl}">${
        item.sourceTitle || item.sourceUrl
    }</span>
      </div>
      <div class="item-actions">
        <button class="icon-button favorite-btn" title="${
            item.isFavorite ? "Remove from favorites" : "Add to favorites"
        }">
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="${
              item.isFavorite ? "currentColor" : "none"
          }" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="${
        item.isFavorite ? "favorite-icon" : ""
    }">
            <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon>
          </svg>
        </button>
        <button class="icon-button copy-btn" title="Copy to clipboard">
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect>
            <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path>
          </svg>
        </button>
        <button class="icon-button delete-btn" title="Delete">
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <polyline points="3 6 5 6 21 6"></polyline>
            <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
          </svg>
        </button>
      </div>
    </div>
    <div class="item-meta">
      <span class="category-tag ${categoryClass}">${item.category}</span>
      <span class="timestamp">${timestamp}</span>
    </div>
    <div class="item-content ${categoryClass === "code" ? "code" : ""} ${
        item.contentType === "image" ? "image" : ""
    }">
      ${contentPreview}
    </div>
  `;

    // Add event listeners
    itemElement
        .querySelector(".favorite-btn")
        .addEventListener("click", (e) => {
            e.stopPropagation();
            toggleFavorite(item._id);
        });

    itemElement.querySelector(".copy-btn").addEventListener("click", (e) => {
        e.stopPropagation();
        copyItemToClipboard(item._id);
    });

    itemElement.querySelector(".delete-btn").addEventListener("click", (e) => {
        e.stopPropagation();
        currentItemId = item._id;
        elements.deleteConfirmModal.classList.remove("hidden");
    });

    // Open detail modal on click
    itemElement.addEventListener("click", () => {
        openItemDetailModal(item);
    });

    // Append to container
    elements.clipboardItems.appendChild(itemElement);
}

// Helper functions
function getFaviconUrl(url) {
    try {
        const domain = new URL(url).hostname;
        return `https://www.google.com/s2/favicons?domain=${domain}&sz=64`;
    } catch (e) {
        return "../assets/icons/globe.svg";
    }
}

function formatTimestamp(timestamp) {
    const date = new Date(timestamp);
    const now = new Date();
    const diffMs = now - date;
    const diffSec = Math.floor(diffMs / 1000);
    const diffMin = Math.floor(diffSec / 60);
    const diffHour = Math.floor(diffMin / 60);
    const diffDay = Math.floor(diffHour / 24);

    if (diffSec < 60) {
        return "Just now";
    } else if (diffMin < 60) {
        return `${diffMin} min${diffMin > 1 ? "s" : ""} ago`;
    } else if (diffHour < 24) {
        return `${diffHour} hour${diffHour > 1 ? "s" : ""} ago`;
    } else if (diffDay < 7) {
        return `${diffDay} day${diffDay > 1 ? "s" : ""} ago`;
    } else {
        return date.toLocaleDateString();
    }
}

function getCategoryClass(category) {
    switch (category) {
        case "Code Snippet":
            return "code";
        case "URL":
            return "url";
        case "Email Address":
            return "email";
        case "Phone Number":
            return "phone";
        case "Physical Address":
            return "address";
        case "Quote":
            return "quote";
        case "Image":
            return "image";
        case "Plain Text":
            return "text";
        default:
            return "uncategorized";
    }
}

function getContentPreview(item) {
    if (item.contentType === "image") {
        return `<img src="${item.content}" alt="Copied image">`;
    } else {
        // Escape HTML to prevent XSS
        const escapedContent = escapeHtml(item.content);

        // Truncate long content
        return escapedContent.length > 300
            ? escapedContent.substring(0, 300) + "..."
            : escapedContent;
    }
}

function escapeHtml(unsafe) {
    return unsafe
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;")
        .replace(/'/g, "&#039;");
}

function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Update domain list for filter dropdown
function updateDomainList(items) {
    try {
        const domains = items
            .map((item) => {
                try {
                    return new URL(item.sourceUrl).hostname;
                } catch (e) {
                    return null;
                }
            })
            .filter(Boolean);

        // Get unique domains
        domainList = [...new Set(domains)];

        // Update domain select
        const domainSelect = elements.domainSelect;
        domainSelect.innerHTML = '<option value="">All Sources</option>';

        domainList.forEach((domain) => {
            const option = document.createElement("option");
            option.value = domain;
            option.textContent = domain;
            domainSelect.appendChild(option);
        });
    } catch (error) {
        console.error("Error updating domain list:", error);
    }
}

// Apply filters
function applyFilters() {
    try {
        // Get selected categories
        const categoryCheckboxes = document.querySelectorAll(
            'input[name="category"]:checked'
        );
        const categories = Array.from(categoryCheckboxes).map((cb) => cb.value);

        // Get selected content types
        const contentTypeCheckboxes = document.querySelectorAll(
            'input[name="contentType"]:checked'
        );
        const contentTypes = Array.from(contentTypeCheckboxes).map(
            (cb) => cb.value
        );

        // Get date range
        let startDate = null;
        let endDate = null;

        const dateRangeValue = elements.dateRangeSelect.value;
        if (dateRangeValue === "custom") {
            startDate = elements.startDate.value
                ? new Date(elements.startDate.value)
                : null;
            endDate = elements.endDate.value
                ? new Date(elements.endDate.value)
                : null;
        } else if (dateRangeValue === "today") {
            startDate = new Date();
            startDate.setHours(0, 0, 0, 0);
        } else if (dateRangeValue === "yesterday") {
            startDate = new Date();
            startDate.setDate(startDate.getDate() - 1);
            startDate.setHours(0, 0, 0, 0);

            endDate = new Date();
            endDate.setDate(endDate.getDate() - 1);
            endDate.setHours(23, 59, 59, 999);
        } else if (dateRangeValue === "week") {
            startDate = new Date();
            startDate.setDate(startDate.getDate() - 7);
        } else if (dateRangeValue === "month") {
            startDate = new Date();
            startDate.setDate(startDate.getDate() - 30);
        }

        // Get domain
        const domain = elements.domainSelect.value;

        // Get favorites only
        const favoritesOnly = elements.favoritesOnly.checked;

        // Update current filters
        currentFilters = {
            category:
                categories.length > 0 && categories.length < 9
                    ? categories.join(",")
                    : null,
            contentType:
                contentTypes.length > 0 && contentTypes.length < 2
                    ? contentTypes.join(",")
                    : null,
            startDate: startDate ? startDate.toISOString() : null,
            endDate: endDate ? endDate.toISOString() : null,
            domain: domain || null,
            favorite: favoritesOnly,
        };

        // Reset pagination and load items
        currentPage = 1;
        loadClipboardItems();
    } catch (error) {
        console.error("Error applying filters:", error);
        showToast("Error applying filters", "error");
    }
}

// Reset filters
function resetFilters() {
    try {
        // Reset category checkboxes
        document.querySelectorAll('input[name="category"]').forEach((cb) => {
            cb.checked = true;
        });

        // Reset content type checkboxes
        document.querySelectorAll('input[name="contentType"]').forEach((cb) => {
            cb.checked = true;
        });

        // Reset date range
        elements.dateRangeSelect.value = "all";
        elements.customDateRange.classList.add("hidden");
        elements.startDate.value = "";
        elements.endDate.value = "";

        // Reset domain
        elements.domainSelect.value = "";

        // Reset favorites only
        elements.favoritesOnly.checked = false;

        // Clear current filters
        currentFilters = {};

        // Reset pagination and load items
        currentPage = 1;
        loadClipboardItems();
    } catch (error) {
        console.error("Error resetting filters:", error);
        showToast("Error resetting filters", "error");
    }
}

// Open item detail modal
function openItemDetailModal(item) {
    try {
        currentItemId = item._id;

        // Set modal content
        elements.modalFavicon.src = getFaviconUrl(item.sourceUrl);
        elements.modalSourceUrl.href = item.sourceUrl;
        elements.modalSourceUrl.textContent =
            item.sourceTitle || item.sourceUrl;
        elements.modalCategory.textContent = item.category;
        elements.modalCategory.className = `category-tag ${getCategoryClass(
            item.category
        )}`;
        elements.modalTimestamp.textContent = new Date(
            item.createdAt
        ).toLocaleString();

        // Set content
        if (item.contentType === "image") {
            elements.modalContent.innerHTML = `<img src="${item.content}" alt="Copied image" style="max-width: 100%;">`;
        } else {
            elements.modalContent.textContent = item.content;

            // Add code styling for code snippets
            if (item.category === "Code Snippet") {
                elements.modalContent.className = "item-content code";
            } else {
                elements.modalContent.className = "item-content";
            }
        }

        // Update favorite button
        if (item.isFavorite) {
            elements.modalFavoriteBtn.innerHTML = `
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="currentColor" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="favorite-icon">
          <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon>
        </svg>
        Remove from Favorites
      `;
        } else {
            elements.modalFavoriteBtn.innerHTML = `
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon>
        </svg>
        Add to Favorites
      `;
        }

        // Show modal
        elements.itemDetailModal.classList.remove("hidden");
    } catch (error) {
        console.error("Error opening item detail modal:", error);
        showToast("Error opening item details", "error");
    }
}

// Copy item to clipboard
async function copyItemToClipboard(itemId) {
    try {
        const { userId } = await chrome.storage.local.get("userId");
        if (!userId) {
            throw new Error("User ID not found");
        }

        // Get item from API
        const response = await fetch(`${API_BASE_URL}/items/${itemId}`, {
            headers: {
                "X-User-Id": userId,
            },
        });

        if (!response.ok) {
            throw new Error(`API error: ${response.status}`);
        }

        const item = await response.json();

        // Copy to clipboard
        if (item.contentType === "text") {
            await navigator.clipboard.writeText(item.content);
        } else if (item.contentType === "image") {
            // For images, we need to convert base64 to blob
            const response = await fetch(item.content);
            const blob = await response.blob();
            await navigator.clipboard.write([
                new ClipboardItem({
                    [blob.type]: blob,
                }),
            ]);
        }

        showToast("Copied to clipboard");
    } catch (error) {
        console.error("Error copying to clipboard:", error);
        showToast("Error copying to clipboard", "error");
    }
}

// Toggle favorite status
async function toggleFavorite(itemId) {
    try {
        const { userId } = await chrome.storage.local.get("userId");
        if (!userId) {
            throw new Error("User ID not found");
        }

        // Toggle favorite status via API
        const response = await fetch(
            `${API_BASE_URL}/items/${itemId}/favorite`,
            {
                method: "PUT",
                headers: {
                    "X-User-Id": userId,
                },
            }
        );

        if (!response.ok) {
            throw new Error(`API error: ${response.status}`);
        }

        const data = await response.json();

        // Update UI
        const itemElement = document.querySelector(
            `.clipboard-item[data-id="${itemId}"]`
        );
        if (itemElement) {
            if (data.isFavorite) {
                itemElement.classList.add("favorite");
                itemElement
                    .querySelector(".favorite-btn svg")
                    .setAttribute("fill", "currentColor");
                itemElement
                    .querySelector(".favorite-btn svg")
                    .classList.add("favorite-icon");
            } else {
                itemElement.classList.remove("favorite");
                itemElement
                    .querySelector(".favorite-btn svg")
                    .setAttribute("fill", "none");
                itemElement
                    .querySelector(".favorite-btn svg")
                    .classList.remove("favorite-icon");
            }
        }

        // If modal is open, update it too
        if (
            currentItemId === itemId &&
            !elements.itemDetailModal.classList.contains("hidden")
        ) {
            if (data.isFavorite) {
                elements.modalFavoriteBtn.innerHTML = `
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="currentColor" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="favorite-icon">
            <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon>
          </svg>
          Remove from Favorites
        `;
            } else {
                elements.modalFavoriteBtn.innerHTML = `
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon>
          </svg>
          Add to Favorites
        `;
            }
        }

        showToast(
            data.isFavorite ? "Added to favorites" : "Removed from favorites"
        );
    } catch (error) {
        console.error("Error toggling favorite status:", error);
        showToast("Error updating favorite status", "error");
    }
}

// Delete item
async function deleteItem(itemId) {
    try {
        const { userId } = await chrome.storage.local.get("userId");
        if (!userId) {
            throw new Error("User ID not found");
        }

        // Delete item via API
        const response = await fetch(`${API_BASE_URL}/items/${itemId}`, {
            method: "DELETE",
            headers: {
                "X-User-Id": userId,
            },
        });

        if (!response.ok) {
            throw new Error(`API error: ${response.status}`);
        }

        // Remove from UI
        const itemElement = document.querySelector(
            `.clipboard-item[data-id="${itemId}"]`
        );
        if (itemElement) {
            itemElement.remove();
        }

        // Close modal if open
        if (currentItemId === itemId) {
            elements.itemDetailModal.classList.add("hidden");
            currentItemId = null;
        }

        // Check if no items left
        if (elements.clipboardItems.children.length === 0) {
            elements.emptyState.classList.remove("hidden");
        }

        showToast("Item deleted");
    } catch (error) {
        console.error("Error deleting item:", error);
        showToast("Error deleting item", "error");
    }
}

// Show toast notification
function showToast(message, type = "success") {
    const toast = elements.toast;
    toast.textContent = message;
    toast.className = `toast ${type}`;

    // Remove hidden class
    toast.classList.remove("hidden");

    // Auto-hide after 3 seconds
    setTimeout(() => {
        toast.classList.add("hidden");
    }, 3000);
}
